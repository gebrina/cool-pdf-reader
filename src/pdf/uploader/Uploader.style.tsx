import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";

export const PdfUploader = styled.section<ITheme>(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    padding-top: 2rem;
    mix-blend-mode: screen;
    flex-direction: column;
    text-align: left;
    justify-content: left;
    align-items: start;
    gap: 1rem;
  `
);

export const Title = styled.h3`
  font-size: 3.5rem;
  /* text-shadow: 10px 1px red; */
  -webkit-text-stroke: 1px rgb(0, 255, 255);
  color: white;
  @media only screen and (max-width: 400px) {
    font-size: 2rem;
  }
`;

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
