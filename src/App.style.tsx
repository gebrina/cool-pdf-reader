import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "./common";
import { selectColors } from "./utils";

export const PdfContainer = styled.div<ITheme>(
  ({ theme }) => css`
    background-size: cover;
    background-position: 0px -50px;
    background-repeat: no-repeat;
    background-blend-mode: luminosity;
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    height: 100dvh;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 3em 5em;
  `
);

export const Banner = styled.div``;
