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
    font-size: 1.5rem;
    display: flex;
    gap: 0.3rem;
    align-items: center;
    justify-content: center;
  `
);
