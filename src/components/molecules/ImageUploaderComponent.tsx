import { IonIcon } from '@ionic/react'
import { add, closeCircle } from 'ionicons/icons'
import React, { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './ImageUploaderComponent.scss'

export interface IImageUploader {}

export const ImageUploader: FC<IImageUploader> = () => {
  const [files, setFiles] = useState<(File & { preview: string; id: number })[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file, i) =>
          Object.assign(file, {
            id: i,
            preview: URL.createObjectURL(file),
          })
        ),
      ])
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files]
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
      {files.map((file) => (
        <div className='uploader-item relative' key={file.name}>
          <IonIcon
            icon={closeCircle}
            className='absolute right-0 top-0'
            onClick={() => setFiles(files.filter((v) => v.id !== file.id))}
          ></IonIcon>
          <img src={file.preview} className='h-full w-auto' />
        </div>
      ))}
    </section>
  )
}
