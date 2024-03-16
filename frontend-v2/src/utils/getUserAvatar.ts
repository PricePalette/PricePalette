import { getGender } from "gender-detection-from-name";

export function getUserAvatar(username: string) {
  const myUsername = username.replace(/[^a-zA-Z ]/g, "");
  if (getGender(myUsername) === "male") {
    return "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png";
  } else {
    return "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png";
  }
}
