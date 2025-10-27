# 🎛️ Backoffice Admin Ecologis

Un backoffice web professionnel pour gérer l'ensemble de l'application Ecologis.

## 🚀 Accès

- **URL du backoffice** : `http://localhost:3000/admin`
- **Authentification** : Réservé aux utilisateurs avec le rôle `admin` ou `super-admin`

## ✨ Fonctionnalités

### 📊 Tableau de bord
- Vue d'ensemble des statistiques
- Activité récente
- Alertes système
- Actions rapides

### 👥 Gestion des utilisateurs
- Liste complète des utilisateurs
- Filtres par rôle et statut
- Détails des profils
- Gestion des permissions

### 🏠 Gestion des maisons
- Vue en cartes des propriétés
- Informations détaillées
- Gestion des résidents
- Statistiques de consommation

### 🏘️ Gestion des résidents
- Liste des résidents
- Association aux maisons
- Suivi des consommations
- Historique des factures

### ⚡ Gestion des consommations
- Suivi des relevés
- Analyses comparatives
- Graphiques de consommation
- Export de données

### 🧾 Gestion des factures
- Liste des factures
- Suivi des paiements
- Statistiques financières
- Export comptable

### 💳 Gestion des abonnements
- Gestion des offres
- Statistiques d'abonnement
- Alertes d'expiration
- Suivi des revenus

### 💬 Gestion des messages
- Chat en temps réel
- Notifications push
- Templates d'emails
- Analytics de communication

### 🔔 Gestion des notifications
- Notifications push
- Notifications email
- Notifications SMS
- Configuration avancée

### 📋 Gestion des logs
- Logs en temps réel
- Recherche avancée
- Alertes automatiques
- Analytics système

### ⚙️ Paramètres système
- Configuration de la base de données
- Paramètres de sécurité
- Configuration des notifications
- Informations système

## 🎨 Design

### Charte graphique
- **Couleur principale** : `#FFA800` (orange Ecologis)
- **Couleur secondaire** : `#FFD700` (doré)
- **Thème** : Mode sombre/clair
- **Typographie** : Inter (moderne et lisible)

### Inspirations
- Design inspiré de Dribbble
- Interface moderne et professionnelle
- Animations fluides
- Responsive design

## 🛠️ Technologies

- **Frontend** : React 19 + TypeScript
- **Routing** : React Router DOM
- **Icons** : Lucide React
- **Styling** : CSS Modules
- **API** : Intégration avec l'API Ecologis existante

## 📱 Responsive

Le backoffice est entièrement responsive et s'adapte à tous les écrans :
- **Desktop** : Interface complète avec sidebar
- **Tablet** : Adaptation des grilles et navigation
- **Mobile** : Interface optimisée pour les petits écrans

## 🔐 Sécurité

- **Authentification** : JWT avec refresh tokens
- **Autorisation** : Vérification des rôles admin/super-admin
- **Sessions** : Gestion sécurisée des sessions
- **API** : Intégration avec l'API sécurisée existante

## 🚀 Installation

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement** :
   ```bash
   npm start
   ```

3. **Accéder au backoffice** :
   ```
   http://localhost:3000/admin
   ```

## 📝 Utilisation

### Connexion
1. Accédez à `/admin`
2. Connectez-vous avec un compte admin/super-admin
3. Le système vérifie automatiquement vos permissions

### Navigation
- **Sidebar** : Navigation principale avec tous les modules
- **Header** : Recherche, notifications, profil utilisateur
- **Breadcrumbs** : Indication de la page actuelle

### Fonctionnalités avancées
- **Recherche globale** : Recherche dans tous les modules
- **Filtres** : Filtrage avancé des données
- **Export** : Export des données en différents formats
- **Thème** : Basculement entre mode sombre/clair

## 🔧 Configuration

### Variables d'environnement
```env
REACT_APP_API_URL=https://ecologis-api.vercel.app
REACT_APP_ADMIN_ROLES=admin,super-admin
```

### Personnalisation
- **Couleurs** : Modifiez les variables CSS dans `src/admin/styles/`
- **Logo** : Remplacez le logo dans les composants
- **Modules** : Ajoutez de nouveaux modules dans `src/admin/pages/`

## 📊 Intégration API

Le backoffice utilise l'API Ecologis existante :
- **Authentification** : `/auth/login`, `/auth/refresh`
- **Utilisateurs** : `/users/*`
- **Maisons** : `/maisons/*`
- **Résidents** : `/residents/*`
- **Consommations** : `/consommations/*`
- **Factures** : `/factures/*`
- **Abonnements** : `/abonnements/*`

## 🎯 Roadmap

### Phase 1 (Actuelle)
- ✅ Interface de base
- ✅ Authentification
- ✅ Tableau de bord
- ✅ Gestion des utilisateurs
- ✅ Gestion des maisons
- ✅ Gestion des résidents

### Phase 2 (À venir)
- 🔄 Modules complets (consommations, factures, etc.)
- 🔄 Graphiques et analytics
- 🔄 Export de données
- 🔄 Notifications en temps réel

### Phase 3 (Future)
- 🔄 Dashboard personnalisable
- 🔄 Rapports automatisés
- 🔄 Intégration avec des outils externes
- 🔄 API pour intégrations tierces

## 🤝 Contribution

Pour contribuer au backoffice :
1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Ouvrez une Pull Request

## 📞 Support

Pour toute question ou problème :
- **Documentation API** : Voir `API_DOCUMENTATION.md`
- **Issues** : Ouvrez une issue sur le repository
- **Contact** : Équipe de développement Ecologis

---

**🎉 Le backoffice Ecologis est prêt à révolutionner votre gestion administrative !**
