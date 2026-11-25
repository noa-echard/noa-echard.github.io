# DESIGN.md — Portfolio de Noa Echard

Direction : **console de supervision réseau**, sobre et lisible.
Le site doit faire penser à un outil d'administrateur (tableau de bord, voyants d'état,
schéma de topologie), pas à une vitrine marketing. Base : le thème d'origine du site
(sombre éclairci + mode jour). Les idées reprises d'autres portfolios sont des idées de
contenu et de structure, jamais leur apparence.

Ce qu'on s'interdit : texte en dégradé, dégradés violets, verre dépoli partout,
polices fantaisie, globe animé, bandeau qui défile, tout centrer.

---

## Couleur

Toutes les valeurs sont des variables CSS dans `assets/css/style.css` (section 01).

| Variable | Nuit | Jour | Rôle |
|---|---|---|---|
| `--fond` | `#182029` | `#f4f6f9` | Fond de page (avec une grille fine de 40 px) |
| `--surface` | `#212b37` | `#ffffff` | Panneaux, cartes |
| `--surface-survol` | `#2a3644` | `#e9eef4` | Survol d'une carte, bouton secondaire |
| `--surface-douce` | `#1c2530` | `#f1f4f8` | Zones creusées : champs, console, encadrés |
| `--bordure` | `#374659` | `#d3dbe5` | Bordures et séparateurs |
| `--bordure-forte` | `#4a5d75` | `#b4c2d3` | Bordure de bouton, câbles du schéma |
| `--texte` | `#e6ecf2` | `#18202a` | Texte principal |
| `--muet` | `#9fadbd` | `#556273` | Texte secondaire, légendes |
| `--bleu` | `#5aa9ff` | `#1866c9` | **Couleur principale** : liens, bouton principal, liaisons réseau, élément actif |
| `--vert` | `#46c35a` | `#1f8a33` | État « opérationnel / terminé » |
| `--ambre` | `#e0ae3a` | `#a96e00` | État « en cours », expérience professionnelle |
| `--violet` | `#b39cfb` | `#6d4fd6` | Équipements « profil » du schéma uniquement |
| `--rouge` | `#f87171` | `#c53030` | Erreurs de formulaire |

Règles :
- Une seule couleur d'action : le bleu. Vert, ambre et violet ne servent qu'aux **états** et au schéma.
- Contraste du texte ≥ 4,5:1 sur `--fond` et `--surface`, dans les deux modes.

## Typographie

- **Texte** : police système (`system-ui`, Segoe UI, Roboto). Rapide, nette, sans chargement.
- **Technique** : police mono système (`Cascadia Code`, `Consolas`) pour les étiquettes,
  adresses IP, noms de machines, dates, états. Jamais pour des paragraphes.

| Rôle | Taille | Graisse | Interligne |
|---|---|---|---|
| Nom (accueil) | clamp(2.4rem, 6vw, 3.6rem) | 800 | 1.05 |
| Titre de section (h2) | clamp(1.7rem, 3.6vw, 2.3rem) | 700 | 1.2 |
| Titre de carte (h3) | 1.1rem | 700 | 1.3 |
| Texte | 1.0625rem (17 px) | 400 | 1.65 |
| Secondaire | .92rem | 400 | 1.5 |
| Étiquette (mono, majuscules) | .74rem, espacement .1em | 700 | 1.4 |

Paragraphes limités à ~70 caractères de large.

## Espacement

Échelle de base 4 px : 4, 8, 12, 16, 20, 24, 32, 48, 64.
- Entre deux sections : 64 px (48 px sur téléphone).
- Intérieur d'un panneau : 20–24 px (16 px sur téléphone).
- Largeur du contenu : 1140 px, marges latérales de 16 px.

## Forme et profondeur

- Rayons : 6 px (boutons, étiquettes, champs), 8 px (panneaux, cartes), 12 px (grands schémas).
- Une seule ombre, discrète, au survol : `--ombre`. Pas de flou d'arrière-plan sauf sur la barre du haut.

## Composants

- **Barre du haut** : pleine largeur, collée en haut ; voyant vert + nom + étiquette « BTS SIO SISR » ;
  menu ; bouton jour/nuit. Lien actif souligné en bleu.
- **Boutons** : principal = fond bleu plein ; secondaire = fond `--surface-survol` + bordure.
  Survol : bordure bleue. Focus : contour bleu 2 px.
- **Panneau** : `--surface`, bordure 1 px, rayon 8 px. En-tête de panneau = étiquette mono en
  majuscules + trait de séparation.
- **Voyant d'état** : pastille 8 px + libellé mono (Terminé / En cours).
- **Carte projet** : panneau cliquable ; type (Projet, Stage, TP) en étiquette ; titre ; résumé ;
  technologies ; « Lire la fiche ».
- **Schéma réseau** : équipements = rectangles arrondis avec type (mono), nom et voyant ;
  câbles bleutés avec paquets animés ; zones en pointillés.
- **Filtres** : groupe de boutons ; l'actif est plein (bleu).
- **Champs** : fond `--surface-douce`, bordure forte, focus bleu.

## Images et icônes

- Icônes : traits simples 2 px (style Feather/Lucide), toujours accompagnées d'un texte.
- Captures d'écran des TP : dans un panneau, légende en dessous, agrandissement au clic.
  Aucune capture ne doit montrer de mot de passe.
- Schémas d'infrastructure dessinés en SVG avec les vraies machines et adresses.
- Pas d'emoji, pas d'illustration décorative.
