# Portfolio — Noa Echard

Site vitrine pour le BTS SIO option SISR. HTML, CSS et JavaScript écrits à la main :
aucun framework, aucune installation, aucune dépendance externe.

---

## Regarder le site sur ton PC

Le plus fiable est de lancer un petit serveur local depuis le dossier du site.
Ouvre un terminal dans le dossier, puis :

```
python -m http.server 8321
```

Va ensuite sur `http://localhost:8321` dans ton navigateur. Pour arrêter : `Ctrl+C`.

---

## Les fichiers

```
portfolio/
├── index.html              Accueil
├── a-propos.html           À propos
├── competences.html        Compétences
├── realisations.html       Liste des réalisations
├── realisation.html        Page modèle d'une réalisation (realisation.html?id=...)
├── certifications.html     Certifications
├── parcours.html           Formation et stages
├── veille.html             Veille technologique
├── contact.html            Contact
├── mentions-legales.html   Page légale
├── 404.html                Page affichée si un lien est cassé
├── favicon.svg             Icône de l'onglet
├── .nojekyll               Fichier vide, obligatoire pour GitHub Pages
└── assets/
    ├── js/data.js          ★ TON CONTENU — le seul fichier à modifier au quotidien
    ├── js/app.js           La mécanique (pas besoin d'y toucher)
    ├── css/style.css       L'apparence (couleurs en section 01)
    ├── cv/                 Ton CV en PDF
    ├── docs/               Tes documentations techniques en PDF
    ├── certifs/            Tes badges et certificats
    └── img/                Ta photo
```

**Le principe :** les pages HTML sont presque vides. Le menu, le contenu et le pied
de page sont construits par `app.js` à partir de `data.js`. Si tu ajoutes une page
dans la liste `PAGES`, elle apparaît dans le menu de toutes les pages d'un coup.

| Je veux…                                   | Je modifie                              |
| ------------------------------------------ | --------------------------------------- |
| Changer un texte, une compétence, un stage | `assets/js/data.js`                     |
| Ajouter une réalisation                    | `assets/js/data.js`, liste `REALISATIONS` |
| Changer une couleur                        | `assets/css/style.css`, section 01      |
| Changer le titre d'un onglet               | Le bloc `<title>` du fichier HTML       |

---

## Les rappels « TODO: »

Tout texte de `data.js` qui commence par `TODO:` est une chose qu'il te reste à
écrire ou à vérifier. En haut du fichier :

```
const AFFICHER_RAPPELS = false;
```

- `false` (réglage à garder en ligne) : ces lignes sont **cachées** aux visiteurs.
- `true` : elles s'affichent en orange, pour voir ce qu'il reste à faire. À utiliser seulement en local.

Pour qu'une ligne apparaisse, remplace tout le texte, **mot `TODO:` compris**.

À faire en priorité :

1. Ton adresse e-mail (`emailAvantArobase`) — sans elle, la page Contact n'affiche pas d'e-mail.
2. Les chiffres des réalisations de stage (nombre de postes, de connexions…).
3. Les compétences du programme commun (GLPI, OCS, Bind9, Windows 10/11) : confirme que tu les as faites, puis remplace le `TODO:` par la vraie source.
4. Les dates exactes de ton stage à la mairie et le lycée de ton Bac Pro.
5. Les phrases « ce que j'en retiens » de ta veille.

---

## Ajouter une réalisation

Une seule étape : dans `data.js`, liste `REALISATIONS`, ajoute une virgule après la
dernière accolade `}` puis colle un bloc comme celui-ci :

```
{
  id: "mon-projet",
  titre: "Le titre",
  sousTitre: "TP n°X ou Stage chez ...",
  periode: "2027",
  statut: "termine",
  cadre: "tp",
  tags: ["Techno 1", "Techno 2"],
  contexte: "L'organisation et sa situation.",
  probleme: "Ce qui n'allait pas avant.",
  solution: "Ce que TU as mis en place.",
  outils: ["Outil 1", "Outil 2"],
  resultats: ["Un fait vérifiable.", "Un chiffre."],
  appris: "Ce que tu retiens, y compris ce qui a coincé."
}
```

