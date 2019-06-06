declare module '@testing-library/user-event' {
  export interface UserOpts {
    allAtOnce?: boolean
    delay?: number
  }

  const userEvent: {
    click: (element: Element | Window) => void
    dblClick: (element: Element | Window) => void
    type: (
      element: Element | Window,
      text: string,
      userOpts?: UserOpts
    ) => Promise<void>
  }

  export default userEvent
}
