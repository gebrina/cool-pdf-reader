import { FC } from "react";
import { ThemeName } from "../../common";
import { PdfUploader, Title } from "./Uploader.style";

type TUploaderProps = {
  theme: ThemeName;
};

export const Uploader: FC<TUploaderProps> = ({ theme }) => {
  return (
    <PdfUploader theme={theme}>
      <Title>Upload Something</Title>
    </PdfUploader>
  );
};
