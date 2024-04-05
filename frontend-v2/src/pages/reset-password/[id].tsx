import { Logo } from "@/illustrations/Logo";
import { SERVER_ERROR, SERVER_SUCCESS, backendAPI } from "@/utils/constants";
import { toErrorMap } from "@/utils/toErrorMap";
import { Text, Flex, Button, PasswordInput } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast, Bounce, ToastContainer } from "react-toastify";
import superagent from "superagent";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      resetPasswordMutation.mutate(values);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ password }: { password: string }) => {
      return superagent
        .post(`${backendAPI}/user/reset-password`)
        .send({
          newPassword: password,
          token: router.query.id,
        })
        .set("Accept", "application/json")
        .then((res) => res.body)
        .catch((error) => error.response.body);
    },
    onSuccess: (data) => {
      // error
      if (data.message === SERVER_ERROR) {
        formik.setErrors(toErrorMap(data.errors));
      }
      //   // success
      if (data.message === SERVER_SUCCESS) {
        toast.success("Password has been reset, login with your new password", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => router.push("/login"),
          transition: Bounce,
        });
      }
    },
  });

  return (
    <Flex
      component="div"
      direction={"column"}
      align={"center"}
      justify={"center"}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Logo
        height={50}
        width={140}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer", marginLeft: "0.5em" }}
      />

      <Text size="xl" fw={"500"}>
        Reset Password
      </Text>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "400px" }}>
          <PasswordInput
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="New password"
            leftSection={<IconLock size={16} />}
            error={
              formik.touched.password && Boolean(formik.errors.password)
                ? formik.errors.password
                : null
            }
            mt={"md"}
          />
        </div>

        <Button
          mt={"md"}
          mx="70px"
          type="submit"
          loading={resetPasswordMutation.isLoading}
          loaderProps={{ type: "dots" }}
        >
          Reset Password
        </Button>
      </form>
      <ToastContainer style={{ width: "500px" }} />
    </Flex>
  );
}
