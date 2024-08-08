import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PdfContainer } from "./App.style";
import beautyGirl from "./assets/bg.jpeg";
import { usePdfContext } from "./context";
import { PdfUploader, PdfViewer } from "./pdf";

export const App = () => {
  const { theme } = usePdfContext();

  return (
    <BrowserRouter>
      <PdfContainer
        style={{ backgroundImage: `url(${beautyGirl})` }}
        theme={theme}
      >
        <Routes>
          <Route path="" element={<PdfUploader />} />
          <Route path="/:filename" element={<PdfViewer />} />
        </Routes>
      </PdfContainer>
    </BrowserRouter>
  );
};
