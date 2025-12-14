# Boutique Bracelets Connectés — Plateforme E-commerce Complète

Ceci est une plateforme e-commerce **production-ready** pour vendre des bracelets connectés. Construite avec Next.js, Tailwind CSS, Prisma, SQLite, Stripe et NextAuth.

## 🎯 Fonctionnalités

✅ **Catalogue de produits** — Listing dynamique, pages produits individuelles
✅ **Panier** — Gestion localStorage, quantités, ajout/suppression
✅ **Paiements Stripe** — Intégration checkout complète (mode test)
✅ **Authentification** — NextAuth (login admin)
✅ **Dashboard Admin** — CRUD complet : créer, modifier, supprimer produits
✅ **Responsive Design** — Tailwind CSS moderne et mobile-friendly
✅ **Docker** — Dockerfile + docker-compose pour déploiement

## 🛠️ Stack Technique

- **Frontend** : Next.js 13+ (React 18)
- **UI** : Tailwind CSS
- **Backend** : Next.js API Routes
- **Base de données** : Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Paiements** : Stripe (mode test par défaut)
- **Auth** : NextAuth.js (credentials provider)
- **Déploiement** : Docker + Docker Compose (ou Vercel pour prod)

## 📋 Prérequis

- Node.js 18+ (ou supérieur)
- npm ou yarn
- (Optionnel) Compte Stripe gratuit pour les clés de test

## 🚀 Installation et démarrage

### 1. Cloner/Extraire le projet

```bash
cd "/Users/norchenekrb/Desktop/Site karim"
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Puis éditez `.env` :

```
# Pour développement local (SQLite) :
# DATABASE_URL="file:./dev.db"

# Pour production (PostgreSQL) :
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme
```

**Obtenir vos clés Stripe** :
1. Créez un compte gratuit sur [Stripe Dashboard](https://dashboard.stripe.com)
2. Allez dans **Developers** → **API Keys**
3. Copiez les clés **test** (`sk_test_*` et `pk_test_*`)
4. Collez-les dans `.env`

### 4. Initialiser la base de données

Pour le développement local avec SQLite (option par défaut) :

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

Pour la production avec PostgreSQL (ex. Neon / Supabase / Railway) :

1. Créez une base Postgres et obtenez la `DATABASE_URL`.
2. Mettez `DATABASE_URL` dans les variables d'environnement (Vercel / plateforme).
3. Appliquez les migrations sur la base distante :

```bash
npx prisma migrate deploy
npx prisma generate
```

Ensuite, vous pouvez exécuter le script de seed si vous le souhaitez (attention aux données en production) :

```bash
node prisma/seed.js
```

### 5. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000** 🎉

## 📱 Utilisation

### Page d'accueil
- Consultez la liste des produits
- Cliquez sur un produit pour voir les détails
- Bouton "Acheter" ajoute au panier et redirige au paiement

### Panier (`/cart`)
- Modifiez les quantités
- Supprimez des articles
- "Passer au paiement" crée une session Stripe

### Admin (`/admin`)
- **Login** : admin@example.com / changeme (à personnaliser dans `.env`)
- Après connexion, accès au **dashboard** complet
- ➕ Créer produit (`/admin/create`)
- ✏️ Modifier produit (`/admin/edit/[id]`)
- 🗑️ Supprimer produit

### Paiements Stripe (Mode Test)
Utilisez la **carte de test Stripe** :
- **Numéro** : `4242 4242 4242 4242`
- **Expiration** : N'importe quelle date future (ex. 12/26)
- **CVC** : N'importe quel 3 chiffres
- **Code postal** : N'importe quel code

Après paiement → redirection `/success` ✅

## 📦 Structure du projet

```
.
├── pages/
│   ├── _app.js                 # App wrapper (CartProvider, styles)
│   ├── index.js                # Homepage (liste produits)
│   ├── login.js                # Page de connexion NextAuth
│   ├── cart.js                 # Panier
│   ├── success.js              # Confirmation paiement
│   ├── canceled.js             # Annulation paiement
│   ├── products/
│   │   └── [id].js             # Détail produit + paiement unique
│   ├── admin/
│   │   ├── index.js            # Dashboard admin (liste produits)
│   │   ├── create.js           # Créer produit
│   │   └── edit/
│   │       └── [id].js         # Modifier produit
│   └── api/
│       ├── products/           # API GET produits
│       ├── checkout.js         # Stripe checkout (panier)
│       ├── checkout-cart.js    # Stripe checkout (panier full)
│       ├── auth/               # NextAuth routes
│       └── admin/products/     # CRUD produits (admin)
├── components/
│   ├── Navbar.js               # Navigation + panier badge
│   ├── Layout.js               # Wrapper pages (Navbar + Footer)
│   └── ProductCard.js          # Carte produit réutilisable
├── context/
│   └── CartContext.js          # Gestion panier (localStorage)
├── prisma/
│   ├── schema.prisma           # Schéma BD
│   ├── seed.js                 # Données initiales
│   └── migrations/             # Versions BD
├── styles/
│   └── globals.css             # Tailwind + styles globaux
├── public/                     # Assets statiques
├── .env.example                # Variables d'environnement (modèle)
├── .env                        # Variables d'environnement (local)
├── Dockerfile                  # Image Docker production
├── docker-compose.yml          # Orchestration
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🐳 Déploiement Docker

