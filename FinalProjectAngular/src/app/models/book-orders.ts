import { ConfirmedOrderz } from "./confirmed-orderz";

export class BookOrders {
    constructor(public orderId? : number,
        public totalBookCount?: number,
        public orderStatus?: string,
        public orderDate?: number,
        public confirmedOrders? : ConfirmedOrderz) {}
}

