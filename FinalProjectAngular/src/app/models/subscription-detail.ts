import { Book } from "./book";
import { SubscriptionPlan } from "./subscription-plan";
import { User } from "./user";

export class SubscriptionDetail {
    constructor(
        public subscriptionId?:number,
        public subscriptionDate?:Date,
        public expireDate?:Date,
        public subscriptionCost?:number,
        public subscriptionStatus?:string,
        public paymentPlan?:SubscriptionPlan,
        public book?:Book,
        public customer?:User
){}
}