### Lancer localement avec Docker

```bash
docker-compose up --build
```

Accessible sur **http://localhost:3000**

### Déploiement prod (Vercel)

1. Connectez votre repo GitHub à [Vercel](https://vercel.com)
2. Définissez les variables d'env dans Vercel :
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   DATABASE_URL=postgresql://...  (utilisez Vercel Postgres ou autre)
   ```
3. Déployez (Vercel construit et déploie automatiquement)

### Déploiement prod (Heroku / Railway / autre)

```bash
# Construire l'image
docker build -t my-bracelet-shop .

# Déployer sur votre plateforme (ex. Heroku)
heroku login
heroku create my-bracelet-shop
heroku container:push web
heroku container:release web
```

## 🔄 Scripts npm

```bash
npm run dev              # Serveur de dev (http://localhost:3000)
npm run build            # Build optimisé pour prod
npm start                # Serveur de prod
npm run prisma:generate  # Générer Prisma Client
npm run prisma:migrate   # Appliquer migrations
npm run seed             # Peupler BD avec données exemple
```

## 🔑 Variables d'environnement

| Clé | Description |
|-----|-------------|
| `DATABASE_URL` | Chaîne connexion BD (SQLite, PostgreSQL, MySQL) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (commence par `sk_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (commence par `pk_`) |
| `NEXT_PUBLIC_BASE_URL` | URL de base (pour redirects après paiement) |
| `ADMIN_EMAIL` | Email pour login admin |
| `ADMIN_PASSWORD` | Mot de passe admin |

## 🛡️ Sécurité (À améliorer en prod)

- ⚠️ Le mot de passe admin est en plaintext (utiliser bcrypt en prod)
- ⚠️ Pas de validation Stripe webhook (implémenter pour vérifier paiements)
- ⚠️ Pas de rate-limiting sur API (ajouter en prod)
- ⚠️ Base SQLite ne scale pas (utiliser PostgreSQL en prod)

**Actions pour la production** :
1. Hasher les mots de passe avec `bcrypt`
2. Implémenter Stripe webhooks (`/api/webhooks/stripe`)
3. Ajouter rate-limiting (ex. `express-rate-limit`)
4. Migrer vers PostgreSQL (compatible Prisma)
5. Ajouter HTTPS obligatoire
6. Valider les entrées utilisateur côté serveur

## 🐛 Dépannage

**"Cannot find module @prisma/client"**
```bash
npm install
npx prisma generate
```

**"Stripe checkout échoue"**
- Vérifiez `STRIPE_SECRET_KEY` dans `.env`
- Utilisez une clé de **test** (commence par `sk_test_`)
- Les clés live (`sk_live_`) ne marchent qu'en production

**"Panier vide au rechargement"**
- Vérifiez que localStorage fonctionne (pas de mode privé)
- Ouvrez DevTools → Application → LocalStorage → `cart`

**"Admin login échoue"**
- Vérifiez `ADMIN_EMAIL` et `ADMIN_PASSWORD` dans `.env`
- Redémarrez le serveur après modifications (`.env` cachée au démarrage)

## 📞 Support & Contact

Pour questions ou bugs, consultez la documentation :
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Stripe](https://stripe.com/docs/api)
- [NextAuth](https://next-auth.js.org)

---

**Créé avec ❤️ — Prêt pour la production !**
