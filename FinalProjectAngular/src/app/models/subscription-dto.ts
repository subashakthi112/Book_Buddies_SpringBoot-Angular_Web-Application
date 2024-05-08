import { SubscriptionPlan } from "./subscription-plan";

export class SubscriptionDto {
    constructor(
        public bookId?: number,
        public userId?: number,
        public subscriptionPlan?:SubscriptionPlan["name"]
    ) {}
}
