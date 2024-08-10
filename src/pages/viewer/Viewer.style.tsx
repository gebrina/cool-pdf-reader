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
    height: 100%;
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
    & > * {
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

export const PagingWrapper = styled.div<TStyleProps>(
  ({ theme }) => css`
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transform: translateX(-50%);
    color: ${selectColors(theme).textColor};
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
