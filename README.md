# Simulateur 3D

Ce projet est une application de personnalisation d'objets 3D, conçue pour permettre aux utilisateurs de visualiser et personnaliser des modèles 3D (tels que des mugs ou autres objets) en ligne. L'application repose sur une architecture frontend-backend et utilise Three.js pour le rendu 3D.

---

## **Architecture du Projet**

### **1. Backend**
- **Langage** : Node.js
- **Rôle** : Fournit les API nécessaires pour gérer les interactions avec les objets 3D et les données utilisateur.
- **Port** : 5000

### **2. Frontend**
- **Framework** : React
- **Rôle** : Interface utilisateur pour charger des modèles 3D et personnaliser les zones définies sur ces modèles.
- **Port** : 3000 (en développement) ou 80 (en production avec Nginx)

### **3. Modèles 3D**
- Les fichiers `.glb` sont stockés dans le dossier `frontend/public/static/models`.
- Exemple : `mug.glb`.

---

## **Fonctionnalités**

1. **Chargement des Modèles 3D**
   - Les modèles 3D sont chargés dynamiquement en fonction de l'URL.
   - Exemple : `http://localhost:3000/?model=mug`.

2. **Personnalisation des Zones**
   - Les utilisateurs peuvent sélectionner une zone spécifique sur l'objet.
   - Les zones sélectionnées sont mises en surbrillance.

3. **Chargement d'Images**
   - Les utilisateurs peuvent télécharger une image qui sera appliquée à la zone sélectionnée.

4. **Aperçu de l'Image**
   - L'image uploadée est affichée sous la zone de personnalisation pour vérification.

5. **Gestion des Variables d'Environnement**
   - `REACT_APP_API_URL` : Permet de pointer vers l'API du backend.

---

## **Prérequis**

1. **Node.js** (version 18 ou supérieure)
2. **npm** (installé avec Node.js)
3. **Render ou un environnement Docker pour le déploiement** (optionnel en local).

---

## **Installation et Lancement en Local**

### **1. Backend**

#### Installation
```bash
cd backend
npm install
```

#### Lancement
```bash
node server.js
```

Le backend sera disponible sur `http://localhost:5000`.

### **2. Frontend**

#### Installation
```bash
cd frontend
npm install
```

#### Lancement en Développement
```bash
npm start
```

Le frontend sera disponible sur `http://localhost:3000`.

#### Lancement en Production
```bash
npm run build
npx serve -s build
```

Le frontend sera disponible sur `http://localhost:5000` si configuré avec le backend.

---

## **Déploiement sur Render**

### **Fichiers Nécessaires**

1. **render.yaml** : Configuration pour Render.
2. **Dockerfile** pour le backend : Définit l'environnement Node.js.
3. **Dockerfile** et `nginx.conf` pour le frontend : Configure Nginx pour servir les fichiers statiques.

### **Commandes Git**
1. Ajoutez les fichiers au dépôt :
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. Configurez les services sur Render en utilisant les fichiers `render.yaml` et les Dockerfiles.

---

## **Structure du Projet**

```
simulateur-3D/
├── render.yaml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── public/
│   │   ├── static/
│   │   │   └── models/
│   │   │       └── mug.glb
│   │   └── index.html
│   └── src/
│       └── ...
```

---

## **Prochaines Étapes**

1. **Intégration avec une Base de Données**
   - Enregistrer les personnalisations des utilisateurs.

2. **Amélioration des Performances**
   - Optimisation du chargement des modèles 3D.

3. **Intégration avec une Plateforme E-commerce**
   - Utiliser les informations de personnalisation pour générer des commandes.

---

Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à consulter la documentation ou à demander de l'aide ! 🚀


