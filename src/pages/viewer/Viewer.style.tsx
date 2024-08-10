import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";
import { selectColors } from "../../utils";

type PdfViewerProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<PdfViewerProps>(
  ({ theme }) => css`
    transform: scaleX(-1);
    height: 100%;
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
    * {
      color: #d5b8b8;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }

    &::after {
      content: "";
      position: absolute;
      mix-blend-mode: multiply;
      top: 0;
      width: inherit;
      height: inherit;
      background-color: ${selectColors(theme).bgColor};
      z-index: 1;
    }
  `
);
