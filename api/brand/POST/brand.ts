import { apiRequest } from "../../../libs/api";
import type { BrandDto, CreateBrandDto, UpdateBrandDto } from "../../../libs/types/brand/brand.dto";

export async function createBrand(input: CreateBrandDto): Promise<BrandDto> {
    return apiRequest<BrandDto>("brand/createBrand", {
        method: "POST",
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

export async function updateBrand(brandId: string, input: UpdateBrandDto): Promise<BrandDto> {
    return apiRequest<BrandDto>(`brand/updateBrand/${brandId}`, {
        method: "POST",
        auth: true,
        body: input as unknown as Record<string, unknown>,
    });
}

export async function deleteBrand(brandId: string): Promise<{ message: string }> {
    return apiRequest<{ message: string }>(`brand/deleteBrand/${brandId}`, {
        method: "POST",
        auth: true,
    });
}
