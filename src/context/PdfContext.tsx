import {
  ChangeEvent,
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { ThemeName } from "../common";

type TPdfContext = {
  theme: ThemeName;
  pdfFile: string;
  OnInputFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  OnChangeTheme: (theme: ThemeName) => void;
};

const PdfContext = createContext<TPdfContext>({
  theme: "default",
  pdfFile: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  OnInputFileChange: (_event: ChangeEvent<HTMLInputElement>) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  OnChangeTheme: (_theme: ThemeName) => {},
});

export const PdfContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("default");
  const [pdfFile, setPdfFile] = useState("");

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
    }
    event.target.value = "";
  };

  const handleChangeTheme = (theme: ThemeName) => {
    const selectdThemeName = themeName === theme ? themeName : theme;
    // WIP => store theme in local storage
    setThemeName(selectdThemeName);
  };
  return (
    <PdfContext.Provider
      value={{
        theme: themeName,
        pdfFile,
        OnChangeTheme: handleChangeTheme,
        OnInputFileChange: handleInputFileChange,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export const usePdfContext = () => useContext(PdfContext);
