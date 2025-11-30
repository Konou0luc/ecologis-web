// Route API serverless pour servir le sitemap.xml
// Cette route garantit que le sitemap est accessible avec les bons headers

export default function handler(req, res) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Page d'accueil - Priorité maximale -->
  <url>
    <loc>https://ecologis-web.vercel.app/</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Guide Rapide -->
  <url>
    <loc>https://ecologis-web.vercel.app/guide-rapide</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Politique de Confidentialité -->
  <url>
    <loc>https://ecologis-web.vercel.app/privacy-policy</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Conditions d'Utilisation -->
  <url>
    <loc>https://ecologis-web.vercel.app/terms-of-service</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Informations Légales -->
  <url>
    <loc>https://ecologis-web.vercel.app/legal-info</loc>
    <lastmod>2025-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
</urlset>`;

  // Définir les headers corrects pour le sitemap
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Retourner le sitemap
  res.status(200).send(sitemap);
}

