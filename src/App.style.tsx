import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ITheme } from "./common";
import { selectColors } from "./utils";

export const PdfContainer = styled.div<ITheme>(
  ({ theme }) => css`
    background-color: ${selectColors(theme).bgColor};
    color: ${selectColors(theme).textColor};
    height: 100dvh;
    width: 100dvw;
    display: flex;
    flex-direction: column;
    gap: 50px;
  `
);
