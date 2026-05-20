export type LeadPlacesAPIProps = {
    displayName: { text: string, languageCode: string }
    formattedAddress: string
    id: string
    location: { latitude: number, longitude: number }
    nationalPhoneNumber: string
    rating: number
    types: string[]
    userRatingCount: number
    websiteUri: string
    alreadySaved: boolean
}