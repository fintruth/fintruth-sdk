import React from 'react'
import styled, { css } from 'styled-components'

import { renderWithContext } from 'utils/spec'
import {
  container,
  extraLarge,
  large,
  largeOnly,
  medium,
  mediumOnly,
  small,
  smallOnly,
  untilExtraLarge,
  untilLarge,
  untilMedium,
  untilSmall,
} from './mixins'

const styles = css`
  display: block;
`

describe('untilSmall', () => {
  test("should return the provided styles nested in an 'untilSmall' media query", () => {
    const Div = styled.div`
      ${untilSmall(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (max-width:768px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('small', () => {
  test("should return the provided styles nested in a 'small' media query", () => {
    const Div = styled.div`
      ${small(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:769px),print {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('smallOnly', () => {
  test("should return the provided styles nested in a 'smallOnly' media query", () => {
    const Div = styled.div`
      ${smallOnly(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:769px) and (max-width:1023px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('untilMedium', () => {
  test("should return the provided styles nested in an 'untilMedium' media query", () => {
    const Div = styled.div`
      ${untilMedium(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (max-width:1023px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('medium', () => {
  test("should return the provided styles nested in a 'medium' media query", () => {
    const Div = styled.div`
      ${medium(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:1024px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('mediumOnly', () => {
  test("should return the provided styles nested in a 'mediumOnly' media query", () => {
    const Div = styled.div`
      ${mediumOnly(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:1024px) and (max-width:1215px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('untilLarge', () => {
  test("should return the provided styles nested in an 'untilLarge' media query", () => {
    const Div = styled.div`
      ${untilLarge(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (max-width:1215px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('large', () => {
  test("should return the provided styles nested in a 'large' media query", () => {
    const Div = styled.div`
      ${large(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:1216px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('largeOnly', () => {
  test("should return the provided styles nested in a 'largeOnly' media query", () => {
    const Div = styled.div`
      ${largeOnly(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:1216px) and (max-width:1407px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('untilExtraLarge', () => {
  test("should return the provided styles nested in an 'untilExtraLarge' media query", () => {
    const Div = styled.div`
      ${untilExtraLarge(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (max-width:1407px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('extraLarge', () => {
  test("should return the provided styles nested in a 'extraLarge' media query", () => {
    const Div = styled.div`
      ${extraLarge(styles)}
    `
    const { container } = renderWithContext(<Div />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      @media screen and (min-width:1408px) {
        .c0 {
          display: block;
        }
      }

      <div
        class="c0"
      />
    `)
  })
})

describe('container', () => {
  test('should return centered container styles', () => {
    const Div = styled.div`
      ${container()}
    `
    const result = renderWithContext(<Div />)

    expect(result.container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        margin: 0 auto;
        position: relative;
        width: auto;
      }

      @media screen and (min-width:1024px) {
        .c0 {
          max-width: 960px;
        }
      }

      @media screen and (max-width:1215px) {
        .c0 {
          max-width: 1152px;
        }
      }

      @media screen and (max-width:1407px) {
        .c0 {
          max-width: 1344px;
        }
      }

      @media screen and (min-width:1216px) {
        .c0 {
          max-width: 1152px;
        }
      }

      @media screen and (min-width:1408px) {
        .c0 {
          max-width: 1344px;
        }
      }

      <div
        class="c0"
      />
    `)
  })

  test('should return fluid container styles', () => {
    const Div = styled.div`
      ${container(true)}
    `
    const result = renderWithContext(<Div />)

    expect(result.container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        margin: 0 auto;
        position: relative;
        width: 100%;
        padding-left: 32px;
        padding-right: 32px;
      }

      <div
        class="c0"
      />
    `)
  })
})
