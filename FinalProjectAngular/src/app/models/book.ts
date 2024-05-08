import { Review } from "./review";

export class Book {
    constructor(public bookId?:number,
        public bookTitle?:string,
        public bookAuthor?:string,
        public price?:number,
        public image?: string,
        public bookCategory?:string,
        public reviewList?:Review[],
        public pdfLink?:string){

    }
}

// "bookId": 252,
//     "bookTitle": "HP",
//     "bookAuthor": "string",
//     "price": 100,
//     "bookCategory": "FICTION",
//     "reviewList": [] 