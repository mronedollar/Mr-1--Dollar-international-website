import React, { useEffect } from 'react';
import { captureAffiliateId } from '../../utils/affiliate';

interface AffiliateProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that initializes affiliate tracking
 * Should be placed near the root of your app
 */
const AffiliateProvider: React.FC<AffiliateProviderProps> = ({ children }) => {
  // Initialize affiliate tracking when component mounts
  useEffect(() => {
    captureAffiliateId();
  }, []);

  return <>{children}</>;
};

export default AffiliateProvider;
