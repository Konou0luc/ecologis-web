import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Ecopower - Gestion de Consommation Électrique',
  description = 'Application simple et efficace pour gérer votre consommation électrique au Togo. Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle sur vos dépenses.',
  canonical,
  ogImage = '/assets/screens/Ecopower.jpg',
  ogType = 'website',
  jsonLd,
  noindex = false,
  keywords = 'ecopower, gestion électrique, factures, consommation, énergie, Togo, Lomé, gestion résidentielle, suivi consommation, facturation automatique'
}) => {
  const siteUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://ecologis-web.vercel.app/';
  
  const getCanonical = () => {
    if (canonical) {
      return canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`;
    }
    if (typeof window !== 'undefined') {
      return `${siteUrl}${window.location.pathname}`;
    }
    return siteUrl;
  };
  
  const fullCanonical = getCanonical();
  
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${siteUrl}${ogImage}`;

  const fullTitle = title.includes('Ecopower') ? title : `${title} | Ecopower`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ecopower" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Ecopower" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@ecopower" />
      <meta name="twitter:site" content="@ecopower" />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="TG-LM" />
      <meta name="geo.placename" content="Lomé" />
      <meta name="geo.position" content="6.1375;1.2123" />
      <meta name="ICBM" content="6.1375, 1.2123" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

