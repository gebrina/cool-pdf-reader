import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../context";

type PdfViewerProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<PdfViewerProps>(() => css``);
