import jsPDF from 'jspdf';

interface Bill {
  _id: string;
  numeroFacture?: string;
  montant: number;
  dateEmission: string;
  datePaiement?: string;
  statut: string;
  consommationId: {
    _id: string;
    kwh: number;
    mois: number;
    annee: number;
  };
  details?: {
    prixKwh?: number;
    fraisFixes?: number;
  };
}

interface Resident {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

interface Consumption {
  _id: string;
  kwh: number;
  mois: number;
  annee: number;
  previousIndex?: number;
  currentIndex?: number;
}

const PRIMARY_COLOR = [255, 168, 0]; // #FFA800
const PRIMARY_COLOR_DARK = [230, 149, 0]; // #E69500
const SECONDARY_COLOR = [38, 38, 38]; // #262626
const LIGHT_GRAY = [245, 245, 245]; // #F5F5F5
const DARK_GRAY = [102, 102, 102]; // #666666
const BORDER_GRAY = [224, 224, 224]; // #E0E0E0
const WHITE_70 = [179, 179, 179]; // 70% white opacity
const WHITE_60 = [153, 153, 153]; // 60% white opacity

export const generateInvoicePdf = async (
  bill: Bill,
  resident: Resident,
  consumption: Consumption,
  maisonName: string
): Promise<void> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 32; // 32px margin comme dans le mobile
  let yPos = margin;

  // En-tête avec gradient (on simule avec un dégradé de couleur)
  const headerHeight = 50;
  const headerWidth = pageWidth - 2 * margin;
  
  // Dessiner le gradient ligne par ligne pour simuler l'effet de dégradé
  // On dessine plusieurs bandes horizontales avec des couleurs qui varient progressivement
  for (let i = 0; i < headerHeight; i++) {
    const ratio = i / headerHeight;
    const r = Math.round(PRIMARY_COLOR[0] + (PRIMARY_COLOR_DARK[0] - PRIMARY_COLOR[0]) * ratio);
    const g = Math.round(PRIMARY_COLOR[1] + (PRIMARY_COLOR_DARK[1] - PRIMARY_COLOR[1]) * ratio);
    const b = Math.round(PRIMARY_COLOR[2] + (PRIMARY_COLOR_DARK[2] - PRIMARY_COLOR[2]) * ratio);
    doc.setFillColor(r, g, b);
    doc.rect(margin, yPos + i, headerWidth, 1, 'F');
  }
  
  // Appliquer les coins arrondis en utilisant roundedRect par-dessus
  // On dessine un rectangle avec coins arrondis qui masque les coins carrés
  // Pour cela, on dessine le gradient d'abord, puis on applique un masque arrondi
  // Approche simplifiée : utiliser roundedRect avec la couleur moyenne du gradient
  const avgR = Math.round((PRIMARY_COLOR[0] + PRIMARY_COLOR_DARK[0]) / 2);
  const avgG = Math.round((PRIMARY_COLOR[1] + PRIMARY_COLOR_DARK[1]) / 2);
  const avgB = Math.round((PRIMARY_COLOR[2] + PRIMARY_COLOR_DARK[2]) / 2);
  
  // Redessiner le gradient avec coins arrondis (approximation)
  // On dessine le rectangle avec coins arrondis puis on redessine le gradient à l'intérieur
  doc.setFillColor(avgR, avgG, avgB);
  doc.roundedRect(margin, yPos, headerWidth, headerHeight, 3, 3, 'F');
  
  // Redessiner le gradient à l'intérieur du rectangle arrondi
  const innerMargin = 1; // Petite marge pour éviter les bords
  for (let i = innerMargin; i < headerHeight - innerMargin; i++) {
    const ratio = i / headerHeight;
    const r = Math.round(PRIMARY_COLOR[0] + (PRIMARY_COLOR_DARK[0] - PRIMARY_COLOR[0]) * ratio);
    const g = Math.round(PRIMARY_COLOR[1] + (PRIMARY_COLOR_DARK[1] - PRIMARY_COLOR[1]) * ratio);
    const b = Math.round(PRIMARY_COLOR[2] + (PRIMARY_COLOR_DARK[2] - PRIMARY_COLOR[2]) * ratio);
    doc.setFillColor(r, g, b);
    doc.rect(margin + innerMargin, yPos + i, headerWidth - 2 * innerMargin, 1, 'F');
  }
  
