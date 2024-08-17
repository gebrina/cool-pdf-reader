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
    border-top: 1rem solid ${selectColors(theme).titleColor};
    border-bottom: 1rem solid ${selectColors(theme).titleColor};
    border-radius: 2rem;
    margin: 0 auto;
  `
);

export const Title = styled.h1<TStyleProps>(
  ({ theme }) => css`
    color: ${selectColors(theme).titleColor};
    text-align: center;
  `
);
