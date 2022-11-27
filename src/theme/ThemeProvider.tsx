import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/features/config/configSlice";
import { RootState } from "../redux/store";
import { getLocal, setLocal } from "../utils/storage";
import { IThemePalette, IThemePrimary, IThemes, IThemeText } from "./types";

export const getTheme: string = getLocal("theme");

const dark: IThemePrimary = {
  50: "#e5e6e8",
  100: "#bec1c5",
  200: "#92979f",
  300: "#666d78",
  400: "#464e5b",
  500: "#252f3e",
  600: "#212a38",
  700: "#1b2330",
  800: "#161d28",
  900: "#0d121b",
  A100: "#5d8eff",
  A200: "#2a6aff",
  A400: "#004af6",
  A700: "#0042dd",
};

const lightText: IThemeText = {
  primary: "rgb(17,24,39)",
  secondary: "rgb(107,114,128)",
  disabled: "rgb(149,156,169)",
};
const darkText: IThemeText = {
  primary: "rgb(255,255,255)",
  secondary: "rgb(229,231,235)",
  disabled: "rgb(156,163,175)",
};

export const themeConfig: IThemes = {
  default: {
    palette: {
      type: "light",
      text: lightText,
      primary: dark,
      secondary: {
        light: "#e4fafd",
        main: "#22d3ee",
        dark: "#0cb7e2",
      },
      background: {
        paper: "#FFFFFF",
        default: "#f6f7f9",
      },
      error: "red",
    },
  },
  darkDefault: {
    palette: {
      type: "dark",
      text: darkText,
      primary: dark,
      secondary: {
        light: "#e4fafd",
        main: "#22d3ee",
        dark: "#0cb7e2",
      },
      background: {
        paper: "#1E2125",
        default: "#121212",
      },
      error: "red",
    },
  },
};

export const mapTheme: any = (variables: IThemePalette) => {
  return {
    type: variables.type,
    // color text
    "--color-text-primary": variables.text.primary || "",
    "--color-text-secondary": variables.text.secondary || "",
    "--color-text-disabled": variables.text.disabled || "",
    // color error
    "--color-error": variables.error || "",
    // color secondary
    "--color-secondary-dark": variables.secondary.dark || "",
    "--color-secondary-light": variables.secondary.light || "",
    "--color-secondary-main": variables.secondary.main || "",
    // color primary
    "--color-primary-50": variables.primary[50] || "",
    "--color-primary-100": variables.primary[100] || "",
    "--color-primary-200": variables.primary[200] || "",
    "--color-primary-300": variables.primary[300] || "",
    "--color-primary-400": variables.primary[400] || "",
    "--color-primary-500": variables.primary[500] || "",
    "--color-primary-600": variables.primary[600] || "",
    "--color-primary-700": variables.primary[700] || "",
    "--color-primary-800": variables.primary[800] || "",
    "--color-primary-900": variables.primary[900] || "",
    "--color-primary-A100": variables.primary["A100"] || "",
    "--color-primary-A200": variables.primary["A200"] || "",
    "--color-primary-A400": variables.primary["A400"] || "",
    "--color-primary-A700": variables.primary["A700"] || "",
    // bg
    "--bg-default": variables.background.default || "",
    "--bg-paper": variables.background.paper || "",
  };
};

const ThemeProvider = ({ children }: any) => {
  const { language, theme } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  Object.keys(mapTheme(themeConfig[theme].palette)).forEach((i) => {
    document.documentElement.style.setProperty(
      i,
      mapTheme(themeConfig[theme].palette)[i]
    );
  });
  useEffect(() => {
    setLocal("lang", language);
    language === "fa" ? (document.dir = "rtl") : (document.dir = "ltr");
  }, [language]);

  useEffect(() => {
    if (getTheme && getTheme.length) {
      dispatch(setTheme(getTheme));
    }
  }, [dispatch]);

  return children;
};
export default ThemeProvider;
