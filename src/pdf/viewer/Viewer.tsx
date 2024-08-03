import { useState } from "react";
import { PdfViewer, ThemeName } from "./Viewer.style";

export const Viewer = () => {
  const [theme, setTheme] = useState<ThemeName>("default");

  return <PdfViewer theme={theme}>Viewer</PdfViewer>;
};
