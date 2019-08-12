import { rem } from 'polished'
import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  delay?: number
}

const Root = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
`

const ease = keyframes`
	50% {
		opacity: 1;
		transform: scale(1);
	}

  100% {
		opacity: 0;
	}
`

const Icon = styled.div`
  animation: ${ease} 900ms ease infinite;
  background-color: ${({ theme }) => theme.grayDarker};
  border-radius: ${rem(20)};
  display: inline-block;
  height: ${rem(20)};
  transform: scale(0);
  width: ${rem(20)};

  & + & {
    margin-left: ${rem(8)};
  }

  &:nth-child(2) {
    animation-delay: 300ms;
  }

  &:nth-child(3) {
    animation-delay: 600ms;
  }
`

const Loading: React.FunctionComponent<Props> = ({
  delay = 200,
  ...props
}: Props) => {
  const [isVisible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)

    return () => clearTimeout(timeout)
  })

  return isVisible ? (
    <Root {...props}>
      <Icon />
      <Icon />
      <Icon />
    </Root>
  ) : null
}

export default Loading
