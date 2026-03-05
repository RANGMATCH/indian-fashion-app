// Supabase storage URL utilities for WebGPU integration

export function getSupabaseStorageUrl(bucketName: string, filePath: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Supabase URL not configured');
  }
  
  // Remove trailing slash if present
  const cleanUrl = supabaseUrl.replace(/\/$/, '');
  return `${cleanUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
}

export function getGarmentImageUrl(fileName: string): string {
  return getSupabaseStorageUrl('recolor_assets', fileName);
}

// Common garment file patterns
export const GARMENT_FILE_PATTERNS = {
  base: (name: string) => `${name}_base.png`,
  mask: (name: string) => `${name}_mask.png`,
  idmap: (name: string) => `${name}_idmap.png`,
};

// Example usage:
// const baseUrl = getGarmentImageUrl(GARMENT_FILE_PATTERNS.base('shirt'));
// Returns: https://pykzlebnrzcdksfyoukz.supabase.co/storage/v1/object/public/recolor_assets/shirt_base.png