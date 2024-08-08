import { PdfContainer } from "./App.style";
import beautyGirl from "./assets/bg.jpeg";
import { usePdfContext } from "./context";
import { PdfUploader, PdfViewer } from "./pdf";

export const App = () => {
  const { theme } = usePdfContext();

  return (
    <PdfContainer
      style={{ backgroundImage: `url(${beautyGirl})` }}
      theme={theme}
    >
      <PdfUploader />
      <PdfViewer />
    </PdfContainer>
  );
};
