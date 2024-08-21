import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "../../common";
import { selectColors } from "../../utils";

export const SelectWrapper = styled.div<ITheme>(
  ({ theme }) => css`
    position: absolute;
    right: 0;
    top: -1vh;
    text-align: left;
    min-width: 150px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0;
    font-weight: 500;
    > div {
      opacity: 1;
      transition: all 0.5s ease-in;
      transform: rotate(180deg) translateX(-100%);
    }
    &:hover {
      > div {
        opacity: 1;
        transform: rotate(0) translateX(0);
      }
    }
  `
);

export const Option = styled.div<ITheme & { selected: boolean }>(
  ({ theme, selected }) => css`
    display: flex;
    align-items: center;
    border-top: 1px solid ${selectColors(theme).titleColor};
    justify-content: flex-start;
    background-color: ${selected
      ? selectColors(theme).textColor
      : selectColors(theme).bgColor};
    color: ${selected
      ? selectColors(theme).bgColor
      : selectColors(theme).textColor};
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
    &:hover,
    &.active {
      color: ${selectColors(theme).bgColor};
      background-color: ${selectColors(theme).textColor};
    }
  `
);

export const SelectLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 7px;
  padding-top: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
