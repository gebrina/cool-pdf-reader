import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";

export const PdfUploader = styled.section<ITheme>(
  ({ theme }) => css`
    display: flex;
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
  font-size: 2.5rem;
  text-align: center;
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
    box-shadow: 0.3px 0.3px 0.3px 0.5px rgba(118, 130, 118, 0.1),
      0px -1px 0.5px 0.5px rgba(173, 194, 173, 0.1);
    &:hover {
      cursor: pointer;
      background-color: #a4b0ae;
      transition: all 0.5s ease;
    }
  `
);
