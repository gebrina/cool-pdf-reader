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
import { getBookInfo, storeBookInfo, toBase64 } from "../utils";

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

  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const [pdfFile, setPdfFile] = useState("");

  const handleInputFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const { name } = file;
      const fileName = name.replace(/ /g, "-").substring(0, name.length - 4);
      const base64File = await toBase64(file);
      await storeBookInfo({ file: base64File, name: fileName });
      const fileUrl = URL.createObjectURL(file);
      setPdfFile(fileUrl);
      navigate(fileName);
    }
  };

  const handleChangeTheme = (theme: ThemeName) => {
    const themeInfo = JSON.stringify(theme);
    localStorage.setItem("theme", themeInfo);
    setThemeName(theme);
  };

  useEffect(() => {
    // Reset pdf file if user reloads the Viewer page
    const updatePdfFile = async () => {
      const book = await getBookInfo();
      if (book.file) {
        fetch(book.file)
          .then((res) => res.blob())
          .then((response) => {
            const file = new File([response], book.name);
            const fileUrl = URL.createObjectURL(file);
            setPdfFile(fileUrl);
          })
          .catch((e) => console.log(e));
      }
    };
    updatePdfFile();

    // Update the theme if user has updated before
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
