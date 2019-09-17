import { StoryFn } from '@storybook/addons'
import React from 'react'
import styled, { css } from 'styled-components'

const shared = css`
  bottom: 0;
  display: flex;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
`

const Root = styled.div`
  ${shared};
  align-items: center;
  justify-content: center;
`

const RootHorizontal = styled.div`
  ${shared};
  justify-content: center;
`

const RootVertical = styled.div`
  ${shared};
  align-items: center;
`

export const centered = (storyFn: StoryFn<React.ReactNode>) => (
  <Root>{storyFn()}</Root>
)

export const centeredHorizontally = (storyFn: StoryFn<React.ReactNode>) => (
  <RootHorizontal>{storyFn()}</RootHorizontal>
)

export const centeredVertically = (storyFn: StoryFn<React.ReactNode>) => (
  <RootVertical>{storyFn()}</RootVertical>
)
