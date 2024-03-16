import { MantineColorsTuple, createTheme } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#e9fcfc",
  "#dbf3f3",
  "#b8e6e5",
  "#91d8d7",
  "#72cdcb",
  "#5ec5c3",
  "#50c2bf",
  "#40aaa8",
  "#319896",
  "#158482",
  "#D5F5F3",
];

export const theme = createTheme({
  primaryColor: "myColor",
  colors: {
    myColor,
  },
});
