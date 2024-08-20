import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";
import { selectColors } from "../../utils";

export const SelectWrapper = styled.div<ITheme>(
  ({ theme }) => css`
    position: absolute;
    top: 1vh;
    right: 0;
    text-align: left;
    min-width: 150px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 0;
  `
);

export const Option = styled.div<ITheme>(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    border-top: 1px solid ${selectColors(theme).titleColor};
    justify-content: flex-start;
    background-color: ${selectColors(theme).bgColor};
    gap: 5px;
    padding: 5px 4px;
    height: 100%;
    &:first-of-type {
      margin-top: 2px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      color: ${selectColors(theme).bgColor};
      background-color: ${selectColors(theme).textColor};
    }
  `
);

export const SelectLabel = styled.label<ITheme>(
  ({ theme }) => css`
    padding: 7px;
    padding-top: 10px;
    font-size: 1.2rem;
  `
);
