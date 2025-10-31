import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const navigation = [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'Avantages', href: '#benefits' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header>
      <div className="container-custom">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo.png" alt="Ecopower" style={{ height: '40px', width: 'auto' }} />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>Ecopower</span>
          </div>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', gap: '32px' }} className="desktop-nav">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{ 
                  color: 'var(--color-text-secondary)', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div style={{ display: 'none', alignItems: 'center', gap: '16px' }} className="desktop-buttons">
            <ThemeToggle />
            <button 
              onClick={handleLoginClick}
              style={{ 
                color: 'var(--color-text-secondary)', 
                background: 'none', 
                border: 'none', 
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Se connecter
            </button>
            <button className="btn-primary">
              Commencer
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ 
                color: 'var(--color-text-secondary)', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ 
            padding: '16px 0', 
            borderTop: '1px solid var(--color-border)',
            display: 'block'
          }} className="mobile-nav">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{ 
                    color: 'var(--color-text-secondary)', 
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  {item.name}
                </a>
              ))}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px', 
                paddingTop: '16px', 
                borderTop: '1px solid var(--color-border)' 
              }}>
                <button 
                  onClick={handleLoginClick}
                  style={{ 
                    color: 'var(--color-text-secondary)', 
                    background: 'none', 
                    border: 'none', 
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFA800'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  Se connecter
                </button>
                <button className="btn-primary" style={{ width: '100%' }}>
                  Commencer
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

    </header>
  );
};

export default Header;
