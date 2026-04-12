import { MemoryStoredFile } from 'nestjs-form-data'

interface UploadService {
  uploadFile(file: MemoryStoredFile): Promise<void>
}

export default UploadService
