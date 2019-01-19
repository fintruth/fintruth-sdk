import React from 'react'
import styled, { keyframes } from 'styled-components'
import { rem } from 'polished'
import { raven } from 'styles/variables'

interface Props {
  delay?: number
}

interface State {
  isVisible: boolean
}

const Root = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
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
  background-color: ${raven};
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

export default class Loading extends React.Component<Props, State> {
  static readonly defaultProps = {
    delay: 200,
  }

  readonly state = {
    isVisible: false,
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { isVisible } = this.state

    return (
      isVisible && (
        <Root>
          <Icon />
          <Icon />
          <Icon />
        </Root>
      )
    )
  }

  private toggleVisibility = () => {
    const { isVisible } = this.state

    return this.setState({ isVisible: !isVisible })
  }

  private readonly timeout = setTimeout(this.toggleVisibility, this.props.delay)
}
