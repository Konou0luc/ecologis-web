import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './GuideRapide.css';

const GuideRapide: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`guide-rapide ${isDark ? 'dark' : ''}`}>
      <div className="guide-wrapper">
        {/* Hero Section */}
        <div className="guide-hero">
          <div className="guide-hero-badge">Guide d'utilisation</div>
          <h1 className="guide-hero-title">Tout savoir sur Ecopower</h1>
          <p className="guide-hero-description">
            Découvrez comment utiliser efficacement l'application pour gérer votre consommation d'électricité
          </p>
        </div>

        {/* Content */}
        <div className="guide-content">
          {/* Section 1 */}
          <section className="guide-section">
            <div className="section-number">01</div>
            <div className="section-body">
              <h2 className="section-title">Bienvenue sur Ecopower</h2>
              <p className="section-text">
                Ecopower est une application innovante conçue pour vous aider à gérer efficacement 
                votre consommation d'électricité. Que vous soyez résident ou gérant, cette plateforme 
                vous offre tous les outils nécessaires pour suivre, comprendre et optimiser votre 
                utilisation énergétique.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="guide-section">
            <div className="section-number">02</div>
            <div className="section-body">
              <h2 className="section-title">Comprendre vos consommations</h2>
              <p className="section-text">
                Une consommation représente la quantité d'électricité (en kWh) que vous avez 
                utilisée sur une période donnée, généralement un mois.
              </p>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-card-icon">📊</div>
                  <h3 className="info-card-title">Relevé mensuel</h3>
                  <p className="info-card-text">
                    Chaque mois, votre index de compteur est relevé et enregistré dans l'application.
                  </p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">🔢</div>
                  <h3 className="info-card-title">Calcul automatique</h3>
                  <p className="info-card-text">
                    L'application calcule automatiquement votre consommation en kWh en comparant 
                    les index successifs.
                  </p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">💰</div>
                  <h3 className="info-card-title">Montant estimé</h3>
                  <p className="info-card-text">
                    Un montant estimé est calculé en fonction du tarif applicable et des frais fixes.
                  </p>
                </div>
              </div>

              <div className="example-box">
                <div className="example-label">Exemple</div>
                <p className="example-text">
                  Si votre index était de <strong>1000 kWh</strong> le mois dernier et qu'il est maintenant 
                  de <strong>1050 kWh</strong>, votre consommation ce mois-ci est de <strong>50 kWh</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="guide-section">
            <div className="section-number">03</div>
            <div className="section-body">
              <h2 className="section-title">Comprendre vos factures</h2>
              <p className="section-text">
                Une facture Ecopower comprend plusieurs éléments importants :
              </p>

              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🔢</div>
                  <h3 className="feature-title">Numéro de facture</h3>
                  <p className="feature-description">Identifiant unique (ex: FACT-202509-0001)</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📅</div>
                  <h3 className="feature-title">Date d'émission</h3>
                  <p className="feature-description">Date de génération de la facture</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <h3 className="feature-title">Consommation (kWh)</h3>
                  <p className="feature-description">Quantité d'électricité consommée</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💵</div>
                  <h3 className="feature-title">Prix par kWh</h3>
                  <p className="feature-description">Tarif unitaire appliqué</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📋</div>
                  <h3 className="feature-title">Frais fixes</h3>
                  <p className="feature-description">Charges fixes mensuelles</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💰</div>
                  <h3 className="feature-title">Montant total</h3>
                  <p className="feature-description">Montant total à payer</p>
                </div>
              </div>

              <div className="formula-box">
                <div className="formula-label">Formule de calcul</div>
                <div className="formula-content">
                  <div className="formula-main">Montant total = (Consommation × Prix par kWh) + Frais fixes</div>
                  <div className="formula-example">
                    Exemple : (50 kWh × 100 FCFA) + 2000 FCFA = <strong>7000 FCFA</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="guide-section">
            <div className="section-number">04</div>
            <div className="section-body">
              <h2 className="section-title">Statuts des factures</h2>
              <p className="section-text">
                Chaque facture peut avoir différents statuts qui indiquent son état de paiement :
              </p>

              <div className="status-cards">
                <div className="status-card">
                  <div className="status-indicator pending"></div>
                  <div className="status-content">
                    <h3 className="status-title">En attente</h3>
                    <p className="status-text">
                      La facture a été générée mais n'a pas encore été payée. Vous pouvez la consulter 
                      et la télécharger à tout moment.
                    </p>
                  </div>
                </div>
                <div className="status-card">
                  <div className="status-indicator paid"></div>
                  <div className="status-content">
                    <h3 className="status-title">Payée</h3>
                    <p className="status-text">
                      La facture a été payée avec succès. Vous pouvez toujours la consulter dans 
                      votre historique.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="guide-section">
            <div className="section-number">05</div>
            <div className="section-body">
              <h2 className="section-title">Fonctionnalités principales</h2>
              
              <div className="features-list">
                <div className="feature-row">
                  <div className="feature-row-icon">📊</div>
                  <div className="feature-row-content">
                    <h3 className="feature-row-title">Tableau de bord</h3>
                    <p className="feature-row-text">
                      Visualisez un aperçu de votre consommation et de vos factures avec des graphiques 
                      et des statistiques en temps réel.
                    </p>
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-row-icon">⚡</div>
                  <div className="feature-row-content">
                    <h3 className="feature-row-title">Historique des consommations</h3>
                    <p className="feature-row-text">
                      Consultez l'historique complet de vos consommations mensuelles avec tous les détails.
                    </p>
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-row-icon">🧾</div>
                  <div className="feature-row-content">
                    <h3 className="feature-row-title">Gestion des factures</h3>
                    <p className="feature-row-text">
                      Accédez à toutes vos factures, téléchargez-les en PDF et suivez leur statut de paiement.
                    </p>
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-row-icon">💬</div>
                  <div className="feature-row-content">
                    <h3 className="feature-row-title">Messagerie</h3>
                    <p className="feature-row-text">
                      Communiquez directement avec votre gérant ou vos résidents via la messagerie intégrée.
                    </p>
                  </div>
                </div>
                <div className="feature-row">
                  <div className="feature-row-icon">🔔</div>
                  <div className="feature-row-content">
                    <h3 className="feature-row-title">Notifications</h3>
                    <p className="feature-row-text">
                      Recevez des notifications importantes concernant vos factures, consommations et messages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="guide-section">
            <div className="section-number">06</div>
            <div className="section-body">
              <h2 className="section-title">Conseils et bonnes pratiques</h2>
              
              <div className="tips-grid">
                <div className="tip-card">
                  <div className="tip-icon">💡</div>
                  <h3 className="tip-title">Surveillez régulièrement</h3>
                  <p className="tip-text">
                    Consultez votre consommation mensuellement pour détecter toute anomalie.
                  </p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">📱</div>
                  <h3 className="tip-title">Activez les notifications</h3>
                  <p className="tip-text">
                    Activez les notifications push pour être informé immédiatement de vos nouvelles factures.
                  </p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">💾</div>
                  <h3 className="tip-title">Téléchargez vos factures</h3>
                  <p className="tip-text">
                    Téléchargez et archivez vos factures en PDF pour vos propres archives.
                  </p>
                </div>
                <div className="tip-card">
                  <div className="tip-icon">❓</div>
                  <h3 className="tip-title">Besoin d'aide ?</h3>
                  <p className="tip-text">
                    Contactez le support via l'application ou par email si vous avez des questions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="guide-section">
            <div className="section-number">07</div>
            <div className="section-body">
              <h2 className="section-title">Besoin d'aide supplémentaire ?</h2>
              <p className="section-text">
                Si vous avez des questions ou rencontrez des difficultés, n'hésitez pas à nous contacter :
              </p>
              
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-info">
                    <h3 className="contact-title">Email</h3>
                    <a href="mailto:konouluc0@gmail.com" className="contact-link">
                      konouluc0@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">💬</div>
                  <div className="contact-info">
                    <h3 className="contact-title">Support</h3>
                    <p className="contact-text">
                      Utilisez la section "Assistance" dans les paramètres de l'application
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuideRapide;
