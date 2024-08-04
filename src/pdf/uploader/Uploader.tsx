import { FC } from "react";
import { BiUpload } from "react-icons/bi";
import { ThemeName } from "../../common";
import { usePdfContext } from "../../context";
import { InputFile, InputLabel, PdfUploader, Title } from "./Uploader.style";

type TUploaderProps = {
  theme: ThemeName;
};

export const Uploader: FC<TUploaderProps> = ({ theme }) => {
  const { OnInputFileChange } = usePdfContext();

  return (
    <PdfUploader theme={theme}>
      <Title>
        Learn to Read &
        <br />
        Read to Learn!
      </Title>
      <InputFile
        accept="application/pdf"
        onChange={OnInputFileChange}
        id="input-file"
        type="file"
      />
      <InputLabel theme={theme} htmlFor="input-file">
        <BiUpload />
        <span>Open and read</span>
      </InputLabel>
    </PdfUploader>
  );
};
