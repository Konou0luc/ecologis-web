import React, { useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Basic',
      type: 'basic',
      description: 'Idéal pour les petites propriétés',
      monthlyPrice: 500,
      quarterlyPrice: 1500,
      yearlyPrice: 6000,
      savings: { quarterly: 0, yearly: 0 },
      features: [
        'Gestion jusqu\'à 5 résidents',
        'Génération de factures automatique',
        'Historique des consommations',
        'Notifications WhatsApp',
        'Support par email',
        'Interface simple et intuitive'
      ],
      popular: false
    },
    {
      name: 'Premium',
      type: 'premium',
      description: 'Parfait pour les propriétés moyennes',
      monthlyPrice: 750,
      quarterlyPrice: 2250,
      yearlyPrice: 9000,
      savings: { quarterly: 0, yearly: 0 },
      features: [
        'Tout du plan Basic',
        'Gestion jusqu\'à 15 résidents',
        'Statistiques avancées',
        'Support prioritaire 24/7',
        'Rapports personnalisés',
        'API d\'intégration',
        'Formation incluse'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      type: 'enterprise',
      description: 'Pour les grandes propriétés',
      monthlyPrice: 1050,
      quarterlyPrice: 3150,
      yearlyPrice: 12600,
      savings: { quarterly: 0, yearly: 0 },
      features: [
        'Tout du plan Premium',
        'Gestion jusqu\'à 50 résidents',
        'API personnalisée',
        'Formation personnalisée',
        'Manager dédié',
        'Intégrations avancées',
        'Support téléphonique',
        'SLA garanti'
      ],
      popular: false
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    switch (billingPeriod) {
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'yearly':
        return plan.yearlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const getPeriod = () => {
    switch (billingPeriod) {
      case 'quarterly':
        return 'par trimestre';
      case 'yearly':
        return 'par an';
      default:
        return 'par mois';
    }
  };

  return (
    <section id="pricing" className="pricing-section">
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
            Ne subissez plus votre consommation
            <span style={{ display: 'block', color: '#FFA800' }}>Maîtrisez-la !!!</span>
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: 'var(--color-text-secondary)', 
            maxWidth: '768px', 
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
            Choisissez votre abonnement et transformez votre gestion dès aujourd'hui
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              backgroundColor: 'var(--color-card-bg)', 
              borderRadius: '8px', 
              padding: '4px', 
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{ display: 'flex' }}>
                {[
                  { key: 'monthly', label: '1 Mois' },
                  { key: 'quarterly', label: '3 Mois' },
                  { key: 'yearly', label: '12 Mois' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setBillingPeriod(option.key as any)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: billingPeriod === option.key ? '#FFA800' : 'transparent',
                      color: billingPeriod === option.key ? 'white' : '#6b7280'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
          gap: 'clamp(16px, 3vw, 32px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }} className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: plan.popular ? '2px solid #FFA800' : '2px solid var(--color-border)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = plan.popular ? 'scale(1.05)' : 'scale(1)'}
            >
              {plan.popular && (
                <div style={{ 
                  position: 'absolute', 
                  top: '-16px', 
                  left: '50%', 
                  transform: 'translateX(-50%)' 
                }}>
                  <div style={{ 
                    backgroundColor: '#FFA800', 
                    color: 'white', 
                    padding: '8px 16px', 
                    borderRadius: '9999px', 
                    fontSize: '14px', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={16} />
                    <span>POPULAIRE</span>
                  </div>
                </div>
              )}

              <div style={{ padding: '32px' }}>
                {/* Plan Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px', 
                    marginBottom: '8px' 
                  }}>
                    <Zap size={24} color="#FFA800" />
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      color: 'var(--color-text-primary)',
                      margin: 0
                    }}>{plan.name}</h3>
                  </div>
                  <p style={{ 
                    color: 'var(--color-text-secondary)', 
                    marginBottom: '16px',
                    margin: '0 0 16px 0'
                  }}>{plan.description}</p>
                  
                  {/* Price */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      color: 'var(--color-text-primary)' 
                    }}>
                      {getPrice(plan).toLocaleString()}
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)', marginLeft: '8px' }}>FCFA</span>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>{getPeriod()}</div>
                  </div>

                  {/* Savings */}
                  {billingPeriod !== 'monthly' && (
                    <div style={{ 
                      backgroundColor: '#dcfce7', 
                      color: '#166534', 
                      padding: '4px 12px', 
                      borderRadius: '9999px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      display: 'inline-block' 
                    }}>
                      Économisez {plan.savings[billingPeriod]}%
                    </div>
                  )}
                </div>

                {/* Features */}
                <div style={{ marginBottom: '32px' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <Check size={20} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%' , textAlign: 'center', justifyContent: 'center'}}>
                  {plan.popular ? 'Commencer' : 'Choisir ce plan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;