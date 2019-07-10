import MediaType from './media-type'

export default class BaseMedia {
  id: string
  applicantId?: string
  applicationId?: string
  mimeType: string
  name: string
  path: string
  type: MediaType
  typeId: string
}
