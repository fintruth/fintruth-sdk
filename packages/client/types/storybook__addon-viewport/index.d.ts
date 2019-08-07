declare module '@storybook/addon-viewport' {
  export type Viewport = ViewportName | ViewportDecoratorOptions

  export type ViewportName = string

  export interface ViewportProperties {
    name: ViewportName
    styles: {
      height?: string
      width?: string
      [styleName: string]: any
    }
    type?: 'desktop' | 'tablet' | 'mobile' | string
  }

  export interface ViewportDecoratorOptions {
    name?: ViewportName
    onViewportChange: (change: { viewport: ViewportProperties }) => void
  }

  export interface ViewportDefinitions {
    [viewportKey: string]: ViewportProperties
  }

  export interface ViewportConfiguration {
    defaultViewport?: ViewportName
    viewports?: ViewportDefinitions
  }

  export const INITIAL_VIEWPORTS: ViewportDefinitions

  export function configureViewport(configuration: ViewportConfiguration): void

  export function withViewport(viewport?: Viewport): any
}
