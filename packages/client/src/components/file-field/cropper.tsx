import { useField, useFormikContext } from 'formik'
import useStyles from 'isomorphic-style-loader/useStyles'
import { rem } from 'polished'
import React from 'react'
import ReactCrop, { Crop, PercentCrop, ReactCropProps } from 'react-image-crop'
import styles from 'react-image-crop/dist/ReactCrop.css'
import styled from 'styled-components'

import { unselectable } from 'styles/mixins'
import { setRef } from 'utils/react'
import { useFileFieldContext } from '.'

type ReactCropEventHandler = (crop: Crop, percentCrop: PercentCrop) => void

type RefHandler<T> = (instance: T | null) => void

interface Props
  extends Omit<
    ReactCropProps,
    | 'crop'
    | 'crossorigin'
    | 'disabled'
    | 'imageAlt'
    | 'imageStyle'
    | 'locked'
    | 'onChange'
    | 'onImageError'
    | 'onImageLoaded'
    | 'src'
  > {
  alt: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  initialCrop?: Crop
  isLocked?: boolean
  onChange?: ReactCropEventHandler
  onError?: React.ReactEventHandler<HTMLImageElement>
  onLoad?: RefHandler<HTMLImageElement>
}

const defaultInitialCrop: Crop = { height: 0, unit: 'px', width: 0, x: 0, y: 0 }

const Root = styled(ReactCrop)`
  &:not(:first-child) {
    margin-top: ${rem(12)};
  }

  & .ReactCrop__image {
    ${unselectable}
    max-height: 100%;
  }
`

const Cropper = React.forwardRef<HTMLImageElement, Props>(function Cropper(
  { alt, initialCrop = defaultInitialCrop, isLocked, onLoad, ...props }: Props,
  ref?: React.Ref<HTMLImageElement>
) {
  const [{ isDisabled, name, src }, dispatch] = useFileFieldContext()
  const [crop, setCrop] = React.useState<Crop>(initialCrop)
  const { setFieldValue } = useFormikContext<any>()
  const { value } = useField<File | string>(name)[0]
  const image = React.useRef<HTMLImageElement>()

  React.useEffect(
    () => dispatch({ payload: { hasCropper: true }, type: 'setHasCropper' }),
    [dispatch]
  )

  React.useEffect(() => {
    if (!value) {
      dispatch({ payload: { src: '' }, type: 'setSrc' })

      return setCrop(initialCrop)
    }
  }, [dispatch, initialCrop, value])

  useStyles(styles)

  return src ? (
    <Root
      data-file-field-cropper=""
      crop={crop}
      disabled={isDisabled}
      imageAlt={alt}
      locked={isLocked}
      onChange={(crop) => setCrop(crop)}
      onComplete={async ({ height, width, x = 0, y = 0 }) => {
        if (!image.current || !width || !height) {
          return
        }

        const { name: fileName = 'image.jpg', type = 'image/jpeg' } =
          value instanceof File ? value : {}
        const canvas = document.createElement('canvas')
        const scaleX = image.current.naturalWidth / image.current.width
        const scaleY = image.current.naturalHeight / image.current.height

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')

        if (context) {
          context.drawImage(
            image.current,
            x * scaleX,
            y * scaleY,
            width * scaleX,
            height * scaleY,
            0,
            0,
            width,
            height
          )
        }

        const file = await new Promise((resolve) =>
          canvas.toBlob(
            (blob) => resolve(new File([blob || ''], fileName, { type })),
            type,
            1
          )
        )

        return setFieldValue(name, file)
      }}
      onImageLoaded={(instance) => {
        if (ref) {
          setRef(ref, instance)
        }

        setRef(image, instance)

        return onLoad && onLoad(instance)
      }}
      src={src}
      {...props}
    />
  ) : null
})

export default Cropper
