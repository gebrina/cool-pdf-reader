import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";

type PdfViewerProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<PdfViewerProps>(
  ({ theme }) => css`
    transform: scaleX(-1);
    * {
      color: #d5b8b8;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }
  `
);
