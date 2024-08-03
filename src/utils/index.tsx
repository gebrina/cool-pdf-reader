import { ThemeName } from "../common";

type TSelectColor = {
  bgColor: string;
  textColor: string;
  titleColor: string;
};

export const selectColors = (theme: ThemeName): TSelectColor => {
  let selectedColors: TSelectColor = {
    bgColor: "#b7b8cc",
    textColor: "#272731",
    titleColor: "#921862",
  };

  switch (theme) {
    case "dark":
      selectedColors = {
        bgColor: "#17172a",
        textColor: "#c6cbf7",
        titleColor: "#2fb5ff",
      };
      break;
    case "light":
      selectedColors = {
        bgColor: "#e8e8f3",
        textColor: "#090d34",
        titleColor: "#033651",
      };
      break;
  }

  return selectedColors;
};
