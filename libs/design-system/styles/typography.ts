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
  body2: css`
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.84px;
  `,
  headText: css`
    font-size: 22px;
    line-height: 28px;
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
  body2Regular: css`
    font-weight: ${weight.regular};
    ${font.body2}
  `,
  body2Medium: css`
    font-weight: ${weight.medium};
    ${font.body2}
  `,
  headTextBold: css`
    font-weight: ${weight.bold};
    ${font.headText}
  `,
};
