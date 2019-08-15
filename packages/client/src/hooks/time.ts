import React from 'react'

export const useTimer = (canStart: boolean, delay = 200) => {
  const [isExpired, setIsExpired] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (canStart) {
      const timeout = setTimeout(() => setIsExpired(true), delay)

      return () => clearTimeout(timeout)
    }

    return setIsExpired(false)
  }, [canStart, delay])

  return isExpired
}
