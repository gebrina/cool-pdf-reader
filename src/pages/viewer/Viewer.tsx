import { useState } from "react";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Navigate } from "react-router-dom";
import { usePdfContext } from "../../context";
import { selectColors } from "../../utils";
import {
  Button,
  PagingWrapper,
  PdfViewer,
  PdfViewerToolBar,
} from "./Viewer.style";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const Viewer = () => {
  const { theme, pdfFile } = usePdfContext();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomPercent, setZoomPercent] = useState("100%");

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
    <PdfViewer className="pdf-viewer" theme={theme}>
      <PdfViewerToolBar theme={theme}>
        <FiMinus />
        <span>{zoomPercent}</span>
        <FiPlus />
      </PdfViewerToolBar>
      <>
        <Document
          onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}
          onLoadSuccess={onDocumentLoadSuccess}
          file={pdfFile}
        >
          {/* <Outline /> */}
          <Page
            canvasBackground={selectColors(theme).bgColor}
            width={800}
            onLoadError={(e) => console.error(e)}
            pageNumber={pageNumber}
          />
          {/* <Thumbnail pageNumber={pageNumber} height={500} /> */}
          {/* 
          {numPages > 0 &&
            Array.from({ length: numPages }).map((_, i) => (
              <Page pageNumber={i + 1} key={"page" + pageNumber * i} />
            ))} */}
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
