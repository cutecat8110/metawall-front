export default function validateUpload(file, maxMb) {
  if (!file) return ''
  if (!/\.(jpe?g|png)$/i.test(file.name)) return '圖片格式錯誤，僅限 JPG、PNG 圖片'
  if (file.size > maxMb * 1024 * 1024) return `圖片檔案過大，僅限 ${maxMb}mb 以下檔案`
  return ''
}
