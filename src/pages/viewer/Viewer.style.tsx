import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";
import { selectColors } from "../../utils";

type TStyleProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<TStyleProps>(
  ({ theme }) => css`
    transform: scaleX(-1);
    display: grid;
    justify-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    & > * {
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }

    &::after {
      content: "";
      position: absolute;
      pointer-events: ;
      mix-blend-mode: multiply;
      top: 0;
      width: inherit;
      height: inherit;
      background-color: ${selectColors(theme).bgColor};
      z-index: 1;
    }

    & canvas {
      overflow: auto !important;
      height: 100%;
    }
  `
);

export const PagingWrapper = styled.div<TStyleProps>(
  ({ theme }) => css`
    position: fixed;
    top: 94dvh;
    width: 100%;
    left: 50%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transform: translateX(-50%);
    color: ${selectColors(theme).textColor};
    background-color: ${selectColors(theme).bgColor};
  `
);

export const Button = styled.button<TStyleProps>(
  ({ theme }) => css`
    border: none;
    background-color: transparent;
    display: inherit;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: 2.5rem;
      color: ${selectColors(theme).titleColor};
    }
  `
);
