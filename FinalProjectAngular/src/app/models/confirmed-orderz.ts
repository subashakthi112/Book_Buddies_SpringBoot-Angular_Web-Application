import { BookDetail } from "./book-detail";

export class ConfirmedOrderz {
    constructor(public id?:number,public userId?:number,public orderedBooks?:BookDetail[]){

    }
}
