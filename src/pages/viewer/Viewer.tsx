import { useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { Document, Page, pdfjs } from "react-pdf";
import { Navigate } from "react-router-dom";
import { usePdfContext } from "../../context";
import { Button, PagingWrapper, PdfViewer } from "./Viewer.style";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const Viewer = () => {
  const { theme, pdfFile } = usePdfContext();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!pdfFile) return <Navigate to={"/"} />;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <PdfViewer theme={theme}>
      <>
        <Document onLoadSuccess={onDocumentLoadSuccess} file={pdfFile}>
          <Page pageNumber={pageNumber} />
        </Document>
        <PagingWrapper theme={theme}>
          <Button theme={theme}>
            <BiSkipPrevious />
          </Button>
          <>
            {pageNumber} of {numPages}
          </>
          <Button theme={theme}>
            <BiSkipNext />
          </Button>
        </PagingWrapper>
      </>
    </PdfViewer>
  );
};
