import { FC, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { compress } from '../../utils/image-compressor'
import { Icon } from '../atoms/IconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { assignPreview, ImageUploadItem } from './ImageUploaderComponent'
import './ImageUploaderComponent.scss'

// eslint-disable-next-line
export type IImageUploaderRef = any

export interface IImageUploader {
  imageUrl: string
  setImage: (image: ImageUploadItem) => void
  refUploader: IImageUploaderRef
  className?: string
}

const defaultUrl = '/assets/img/avatar.png'

export const ProfileImageUploader: FC<IImageUploader> = ({ imageUrl, setImage, refUploader, className }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async (acceptedFiles: File[]) => {
      const compressed = await compress(acceptedFiles[0])
      // TODO compress 후 용량이 5MB 이상이면 안됨
      // if (acceptedFiles.length + images.length > 10) {
      //   return $ui.showToastError({ message: '이미지는 10장까지만 올릴 수 있어요 🤗' })
      // }
      cleanupImageUrl(imageUrl)
      setImage(assignPreview(compressed, new Date().getTime()))
    },
  })

  const cleanupImageUrl = (url: string) => {
    url && URL.revokeObjectURL(url)
  }

  useEffect(() => {
    return () => {
      cleanupImageUrl(imageUrl)
    }
  }, [])

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
        <ProfileImage className='width-160 height-160 dark' url={imageUrl || defaultUrl} />
        <Icon name='camera' size={50} className='absolute-center icon-primary' />
      </div>
    </section>
  )
}
