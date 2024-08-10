import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "./common";
import { selectColors } from "./utils";

export const PdfContainer = styled.div<ITheme>(
  ({ theme }) => css`
    background-size: cover;
    background-position: center;
    min-height: 100dvh;

    &:not(:has(.pdf-viewer)) {
      transform: scaleX(-1);
    }

    background-repeat: no-repeat;
    background-blend-mode: luminosity;
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 50px;

    &::before {
      position: fixed;
      top: 0;
      opacity: 0.5;
      content: "";
      height: 100%;
      width: 100%;
      background-color: black;
    }
  `
);
