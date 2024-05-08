import { Pipe, PipeTransform } from '@angular/core';
import { BookStock } from '../models/book-stock';

@Pipe({
  name: 'searchBookStock',
  standalone: true
})
export class SearchBookStockPipe implements PipeTransform  {

  transform(bookStock: BookStock[], query: string): BookStock[] {
    if(bookStock.length < 1 || query == "" || query == undefined) return bookStock;
    return bookStock.filter((p) => {
      return p.book.bookTitle!.toLowerCase().includes(query.toLowerCase());
    });


  }
}