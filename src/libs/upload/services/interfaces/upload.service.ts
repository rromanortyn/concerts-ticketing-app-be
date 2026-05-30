import UploadFileInput from '../../types/interfaces/service-inputs/upload-file.input'
import UploadFileOutput from '../../types/interfaces/service-outputs/upload-file.output'

interface UploadService {
  uploadFile(input: UploadFileInput): Promise<UploadFileOutput>,
  getPresignedUrl(key: string): Promise<string>,
}

export default UploadService
