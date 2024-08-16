import { Route, Routes } from "react-router-dom";
import { PdfContainer } from "./App.style";
import beautyGirl from "./assets/bg.jpeg";
import { usePdfContext } from "./context";
import { PdfUploader, PdfViewer } from "./pages";
import NotFound from "./pages/not-found/NotFound";
import { Setting } from "./pages/setting";

export const App = () => {
  const { theme } = usePdfContext();

  return (
    <PdfContainer
      style={{ backgroundImage: `url(${beautyGirl})` }}
      theme={theme}
    >
      <Routes>
        <Route path="" element={<PdfUploader />} />
        <Route path="/:filename" element={<PdfViewer />} />
        <Route path="settings" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PdfContainer>
  );
};