  // Texte ECOPOWER
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('ECOPOWER', margin + 10, yPos + 20);
  
  // Sous-titre
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(WHITE_70[0], WHITE_70[0], WHITE_70[0]);
  doc.text('Gestion de Consommation Électrique', margin + 10, yPos + 30);
  
  // Badge FACTURE (blanc avec coins arrondis)
  const badgeWidth = 50;
  const badgeHeight = 20;
  const badgeX = pageWidth - margin - badgeWidth;
  const badgeY = yPos + 10;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 10, 10, 'F');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURE', badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + 3, { align: 'center' });

  yPos += headerHeight + 32; // 32px d'espacement

  // Informations de la facture (fond gris clair avec bordure orange)
  const invoiceInfoHeight = 40;
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, invoiceInfoHeight, 2, 2, 'F');
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, invoiceInfoHeight, 2, 2, 'S');

  // Numéro de facture (gauche)
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Numéro de facture', margin + 10, yPos + 10);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  const invoiceNumber = bill.numeroFacture || `FAC-${bill._id.slice(-8).toUpperCase()}`;
  doc.text(invoiceNumber, margin + 10, yPos + 20);

  // Date d'émission (droite)
  const emissionDate = formatDate(bill.dateEmission);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.text('Date d\'émission', pageWidth - margin - 10, yPos + 10, { align: 'right' });
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.text(emissionDate, pageWidth - margin - 10, yPos + 20, { align: 'right' });

  yPos += invoiceInfoHeight + 24; // 24px d'espacement

  // Informations du résident (fond blanc avec bordure grise)
  const residentInfoHeight = 50;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, residentInfoHeight, 2, 2, 'F');
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, residentInfoHeight, 2, 2, 'S');

  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Facturé à', margin + 10, yPos + 15);

  // Nom du résident (gauche)
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`${resident.prenom} ${resident.nom}`, margin + 10, yPos + 28);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK_GRAY[0], DARK_GRAY[1], DARK_GRAY[2]);
  doc.text(maisonName, margin + 10, yPos + 36);

  // Téléphone et email (droite)
  doc.text(resident.telephone, pageWidth - margin - 10, yPos + 28, { align: 'right' });
  doc.text(resident.email, pageWidth - margin - 10, yPos + 36, { align: 'right' });

  yPos += residentInfoHeight + 32; // 32px d'espacement

  // Tableau de consommation
  const tableWidth = pageWidth - 2 * margin;
  const tableHeaderHeight = 20;
  const tableRowHeight = 20;
  
  // En-tête du tableau (fond orange)
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.roundedRect(margin, yPos, tableWidth, tableHeaderHeight, 2, 2, 'F');
  // On ne garde que les coins supérieurs arrondis
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, yPos + tableHeaderHeight - 2, tableWidth, 2, 'F');
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  
  // Colonnes du tableau
  const colWidths = [
    tableWidth * 0.30,  // Description (flex: 2)
    tableWidth * 0.14,  // Ancien Index
    tableWidth * 0.14,  // Nouvel Index
    tableWidth * 0.12,  // kWh
    tableWidth * 0.15,  // Tarif/kWh
    tableWidth * 0.15,  // Montant
  ];
  
  let xPos = margin + 5;
  doc.text('Description', xPos, yPos + 12);
  xPos += colWidths[0];
  doc.text('Ancien Index', xPos + colWidths[1] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[1];
  doc.text('Nouvel Index', xPos + colWidths[2] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[2];
  doc.text('kWh', xPos + colWidths[3] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[3];
  doc.text('Tarif/kWh', xPos + colWidths[4] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[4];
  doc.text('Montant', xPos + colWidths[5] / 2, yPos + 12, { align: 'center' });

  yPos += tableHeaderHeight;

  // Ligne de données (fond blanc)
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, yPos, tableWidth, tableRowHeight, 'F');
  doc.setDrawColor(BORDER_GRAY[0], BORDER_GRAY[1], BORDER_GRAY[2]);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, tableWidth, tableRowHeight, 'S');

  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  const tarifKwh = bill.details?.prixKwh || 150;
  const montantConsommation = consumption.kwh * tarifKwh;
  const previousIndex = consumption.previousIndex || 0;
  const currentIndex = consumption.currentIndex || consumption.kwh;

  xPos = margin + 5;
  doc.text('Consommation électrique', xPos, yPos + 12);
  xPos += colWidths[0];
  doc.text(previousIndex.toString(), xPos + colWidths[1] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[1];
  doc.text(currentIndex.toString(), xPos + colWidths[2] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[2];
  doc.text(consumption.kwh.toFixed(2), xPos + colWidths[3] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[3];
  doc.text(`${tarifKwh.toFixed(4)} FCFA`, xPos + colWidths[4] / 2, yPos + 12, { align: 'center' });
  xPos += colWidths[4];
  doc.text(`${formatNumber(montantConsommation)} FCFA`, xPos + colWidths[5] / 2, yPos + 12, { align: 'center' });

  yPos += tableRowHeight + 32; // 32px d'espacement

  // Résumé final (fond gris clair avec bordure orange épaisse)
  const summaryHeight = 60;
  doc.setFillColor(LIGHT_GRAY[0], LIGHT_GRAY[1], LIGHT_GRAY[2]);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, summaryHeight, 2, 2, 'F');
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(2);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, summaryHeight, 2, 2, 'S');

  doc.setTextColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');

  const fraisFixes = bill.details?.fraisFixes || 0;
  const totalTTC = bill.montant;

  // Consommation électrique
  doc.text('Consommation électrique:', margin + 10, yPos + 15);
  doc.text(`${formatNumber(montantConsommation)} FCFA`, pageWidth - margin - 10, yPos + 15, { align: 'right' });

  // Frais fixes
  doc.text('Frais fixes:', margin + 10, yPos + 28);
  doc.text(`${formatNumber(fraisFixes)} FCFA`, pageWidth - margin - 10, yPos + 28, { align: 'right' });

  // Ligne de séparation
  doc.setDrawColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.setLineWidth(1);
  doc.line(margin + 10, yPos + 35, pageWidth - margin - 10, yPos + 35);

  // Total TTC
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.text('TOTAL TTC:', margin + 10, yPos + 50);

  // Badge Total (fond orange)
  const totalBadgeWidth = 70;
  const totalBadgeHeight = 15;
  const totalBadgeX = pageWidth - margin - totalBadgeWidth;
  const totalBadgeY = yPos + 40;
  doc.setFillColor(PRIMARY_COLOR[0], PRIMARY_COLOR[1], PRIMARY_COLOR[2]);
  doc.roundedRect(totalBadgeX, totalBadgeY, totalBadgeWidth, totalBadgeHeight, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(`${formatNumber(totalTTC)} FCFA`, totalBadgeX + totalBadgeWidth / 2, totalBadgeY + totalBadgeHeight / 2 + 3, { align: 'center' });

  yPos += summaryHeight + 40; // 40px d'espacement

  // Bas de page (fond noir)
  const footerHeight = 40;
  doc.setFillColor(SECONDARY_COLOR[0], SECONDARY_COLOR[1], SECONDARY_COLOR[2]);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, footerHeight, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Merci pour votre confiance !', pageWidth / 2, yPos + 15, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(WHITE_70[0], WHITE_70[0], WHITE_70[0]);
  doc.text(
    'Pour toute question concernant cette facture, n\'hésitez pas à nous contacter.',
    pageWidth / 2,
    yPos + 25,
    { align: 'center', maxWidth: pageWidth - 2 * margin - 20 }
  );

  doc.setFontSize(10);
  doc.setTextColor(WHITE_60[0], WHITE_60[0], WHITE_60[0]);
  doc.text('© 2024 Ecopower - Tous droits réservés', pageWidth / 2, yPos + 35, { align: 'center' });

  // Télécharger le PDF
  const fileName = `Facture_${invoiceNumber}.pdf`;
  doc.save(fileName);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};
