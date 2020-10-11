import { IonIcon } from '@ionic/react'
import { add, closeCircle } from 'ionicons/icons'
import React, { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { compress } from '../../utils/image-compressor'
import './ImageUploaderComponent.scss'

export interface ImageUploadItem extends File {
  id: number
  preview: string
}

export interface IImageUploader {
  images?: ImageUploadItem[]
}

export const ImageUploader: FC<IImageUploader> = () => {
  const [images, setImages] = useState<ImageUploadItem[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles: File[]) => {
      const compressed = await Promise.all(acceptedFiles.map((file) => compress(file)))
      setImages([
        ...images,
        ...compressed.map((v, i) =>
          Object.assign(v, {
            id: i,
            preview: URL.createObjectURL(v),
          })
        ),
      ])
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    },
    [images]
  )

  return (
    <section>
      <div
        {...getRootProps({
          className: 'uploader-item',
        })}
      >
        <input {...getInputProps()} />
        <IonIcon icon={add} size='large' className='absolute'></IonIcon>
      </div>
      {images.map((image) => (
        <div className='uploader-item relative' key={image.name}>
          <IonIcon
            icon={closeCircle}
            className='absolute right-0 top-0'
            onClick={() => setImages(images.filter((v) => v.id !== image.id))}
          ></IonIcon>
          <img src={image.preview} alt='' className='h-full w-auto' />
        </div>
      ))}
    </section>
  )
}
