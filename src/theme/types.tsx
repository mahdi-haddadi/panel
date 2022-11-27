export interface IThemeBackground {
  paper: string;
  default: string;
}
export interface IThemeSecondary {
  light: string;
  main: string;
  dark: string;
}
export interface IThemeText {
  primary: string;
  secondary: string;
  disabled: string;
}
export interface IThemePrimary {
  [key: number | string]: string;
}
export interface IThemePalette {
  type: "light" | "dark";
  text: IThemeText;
  primary: IThemePrimary;
  secondary: IThemeSecondary;
  background: IThemeBackground;
  error: string;
}
export interface ITheme {
  palette: IThemePalette;
}
export interface IThemes {
  [key: string]: ITheme;
}
