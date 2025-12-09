import { useState, useEffect } from 'react';
import { 
  captureAffiliateId, 
  getAffiliateId, 
  getWhopAffiliateUrl, 
  clearAffiliateId as clearAffiliateStorage,
  AFFILIATE_STORAGE_KEY
} from '../utils/affiliate';

/**
 * Hook to handle affiliate tracking in React components
 * @returns Object containing affiliate ID and utility functions
 */
export function useAffiliate() {
  const [affiliateId, setAffiliateId] = useState<string | null>(null);

  // Load affiliate ID on component mount
  useEffect(() => {
    // Capture from URL if present
    const id = captureAffiliateId();
    setAffiliateId(id);

    // Optional: Listen for storage events to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AFFILIATE_STORAGE_KEY) {
        setAffiliateId(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Generate a Whop affiliate URL with the current affiliate ID
   * @param whopProductUrl The base Whop product URL
   * @returns The affiliate tracking URL
   */
  const getAffiliateUrl = (whopProductUrl: string): string => {
    return getWhopAffiliateUrl(whopProductUrl);
  };

  /**
   * Clear the stored affiliate ID
   */
  const clearAffiliate = (): void => {
    clearAffiliateStorage();
    setAffiliateId(null);
  };

  return {
    affiliateId,
    hasAffiliate: !!affiliateId,
    getAffiliateUrl,
    clearAffiliate,
  };
}
