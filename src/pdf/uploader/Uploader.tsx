import { FC } from "react";
import { ThemeName } from "../../common";
import { usePdfContext } from "../../context";
import { InputFile, InputLable, PdfUploader, Title } from "./Uploader.style";

type TUploaderProps = {
  theme: ThemeName;
};

export const Uploader: FC<TUploaderProps> = ({ theme }) => {
  const { OnInputFileChange } = usePdfContext();

  return (
    <PdfUploader theme={theme}>
      <Title>Upload Something</Title>
      <InputFile
        accept="application/pdf"
        onChange={OnInputFileChange}
        id="input-file"
        type="file"
      />
      <InputLable theme={theme} htmlFor="input-file">
        Open File
      </InputLable>
    </PdfUploader>
  );
};
