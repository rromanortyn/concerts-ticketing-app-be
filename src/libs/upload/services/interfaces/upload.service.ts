import UploadFileInput from '../../types/interfaces/service-inputs/upload-file.input'
import UploadFileOutput from '../../types/interfaces/service-outputs/upload-file.output'

interface UploadService {
  uploadFile(input: UploadFileInput): Promise<UploadFileOutput>,
}

export default UploadService
