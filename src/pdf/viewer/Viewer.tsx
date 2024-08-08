import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { usePdfContext } from "../../context";
import { PdfViewer } from "./Viewer.style";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const Viewer = () => {
  const { theme, pdfFile } = usePdfContext();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <PdfViewer theme={theme}>
      {pdfFile && (
        <>
          <Document onLoadSuccess={onDocumentLoadSuccess} file={pdfFile}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page :{pageNumber} of {numPages}
          </p>
        </>
      )}
    </PdfViewer>
  );
};
