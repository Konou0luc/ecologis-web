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
            Une question ? Une suggestion ? N'hésitez pas à me contacter. 
            Je serai ravi de vous aider et d'améliorer l'application selon vos besoins.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
