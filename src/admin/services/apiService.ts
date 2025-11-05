const API_BASE_URL = 'https://ecopower-api.vercel.app';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Types pour les réponses API
interface SystemStatusResponse {
  services: Array<{
    name: string;
    status: string;
    responseTime: number | null;
    connected: boolean;
    indicator: 'online' | 'offline' | 'warning';
  }>;
  systemInfo: {
    uptime: {
      days: number;
      hours: number;
      minutes: number;
      formatted: string;
    };
    memory: {
      total: number;
      used: number;
      free: number;
      percentage: number;
    };
    storage: {
      total: number;
      used: number;
      free: number;
      percentage: number;
    };
    nodeVersion: string;
    platform: string;
    arch: string;
    cpuCount: number;
  };
  timestamp: string;
}

interface SystemInfoResponse {
  version: {
    api: string;
    node: string;
    platform: string;
  };
  uptime: {
    days: number;
    hours: number;
    minutes: number;
    total: number;
  };
  memory: {
    used: string;
    total: string;
    percentage: string;
  };
  storage: {
    used: string;
    total: string;
    percentage: string;
  };
  database: {
    type: string;
    version: string;
    status: string;
  };
  environment: string;
  timestamp: string;
}

interface DashboardStatsResponse {
  utilisateurs: {
    total: number;
    proprietaires: number;
    residents: number;
    admins: number;
  };
  maisons: {
    total: number;
  };
  consommations: {
    total: number;
    totalKwh: number;
    totalMontant: number;
  };
  factures: {
    total: number;
    payees: number;
    enRetard: number;
    enAttente: number;
    revenusTotaux: number;
  };
  graphiques: {
    consommationsParMois: Array<{
      _id: { annee: number; mois: number };
      totalKwh: number;
      totalMontant: number;
      count: number;
    }>;
    facturesParMois: Array<{
      _id: { annee: number; mois: number };
      totalMontant: number;
      count: number;
      payees: number;
    }>;
    topMaisons: Array<{
      _id: string;
      totalKwh: number;
      totalMontant: number;
      count: number;
      maison: {
        _id: string;
        nomMaison: string;
        adresse: string;
      };
    }>;
  };
}

