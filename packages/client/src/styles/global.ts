import { createGlobalStyle } from 'styled-components'
import { em, rem } from 'polished'

const GlobalStyle = createGlobalStyle`
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

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.html.backgroundColor};
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.html.fontSize};
    min-width: 300px;
    overflow-x: ${({ theme }) => theme.html.overflowX};
    overflow-y: ${({ theme }) => theme.html.overflowY};
    text-rendering: ${({ theme }) => theme.html.textRendering};
    text-size-adjust: 100%;
  }

  body {
    color: ${({ theme }) => theme.body.color};
    font-family: ${({ theme }) => theme.body.fontFamily};
    font-size: ${rem(16)};
    font-weight: ${({ theme }) => theme.body.fontWeight};
    line-height: ${({ theme }) => theme.body.lineHeight};
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    cursor: pointer;
    text-decoration: none;

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
    font-family: ${({ theme }) => theme.body.fontFamily};
    margin: 0;
  }

  code,
  pre {
    -moz-osx-font-smoothing: auto;
    -webkit-font-smoothing: auto;
    font-family: ${({ theme }) => theme.code.fontFamily};
  }

  code {
    background-color: ${({ theme }) => theme.code.backgroundColor};
    color: ${({ theme }) => theme.code.color};
    font-size: ${({ theme }) => theme.code.fontSize};
    font-weight: ${({ theme }) => theme.code.fontWeight};
    padding: ${({ theme }) => theme.code.padding};

    pre & {
      background-color: transparent;
      color: currentColor;
      font-size: ${em(16)};
      padding: 0;
    }
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
    background-color: ${({ theme }) => theme.hr.backgroundColor};
    border: none;
    display: block;
    height: ${({ theme }) => theme.hr.height};
    margin: ${({ theme }) => theme.hr.margin};
  }

  iframe {
    border: 0;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: baseline;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.pre.backgroundColor};
    color: ${({ theme }) => theme.pre.color};
    font-size: ${em(14)};
    overflow-x: auto;
    padding: ${rem(20)} ${rem(24)};
    white-space: pre;
    word-wrap: normal;
  }

  small {
    font-size: ${em(14)};
  }

  span {
    font-style: inherit;
    font-weight: inherit;
  }

  strong {
    color: ${({ theme }) => theme.strong.color};
    font-weight: ${({ theme }) => theme.strong.fontWeight};

    a & {
      color: currentColor;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td {
    padding: 0;
    text-align: left;

    table & {
      vertical-align: top;
    }
  }

  th {
    padding: 0;
    text-align: left;

    table & {
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
`

export default GlobalStyle
