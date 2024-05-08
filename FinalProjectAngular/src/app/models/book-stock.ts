import { Book } from "./book";

export class BookStock {
    constructor(
        public bookStockId?: number,
        public book: Book = new Book(), // Initialize with a new Book instance
        public stockQuantity?: number
    ) {}
}
