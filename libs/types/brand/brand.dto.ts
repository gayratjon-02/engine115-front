export interface BrandDto {
    id: string;
    userId: string;
    name: string;
    logoUrl: string | null;
    shopifyDomain: string | null;
    timezone: string;
    currency: string;
    website: string | null;
    industry: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBrandDto {
    name: string;
    logoUrl?: string;
    shopifyDomain?: string;
    website?: string;
    industry?: string;
    timezone?: string;
    currency?: string;
}

export interface UpdateBrandDto {
    name?: string;
    logoUrl?: string;
    shopifyDomain?: string;
    website?: string;
    industry?: string;
    timezone?: string;
    currency?: string;
}
