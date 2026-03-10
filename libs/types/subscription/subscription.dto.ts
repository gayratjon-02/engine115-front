import type { SUBSCRIPTION_PLAN, PLAN_STATUS } from '../../enums/subscription.enum';

export interface SubscriptionDto {
    id: string;
    userId: string;
    plan: SUBSCRIPTION_PLAN;
    status: PLAN_STATUS;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface UpgradePlanDto {
    plan: SUBSCRIPTION_PLAN;
}

export interface PlanInfo {
    plan: SUBSCRIPTION_PLAN;
    name: string;
    price: number;
    features: string[];
}
