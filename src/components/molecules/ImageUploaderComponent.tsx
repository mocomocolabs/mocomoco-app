import { IonIcon, useIonViewWillLeave } from '@ionic/react'
import { closeCircle } from 'ionicons/icons'
import { FC, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { compress } from '../../utils/image-compressor'
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

export const ImageUploader: FC<IImageUploader> = ({ images = [], setImages, refUploader, className }) => {
  const assignPreview = (v: File, i: number) =>
    Object.assign(v, {
      id: i,
      preview: URL.createObjectURL(v),
    })

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles: File[]) => {
      const compressed = await Promise.all(acceptedFiles.map((file) => compress(file)))
      setImages([...images, ...compressed.map((v, i) => assignPreview(v, new Date().getTime() + i))])
    },
  })

  useEffect(() => {
    setImages(images.map((v, i) => assignPreview(v, i)))
  }, [])

  useIonViewWillLeave(() => {
    // revokeObjectURL을 통해 해제하지 않으면 기존 URL를 유효하다고 판단하고 자바스크립트 엔진에서 GC 되지 않습니다
    images.forEach((image) => URL.revokeObjectURL(image.preview))
  })

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} ref={refUploader} />
      </div>
      {images?.map((image) => (
        <div className={`${className} uploader-item relative mr-1`} key={image.name}>
          <IonIcon
            icon={closeCircle}
            className='absolute right-0 top-0'
            onClick={() => setImages(images.filter((v) => v.id !== image.id))}
          ></IonIcon>
          <img src={image.preview} alt='' className='h-full w-auto br-md' />
        </div>
      ))}
    </section>
  )
}
