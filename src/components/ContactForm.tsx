import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[+]?[0-9\s\-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Déterminer l'URL de l'API
      const apiUrl = process.env.REACT_APP_API_URL || 'https://ecopower-api.vercel.app';
      
      // Envoyer le message au backend
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les erreurs de validation
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        throw new Error(data.message || 'Erreur lors de l\'envoi du message');
      }

      // Succès
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);
      // Afficher un message d'erreur générique
      setErrors({
        message: error.message || 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+228 97240460',
      description: 'Disponible sur WhatsApp'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'konouluc0@gmail.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Lomé, Togo',
      description: 'Basé à Lomé'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="success-message">
        <CheckCircle size={64} color="#0ea5e9" style={{ marginBottom: '24px' }} />
        <h2>
          Message envoyé avec succès !
        </h2>
        <p>
          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="success-button"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="contact-form-container">
      {/* Contact Information */}
      <div className="contact-info">
        <div className="contact-methods">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-method">
              <div className="contact-method-icon">
                <info.icon size={24} color="white" />
              </div>
              <div className="contact-method-content">
                <h3>
                  {info.title}
                </h3>
                <p>
                  {info.content}
                </p>
                <p>
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>
          Envoyez-nous un message
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>
              Nom complet *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Votre nom complet"
            />
            {errors.name && (
              <p className="form-error">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>
              Adresse email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>
              Téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(+228) 98 75 45 25"
            />
            {errors.phone && (
              <p className="form-error">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="form-group">
            <label>
              Sujet *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="demande-info">Demande d'information</option>
              <option value="devis">Demande de devis</option>
              <option value="support">Support technique</option>
              <option value="partenariat">Partenariat</option>
              <option value="autre">Autre</option>
            </select>
            {errors.subject && (
              <p className="form-error">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="form-group">
            <label>
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              placeholder="Décrivez votre demande en détail..."
            />
            {errors.message && (
              <p className="form-error">
                {errors.message}
              </p>
            )}
          </div>

          {/* Error message général */}
          {errors.message && typeof errors.message === 'string' && errors.message !== 'Le message est requis' && errors.message.length > 50 && (
            <div className="form-error" style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fee', border: '1px solid #fcc', borderRadius: '4px' }}>
              {errors.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={20} />
                Envoyer le message
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
