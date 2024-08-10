import { useLayoutEffect, useRef, useState } from "react";
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      window.add;
    }
  }, []);

  if (!pdfFile) return <Navigate to={"/"} />;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    const nextPageNumber = numPages > pageNumber ? pageNumber + 1 : numPages;
    setPageNumber(nextPageNumber);
  };

  const handlePrevPage = () => {
    const prevPageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
    setPageNumber(prevPageNumber);
  };

  return (
    <PdfViewer theme={theme}>
      <>
        <Document onLoadSuccess={onDocumentLoadSuccess} file={pdfFile}>
          <Page pageNumber={pageNumber} />
        </Document>
        <PagingWrapper theme={theme}>
          <Button onClick={handlePrevPage} theme={theme}>
            <BiSkipPrevious />
          </Button>
          <>
            {pageNumber} of {numPages}
          </>
          <Button onClick={handleNextPage} theme={theme}>
            <BiSkipNext />
          </Button>
        </PagingWrapper>
      </>
    </PdfViewer>
  );
};
