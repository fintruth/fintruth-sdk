import { renderWithRouter } from './specification'

describe('renderWithRouter', () => {
  test('should return an object containing a history object', () => {
    const node = jest.fn()
    const { history } = renderWithRouter(node)

    expect(node).toHaveBeenCalledTimes(1)
    expect(node).toHaveBeenCalledWith({
      location: expect.objectContaining({ pathname: '/' }),
      navigate: expect.any(Function),
    })
    expect(history.location.pathname).toStrictEqual('/')
  })

  test('should return an object containing a modified history object', () => {
    const node = jest.fn()
    const { history } = renderWithRouter(node, { initialPath: '/not-root' })

    expect(node).toHaveBeenCalledTimes(1)
    expect(node).toHaveBeenCalledWith({
      location: expect.objectContaining({ pathname: '/not-root' }),
      navigate: expect.any(Function),
    })
    expect(history.location.pathname).toStrictEqual('/not-root')
  })
})
