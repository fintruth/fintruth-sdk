import { darken, rem } from 'polished'
import React from 'react'
import styled from 'styled-components'

interface Asset {
  Icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGAttributes<SVGSVGElement>> &
      React.RefAttributes<SVGSVGElement>
  >
  label: string
  src?: string
}

interface Props {
  assets: Asset[]
  type: string
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${rem(15)};
`

const Container = styled.div`
  align-items: center;
  background-color: ${({ theme }) => darken(0.08, theme.white)};
  border-radius: ${rem(2)};
  display: flex;
  flex-direction: column;
  margin: ${rem(5)};
  padding: ${rem(10)};
  width: ${rem(200)};
`

const Icon = styled.svg`
  fill: ${({ theme }) => theme.grayDarker};
  height: ${rem(48)};
`

const Image = styled.img`
  height: ${rem(48)};
`

const Label = styled.div`
  font-size: ${rem(12)};
  font-weight: 500;
  margin-top: ${rem(15)};
  opacity: 0.6;
`

const Assets: React.FunctionComponent<Props> = ({
  assets,
  type,
  ...props
}: Props) => (
  <Root {...props}>
    {assets.map(({ Icon: BaseIcon, label, src }: Asset) => {
      let asset

      if (type === 'icon' && BaseIcon) {
        asset = <Icon as={BaseIcon} />
      } else if (type === 'image' && src) {
        asset = <Image alt={label} src={src} />
      }

      return (
        <Container key={label}>
          {asset}
          <Label>{label}</Label>
        </Container>
      )
    })}
  </Root>
)

export default Assets
