import React from 'react';
import { useAffiliate } from '../hooks/useAffiliate';

interface AffiliateLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  whopUrl: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that renders a link with affiliate tracking
 */
export const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  whopUrl,
  children,
  className = '',
  ...props
}) => {
  const { getAffiliateUrl } = useAffiliate();
  const affiliateUrl = getAffiliateUrl(whopUrl);

  return (
    <a 
      href={affiliateUrl}
      className={`affiliate-link ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

export default AffiliateLink;
