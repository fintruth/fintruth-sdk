import React from 'react'

export const setRef = <T>(
  ref: React.Ref<T> | React.MutableRefObject<T | undefined>,
  instance: T | null
) => {
  if (typeof ref === 'function') {
    ref(instance)
  } else if (ref !== null && instance !== null) {
    // @ts-ignore readonly-property
    ref.current = instance // eslint-disable-line no-param-reassign
  }
}
