import { MemoryStoredFile } from 'nestjs-form-data'

const nestjsFormDataConfig = {
  storage: MemoryStoredFile,
  isGlobal: true,
  limits: {
    fileSize: 5e6,
    files: 10,
  },
}

export default nestjsFormDataConfig
