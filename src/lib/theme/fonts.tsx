import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
      font-family: 'Satoshi-Variable';
      src: url('../fonts/Satoshi-Variable.woff2') format('woff2'),
          url('../fonts/Satoshi-Variable.woff') format('woff'),
          url('../fonts/Satoshi-Variable.ttf') format('truetype');
          font-weight: 300 900;
          font-display: swap;
          font-style: normal;
      }

      @font-face {
      font-family: 'Satoshi-VariableItalic';
      src: url('../fonts/Satoshi-VariableItalic.woff2') format('woff2'),
          url('../fonts/Satoshi-VariableItalic.woff') format('woff'),
          url('../fonts/Satoshi-VariableItalic.ttf') format('truetype');
          font-weight: 300 900;
          font-display: swap;
          font-style: italic;
      }
      @font-face {
      font-family: 'Switzer-Variable';
      src: url('../fonts/Switzer-Variable.woff2') format('woff2'),
          url('../fonts/Switzer-Variable.woff') format('woff'),
          url('../fonts/Switzer-Variable.ttf') format('truetype');
          font-weight: 300 900;
          font-display: swap;
          font-style: normal;
      }

      @font-face {
      font-family: 'Switzer-VariableItalic';
      src: url('../fonts/Switzer-VariableItalic.woff2') format('woff2'),
          url('../fonts/Switzer-VariableItalic.woff') format('woff'),
          url('../fonts/Switzer-VariableItalic.ttf') format('truetype');
          font-weight: 300 900;
          font-display: swap;
          font-style: italic;
      }
      `}
  />
);

export default Fonts;
