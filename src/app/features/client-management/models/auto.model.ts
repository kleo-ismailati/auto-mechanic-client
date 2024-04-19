import { Repair } from '../../../shared/models/repair.model'
import { SafeUrl } from '@angular/platform-browser'

export interface Auto {
    id: number
    autoType: string
    autoModel: string
    year: string
    color: string
    autoDescription: string
    thumbnail?: {
        name: string
        type: string
        data: string | SafeUrl
    } | null
    repairs?: Repair[]
    imageId?: string
}
