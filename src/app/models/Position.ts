import { User } from "./User"

export interface Position {

    id: number 

    name: string 

    description: string 

    startDate: Date 

    endDate: Date

    user: User[] 

    userId: number 
     
    userPositions: User[]  

}
