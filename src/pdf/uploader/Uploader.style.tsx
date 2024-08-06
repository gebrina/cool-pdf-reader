import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";
import { selectColors } from "../../utils";

export const PdfUploader = styled.section<ITheme>(
  ({ theme }) => css`
    transform: scaleX(-1);
    color: ${selectColors(theme).textColor};
    mix-blend-mode: screen;
    padding: 0 3em;
    display: flex;
    flex-direction: column;
    /* background-color: aliceblue; */
    align-items: flex-start;
    gap: 1rem;
  `
);

export const Title = styled.h3<ITheme>(
  ({ theme }) => css`
    font-size: 3.5rem;
    color: ${selectColors(theme).titleColor};
    -webkit-text-stroke: 1px rgb(0, 255, 255);
    span {
      padding: 0 0.3em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      text-align: center;
      text-shadow: 3px 3px rgb(0, 255, 255), -4px -4px red;
    }
  `
);

export const InputFile = styled.input`
  display: none;
`;

export const InputLabel = styled.label<ITheme>(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    max-width: max-content;
    padding: 10px 20px;
    gap: 10px;
    background-color: ${theme === "default"
      ? "lightblue"
      : theme === "dark"
      ? "black"
      : "white"};
    border-radius: 1rem;
    font-size: 1.3rem;
    box-shadow: 3px 3px 30px 2px rgb(0, 255, 255),
      -3px -3px 100px 2px rgb(255, 0, 0);
    &:hover {
      cursor: pointer;
      background-color: #a4b0ae;
      transition: all 0.5s ease;
    }
  `
);
