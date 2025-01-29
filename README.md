# Projet React & Express

## Prérequis
Avant de commencer, assurez-vous d'avoir installé les outils suivants :

1. **Node.js** (v18+)
   - Installation : [Node.js Officiel](https://nodejs.org/)
   - Commande d'installation (Linux/macOS) :
     ```sh
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
   - Commande d'installation (Windows) : [Via le site officiel](https://nodejs.org/)

2. **NPM ou Yarn**
   - Avec Node.js, NPM est installé par défaut
   - Installation de Yarn (optionnel) :
     ```sh
     npm install -g yarn
     ```

3. **MySQL ou PlanetScale**
   - Installation MySQL : [MySQL Officiel](https://dev.mysql.com/downloads/)
   - Installation PlanetScale CLI :
     ```sh
     brew install planetscale/tap/pscale # macOS/Linux
     ```
     ou
     ```sh
     npm install -g @planetscale/database
     ```

## Installation du projet

1. **Cloner le projet**
   ```sh
   git clone <lien-du-repo>
   cd project
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   ```
3. **Configurer l'environnement**
   - Copier le fichier `.env.example` en `.env` et renseigner les variables (DB, JWT, etc.)
4. **Lancer le serveur**
   ```sh
   npm run dev
   ```

## Fonctionnalités principales

- **Authentification** : Inscription, connexion, hachage des mots de passe avec `bcryptjs`
- **Gestion des utilisateurs** : JWT avec `jose`, stockage MySQL
- **Interface utilisateur** : React avec `lucide-react` pour les icônes
- **Gestion de l'état** : `zustand` pour le state management
- **Drag & Drop** : Implémenté avec `@hello-pangea/dnd`
- **Design Responsive** : Tailwind CSS

## Scripts utiles

- **Démarrer le serveur en mode développement** :
  ```sh
  npm run dev
  ```
- **Build du projet pour la production** :
  ```sh
  npm run build
  ```
- **Lint du code** :
  ```sh
  npm run lint
  ```

## Contributeurs
- Winner KODJO.
- Samuel FOTSO.
