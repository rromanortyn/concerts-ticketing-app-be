import { MemoryStoredFile } from 'nestjs-form-data'

class AddEventCommandInput {
  image: MemoryStoredFile
  title: string
  description: string
  startDate: Date
  endDate: Date
}

export default AddEventCommandInput
