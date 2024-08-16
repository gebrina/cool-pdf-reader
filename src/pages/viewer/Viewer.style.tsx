import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Outline } from "react-pdf";
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
    gap: 0.2rem;
    transform: translateX(-50%);
    color: ${selectColors(theme).textColor};
    background-color: ${selectColors(theme).bgColor};
    input {
      color: inherit;
      background-color: ${selectColors(theme).titleColor};
    }
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
    display: grid;
    grid-template-columns: 50px 1fr auto;
    gap: 0.5rem;
    background-color: ${selectColors(theme).bgColor};
    border-bottom: 2px solid ${selectColors(theme).titleColor};
    svg {
      font-size: 1.3rem;
      cursor: pointer;
      transition: all 0.3s linear;
      &:hover {
        opacity: 0.7;
        transform: translateY(-0.1rem);
      }
    }

    .zoom-btns-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .switch-outline {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.5rem;
      }
    }
  `
);

export const PdfOutline = styled(Outline)<
  TStyleProps & { exitAnimate: boolean }
>(
  ({ exitAnimate, theme }) => css`
    position: fixed;
    background-color: ${selectColors(theme).bgColor};
    height: 100dvh;
    overflow-y: auto;
    padding: 1rem;
    left: 0;
    top: 50px;
    text-align: left;
    z-index: 100;
    width: 50%;
    transition: all 0.5s ease;
    animation: ${exitAnimate ? "animate-hide-outline" : "animate-show-outline"}
      0.3s linear;

    @keyframes animate-show-outline {
      from {
        width: 0%;
        opacity: 0.5;
      }
      to {
        width: 50%;
        opacity: 1;
      }
    }

    @keyframes animate-hide-outline {
      from {
        width: 50%;
        opacity: 1;
      }
      to {
        width: 0%;
        opacity: 0;
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
      background-color: ${selectColors(theme).titleColor};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${selectColors(theme).textColor};
    }

    ul li {
      text-wrap: nowrap;
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.6rem;
      a {
        color: ${selectColors(theme).textColor};
        &:hover {
          opacity: 0.5;
        }
      }
      ul {
        padding-left: 1rem;
        :not(:has(.active)) {
          opacity: 0.8;
        }
      }
    }
    .active {
      text-decoration: underline;
      text-decoration-color: ${selectColors(theme).titleColor};
      text-decoration-thickness: 0.2rem;
      opacity: 1 !important;
      &::before {
        content: ">";
        padding-right: 0.2rem;
      }
    }
  `
);

export const InputPageNumber = styled.input`
  outline: none;
  border: none;
  width: 2rem;
  text-align: center;
  border-radius: 0.1rem;
  font-size: 1rem;
  padding: 0.1rem 0;
`;
