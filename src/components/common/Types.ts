export type PhotosType = {
   small?: string 
   large?: string 
}

export type UserType = {
   followed: boolean
   id: number | null
   name?: string | null
   photos?: PhotosType | null
   status?: string | null
   uniqueUrlName?: string | null
}
export type ContactsType = {
   [key: string]: string;
   facebook: string
   github: string
   instagram: string
   mainLink: string
   twitter: string
   vk: string
   website: string
   youtube: string
}

export type ProfileType = {
   aboutMe: string
   contacts: ContactsType
   fullName: string
   lookingForAJob: boolean
   lookingForAJobDescription: string
   photos: PhotosType
   userId: number
}

