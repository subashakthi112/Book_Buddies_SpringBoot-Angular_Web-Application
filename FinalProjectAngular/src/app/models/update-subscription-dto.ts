import { SubscriptionPlan } from "./subscription-plan";

export class UpdateSubscriptionDto {
    constructor(
        public subscriptionId?:number,
        public subscriptionPlan?:SubscriptionPlan["name"]
        
    ){}
}
