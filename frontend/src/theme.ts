import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#1192DD",
    },
    secondary: {
      main: "#F9D00B",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  appBarGradient: {
    backgroundImage: `linear-gradient(to right, #1192DD, black)`,
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    appBarGradient?: {
      backgroundImage?: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    appBarGradient?: {
      backgroundImage?: string;
    };
  }
}

export default theme;
