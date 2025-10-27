import React, { useEffect } from 'react';
import { X, ZoomIn, Download, Share2 } from 'lucide-react';
import './ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title: string;
    description: string;
  };
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erreur lors du partage:', err);
      }
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="image-modal-overlay" onClick={handleBackdropClick}>
      <div className="image-modal-container">
        <div className="image-modal-header">
          <div className="image-modal-title">
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </div>
          <div className="image-modal-actions">
            <button className="modal-action-btn" onClick={handleDownload} title="Télécharger">
              <Download size={18} />
            </button>
            <button className="modal-action-btn" onClick={handleShare} title="Partager">
              <Share2 size={18} />
            </button>
            <button className="modal-close-btn" onClick={onClose} title="Fermer">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="image-modal-content">
          <div className="image-container">
            <img 
              src={image.src} 
              alt={image.title}
              className="modal-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <div className="zoom-indicator">
                <ZoomIn size={24} />
                <span>Cliquez pour zoomer</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="image-modal-footer">
          <div className="image-info">
            <span className="image-resolution">Haute résolution</span>
            <span className="image-format">PNG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
