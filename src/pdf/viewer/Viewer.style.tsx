import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";

type PdfViewerProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<PdfViewerProps>(() => css``);
