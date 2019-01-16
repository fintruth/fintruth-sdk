import React from 'react'
import styled from 'styled-components'
import { darken, rem } from 'polished'
import { raven, white } from 'styles/variables'

interface Asset {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  label: string
  src?: string
}

interface Props {
  assets: Asset[]
  type: 'icon' | 'image'
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${rem(15)};
`

const Container = styled.div`
  align-items: center;
  background-color: ${darken(0.08, white)};
  border-radius: ${rem(2)};
  display: flex;
  flex-direction: column;
  margin: ${rem(5)};
  padding: ${rem(10)};
  width: ${rem(150)};
`

const Icon = styled.svg`
  fill: ${raven};
  height: ${rem(48)};
`

const Image = styled.img`
  height: ${rem(48)};
`

const Label = styled.div`
  font-size: ${rem(12)};
  font-weight: 700;
  margin-top: ${rem(15)};
  opacity: 0.6;
`

const Assets: React.FunctionComponent<Props> = ({ assets, type }: Props) => (
  <Root>
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
