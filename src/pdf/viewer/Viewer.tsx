import { Document, Page } from "react-pdf";
import { usePdfContext } from "../../context";
import { PdfViewer } from "./Viewer.style";

export const Viewer = () => {
  const { theme, pdfFile } = usePdfContext();

  return (
    <PdfViewer theme={theme}>
      <Document file={pdfFile}>
        <Page />
      </Document>
    </PdfViewer>
  );
};
