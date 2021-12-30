import _ from 'lodash'
import { FC, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from '../../hooks/use-store'
import { compress } from '../../utils/image-compressor'
import { Icon } from '../atoms/IconComponent'
import './ImageUploaderComponent.scss'

// eslint-disable-next-line
export type IImageUploaderRef = any

export interface ImageUploadItem extends File {
  id: number
  preview: string
}

export interface IImageUploader {
  images: ImageUploadItem[]
  setImages: (imgs: ImageUploadItem[]) => void
  refUploader: IImageUploaderRef
  className?: string
}

export const assignPreview = (v: File, i: number) =>
  Object.assign(v, {
    id: i,
    preview: URL.createObjectURL(v),
  } as ImageUploadItem)

export const ImageUploader: FC<IImageUploader> = ({ images = [], setImages, refUploader, className }) => {
  const { $ui } = useStore()

  const totalSizeLimit = 5 * 1024 * 1024

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    maxFiles: 10,
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length + images.length > 10) {
        return $ui.showToastError({ message: '이미지는 10장까지만 올릴 수 있어요 🤗' })
      }

      let totalSize = images.reduce((result, image) => (result += image.size), 0)

      const compressed = await Promise.all(acceptedFiles.map((file) => compress(file)))
      const newImages = compressed.reduce((result, image) => {
        totalSize += image.size

        totalSize < totalSizeLimit && result.push(image)

        return result
      }, [] as File[])

      totalSize >= totalSizeLimit &&
        $ui.showToastError({
          message: '첨부할 수 있는 용량이 초과되어 일부 이미지를 업로드하지 못 했어요',
        })

      setImages([...images, ...newImages.map((v, i) => assignPreview(v, new Date().getTime() + i))])
    },
  })

  useEffect(() => {
    setImages(images.map((v, i) => assignPreview(v, Number(_.uniqueId()) * 100 + i)))

    return () => {
      // revokeObjectURL을 통해 해제하지 않으면 기존 URL를 유효하다고 판단하고 자바스크립트 엔진에서 GC 되지 않습니다
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    }
  }, [])

  return (
    <section className='flex-center flex-wrap gap-2'>
      <div {...getRootProps()}>
        <input {...getInputProps()} ref={refUploader} />
      </div>
      {images?.map((image) => (
        <div className={`${className} uploader-item relative`} key={image.name}>
          <Icon
            name='delete'
            className='absolute mr-2 mt-2 right-0 top-0 uploader-delete-icon'
            onClick={() => {
              setImages(images.filter((v) => v.id !== image.id))
              URL.revokeObjectURL(image.preview)
            }}
          />
          <img src={image.preview} alt='' className='h-full w-auto br-md' />
        </div>
      ))}
    </section>
  )
}
