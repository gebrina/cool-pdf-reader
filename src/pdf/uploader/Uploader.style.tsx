import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";

export const PdfUploader = styled.section<ITheme>(
  ({ theme }) => css`
    display: flex;
    padding-top: 2rem;
    width: 100%;
    max-width: 600px;
    flex-direction: column;
    margin: 0 auto;
    gap: 1rem;
  `
);

export const Title = styled.h3`
  font-size: 2.5rem;
  text-wrap: nowrap;
  text-align: center;
  @media only screen and (max-width: 400px) {
    font-size: 2rem;
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const InputLable = styled.label<ITheme>(
  ({ theme }) => css`
    height: 5rem;
    display: grid;
    place-content: center;
    background-color: ${theme === "default"
      ? "#b7b6ba"
      : theme === "dark"
      ? "black"
      : "white"};
    margin: 0 2rem;
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
