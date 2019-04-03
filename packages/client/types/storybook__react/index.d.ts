import {
  DecoratorParameters, // eslint-disable-line import/named
  RenderFunction, // eslint-disable-line import/named
  Renderable, // eslint-disable-line import/named
} from '@storybook/react'

declare module '@storybook/react' {
  export interface Context {
    kind: string
    parameters: DecoratorParameters
    story: string
  }

  export interface Story {
    add(
      storyName: string,
      callback: (context: Context) => Renderable | Renderable[] | null,
      parameters?: DecoratorParameters
    ): this
    addCentered(storyName: string, callback: RenderFunction): this
  }
}
