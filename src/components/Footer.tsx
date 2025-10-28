import React from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Fonctionnalités', href: '#features' },
      { name: 'Tarifs', href: '#pricing' },
      { name: 'API', href: '#' },
      { name: 'Intégrations', href: '#' }
    ],
    support: [
      { name: 'Centre d\'aide', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'Contact', href: '#contact' },
      { name: 'Statut', href: '#' }
    ],
    company: [
      { name: 'À propos', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Carrières', href: '#' },
      { name: 'Presse', href: '#' }
    ],
    legal: [
      { name: 'Confidentialité', href: '/privacy-policy' },
      { name: 'Conditions', href: '/terms-of-service' },
      { name: 'CGU', href: '/terms-of-service' },
      { name: 'Cookies', href: '/privacy-policy' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer>
      <div className="container-custom">
        {/* Main Footer Content */}
        <div style={{ padding: '64px 0' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '32px' 
          }}>
            {/* Company Info */}
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '24px',
                justifyContent: 'flex-start'
              }}>
                <div style={{ backgroundColor: '#FFA800', padding: '8px', borderRadius: '8px' }}>
                  <Zap size={24} color="white" />
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>Ecologis</span>
              </div>
              <p style={{ 
                color: '#d1d5db', 
                marginBottom: '24px', 
                lineHeight: '1.6',
                textAlign: 'left'
              }}>
                La solution nouvelle génération pour révolutionner votre gestion 
                de consommation électrique et optimiser vos coûts énergétiques.
              </p>
              
              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={20} color="#FFA800" />
                  <span style={{ color: '#d1d5db', textAlign: 'left' }}>+228 97240460</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={20} color="#FFA800" />
                  <span style={{ color: '#d1d5db', textAlign: 'left' }}>konouluc0@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={20} color="#FFA800" />
                  <span style={{ color: '#d1d5db', textAlign: 'left' }}>Lomé, Togo</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '24px',
                margin: 0,
                textAlign: 'left'
              }}>Produit</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.product.map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.href}
                      style={{ 
                        color: '#d1d5db', 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        textAlign: 'left',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '24px',
                margin: 0,
                textAlign: 'left'
              }}>Support</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.support.map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.href}
                      style={{ 
                        color: '#d1d5db', 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        textAlign: 'left',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                marginBottom: '24px',
                margin: 0,
                textAlign: 'left'
              }}>Entreprise</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {footerLinks.company.map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a
                      href={link.href}
                      style={{ 
                        color: '#d1d5db', 
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        textAlign: 'left',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div style={{ 
          borderTop: '1px solid #374151', 
          padding: '32px 0' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '32px', 
            alignItems: 'center' 
          }}>
            <div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                marginBottom: '8px',
                margin: 0,
                textAlign: 'left'
              }}>Restez informé</h3>
              <p style={{ 
                color: '#d1d5db',
                margin: 0,
                textAlign: 'left'
              }}>
                Recevez les dernières actualités et conseils pour optimiser votre gestion d'énergie.
              </p>
            </div>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
            }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  color: 'white',
                  fontSize: '16px',
                  textAlign: 'left'
                }}
              />
              <button className="btn-primary" style={{ whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ 
          borderTop: '1px solid #374151', 
          padding: '32px 0' 
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            {/* Copyright */}
            <div style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'left' }}>
              © {currentYear} Ecologis. Tous droits réservés.
            </div>

            {/* Legal Links */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '24px', 
              fontSize: '14px' 
            }}>
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  style={{ 
                    color: '#9ca3af', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0ea5e9'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  style={{ 
                    color: '#9ca3af', 
                    transition: 'color 0.2s ease' 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0ea5e9'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;