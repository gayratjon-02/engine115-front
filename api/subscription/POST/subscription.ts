import { apiRequest } from "../../../libs/api";
import type { SubscriptionDto, UpgradePlanDto } from "../../../libs/types/subscription/subscription.dto";

export async function upgradePlan(input: UpgradePlanDto): Promise<SubscriptionDto> {
    return apiRequest<SubscriptionDto>("subscription/upgradePlan", {
        method: "POST",
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

export async function cancelPlan(): Promise<SubscriptionDto> {
    return apiRequest<SubscriptionDto>("subscription/cancelPlan", {
        method: "POST",
        auth: true,
    });
}
