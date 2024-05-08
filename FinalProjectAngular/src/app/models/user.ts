import { Cart } from "./cart"
import { Order } from "./order"

export class User {
    constructor(
        public id?:number,
        public name?: string,
        public userName?: string,
        public phoneNumber?: number,
        public email? : string,
        public password? : string,
        public orderList? : Order,
        public cart? : Cart
    ) {}
}


