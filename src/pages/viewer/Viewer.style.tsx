import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";
import { selectColors } from "../../utils";

type TStyleProps = {
  theme: ThemeName;
};

export const PdfViewer = styled.div<TStyleProps>(
  ({ theme }) => css`
    margin: 50px 0px;
    display: grid;
    justify-items: center;
    min-height: 100dvh;
    width: 100%;
    & > * {
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }

    &::after {
      content: "";
      position: fixed;
      pointer-events: none;
      mix-blend-mode: multiply;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${selectColors(theme).bgColor};
      z-index: 1;
    }

    & canvas {
      overflow: auto !important;
      height: 100%;
    }

    & .textLayer {
      display: none;
      /* zoom: 2; */
      /* background-color: ${selectColors(theme).bgColor}; */
      * {
        color: ${selectColors(theme).textColor} !important;
      }
    }
  `
);

export const PagingWrapper = styled.div<TStyleProps>(
  ({ theme }) => css`
    position: fixed;
    bottom: 0;
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

type TButtonProps = TStyleProps & { zoom?: boolean };

export const Button = styled.button<TButtonProps>(
  ({ theme, zoom }) => css`
    border: none;
    background-color: transparent;
    display: inherit;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: ${zoom ? "" : "2.5rem"};
      color: ${zoom ? "" : `${selectColors(theme).titleColor}`};
    }
  `
);

export const PdfViewerToolBar = styled.div<TStyleProps>(
  ({ theme }) => css`
    height: 50px;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${selectColors(theme).bgColor};
    border-bottom: 2px solid ${selectColors(theme).titleColor};
    svg {
      font-size: 1.3rem;
    }
    & > * {
      cursor: pointer;
      :hover {
        opacity: 0.7;
      }
    }
  `
);
