import { apiRequest } from "../../../libs/api";
import type { SubscriptionDto } from "../../../libs/types/subscription/subscription.dto";

export async function getCurrentPlan(): Promise<SubscriptionDto> {
    return apiRequest<SubscriptionDto>("subscription/currentPlan", {
        method: "GET",
        auth: true,
    });
}
