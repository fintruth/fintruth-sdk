import { Tab as BaseTab, TabProps } from '@reach/tabs'
import { em } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Props extends Omit<TabProps, 'disabled'> {
  isDisabled?: boolean
}

const Root = styled(BaseTab)`
  align-items: center;
  justify-content: center;
  vertical-align: top;

  &[data-tabs-tab] {
    appearance: none;
    background: none;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;
    display: flex;
    font: inherit;
    margin: 0 0 -1px 0;
    padding: ${em(8)} ${em(16)};
  }

  &:hover {
    border-bottom-color: ${({ theme }) => theme.textStrongColor};
    color: ${({ theme }) => theme.textStrongColor};
  }

  &[data-tabs-tab]:active {
    background: unset;
  }

  &[data-tabs-tab][data-selected] {
    border-bottom-color: ${({ theme }) => theme.linkColor};
    color: ${({ theme }) => theme.linkColor};
  }

  &[data-tabs-tab]:disabled {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textColor};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const Tab = React.forwardRef<HTMLButtonElement, Props>(function Tab(
  { isDisabled, ...props }: Props,
  ref?: React.Ref<HTMLButtonElement>
) {
  return <Root data-tabs-tab="" disabled={isDisabled} ref={ref} {...props} />
})

export default Tab
