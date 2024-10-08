import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  BiBulb,
  BiMenuAltLeft,
  BiMenuAltRight,
  BiMoon,
  BiSad,
  BiSkipNext,
  BiSkipPrevious,
  BiSun,
} from "react-icons/bi";
import { FiAlignCenter, FiAlignJustify, FiMinus, FiPlus } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ThemeName } from "../../common";
import { Select, TSelectOptions } from "../../components/select/Select";
import { usePdfContext } from "../../context";
import { getBookInfo, getCanvasWidth, storeBookInfo } from "../../utils";
import { Uploader } from "../uploader";
import {
  Button,
  ErrorMessage,
  InputPageNumber,
  PagingWrapper,
  PdfOutline,
  PdfViewer,
  PdfViewerToolBar,
  SelectWrapper,
} from "./Viewer.style";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type TZoomType = "decrease" | "increase";

export const Viewer = () => {
  const { theme, pdfFile, onChangeTheme } = usePdfContext();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [showOutline, setShowOutline] = useState(false);
  const [exitAnimate, setExitAnimate] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const themeOptions: TSelectOptions[] = [
    { id: 1, label: "Default", value: "default", icon: <BiBulb /> },
    { id: 2, label: "Light", value: "light", icon: <BiSun /> },
    { id: 3, label: "Dark", value: "dark", icon: <BiMoon /> },
  ];

  const outlineRef = useRef<HTMLDivElement | null>(null);
  const activeLinkRef = useRef<HTMLElement | null>(null);

  const ZOOM_BY = 25;
  const selectedPageNumber =
    pageNumber > numPages ? numPages : pageNumber < 1 ? 1 : pageNumber;

  useEffect(() => {
    const udpateCanvasWidth = () => {
      const canvasWidth = getCanvasWidth();
      setCanvasWidth(canvasWidth);
    };

    udpateCanvasWidth();
    const handleWindowResize = () => {
      // Wait for 500ml before updating the canvas width -> for perforamnce purpose
      let timeOut = 0;
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => udpateCanvasWidth(), 500);
    };
    window.addEventListener("resize", handleWindowResize);

    // Reset file's page number if it was read before
    const updatePageNumber = async () => {
      const book = await getBookInfo();
      book && book.page && setPageNumber(book.page);
    };
    updatePageNumber();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    const handleOutlineClick = (e: Event) => {
      const target = e.target as HTMLElement;
      activeLinkRef.current = target;
      if (target.nodeName === "A" && showOutline) {
        setExitAnimate(true);
        setTimeout(() => setShowOutline(false), 250);
      } // wait for item click to update page number && exit animation
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

  useEffect(() => {
    // If the book was opened before update the page number, if not store it.
    const updateBookInfo = async () => {
      const book = await getBookInfo();
      if (book && book.name) {
        await storeBookInfo({ name: book.name, page: selectedPageNumber || 1 });
      }
    };
    updateBookInfo();
  }, [selectedPageNumber]);

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
    if (canvasWidth > window.innerWidth) {
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
  const toggleShowAllPages = () => {
    setShowAll(!showAll);
  };

  const handleSelect = (theme: TSelectOptions) =>
    onChangeTheme(theme.value as ThemeName);

  return (
    <PdfViewer className="pdf-viewer" canvasWidth={canvasWidth} theme={theme}>
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
        <SelectWrapper>
          <div onClick={toggleShowAllPages}>
            {showAll ? <FiAlignCenter /> : <FiAlignJustify />}
          </div>
          <Select
            label={`Select Theme`}
            theme={theme}
            selectOptions={themeOptions}
            onSelect={handleSelect}
          />
        </SelectWrapper>
      </PdfViewerToolBar>
      <>
        {pdfFile ? (
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
            {showAll ? (
              Array.from({ length: numPages }).map((_, index) => (
                <Page
                  width={canvasWidth}
                  onLoadError={(e) => console.error(e)}
                  pageNumber={index + 1}
                />
              ))
            ) : (
              <>
                {" "}
                <Page
                  width={canvasWidth}
                  onLoadError={(e) => console.error(e)}
                  pageNumber={selectedPageNumber}
                />
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
            )}
          </Document>
        ) : (
          <ErrorMessage theme={theme} className="error-message">
            <span>
              <BiSad /> Pdf file load error...
            </span>
            <Uploader viewerPage={true} />
          </ErrorMessage>
        )}
      </>
    </PdfViewer>
  );
};
