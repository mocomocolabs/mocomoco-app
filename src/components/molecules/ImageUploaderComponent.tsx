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

export const ImageUploader: FC<IImageUploader> = ({ images }) => {
  const assignPreview = (v: File, i: number) =>
    Object.assign(v, {
      id: i,
      preview: URL.createObjectURL(v),
    })

  const [imgs, setImgs] = useState<ImageUploadItem[]>(images ? images.map((v, i) => assignPreview(v, i)) : [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles: File[]) => {
      const compressed = await Promise.all(acceptedFiles.map((file) => compress(file)))
      setImgs([...imgs, ...compressed.map((v, i) => assignPreview(v, new Date().getTime() + i))])
    },
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    imgs.forEach((image) => URL.revokeObjectURL(image.preview))
  }, [imgs])

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
      {imgs.map((image) => (
        <div className='uploader-item relative' key={image.name}>
          <IonIcon
            icon={closeCircle}
            className='absolute right-0 top-0'
            onClick={() => setImgs(imgs.filter((v) => v.id !== image.id))}
          ></IonIcon>
          <img src={image.preview} alt='' className='h-full w-auto' />
        </div>
      ))}
    </section>
  )
}
