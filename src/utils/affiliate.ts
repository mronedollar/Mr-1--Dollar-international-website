// Affiliate tracking utility

export const AFFILIATE_STORAGE_KEY = 'affiliate_id';

/**
 * Get affiliate ID from URL parameters and store it in localStorage
 * @returns The affiliate ID if found in URL, otherwise null
 */
export function captureAffiliateId(): string | null {
  // Skip if running on server-side
  if (typeof window === 'undefined') return null;

  // Check if we already have an affiliate ID stored
  const existingAffiliateId = localStorage.getItem(AFFILIATE_STORAGE_KEY);
  if (existingAffiliateId) return existingAffiliateId;

  // Try to get affiliate ID from URL parameters
  const params = new URLSearchParams(window.location.search);
  const affiliateId = params.get('ref') || params.get('affiliate') || params.get('aff');
  
  // If we found an affiliate ID in the URL, store it
  if (affiliateId) {
    localStorage.setItem(AFFILIATE_STORAGE_KEY, affiliateId);
    return affiliateId;
  }

  return null;
}

/**
 * Get the current affiliate ID from localStorage
 * @returns The stored affiliate ID or null if not found
 */
export function getAffiliateId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AFFILIATE_STORAGE_KEY);
}

/**
 * Generate a Whop affiliate URL with the current affiliate ID
 * @param whopProductUrl The base Whop product URL
 * @returns The affiliate tracking URL
 */
export function getWhopAffiliateUrl(whopProductUrl: string): string {
  const affiliateId = getAffiliateId();
  if (!affiliateId) return whopProductUrl;

  const url = new URL(whopProductUrl);
  url.searchParams.set('aff', affiliateId);
  return url.toString();
}

/**
 * Clear the stored affiliate ID
 */
export function clearAffiliateId(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AFFILIATE_STORAGE_KEY);
  }
}
