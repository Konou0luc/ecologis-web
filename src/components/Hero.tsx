import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container-custom">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '48px', 
          alignItems: 'center',
          minHeight: 'auto'
        }} className="hero-grid">
          {/* Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h1 style={{ 
                fontSize: 'clamp(32px, 5vw, 56px)', 
                fontWeight: 'bold', 
                color: 'var(--color-text-primary)', 
                lineHeight: '1.2',
                margin: 0,
                textAlign: 'left'
              }} className="hero-title">
                Révolutionnez
                <span style={{ display: 'block', color: '#FFA800' }}>votre gestion</span>
                <span style={{ display: 'block' }}>d'énergie</span>
              </h1>
              <p style={{ 
                fontSize: 'clamp(16px, 2.5vw, 20px)', 
                color: 'var(--color-text-secondary)', 
                lineHeight: '1.6',
                margin: 0,
                textAlign: 'left'
              }} className="hero-description">
                Une application simple et efficace pour gérer votre consommation électrique. 
                Suivez vos relevés, générez vos factures et gardez le contrôle sur vos dépenses.
              </p>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px', 
              padding: '24px 0',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFA800' }}>Simple</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>À utiliser</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFA800' }}>Rapide</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>À configurer</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFA800' }}>Efficace</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Au quotidien</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px',
              alignItems: 'flex-start',
              width: '100%'
            }} className="hero-cta">
              <button className="btn-primary" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <span>Essai Gratuit 1 Mois</span>
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <Play size={20} />
                <span>Voir la démo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px',
              paddingTop: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} color="#22c55e" />
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Sans engagement</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} color="#22c55e" />
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Configuration en 5 min</span>
              </div>
            </div>
          </div>

          {/* Right Content - Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ 
              backgroundColor: 'var(--color-card-bg)', 
              borderRadius: '16px', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '24px',
              transform: 'rotate(3deg)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(3deg)'}
            >
              <div style={{ 
                backgroundColor: 'var(--color-bg-secondary)', 
                borderRadius: '8px', 
                padding: '16px', 
                marginBottom: '16px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  marginBottom: '12px' 
                }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px', width: '75%' }}></div>
                  <div style={{ height: '16px', backgroundColor: '#d1d5db', borderRadius: '4px', width: '50%' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Consommation du mois</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFA800' }}>125.5 kWh</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  backgroundColor: 'var(--color-border)', 
                  borderRadius: '9999px', 
                  height: '8px' 
                }}>
                  <div style={{ 
                    backgroundColor: '#FFA800', 
                    height: '8px', 
                    borderRadius: '9999px', 
                    width: '75%' 
                  }}></div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '14px', 
                  color: 'var(--color-text-tertiary)' 
                }}>
                  <span>0 kWh</span>
                  <span>200 kWh</span>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div style={{ 
              position: 'absolute', 
              top: '-16px', 
              right: '-16px', 
              backgroundColor: '#22c55e', 
              color: 'white', 
              padding: '12px', 
              borderRadius: '50%', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              animation: 'bounce 2s infinite'
            }}>
              <CheckCircle size={24} />
            </div>
            <div style={{ 
              position: 'absolute', 
              bottom: '-16px', 
              left: '-16px', 
              backgroundColor: '#FFA800', 
              color: 'white', 
              padding: '12px', 
              borderRadius: '50%', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              animation: 'bounce 2s infinite',
              animationDelay: '1s'
            }}>
              <ArrowRight size={24} />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
