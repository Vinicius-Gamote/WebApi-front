import { Position } from "./Position";
import { SocialMedia } from "./SocialMedia";

export interface User {

    id: number

    name: string

    birthday?: Date

    userIcon: string

    phone: string

    email: string

    positions: Position[]

    socialMedias: SocialMedia[]

    usersPositions: Position[]

}
