import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  BiMenuAltLeft,
  BiMenuAltRight,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
import { Navigate } from "react-router-dom";
import { usePdfContext } from "../../context";
import { isOpenedOnMobile, selectColors } from "../../utils";
import {
  Button,
  InputPageNumber,
  PagingWrapper,
  PdfOutline,
  PdfViewer,
  PdfViewerToolBar,
} from "./Viewer.style";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type TZoomType = "decrease" | "increase";

export const Viewer = () => {
  const { theme, pdfFile } = usePdfContext();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const [exitAnimate, setExitAnimate] = useState(false);

  const outlineRef = useRef<HTMLDivElement | null>(null);
  const activeLinkRef = useRef<HTMLElement | null>(null);

  const ZOOM_BY = 25;
  const selectedPageNumber =
    pageNumber > numPages ? numPages : pageNumber < 1 ? 1 : pageNumber;

  useEffect(() => {
    const isMoble = isOpenedOnMobile();
    if (isMoble) setCanvasWidth(window.innerWidth);
    else setCanvasWidth(window.innerWidth / 1.6);
  }, []);

  useEffect(() => {
    const handleOutlineClick = (e: Event) => {
      const target = e.target as HTMLElement;
      activeLinkRef.current = target;
      if (target.nodeName === "A" && showOutline) {
        setExitAnimate(true);
        setTimeout(() => setShowOutline(false), 250);
      } // wait for item click to update page number
    };
    // wait until the element is added to the DOM
    const outlineTimeout = setTimeout(() => {
      const outlineContainer = outlineRef.current;
      const links = outlineContainer?.querySelectorAll("a");
      links?.forEach((link) => {
        if (link.textContent == activeLinkRef.current?.textContent) {
          link.classList.add("active");
          const { top } = link.getBoundingClientRect();
          const toolbarHeight = 50;
          outlineContainer?.scrollTo({
            top: top - toolbarHeight,
            behavior: "smooth",
          });
        }
      });
      outlineContainer?.addEventListener("click", handleOutlineClick);
    }, 50);

    return () => clearTimeout(outlineTimeout);
  }, [showOutline]);

  if (!pdfFile) return <Navigate to={"/"} />;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleZooming = (zoomType: TZoomType) => {
    if (
      (zoomPercent <= 50 && zoomType == "decrease") ||
      (zoomPercent >= 400 && zoomType == "increase")
    )
      return;

    // Add horizontal scroll bar for the document
    const rootElement: HTMLElement = document.querySelector("html")!;
    if (canvasWidth >= window.innerWidth) {
      rootElement.style.overflowX = "auto";
    } else {
      rootElement.style.overflowX = "hidden";
    }

    if (zoomType === "increase") {
      setZoomPercent(zoomPercent + ZOOM_BY);
      setCanvasWidth(canvasWidth + ZOOM_BY * 2);
      return;
    }

    setZoomPercent(zoomPercent - ZOOM_BY);
    setCanvasWidth(canvasWidth - ZOOM_BY * 2);
  };

  const handleNextPage = () => {
    const nextPageNumber = numPages > pageNumber ? pageNumber + 1 : numPages;
    setPageNumber(nextPageNumber);
    updateScrollPosition();
  };

  const updateScrollPosition = () =>
    scrollTo({ left: 0, top: 0, behavior: "smooth" });

  const handlePrevPage = () => {
    const prevPageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
    setPageNumber(prevPageNumber);
    updateScrollPosition();
  };

  const toggleOutlineVisibility = () => {
    let waitForAnimation = 0;
    if (waitForAnimation || showOutline) {
      // add exit animation and start removing Outline from DOM
      setExitAnimate(true);
      clearTimeout(waitForAnimation);

      // wait for .3sec until the exit  animaiton ends
      waitForAnimation = setTimeout(() => {
        setShowOutline(false);
      }, 300);
    } else {
      setExitAnimate(false);
      setShowOutline(true);
    }
  };

  const handlePageNumberChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const enteredPageNumber = parseInt(value);
    if (enteredPageNumber !== pageNumber && !isNaN(enteredPageNumber)) {
      setPageNumber(enteredPageNumber);
      updateScrollPosition();
    } else {
      setPageNumber(0);
    }
  };

  return (
    <PdfViewer className="pdf-viewer" theme={theme}>
      <PdfViewerToolBar theme={theme}>
        <div
          className="switch-outline"
          onClick={toggleOutlineVisibility}
          role="switch"
          aria-label="toggle outline visiblity"
        >
          {showOutline ? <BiMenuAltLeft /> : <BiMenuAltRight />}
        </div>

        <div className="zoom-btns-wrapper">
          <Button theme={theme} zoom onClick={() => handleZooming("decrease")}>
            <FiMinus aria-label="Zoom Out" />
          </Button>
          <span>{zoomPercent}%</span>
          <Button theme={theme} zoom onClick={() => handleZooming("increase")}>
            <FiPlus aria-label="Zoom In" />
          </Button>
        </div>
      </PdfViewerToolBar>
      <>
        <Document
          onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}
          onLoadSuccess={onDocumentLoadSuccess}
          file={pdfFile}
        >
          {showOutline && (
            <PdfOutline
              inputRef={outlineRef}
              exitAnimate={exitAnimate}
              theme={theme}
            />
          )}
          <Page
            canvasBackground={selectColors(theme).bgColor}
            width={canvasWidth}
            onLoadError={(e) => console.error(e)}
            pageNumber={selectedPageNumber}
          />
        </Document>
        <PagingWrapper theme={theme}>
          <Button onClick={handlePrevPage} theme={theme}>
            <BiSkipPrevious />
          </Button>
          <>
            <InputPageNumber
              charLength={pageNumber.toString().length}
              onChange={handlePageNumberChange}
              type="text"
              value={pageNumber == 0 ? "" : pageNumber}
            />
            /
            <InputPageNumber
              charLength={numPages.toString().length}
              readOnly
              value={numPages}
            />
          </>
          <Button onClick={handleNextPage} theme={theme}>
            <BiSkipNext />
          </Button>
        </PagingWrapper>
      </>
    </PdfViewer>
  );
};