interface UsersResponse {
  users: Array<{
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: string;
    createdAt: string;
    lastLogin?: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface HousesResponse {
  maisons: Array<{
    _id: string;
    nomMaison: string;
    adresse: string;
    proprietaireId: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    listeResidents: Array<{
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    }>;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ConsumptionsResponse {
  consommations: Array<{
    _id: string;
    residentId: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    maisonId: {
      _id: string;
      nomMaison: string;
      adresse: string;
    };
    kwh: number;
    mois: number;
    annee: number;
    montant: number;
    statut: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface BillsResponse {
  factures: Array<{
    _id: string;
    residentId: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    maisonId: {
      _id: string;
      nomMaison: string;
      adresse: string;
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
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface ResidentsResponse {
  residents: Array<{
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: string;
    createdAt: string;
    lastLogin?: string;
    maison?: {
      _id: string;
      nomMaison: string;
      adresse: string | {
        rue?: string;
        ville?: string;
        codePostal?: string;
        pays?: string;
      };
    };
    statistiques: {
      totalKwh: number;
      totalFactures: number;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface SubscriptionsResponse {
  subscriptions: Array<{
    _id: string;
    residentId: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    maisonId: {
      _id: string;
      nomMaison: string;
      adresse: string;
    };
    typeAbonnement: string;
    montant: number;
    dateDebut: string;
    dateFin: string;
    statut: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface MessagesResponse {
  messages: Array<{
    _id: string;
    sujet: string;
    contenu: string;
    type: string;
    statut: string;
    expediteur: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    destinataire: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    dateEnvoi: string;
    dateLecture?: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface NotificationsResponse {
  notifications: Array<{
    _id: string;
    titre: string;
    contenu: string;
    type: string;
    statut: string;
    destinataire: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    dateEnvoi: string;
    dateLecture?: string;
    priorite: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface LogsResponse {
  logs: Array<{
    _id: string;
    level: string;
    message: string;
    module: string;
    action: string;
    user?: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
    };
    ip?: string;
    userAgent?: string;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('admin_access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de l\'API');
      }

      return { data };
    } catch (error) {
      console.error('Erreur API:', error);
      return { 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    }
  }

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<DashboardStatsResponse>> {
    return this.request<DashboardStatsResponse>('/admin/dashboard/stats');
  }

  // Utilisateurs
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<ApiResponse<UsersResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.role) searchParams.append('role', params.role);
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return this.request<UsersResponse>(`/admin/users${query ? `?${query}` : ''}`);
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, { method: 'DELETE' });
  }

  // Maisons
  async getHouses(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<HousesResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return this.request<HousesResponse>(`/admin/houses${query ? `?${query}` : ''}`);
  }

  async deleteHouse(id: string) {
    return this.request(`/admin/houses/${id}`, { method: 'DELETE' });
  }

  // Consommations
  async getConsumptions(params?: {
    page?: number;
    limit?: number;
    annee?: number;
    mois?: number;
    maisonId?: string;
    search?: string;
  }): Promise<ApiResponse<ConsumptionsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.annee) searchParams.append('annee', params.annee.toString());
    if (params?.mois) searchParams.append('mois', params.mois.toString());
    if (params?.maisonId) searchParams.append('maisonId', params.maisonId);
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return this.request<ConsumptionsResponse>(`/admin/consumptions${query ? `?${query}` : ''}`);
  }

  // Factures
  async getBills(params?: {
    page?: number;
    limit?: number;
    statut?: string;
    annee?: number;
    maisonId?: string;
    search?: string;
  }): Promise<ApiResponse<BillsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.statut) searchParams.append('statut', params.statut);
    if (params?.annee) searchParams.append('annee', params.annee.toString());
    if (params?.maisonId) searchParams.append('maisonId', params.maisonId);
    if (params?.search) searchParams.append('search', params.search);

    const query = searchParams.toString();
    return this.request<BillsResponse>(`/admin/bills${query ? `?${query}` : ''}`);
  }

  // Abonnements
  async getSubscriptions(params?: {
    page?: number;
    limit?: number;
    statut?: string;
    search?: string;
    type?: string;
  }): Promise<ApiResponse<SubscriptionsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.statut) searchParams.append('statut', params.statut);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.type) searchParams.append('type', params.type);

    const query = searchParams.toString();
    return this.request<SubscriptionsResponse>(`/admin/subscriptions${query ? `?${query}` : ''}`);
  }

  // Résidents
  async getResidents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    statut?: string;
  }): Promise<ApiResponse<ResidentsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.statut) searchParams.append('statut', params.statut);

    const query = searchParams.toString();
    return this.request<ResidentsResponse>(`/admin/residents${query ? `?${query}` : ''}`);
  }

  // Supprimer un résident
  async deleteResident(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/admin/residents/${id}`, {
      method: 'DELETE'
    });
  }

  // Messages
  async getMessages(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    status?: string;
  }): Promise<ApiResponse<MessagesResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.status) searchParams.append('status', params.status);

    const query = searchParams.toString();
    return this.request<MessagesResponse>(`/admin/messages${query ? `?${query}` : ''}`);
  }

  // Notifications
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    status?: string;
  }): Promise<ApiResponse<NotificationsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.status) searchParams.append('status', params.status);

    const query = searchParams.toString();
    return this.request<NotificationsResponse>(`/admin/notifications${query ? `?${query}` : ''}`);
  }

  // Logs
  async getLogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    level?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<ApiResponse<LogsResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.level) searchParams.append('level', params.level);
    if (params?.dateFrom) searchParams.append('dateFrom', params.dateFrom);
    if (params?.dateTo) searchParams.append('dateTo', params.dateTo);

    const query = searchParams.toString();
    return this.request<LogsResponse>(`/admin/logs${query ? `?${query}` : ''}`);
  }

  // Informations système
  async getSystemStatus(): Promise<ApiResponse<SystemStatusResponse>> {
    return this.request<SystemStatusResponse>('/admin/system/status');
  }

  async getSystemInfo(): Promise<ApiResponse<SystemInfoResponse>> {
    return this.request<SystemInfoResponse>('/admin/system/info');
  }
}

export default new ApiService();
