import { MemoryStoredFile } from 'nestjs-form-data'

interface UploadFileInput {
  file: MemoryStoredFile,
  directory: string,
  uuid: string,
}

export default UploadFileInput