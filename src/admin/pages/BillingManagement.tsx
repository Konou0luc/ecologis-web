import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Receipt,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Mail,
  Home,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Zap,
  User,
  MapPin
} from 'lucide-react';
import apiService from '../services/apiService';
import { generateInvoicePdf } from '../services/pdfService';
import { AdminCard, AdminCardHeader, AdminCardTitle, AdminCardDescription, AdminCardContent } from '../components/ui/AdminCard';
import { AdminButton } from '../components/ui/AdminButton';
import { AdminTable, AdminTableHeader, AdminTableRow, AdminTableHead, AdminTableCell, AdminTableBody } from '../components/ui/AdminTable';
import { AdminModal } from '../components/ui/AdminModal';

interface Bill {
  _id: string;
  numeroFacture?: string;
  residentId: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  maisonId: {
    _id: string;
    nomMaison: string;
    adresse: string | {
      rue?: string;
      ville?: string;
      codePostal?: string;
      pays?: string;
    };
  };
  consommationId: {
    _id: string;
    kwh: number;
    mois: number;
    annee: number;
  };
  montant: number;
  statut: string;
  dateEmission: string;
  datePaiement?: string;
  createdAt: string;
  facturePdf?: string;
  url?: string;
  details?: {
    prixKwh?: number;
    fraisFixes?: number;
  };
}

