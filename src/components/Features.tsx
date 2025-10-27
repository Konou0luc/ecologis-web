import React from 'react';
import { 
  Zap, 
  BarChart3, 
  FileText, 
  Bell, 
  Users, 
  Shield, 
  Smartphone,
  Clock,
  TrendingUp
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Gestion de Consommation Optimisée',
      description: 'Suivez vos niveaux de consommation en temps réel, anticipez les pics et réduisez vos coûts automatiquement.',
      color: '#f59e0b'
    },
    {
      icon: BarChart3,
      title: 'Analyses en Temps Réel',
      description: 'Tableaux de bord clairs avec données actualisées pour prendre les bonnes décisions rapidement.',
      color: '#3b82f6'
    },
    {
      icon: FileText,
      title: 'Facturation Automatique',
      description: 'Génération automatique de factures basée sur la consommation réelle avec calculs précis.',
      color: '#10b981'
    },
    {
      icon: Bell,
      title: 'Notifications Intelligentes',
      description: 'Alertes automatiques pour consommation élevée, factures en retard et rappels importants.',
      color: '#ef4444'
    },
    {
      icon: Users,
      title: 'Gestion Multi-Résidents',
      description: 'Gérez facilement plusieurs résidents avec des quotas personnalisés selon votre abonnement.',
      color: '#8b5cf6'
    },
    {
      icon: Shield,
      title: 'Sécurité Professionnelle',
      description: 'Protection maximale de vos données avec chiffrement avancé et conformité RGPD garantie.',
      color: '#6366f1'
    },
    {
      icon: Smartphone,
      title: 'Application Mobile',
      description: 'Accès complet depuis votre smartphone avec synchronisation en temps réel.',
      color: '#ec4899'
    },
    {
      icon: Clock,
      title: 'Suivi Continu',
      description: 'Surveillance permanente avec alertes automatiques pour ne rien manquer d\'important.',
      color: '#f97316'
    },
    {
      icon: TrendingUp,
      title: 'Statistiques Avancées',
      description: 'Rapports détaillés avec graphiques pour analyser les tendances de consommation.',
      color: '#14b8a6'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: 'var(--color-text-primary)', 
            marginBottom: '16px',
            margin: 0
          }}>
            Tout ce dont vous avez besoin,
            <span style={{ display: 'block', color: '#FFA800' }}>et bien plus encore</span>
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'var(--color-text-secondary)', 
            maxWidth: '768px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Des outils intelligents qui s'adaptent à votre business et évoluent avec vos besoins
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
          gap: 'clamp(16px, 3vw, 32px)' 
        }} className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-card-bg)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFA800';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 168, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  backgroundColor: 'var(--color-bg-secondary)',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 168, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                }}
                >
                  <feature.icon size={24} color={feature.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '8px',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFA800';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#111827';
                  }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--color-text-secondary)', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <div style={{ 
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '20px',
            padding: '48px 32px',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative background element */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(255, 168, 0, 0.1) 0%, rgba(255, 168, 0, 0.05) 100%)',
              borderRadius: '50%',
              zIndex: 0
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ 
                fontSize: 'clamp(24px, 4vw, 32px)', 
                fontWeight: 'bold', 
                color: 'var(--color-text-primary)', 
                marginBottom: '16px',
                margin: '0 0 16px 0',
                lineHeight: '1.3'
              }}>
                Prêt à transformer votre gestion d'énergie ?
              </h3>
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                marginBottom: '32px',
                lineHeight: '1.6',
                fontSize: 'clamp(16px, 2.5vw, 18px)',
                margin: '0 0 32px 0'
              }}>
                Rejoignez les propriétaires qui ont déjà fait le choix de l'excellence avec Ecologis.
              </p>
              <div className="features-cta-buttons">
                <button className="btn-primary" style={{
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  minWidth: '180px'
                }}>
                  Démarrer Maintenant
                </button>
                <button className="btn-secondary" style={{
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  minWidth: '180px'
                }}>
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;