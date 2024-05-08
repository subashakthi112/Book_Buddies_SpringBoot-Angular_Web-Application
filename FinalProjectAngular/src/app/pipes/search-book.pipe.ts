import { Pipe, PipeTransform } from '@angular/core';
import { BookStock } from '../models/book-stock';
import { Book } from '../models/book';

@Pipe({
  name: 'searchBook',
  standalone: true
})
export class SearchBookPipe implements PipeTransform {

  transform(book: Book[], query: string): Book[] {
    if(book.length < 1 || query == "" || query == undefined) return book;
    return book.filter((p) => {
      return p.bookTitle!.toLowerCase().includes(query.toLowerCase());
    });
  }

}


