import { usePdfContext } from "../../context";
import { PdfViewer } from "./Viewer.style";

export const Viewer = () => {
  const { theme } = usePdfContext();
  return <PdfViewer theme={theme}>Viewer</PdfViewer>;
};
