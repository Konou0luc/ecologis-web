import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  Users, 
  Smartphone,
  BarChart3,
  CheckCircle
} from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: '300% ROI Moyen',
      description: 'Retour sur investissement visible dès les premières semaines',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.15)'
    },
    {
      icon: Clock,
      title: '85% Gain Temps',
      description: 'Automatisation complète des tâches de gestion',
      color: '#FFA800',
      bgColor: 'rgba(255, 168, 0, 0.15)'
    },
    {
      icon: Shield,
      title: '99.9% Disponibilité',
      description: 'Service fiable avec monitoring 24/7',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.15)'
    },
    {
      icon: Zap,
      title: '24h Déploiement',
      description: 'Configuration rapide et mise en service immédiate',
      color: '#FFA800',
      bgColor: 'rgba(255, 168, 0, 0.15)'
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Interface moderne',
      description: 'Design pensé pour votre productivité quotidienne',
      color: '#FFA800'
    },
    {
      icon: BarChart3,
      title: 'Adaptabilité complète',
      description: 'S\'intègre parfaitement à vos outils existants',
      color: '#4CAF50'
    },
    {
      icon: TrendingUp,
      title: 'Résultats mesurables',
      description: 'Retour sur investissement visible dès les premières semaines',
      color: '#10b981'
    },
    {
      icon: Users,
      title: 'Accompagnement expert',
      description: 'Équipe dédiée avec support garanti et formation sur mesure',
      color: '#8b5cf6'
    }
  ];

  return (
    <section id="benefits" className="benefits-section">
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: 'clamp(28px, 5vw, 42px)', 
            fontWeight: 'bold', 
            color: 'var(--color-text-primary)', 
            marginBottom: '24px',
            margin: '0 0 24px 0',
            lineHeight: '1.2'
          }}>
            L'avantage concurrentiel
            <span style={{ display: 'block', color: '#FFA800' }}>que vous cherchiez</span>
          </h2>
          <p style={{ 
            fontSize: 'clamp(16px, 2.5vw, 20px)', 
            color: 'var(--color-text-secondary)', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Rejoignez les propriétaires leaders qui ont déjà fait le choix de l'excellence avec Ecopower
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', 
          gap: 'clamp(20px, 4vw, 40px)', 
          marginBottom: 'clamp(40px, 6vw, 80px)',
          padding: '0 20px'
        }} className="benefits-stats">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{ 
                textAlign: 'left',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                padding: '24px',
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ 
                width: '64px', 
                height: '64px', 
                margin: '0 0 16px 0', 
                borderRadius: '50%', 
                backgroundColor: benefit.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <benefit.icon size={32} color={benefit.color} />
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: 'var(--color-text-primary)', 
                marginBottom: '8px',
                margin: 0
              }}>{benefit.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
          gap: 'clamp(16px, 3vw, 32px)', 
          marginBottom: 'clamp(32px, 5vw, 64px)' 
        }} className="benefits-features">
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--color-border)',
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
              <div style={{ flexShrink: 0 }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: 'var(--color-bg-secondary)', 
                  borderRadius: '8px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <feature.icon size={24} color={feature.color} />
                </div>
              </div>
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--color-text-primary)', 
                  marginBottom: '8px',
                  margin: 0
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div style={{ 
          backgroundColor: 'var(--color-card-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: '48px',
          marginBottom: '64px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '48px', 
            alignItems: 'center' 
          }}>
            <div>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'var(--color-text-primary)', 
                marginBottom: '24px',
                margin: 0
              }}>
                Découvrez la puissance de l'innovation
              </h3>
              <p style={{ 
                fontSize: '18px', 
                color: 'var(--color-text-secondary)', 
                marginBottom: '24px',
                margin: '0 0 24px 0',
                lineHeight: '1.6'
              }}>
                Ecopower révolutionne votre gestion de consommation électrique. 
                La plateforme suit vos tendances, anticipe vos besoins et vous aide 
                à prendre les bonnes décisions au bon moment.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={20} color="#22c55e" />
                  <span style={{ color: 'var(--color-text-primary)' }}>Suivi automatisé</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={20} color="#22c55e" />
                  <span style={{ color: 'var(--color-text-primary)' }}>Analyses en temps réel</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={20} color="#22c55e" />
                  <span style={{ color: 'var(--color-text-primary)' }}>Interface simple et efficace</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ 
                backgroundColor: 'var(--color-card-bg)', 
                borderRadius: '12px', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Consommation actuelle</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFA800' }}>125.5 kWh</span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: 'var(--color-border)', 
                    borderRadius: '9999px', 
                    height: '12px' 
                  }}>
                    <div style={{ 
                      background: 'linear-gradient(90deg, #FFA800 0%, #4CAF50 100%)',
                      height: '12px', 
                      borderRadius: '9999px', 
                      width: '75%' 
                    }}></div>
                  </div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '16px', 
                    paddingTop: '16px' 
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>-15%</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>vs mois dernier</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>2,500 FCFA</div>
                      <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Économies</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                backgroundColor: '#22c55e', 
                color: 'white', 
                padding: '8px', 
                borderRadius: '50%', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                animation: 'bounce 2s infinite'
              }}>
                <TrendingUp size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Team Section - Clean & Responsive */}
        <div className="team-section">
          <div className="container-custom">
            <div className="team-grid">
              {/* Image Column */}
              <div className="team-image-column">
                <div className="team-image-container">
                  <img 
                    src="/assets/screens/people-office-work-day.jpg" 
                    alt="Équipe Ecopower - Experts en gestion d'énergie"
                    className="team-image"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback si l'image n'existe pas
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="team-image-placeholder" style={{ display: 'none' }}>
                    <div className="team-icon">👥</div>
                    <div className="team-title">Équipe Ecopower</div>
                    <div className="team-subtitle">Experts en gestion d'énergie</div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="team-content-column">
                <h3 className="team-title-main">
                  Une équipe{' '}
                  <span className="team-title-highlight">passionnée</span>
                </h3>
                
                <p className="team-description">
                  Derrière Ecopower se trouve une équipe d'experts passionnés par l'innovation 
                  et dédiés à votre succès. Nos développeurs, analystes et consultants travaillent 
                  sans relâche pour vous offrir la meilleure expérience possible et un support exceptionnel.
                </p>
                
                {/* Stats Cards */}
                <div className="team-stats-grid">
                  <div className="team-stat-card">
                    <div className="team-stat-number">10+</div>
                    <div className="team-stat-label">Années d'expérience</div>
                  </div>
                  <div className="team-stat-card">
                    <div className="team-stat-number">24/7</div>
                    <div className="team-stat-label">Support disponible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Benefits;