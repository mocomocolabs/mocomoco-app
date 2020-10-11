import Compressor from 'compressorjs'

export const compress = (
  file: File,
  {
    width = Infinity,
    height = Infinity,
    quality = 0.6,
  }: { width?: number; height?: number; quality?: number } = {}
): Promise<File> => {
  return new Promise(
    (resolve) =>
      new Compressor(file, {
        quality,
        width,
        height,
        success(result: File) {
          resolve(result)
        },
        error(err) {
          console.log(err.message)
        },
      })
  )
}
