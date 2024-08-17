import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeName } from "../../common";
import { selectColors } from "../../utils";

type TStyleProps = {
  theme: ThemeName;
};

export const SettingsWrapper = styled.div<TStyleProps>(
  ({ theme }) => css`
    transform: scaleX(-1);
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    height: 100%;
    max-width: 600px;
    width: 100%;
    padding: 1rem;
    border-top: 1rem solid ${selectColors(theme).textColor};
    border-bottom: 1rem solid ${selectColors(theme).titleColor};
    border-radius: 2rem;
    margin: 0 auto;
  `
);

type TTitleProps = TStyleProps & { size: number };
export const Title = styled.h1<TTitleProps>(
  ({ theme, size }) => css`
    margin-bottom: 1rem;
    font-size: ${size}rem;
    opacity: ${size / 1.3};
    color: ${selectColors(theme).titleColor};
  `
);

export const ThemeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-start;
`;

export const ThemeButton = styled.button<TStyleProps>(
  ({ theme }) => css`
    width: 7rem;
    border: none;
    border-top: 1px solid ${selectColors(theme).titleColor};
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    padding-left: 2rem;
    cursor: pointer;
    position: relative;
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    font-size: 1rem;
    :hover {
      opacity: 0.5;
    }
    svg {
      position: absolute;
      left: 0.3rem;
    }
  `
);
