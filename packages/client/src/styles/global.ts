import { em, rem } from 'polished'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.white};
    box-sizing: border-box;
    font-size: 16px;
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
  }

  body {
    color: ${({ theme }) => theme.textColor};
    font-family: ${({ theme }) => theme.fontFamilyPrimary};
    font-size: ${rem(16)};
    font-weight: 400;
    line-height: 1.5;
  }

  strong {
    color: ${({ theme }) => theme.textStrongColor};
    font-weight: 700;
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    cursor: pointer;
    text-decoration: none;

    strong {
      color: currentColor;
    }

    &:hover {
      color: ${({ theme }) => theme.linkHoverColor};
    }
  }

  article,
  aside,
  figure,
  footer,
  header,
  hgroup,
  section {
    display: block;
  }

  audio {
    max-width: 100%;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  blockquote,
  body,
  dd,
  dl,
  dt,
  fieldset,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  html,
  iframe,
  legend,
  li,
  ol,
  p,
  pre,
  textarea,
  ul {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  select,
  textarea {
    font-family: ${({ theme }) => theme.fontFamilyPrimary};
    margin: 0;
  }

  code,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: ${({ theme }) => theme.fontFamilyCode};
  }

  code {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.red};
    font-size: ${em(14)};
    font-weight: 400;
    padding: ${em(4)} ${em(8)};
  }

  embed,
  iframe,
  img,
  object,
  video {
    height: auto;
    max-width: 100%;
  }

  fieldset {
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }

  hr {
    background-color: ${({ theme }) => theme.backgroundColor};
    border: none;
    display: block;
    height: 2px;
    margin: ${rem(24)} 0;
  }

  iframe {
    border: 0;
  }

  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: baseline;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    font-size: ${em(14)};
    overflow-x: auto;
    padding: ${rem(20)} ${rem(24)};
    white-space: pre;
    word-wrap: normal;

    code {
      background-color: transparent;
      color: currentColor;
      font-size: ${em(16)};
      padding: 0;
    }
  }

  small {
    font-size: ${em(14)};
  }

  span {
    font-style: inherit;
    font-weight: inherit;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;

    td {
      vertical-align: top;
    }

    th {
      color: ${({ theme }) => theme.textStrongColor};
      vertical-align: top;
    }
  }

  textarea {
    resize: vertical;
  }

  ul {
    list-style: none;
  }

  ::selection {
    background-color: ${({ theme }) => theme.textSelectionColor};
    text-shadow: none;
  }

  @media print {
    *,
    *::before,
    *::after {
      background-color: transparent !important;
      box-shadow: none !important;
      color: #000 !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]::after {
      content: ' (' attr(href) ')';
    }

    a[href^='#']::after,
    a[href^='javascript:']::after {
      content: '';
    }

    abbr[title]::after {
      content: ' (' attr(title) ')';
    }

    blockquote,
    pre {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    h2,
    h3,
    p {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    img,
    tr {
      page-break-inside: avoid;
    }

    pre {
      white-space: pre-wrap !important;
    }

    thead {
      display: table-header-group;
    }
  }
`

export default GlobalStyle
