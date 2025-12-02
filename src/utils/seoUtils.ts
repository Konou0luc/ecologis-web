/**
 * Utilitaires SEO pour générer les schémas JSON-LD
 */

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs?: string[];
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressLocality: string;
  };
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  isPartOf?: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
}

export interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
}

const SITE_URL = 'https://ecopower.tg';

export const generateOrganizationSchema = (): OrganizationSchema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ecopower",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  description: "Application simple et efficace pour gérer votre consommation électrique au Togo.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+228-98-75-45-25",
    contactType: "Customer Service",
    areaServed: "TG",
    availableLanguage: "fr"
  },
  sameAs: [
    // Ajoutez vos réseaux sociaux ici si disponibles
    // "https://www.facebook.com/ecopower",
    // "https://twitter.com/ecopower",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "TG",
    addressLocality: "Lomé"
  }
});

export const generateWebSiteSchema = (): WebSiteSchema => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ecopower",
  url: SITE_URL,
  description: "Application simple et efficace pour gérer votre consommation électrique au Togo.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): BreadcrumbListSchema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
  }))
});

export const generateWebPageSchema = (
  name: string,
  description: string,
  url: string
): WebPageSchema => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  description,
  url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
  inLanguage: "fr-FR",
  isPartOf: {
    "@type": "WebSite",
    name: "Ecopower",
    url: SITE_URL
  }
});

export const generateHomePageSchema = () => {
  const organization = generateOrganizationSchema();
  const website = generateWebSiteSchema();
  const webpage = generateWebPageSchema(
    "Ecopower - Gestion de Consommation Électrique",
    "Application simple et efficace pour gérer votre consommation électrique au Togo. Suivez vos relevés, générez vos factures automatiquement et gardez le contrôle sur vos dépenses.",
    "/"
  );
  
  return [organization, website, webpage];
};

export const generateServicePageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Gestion de Consommation Électrique",
  provider: generateOrganizationSchema(),
  areaServed: {
    "@type": "Country",
    name: "Togo"
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: SITE_URL,
    serviceType: "Online"
  }
});

