import { PdfContainer } from "./App.style";
import { usePdfContext } from "./context";
import { PdfUploader, PdfViewer } from "./pdf";

export const App = () => {
  const { theme } = usePdfContext();

  return (
    <PdfContainer theme={theme}>
      <PdfUploader theme={theme} />
      <PdfViewer />
    </PdfContainer>
  );
};
