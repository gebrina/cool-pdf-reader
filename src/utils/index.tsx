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
    titleColor: "#ead7e3",
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

export const isOpenedOnMobile = () => {
  const mobileOSs = ["iphone", "android"];
  let isMobile = false;
  for (let i = 0; i < mobileOSs.length; i++) {
    if (navigator.userAgent.toLocaleLowerCase().includes(mobileOSs[i])) {
      isMobile = true;
      break;
    }
  }
  return isMobile;
};