const BillingManagement: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<number>(new Date().getFullYear());
  const [stats, setStats] = useState<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showBillModal, setShowBillModal] = useState(false);

  useEffect(() => {
    loadBills();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter, yearFilter, pagination.page, pagination.limit]);

  const loadBills = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBills({
        page: pagination.page,
        limit: pagination.limit,
        statut: statusFilter !== 'all' ? statusFilter : undefined,
        annee: yearFilter,
        search: searchQuery || undefined
      });
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setBills(response.data.factures);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      setError('Erreur lors du chargement des factures');
      console.error('Erreur factures:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Erreur stats:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthYear = (mois: number, annee: number) => {
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return `${monthNames[mois - 1]} ${annee}`;
  };

  const formatAdresse = (adresse: string | { rue?: string; ville?: string; codePostal?: string; pays?: string; }) => {
    if (typeof adresse === 'string') {
      return adresse;
    }
    
    if (!adresse || typeof adresse !== 'object') {
      return 'Non renseignée';
    }

    const parts = [
      adresse.rue,
      adresse.ville,
      adresse.codePostal,
      adresse.pays
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(', ') : 'Non renseignée';
  };

  const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
  };

  const getAvatarColor = (prenom: string, nom: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
    ];
    const index = ((prenom?.charCodeAt(0) || 0) + (nom?.charCodeAt(0) || 0)) % colors.length;
    return colors[index];
  };

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      'payee': { label: 'Payée', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      'en_attente': { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
      'en_retard': { label: 'En retard', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      'annulee': { label: 'Annulée', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle },
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig] || statusConfig.en_attente;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill);
    setShowBillModal(true);
  };

  const handleDownloadBill = async (bill: Bill) => {
    try {
      // Afficher un indicateur de chargement
      const loadingMessage = document.createElement('div');
      loadingMessage.textContent = 'Génération du PDF en cours...';
      loadingMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999;';
      document.body.appendChild(loadingMessage);

      // Récupérer les informations complètes du résident
      const residentsResponse = await apiService.getResidents({
        page: 1,
        limit: 100,
      });

      let residentFullData = null;
      if (!residentsResponse.error && residentsResponse.data) {
        residentFullData = residentsResponse.data.residents.find(
          (r: any) => r._id === bill.residentId._id
        );
      }

      // Récupérer la consommation associée à cette facture
      const consumptionResponse = await apiService.getConsumptions({
        page: 1,
        limit: 100,
        annee: bill.consommationId.annee,
        mois: bill.consommationId.mois,
      });

      if (consumptionResponse.error || !consumptionResponse.data) {
        document.body.removeChild(loadingMessage);
        alert('Erreur lors de la récupération de la consommation');
        return;
      }

      // Trouver la consommation correspondante
      const consumption = consumptionResponse.data.consommations.find(
        (c: any) => 
          c.residentId._id === bill.residentId._id &&
          c.mois === bill.consommationId.mois &&
          c.annee === bill.consommationId.annee
      );

      if (!consumption) {
        document.body.removeChild(loadingMessage);
        alert('Consommation non trouvée pour cette période');
        return;
      }

      // Préparer les données pour le PDF
      const residentData = {
        _id: bill.residentId._id,
        nom: bill.residentId.nom,
        prenom: bill.residentId.prenom,
        email: bill.residentId.email,
        telephone: residentFullData?.telephone || 'Non renseigné',
      };

      const consumptionData = {
        _id: consumption._id,
        kwh: consumption.kwh,
        mois: consumption.mois,
        annee: consumption.annee,
        previousIndex: (consumption as any).previousIndex || 0,
        currentIndex: (consumption as any).currentIndex || consumption.kwh,
      };

      const billData = {
        ...bill,
        numeroFacture: bill.numeroFacture || `FAC-${bill._id.slice(-8).toUpperCase()}`,
        details: {
          prixKwh: bill.details?.prixKwh || (bill.montant / consumption.kwh),
          fraisFixes: bill.details?.fraisFixes || 0,
        },
      };

      // Générer le PDF
      await generateInvoicePdf(
        billData,
        residentData,
        consumptionData,
        bill.maisonId.nomMaison
      );

      // Retirer l'indicateur de chargement
      document.body.removeChild(loadingMessage);
    } catch (err) {
      console.error('Erreur génération PDF:', err);
      const loadingMessages = document.querySelectorAll('div');
      loadingMessages.forEach((msg: any) => {
        if (msg.textContent === 'Génération du PDF en cours...') {
          document.body.removeChild(msg);
        }
      });
      alert('Erreur lors de la génération de la facture: ' + (err as Error).message);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedBills = [...bills].sort((a, b) => {
    if (!sortColumn) return 0;
    
    let comparison = 0;
    switch (sortColumn) {
      case 'resident':
        comparison = `${a.residentId.prenom} ${a.residentId.nom}`.localeCompare(`${b.residentId.prenom} ${b.residentId.nom}`);
        break;
      case 'maison':
        comparison = a.maisonId.nomMaison.localeCompare(b.maisonId.nomMaison);
        break;
      case 'montant':
        comparison = a.montant - b.montant;
        break;
      case 'dateEmission':
        comparison = new Date(a.dateEmission).getTime() - new Date(b.dateEmission).getTime();
        break;
      case 'statut':
        comparison = a.statut.localeCompare(b.statut);
        break;
      default:
        return 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="w-3 h-3 text-gray-400 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-3 h-3 text-gray-600" />
      : <ChevronDown className="w-3 h-3 text-gray-600" />;
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading && bills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFA800] rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Chargement des factures...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Gestion des factures</h1>
          <p className="text-sm text-gray-500 text-left">Gérez et suivez toutes les factures de la plateforme</p>
        </div>
        <AdminButton 
          variant="outline"
          onClick={() => {}}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exporter
        </AdminButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.factures?.total || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Factures totales</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              +45
            </span>
            <span className="text-xs text-gray-500">ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.factures?.revenusTotaux?.toLocaleString() || '0'} FCFA
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Chiffre d'affaires</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              +18%
            </span>
            <span className="text-xs text-gray-500">ce mois</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.factures?.payees || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">Factures payées</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
              97.4%
            </span>
            <span className="text-xs text-gray-500">taux de paiement</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {stats?.factures?.enAttente || '0'}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-4">En attente</div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700">
              2.6%
            </span>
            <span className="text-xs text-gray-500">du total</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <AdminCard className="bg-white border border-gray-200 mb-6">
        <AdminCardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une facture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm bg-white min-w-[180px]"
              >
                <option value="all">Tous les statuts</option>
                <option value="payee">Payée</option>
                <option value="en_attente">En attente</option>
                <option value="en_retard">En retard</option>
                <option value="annulee">Annulée</option>
              </select>
            </div>

            {/* Year Filter */}
            <select 
              value={yearFilter}
              onChange={(e) => setYearFilter(Number(e.target.value))}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent text-sm bg-white min-w-[120px]"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(searchQuery || statusFilter !== 'all') && (
              <AdminButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </AdminButton>
            )}
          </div>
        </AdminCardContent>
      </AdminCard>

      {/* Bills Table */}
      <AdminCard className="bg-white border border-gray-200 shadow-lg overflow-hidden">
        <AdminCardHeader className="bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <AdminCardTitle className="text-xl font-bold text-gray-900 text-left">Liste des factures</AdminCardTitle>
              <AdminCardDescription className="text-sm text-gray-500 text-left mt-1">
                {pagination.total} facture{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
              </AdminCardDescription>
            </div>
          </div>
        </AdminCardHeader>
        
        <AdminCardContent className="p-0">
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
              <AdminButton
                variant="outline"
                size="sm"
                onClick={loadBills}
                className="mt-2"
              >
                Réessayer
              </AdminButton>
            </div>
          )}

          {!loading && sortedBills.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Aucune facture trouvée</p>
              <p className="text-xs text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}

          {sortedBills.length > 0 && (
            <div className="overflow-x-auto">
              <AdminTable>
                <AdminTableHeader>
                  <AdminTableRow>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('resident')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Résident
                        <SortIcon column="resident" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('maison')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Maison
                        <SortIcon column="maison" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <span className="flex items-center gap-2">Consommation</span>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('montant')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Montant
                        <SortIcon column="montant" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('dateEmission')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Date
                        <SortIcon column="dateEmission" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead>
                      <button
                        onClick={() => handleSort('statut')}
                        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                      >
                        Statut
                        <SortIcon column="statut" />
                      </button>
                    </AdminTableHead>
                    <AdminTableHead className="text-right">Actions</AdminTableHead>
                  </AdminTableRow>
                </AdminTableHeader>
                <AdminTableBody>
                  {sortedBills.map((bill, index) => (
                    <AdminTableRow 
                      key={bill._id}
                      className={`hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <AdminTableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(bill.residentId.prenom, bill.residentId.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                            {getInitials(bill.residentId.prenom, bill.residentId.nom)}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-semibold text-gray-900 text-left">
                              {bill.residentId.prenom} {bill.residentId.nom}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 text-left">
                              <Mail className="w-3 h-3" />
                              {bill.residentId.email}
                            </div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {bill.maisonId.nomMaison}
                          </span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {bill.consommationId.kwh} kWh
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatMonthYear(bill.consommationId.mois, bill.consommationId.annee)}
                            </div>
                          </div>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">
                            {bill.montant.toFixed(0)} FCFA
                          </span>
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="text-sm text-gray-600">
                          {formatDate(bill.dateEmission)}
                        </div>
                      </AdminTableCell>
                      <AdminTableCell>
                        {getStatusBadge(bill.statut)}
                      </AdminTableCell>
                      <AdminTableCell>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDownloadBill(bill)}
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="Télécharger la facture"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleViewBill(bill)}
                            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="Voir les détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </AdminTableCell>
                    </AdminTableRow>
                  ))}
                </AdminTableBody>
              </AdminTable>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pagination.page} sur {pagination.pages}
              </div>
              <div className="flex items-center gap-2">
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="flex items-center gap-1"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </AdminButton>
              </div>
            </div>
          )}
        </AdminCardContent>
      </AdminCard>

      {/* Bill Details Modal */}
      <AdminModal
        isOpen={showBillModal}
        onClose={() => setShowBillModal(false)}
        title="Détails de la facture"
        size="lg"
      >
        {selectedBill && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Receipt className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 text-left">Facture #{selectedBill._id.slice(-8).toUpperCase()}</h3>
                <p className="text-sm text-gray-500 text-left mt-1">
                  Émise le {formatDate(selectedBill.dateEmission)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(selectedBill.statut)}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Résident */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Résident</label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(selectedBill.residentId.prenom, selectedBill.residentId.nom)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}>
                      {getInitials(selectedBill.residentId.prenom, selectedBill.residentId.nom)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedBill.residentId.prenom} {selectedBill.residentId.nom}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {selectedBill.residentId.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maison */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Home className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Maison</label>
                  <div className="text-sm font-medium text-gray-900 mt-1">{selectedBill.maisonId.nomMaison}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {formatAdresse(selectedBill.maisonId.adresse)}
                  </div>
                </div>
              </div>

              {/* Consommation */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Zap className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Consommation</label>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                    {selectedBill.consommationId.kwh} kWh
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatMonthYear(selectedBill.consommationId.mois, selectedBill.consommationId.annee)}
                  </div>
                </div>
              </div>

              {/* Montant */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <DollarSign className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Montant</label>
                  <span className="text-lg font-bold text-gray-900">{selectedBill.montant.toFixed(0)} FCFA</span>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 text-left">Dates</label>
                  <div className="text-sm text-gray-900 mt-1">
                    <div>Émission: {formatDate(selectedBill.dateEmission)}</div>
                    {selectedBill.datePaiement && (
                      <div className="mt-1">Paiement: {formatDate(selectedBill.datePaiement)}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <AdminButton
                variant="outline"
                onClick={() => setShowBillModal(false)}
              >
                Fermer
              </AdminButton>
              <AdminButton
                onClick={() => selectedBill && handleDownloadBill(selectedBill)}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger la facture
              </AdminButton>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default BillingManagement;