- `id` : sans espace, sans accent, sans majuscule. La page sera `realisation.html?id=mon-projet`.
- `statut` : `"termine"` ou `"en-cours"`.
- `cadre` : `"stage"`, `"tp"` ou `"perso"` (la section « Projets personnels » apparaît toute seule dès qu'il y en a un).
- Pour proposer ta documentation en PDF : dépose-la dans `assets/docs/` et ajoute
  `document: { fichier: "assets/docs/ma-doc.pdf", pages: 28, poids: "2 Mo" }`.

⚠️ Avant de publier une documentation : **aucun mot de passe** visible dans les captures.

Si une page devient vide après une modification, c'est presque toujours une virgule
oubliée ou un guillemet manquant. Appuie sur `F12`, onglet **Console** : le numéro de
ligne de l'erreur y est indiqué.

---

## Ajouter une certification

1. Dépose le badge et le PDF dans `assets/certifs/` (noms sans accent ni espace).
2. Dans `data.js`, liste `CERTIFICATIONS`, ajoute un bloc dans la **première**
   catégorie (« Certifications obtenues ») :

```
{
  nom: "Introduction to Cybersecurity",
  organisme: "Cisco Networking Academy",
  date: "12 novembre 2026",
  badge: "assets/certifs/badge-cisco-cyber.png",
  fichier: "assets/certifs/certificat-cisco-cyber.pdf",
  poids: "220 Ko",
  verif: "https://www.credly.com/badges/...",
  couvre: "Ce que le certificat atteste."
}
```

3. Retire-la de la catégorie « Objectifs ».

La première catégorie ne doit contenir **que** des certifications réellement
obtenues : c'est elle que compte le chiffre de l'accueil. Les modules Microsoft Learn
sont des formations, pas des certifications : garde-les dans une catégorie à part.

---

## Mettre le site en ligne sur GitHub Pages

### 1. Créer le compte

Va sur **github.com** et clique sur **Sign up**. Nom d'utilisateur : **noa-echard**.
Il apparaîtra dans l'adresse du site, donc un recruteur le verra.

### 2. Créer le dépôt

1. En haut à droite, clique sur **+** puis **New repository**.
2. *Repository name* : **noa-echard.github.io** (exactement ton nom d'utilisateur suivi de `.github.io`).
3. Coche **Public** (GitHub Pages gratuit ne publie pas les dépôts privés).
4. Clique sur **Create repository**.

### 3. Envoyer les fichiers

1. Sur la page du dépôt vide, clique sur le lien **uploading an existing file**.
2. Ouvre le dossier `portfolio` sur ton PC, sélectionne tout son contenu (`Ctrl+A`) et glisse-le dans la page GitHub.
3. Vérifie que le dossier `assets` est bien présent avec ses sous-dossiers.
4. En bas, écris « premier envoi » et clique sur **Commit changes**.

⚠️ Le fichier `.nojekyll` est caché sous Windows. Si tu ne le vois pas, active
**Affichage → Éléments masqués** dans l'Explorateur avant de faire `Ctrl+A`.

### 4. Activer la publication

1. Dans le dépôt, onglet **Settings**.
2. Menu de gauche : **Pages**.
3. *Source* : **Deploy from a branch**.
4. *Branch* : **main**, dossier **/ (root)**, puis **Save**.
5. Attends 1 à 3 minutes et recharge : l'adresse `https://noa-echard.github.io` s'affiche en haut.

### 5. Vérifier

Ouvre l'adresse **sur ton téléphone** aussi :

- [ ] Les couleurs s'affichent (sinon, le dossier `assets` n'a pas été envoyé).
- [ ] Le menu apparaît sur toutes les pages, et le bouton menu s'ouvre sur téléphone.
- [ ] Chaque réalisation s'ouvre depuis la page Réalisations.
- [ ] La page Contact affiche ton e-mail.

### Mettre à jour plus tard

Dans le dépôt, ouvre le fichier à modifier (souvent `assets/js/data.js`), clique sur
l'icône crayon ✏️, modifie, puis **Commit changes**. Le site se met à jour en une ou
deux minutes.

---

## Choix techniques, si le jury pose la question

**Pourquoi plusieurs pages ?** Chaque réalisation a sa propre adresse : je peux
envoyer directement le lien du projet qui intéresse un recruteur.

**Pourquoi le contenu est-il séparé du code ?** `data.js` contient les données,
`app.js` la logique, `style.css` la présentation. C'est le même principe qu'un fichier
de configuration centralisé : modifier le contenu ne peut pas casser l'affichage.

**Pourquoi pas de framework ?** Sans compilation ni dépendance, le site fonctionnera
encore dans cinq ans sans rien réinstaller. Moins de dépendances, moins de pannes.

**Pourquoi aucune requête externe ?** Pas de police Google, pas de statistiques, pas de
cookie : le site ne transmet rien à un tiers et se charge vite même avec une connexion faible.

**Pourquoi pas de barres de pourcentage ?** Un pourcentage est invérifiable. Chaque
compétence indique l'endroit où elle a été pratiquée : c'est une information qu'on peut contrôler.

**L'adresse e-mail est-elle protégée ?** Elle est découpée en deux dans `data.js` et
recollée à l'affichage : un robot qui lit le code source ne la trouve pas en entier.

**Et l'accessibilité ?** HTML sémantique, navigation complète au clavier, lien
d'évitement, contrastes élevés, animations coupées si le système le demande
(`prefers-reduced-motion`).
