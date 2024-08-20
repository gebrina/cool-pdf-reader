import { FC } from "react";
import { BiBookHeart, BiUpload } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { usePdfContext } from "../../context";
import { InputFile, InputLabel, PdfUploader, Title } from "./Uploader.style";

type TUploaderProps = {
  viewerPage?: boolean;
};

export const Uploader: FC<TUploaderProps> = ({ viewerPage }) => {
  const { theme, onInputFileChange } = usePdfContext();

  return (
    <PdfUploader theme={theme}>
      {!viewerPage && (
        <Title theme={theme}>
          Learn to Read
          <span>
            <FiBookOpen /> & <BiBookHeart />
          </span>
          Read to Learn!
        </Title>
      )}
      <InputFile
        accept="application/pdf"
        onChange={onInputFileChange}
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
