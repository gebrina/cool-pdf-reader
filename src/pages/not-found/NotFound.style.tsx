import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";
import { selectColors } from "../../utils";

type TPageNotFoundProps = {
  theme: ThemeName;
};

export const PageNotFound = styled.section<TPageNotFoundProps>(
  ({ theme }) => css`
    transform: scaleX(-1);
    color: ${selectColors(theme).titleColor};
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-direction: column;
    svg {
      font-size: 7rem;
      color: #d9a4d0;
    }
    button {
      font-size: 1.5rem;
      border: none;
      background-color: transparent;
      cursor: pointer;
      -webkit-text-stroke-width: 2px;
      padding: 0.5rem 1rem;
      color: ${selectColors(theme).titleColor};
      box-shadow: 3px 3px 0.3px 3px rgba(255, 0, 0, 0.5),
        -1px -1px 0.3px 3px rgba(148, 224, 247, 0.5);
      border-radius: 0.5rem;
      &:hover {
        background-color: ${selectColors(theme).bgColor};
        color: ${selectColors(theme).textColor};
        transition: all 0.5s ease-in-out;
        box-shadow: -1px -1px 0.3px 3px rgba(148, 224, 247, 0.5),
          3px 3px 0.3px 3px rgba(255, 0, 0, 0.5);
        border-radius: 0.5rem;
      }
    }
  `
);

export const Button = styled.button``;
