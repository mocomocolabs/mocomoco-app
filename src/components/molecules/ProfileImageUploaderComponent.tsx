import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { compress } from '../../utils/image-compressor'
import { fileToBase64 } from '../../utils/image-util'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import './ImageUploaderComponent.scss'

// eslint-disable-next-line
export type IImageUploaderRef = any

export interface IImageUploader {
  imageUrl?: string
  setImageUrl: (url: string) => void
  refUploader: IImageUploaderRef
  className?: string
}

const defaultUrl = '/assets/img/avatar.png'

export const ProfileImageUploader: FC<IImageUploader> = ({
  imageUrl,
  setImageUrl,
  refUploader,
  className,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async (acceptedFiles: File[]) => {
      compress(acceptedFiles[0]).then((compressed) => fileToBase64(compressed, setImageUrl))
    },
  })

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} ref={refUploader} />
      </div>
      <div
        className={`${className} relative`}
        onClick={() => {
          refUploader.current.click()
        }}
      >
        <ProfileImage className='width-150 height-150 dark' url={imageUrl || defaultUrl} />
        <Icon name='camera' size={50} className='absolute-center icon-primary' />
      </div>
    </section>
  )
}
