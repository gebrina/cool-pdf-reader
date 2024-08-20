import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "./common";
import { selectColors } from "./utils";

export const PdfContainer = styled.div<ITheme>(
  ({ theme }) => css`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: ${theme === "dark"
      ? "hard-light"
      : theme === "default"
      ? "luminosity"
      : "hard-light"};
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    &:not(:has(.pdf-viewer)) {
      transform: scaleX(-1);
      height: 100%;
    }

    &::before {
      content: "";
      position: fixed;
      pointer-events: none;
      top: 0;
      opacity: 0.8;
      height: 100%;
      width: 100%;
      background-color: black;
    }
  `
);
