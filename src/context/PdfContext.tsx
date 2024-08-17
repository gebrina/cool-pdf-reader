import {
  ChangeEvent,
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ThemeName } from "../common";

type TPdfContext = {
  theme: ThemeName;
  pdfFile: string;
  onInputFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeTheme: (theme: ThemeName) => void;
};

const PdfContext = createContext<TPdfContext>({
  theme: "default",
  pdfFile: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInputFileChange: (_event: ChangeEvent<HTMLInputElement>) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeTheme: (_theme: ThemeName) => {},
});

export const PdfContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [themeName, setThemeName] = useState<ThemeName>("default");
  const [pdfFile, setPdfFile] = useState("");

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      navigate(`/${file.name}`);
    }
  };

  const handleChangeTheme = (theme: ThemeName) => {
    const themeInfo = JSON.stringify(theme);
    localStorage.setItem("theme", themeInfo);
    setThemeName(theme);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      const themeName = JSON.parse(theme);
      setThemeName(themeName);
    }
  }, []);

  return (
    <PdfContext.Provider
      value={{
        theme: themeName,
        pdfFile,
        onChangeTheme: handleChangeTheme,
        onInputFileChange: handleInputFileChange,
      }}
    >
      {children}
    </PdfContext.Provider>
  );
};

export const usePdfContext = () => useContext(PdfContext);
