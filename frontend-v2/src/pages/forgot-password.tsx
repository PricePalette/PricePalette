import { Logo } from "@/illustrations/Logo";
import { backendAPI, SERVER_ERROR, SERVER_SUCCESS } from "@/utils/constants";
import { toErrorMap } from "@/utils/toErrorMap";
import { Button, Flex, Text, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";
import superagent from "superagent";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values);
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => {
      return superagent
        .post(`${backendAPI}/user/forgot-password`)
        .send({
          email,
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
        toast.success(
          "Reset password instructions sent to the provided email",
          {
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
          }
        );
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
        Forgot Password?
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
          <TextInput
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Your registered email"
            leftSection={<IconAt size={16} />}
            error={
              formik.touched.email && Boolean(formik.errors.email)
                ? formik.errors.email
                : null
            }
            mt={"md"}
          />
        </div>

        <Button
          mt={"md"}
          mx="70px"
          type="submit"
          loading={forgotPasswordMutation.isLoading}
          loaderProps={{ type: "dots" }}
        >
          Forgot Password
        </Button>
      </form>
      <ToastContainer style={{ width: "500px" }} />
    </Flex>
  );
}
