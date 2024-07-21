import { css } from 'styled-components';
const weight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const font = {
  smallCaption: css`
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.4px;
  `,
  noticeText: css`
    font-size: 20px;
    line-height: normal;
    letter-spacing: -1.2px;
  `,
  body1: css`
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.96px;
  `,
};

export const typography = {
  smallCaptionNormal: css`
    font-weight: ${weight.regular};
    ${font.smallCaption}
  `,
  noticeTextBold: css`
    font-weight: ${weight.bold};
    ${font.noticeText}
  `,
  body1Regular: css`
    font-weight: ${weight.regular};
    ${font.body1}
  `,
};
