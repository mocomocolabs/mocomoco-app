import { FC, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from '../../hooks/use-store'
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
  const { $ui } = useStore()

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: async (acceptedFiles: File[]) => {
      const compressed = await compress(acceptedFiles[0])

      // 첨부이미지의 용량을 5MB 미만으로 제한함
      if (compressed.size >= 5 * 1024 * 1024) {
        return $ui.showToastError({ message: '좀더 작은 용량의 이미지를 등록해주세요' })
      }

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
        <ProfileImage className='width-160 height-160' url={imageUrl || defaultUrl} />
        <Icon name='camera' size={50} className='absolute bottom-0 right-0' />
      </div>
    </section>
  )
}
