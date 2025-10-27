import React from 'react';
import ContactForm from './ContactForm';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container-custom">
        <div className="contact-header">
          <h1 className="contact-title">
            Contactez-nous
          </h1>
          <p className="contact-description">
            Prêt à révolutionner votre gestion énergétique ? Notre équipe d'experts 
            est là pour vous accompagner dans votre transition vers une consommation plus intelligente.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
