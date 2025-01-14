# Frontend - Simulateur 3D

Le frontend du projet Simulateur 3D est une application React qui permet aux utilisateurs de personnaliser des modèles 3D, comme des mugs, en téléchargeant des images et en visualisant directement le rendu sur l'objet.

---

## **Structure du Frontend**

### **1. Répertoire Principal : `/frontend`**
Ce répertoire contient les fichiers nécessaires pour le développement et le déploiement du frontend.

- **`public/`** :
  - Contient les fichiers statiques accessibles directement.
  - **`index.html`** : Page HTML principale utilisée comme conteneur pour l'application React.
  - **`static/models/`** : Répertoire où sont stockés les fichiers `.glb` (modèles 3D).

- **`src/`** :
  - Contient le code source principal de l'application React.
  - **`components/`** : Composants réutilisables, y compris `ObjectViewer.js` pour le rendu 3D.
  - **`App.js`** : Point d'entrée principal de l'application React.
  - **`index.js`** : Initialise l'application et monte le composant React dans le DOM.

- **Fichiers de configuration** :
  - **`package.json`** : Contient les dépendances et scripts du projet.
  - **`Dockerfile`** : Déploie le frontend en production via un serveur Nginx.
  - **`nginx.conf`** : Configure Nginx pour servir les fichiers statiques et rediriger les routes React.

---

## **Installation et Lancement**

### **1. Installation**
Assurez-vous d’avoir Node.js installé sur votre machine.

```bash
cd frontend
npm install
```

### **2. Lancement en Développement**
Lancez le serveur de développement React :

```bash
npm start
```

Par défaut, l'application sera accessible à `http://localhost:3000`.

### **3. Construction pour la Production**
Construisez les fichiers statiques pour le déploiement :

```bash
npm run build
```

Les fichiers générés seront placés dans le répertoire `build/`.

### **4. Servir les Fichiers en Production**
Utilisez `serve` ou Nginx pour afficher les fichiers construits :

```bash
npx serve -s build
```

---

## **Variables d'Environnement**

Le frontend utilise une variable d’environnement pour communiquer avec le backend :

- **`REACT_APP_API_URL`** : URL de l'API backend (par exemple, `https://backend-service-name.onrender.com`).

Ajoutez cette variable dans Render ou dans un fichier `.env` local pour les tests :

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## **Structure des Répertoires**

```
frontend/
├── public/
│   ├── static/
│   │   └── models/
│   │       └── mug.glb
│   └── index.html
├── src/
│   ├── components/
│   │   └── ObjectViewer.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── Dockerfile
├── nginx.conf
└── README.md
```

