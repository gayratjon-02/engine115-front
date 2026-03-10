import { apiRequest } from "../../../libs/api";
import type { BrandDto } from "../../../libs/types/brand/brand.dto";

export async function getUserBrands(): Promise<BrandDto[]> {
    return apiRequest<BrandDto[]>("brand/getUserBrands", {
        method: "GET",
        auth: true,
    });
}

export async function getBrand(brandId: string): Promise<BrandDto> {
    return apiRequest<BrandDto>(`brand/getBrand/${brandId}`, {
        method: "GET",
        auth: true,
    });
}
