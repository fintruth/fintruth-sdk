import {
  DecoratorParameters, // eslint-disable-line import/named
  RenderFunction, // eslint-disable-line import/named
  Renderable, // eslint-disable-line import/named
} from '@storybook/react'

declare module '@storybook/react' {
  interface Context {
    kind: string
    parameters: DecoratorParameters
    story: string
  }

  interface Story {
    add(
      storyName: string,
      callback: (context: Context) => Renderable | Renderable[] | null,
      parameters?: DecoratorParameters
    ): this
    addCentered(storyName: string, callback: RenderFunction): this
  }
}
