import { Book } from "./book";
import { BookDetail } from "./book-detail";
import { ConfirmedOrderz } from "./confirmed-orderz";
import { Payment } from "./payment";

export class Order {
    constructor(public orderId?:number,public totalBookCount?:number,public orderStatus?:number,public orderDate?:string,public confirmedOrders?:ConfirmedOrderz,public payment?:Payment){}
}
