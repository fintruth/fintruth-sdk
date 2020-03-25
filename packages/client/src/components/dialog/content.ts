import { DialogContent, DialogContentProps } from '@reach/dialog'
import styled, { css } from 'styled-components'

import { medium } from 'styles/mixins'

type Props = DialogContentProps

const Content = styled(DialogContent).attrs((attrs) => ({
  'data-dialog-content': '',
  ...attrs,
}))<Props>`
  overflow: auto;
  position: relative;

  &[data-dialog-content] {
    background-color: ${({ theme }) => theme.backgroundColor};
    margin: 0 20px;
    max-height: calc(100vh - 160px);
    outline: none;
    padding: initial;
    width: calc(100% - 40px);

    ${medium(css`
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 640px;
    `)}
  }
`

export default Content
