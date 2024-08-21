import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Outline } from "react-pdf";
import { ITheme } from "../../common";
import { selectColors } from "../../utils";

type TPdfViewrProps = ITheme & { canvasWidth: number };
export const PdfViewer = styled.div<TPdfViewrProps>(
  ({ theme, canvasWidth }) => css`
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

    :not(:has(.error-message))::after {
      content: "";
      position: fixed;
      pointer-events: none;
      top: 0;
      left: calc(calc(100% - ${canvasWidth}px) / 2);
      width: ${canvasWidth}px;
      height: 100%;
      background-color: ${theme !== "dark"
        ? selectColors(theme).bgColor
        : "white"};
      mix-blend-mode: ${theme === "dark" ? "difference" : "multiply"};
      z-index: 1;
    }

    & canvas {
      overflow: auto !important;
      height: 100%;
    }

    & .react-pdf__message {
      position: relative;
      z-index: 10;
      color: ${selectColors(theme).titleColor};
      margin-top: 2rem;
      font-size: 2rem;
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

export const PagingWrapper = styled.div<ITheme>(
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
      color: ${selectColors(theme).bgColor};
      background-color: ${selectColors(theme).textColor};
    }
  `
);

type TButtonProps = ITheme & { zoom?: boolean };

export const Button = styled.button<TButtonProps>(
  ({ theme, zoom }) => css`
    border: none;
    background-color: transparent;
    display: inherit;
    align-items: center;
    cursor: pointer;
    svg {
      font-size: ${zoom ? "" : "2rem"};
      color: ${selectColors(theme).textColor};
    }
  `
);

export const PdfViewerToolBar = styled.div<ITheme>(
  ({ theme }) => css`
    height: 50px;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    align-content: center;
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

    //settings icon
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${selectColors(theme).textColor};
    }
  `
);

export const PdfOutline = styled(Outline)<ITheme & { exitAnimate: boolean }>(
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
    max-width: 300px;
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
    @media only screen and (max-width: 450px) {
      max-width: 100%;
    }
  `
);

export const InputPageNumber = styled.input<{ charLength?: number }>(
  ({ charLength }) => css`
    outline: none;
    border: none;
    width: ${charLength && charLength > 3 ? `${charLength / 1.5}rem` : "2rem"};
    text-align: center;
    border-radius: 0.1rem;
    font-size: 1rem;
    padding: 0.1rem 0;
  `
);

export const ErrorMessage = styled.h3`
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  color: #fc0071;
  > :not(span) {
    transform: scaleX(1);
  }
  > span {
    display: flex;
    align-items: center;
    gap: 3px;
    svg {
      font-size: 3rem;
    }
    font-size: 2rem !important;
    margin-bottom: 1rem;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  > div > svg {
    position: absolute;
    top: 0.2rem;
    left: -150px;
  }
`;
