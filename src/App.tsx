import { PdfContainer } from "./App.style";
import { usePdfContext } from "./context";
import { PdfUploader } from "./pdf";

export const App = () => {
  const { theme } = usePdfContext();

  return (
    <PdfContainer theme={theme}>
      <PdfUploader theme={theme} />
      {/* <PdfViewer /> */}
    </PdfContainer>
  );
};
