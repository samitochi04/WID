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
   git clone https://github.com/samitochi04/WID.git
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

# Demonstration 

1. Connexion
![widlogin](https://github.com/user-attachments/assets/ce58b666-6082-4f40-824b-1c45e2eef70e)

2. Inscription

![widsignup](https://github.com/user-attachments/assets/5bd61180-8ff3-4283-a590-dad8b4561df1)

3. Light Mode

![lightmode](https://github.com/user-attachments/assets/55fdfdf1-4293-4d96-ad8d-4e45f4a6d646)

4. Interface

![kg,jdwid](https://github.com/user-attachments/assets/f2d0be3e-f316-497d-a3f4-a0ef61816109)


# Présentation du Fonctionnement de l'Application

## Vue d'ensemble
L'application WID est une solution full-stack utilisant **React** pour le frontend et **TypeScript** pour le backend. Elle permet aux utilisateurs de s'inscrire, de se connecter et d'interagir avec des données stockées dans une base MySQL. Elle est conçue avec une architecture modulaire et suit les meilleures pratiques du développement web moderne.

---

## Fonctionnement Global

### 1. **Backend (TypeScript & MySQL)**
Le backend est responsable de la gestion des utilisateurs, de l'authentification et de la communication avec la base de données.

- **`server.js`** : Point d'entrée du serveur Express, il initialise les middlewares et démarre l'application.
- **`routes/`** : Contient les différentes routes de l'API (authentification, gestion des utilisateurs, etc.).
- **`controllers/`** : Contient la logique métier de chaque route.
- **`models/`** : Définit les structures des données et la gestion des interactions avec MySQL via `mysql2`.
- **`middleware/`** : Contient des fonctions pour sécuriser les endpoints (ex: vérification des tokens JWT).
- **`.env`** : Fichier contenant les variables d'environnement comme les clés de connexion à la base de données.

### 2. **Base de données (MySQL/PlanetScale)**
- Stocke les utilisateurs et les informations nécessaires au bon fonctionnement de l'application.
- Gérée avec `mysql2`, elle assure la persistance des données.

### 3. **Frontend (React & Tailwind CSS)**
Le frontend est développé en React avec un design basé sur Tailwind CSS pour assurer une interface utilisateur fluide et responsive.

- **`index.html`** : Fichier principal qui charge l'application React.
- **`src/App.js`** : Point d'entrée principal du frontend React.
- **`src/components/`** : Contient les composants réutilisables.
- **`src/pages/`** : Contient les différentes pages de l'application.
- **`src/store.js`** : Utilise `zustand` pour la gestion de l'état global.
- **`tailwind.config.js`** : Configuration de Tailwind CSS pour le style de l'application.

### 4. **Interaction Backend-Frontend**
L'application communique via une API REST.
- **Authentification JWT** : Lorsqu'un utilisateur se connecte, un token est généré et stocké pour valider les requêtes futures.
- **Appels API via `fetch`** : Le frontend envoie des requêtes HTTP (GET, POST, etc.) au backend pour récupérer ou modifier des données.
- **Mise à jour en temps réel** : Grâce à `zustand`, l'état est mis à jour dynamiquement sur l'interface utilisateur.

---

## Conclusion
Cette application suit une architecture claire et modulaire, permettant une extensibilité et une maintenance aisée. Elle utilise des technologies modernes pour offrir une expérience utilisateur fluide et une gestion efficace des données.






   
