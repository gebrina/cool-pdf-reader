import { createContext, FC, ReactNode, useContext, useState } from "react";
import { ThemeName } from "../common";

type TPdfContext = {
  theme: ThemeName;
  OnChangeTheme: (theme: ThemeName) => void;
};

const PdfContext = createContext<TPdfContext>({
  theme: "default",
  OnChangeTheme: (theme: ThemeName) => theme,
});

export const PdfContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("default");

  const handleChangeTheme = (theme: ThemeName) => {
    const selectdThemeName = themeName === theme ? themeName : theme;
    // WIP => store theme in local storage
    setThemeName(selectdThemeName);
  };

  return (
    <PdfContext.Provider
      value={{
        theme: themeName,
        OnChangeTheme: handleChangeTheme,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export const usePdfContext = () => useContext(PdfContext);
