/* ==========================================================================
   data.js — TOUT LE CONTENU DU SITE
   --------------------------------------------------------------------------
   C'est le seul fichier à modifier au quotidien. Tu changes le texte entre
   les guillemets, tu enregistres, tu rafraîchis la page. C'est tout.

   TROIS RÈGLES :
     1. Ne supprime jamais les guillemets " " autour d'un texte.
     2. Chaque bloc { } ou chaque ligne d'une liste se termine par une
        virgule, sauf le dernier.
     3. On utilise des guillemets doubles partout : les apostrophes dans tes
        phrases ne posent donc aucun problème.

   LES RAPPELS « TODO: »
     Un texte qui commence par "TODO:" est une chose qu'il te reste à écrire
     ou à vérifier. Tant que AFFICHER_RAPPELS vaut false, ces lignes sont
     CACHÉES aux visiteurs : le site n'affiche jamais un brouillon.
     Mets true quand tu travailles en local pour les voir en orange.
   ========================================================================== */

const AFFICHER_RAPPELS = false;


/* ==========================================================================
   1. IDENTITÉ
   ========================================================================== */

const IDENTITE = {
  prenom: "Noa",
  nom: "Echard",

  // Le poste que tu VISES.
  posteVise: "Administrateur systèmes et réseaux",

  statut: "BTS SIO option SISR — 2e année",
  etablissement: "Lycée Baimbridge, Les Abymes (Guadeloupe)",

  // La phrase la plus importante du site : ce que tu SAIS FAIRE.
  accroche: "Étudiant en BTS SIO SISR, je monte et j'administre des serveurs Windows et Linux, et je documente tout ce que je fais.",

  // Ce qui te distingue. Ton stage est ton meilleur argument : du vrai matériel, en production.
  angle: "En stage à la mairie de Morne-à-l'Eau, j'ai travaillé sur une infrastructure en production : bastion d'accès distant, déploiement de sauvegardes par GPO, ACL entre switchs, borne Wi-Fi UniFi.",

  // Description pour Google et les aperçus de lien (150-160 caractères).
  metaDescription: "Noa Echard, étudiant en BTS SIO SISR à Baimbridge. Windows Server, Active Directory, Debian, bastion Guacamole : infrastructures montées et documentées.",

  // Ta photo dans assets/img/. Laisse "" pour ne rien afficher.
  photo: "",
  photoAlt: "Portrait de Noa Echard",

  // E-MAIL découpé en deux pour échapper aux robots spammeurs.
  // Choisis une adresse sérieuse (prenom.nom@...), pas une adresse de jeu.
  emailAvantArobase: "noa.cocoyer2",
  emailApresArobase: "gmail.com",

  // Laisse "" pour masquer le bouton.
  linkedin: "",
  github: "https://github.com/noa-echard",
  credly: "",            // ton profil de badges Cisco, quand tu en auras
  microsoftLearn: "",    // ton profil public Microsoft Learn, quand tu en auras

  // Ton CV en PDF dans assets/cv/. Laisse "" tant que tu ne l'as pas.
  cvFichier: "assets/cv/CV-Noa-Echard.pdf",
  cvPoids: "70 Ko"
};


/* ==========================================================================
   2. LES PAGES — c'est d'ici que le menu est construit, sur toutes les pages
   ========================================================================== */

const PAGES = [
  { cle: "a-propos",      fichier: "a-propos.html",      menu: "À propos",
    titre: "À propos", chapo: "",
    resume: "Qui je suis, ce que je fais, ce qui m'intéresse." },

  { cle: "competences",   fichier: "competences.html",   menu: "Compétences",
    titre: "Compétences",
    chapo: "Pas de pourcentages : pour chaque compétence, l'endroit exact où je l'ai mise en œuvre.",
    resume: "Chaque compétence avec sa source : un TP ou une mission de stage." },

  { cle: "realisations",  fichier: "realisations.html",  menu: "Réalisations",
    titre: "Réalisations",
    chapo: "Chaque réalisation suit la même trame : contexte, besoin, solution technique, outils, résultats et ce que j'en retiens.",
    resume: "Les infrastructures que j'ai montées, en TP et en stage." },

  { cle: "certifications", fichier: "certifications.html", menu: "Certifications",
    titre: "Certifications",
    chapo: "Ce que j'ai obtenu, et ce que je prépare. Rien n'est affiché ici sans preuve.",
    resume: "Certifications obtenues et objectifs de l'année." },

  { cle: "parcours",      fichier: "parcours.html",      menu: "Parcours",
    titre: "Parcours", chapo: "Formation et stages, du plus récent au plus ancien.",
    resume: "Formation et stages, en frise chronologique." },

  { cle: "veille",        fichier: "veille.html",        menu: "Veille",
    titre: "Veille technologique",
    chapo: "Les sujets que je suis, mes sources, et ce que j'en retire.",
    resume: "Les sujets que je suis, et pourquoi." },

  { cle: "contact",       fichier: "contact.html",       menu: "Contact",
    titre: "Contact", chapo: "Le plus simple pour me joindre.",
    resume: "E-mail et profils en ligne." }
];


/* ==========================================================================
   3. CHIFFRES CLÉS — la bande sous ton nom sur l'accueil
   --------------------------------------------------------------------------
   depuis: "competences" / "realisations" / "certifications" → calculé tout seul
   valeur: 28 → écrit à la main (seulement si tu peux le prouver)
   Un chiffre à 0 n'est pas affiché.
   ========================================================================== */

const CHIFFRES = [
  { depuis: "realisations",   libelle: "réalisations documentées" },
  { depuis: "competences",    libelle: "compétences, chacune sourcée" },
  { valeur: 6,                libelle: "missions en stage, en production" },
  { depuis: "certifications", libelle: "certifications obtenues" }
];


/* ==========================================================================
   4. À PROPOS — 4 à 6 lignes, à la première personne, sans « passionné »
   ========================================================================== */

const A_PROPOS = [
  "Je suis en deuxième année de BTS SIO option SISR au lycée Baimbridge, aux Abymes.",
  "Avant le BTS, j'ai fait un Bac Pro Systèmes numériques option RISC, avec un stage de technicien informatique à la CGSS Guadeloupe : j'ai commencé par le câble et le matériel avant de passer aux serveurs.",
  "En TP, je monte des infrastructures complètes en machines virtuelles sous VMware : contrôleur de domaine Windows Server 2025, DNS, DHCP, stratégies de groupe, serveur web Apache sous Debian, réseau d'entreprise avec VLAN sous Packet Tracer.",
  "En stage à la mairie de Morne-à-l'Eau, j'ai mis en place un bastion Apache Guacamole pour l'accès distant sécurisé, écrit un script de déploiement de la sauvegarde Bareos poussé sur le parc par GPO, et configuré des ACL entre switchs et une borne Wi-Fi UniFi.",
  "À côté des cours, j'héberge mes propres outils (tableau de bord Dashy, serveurs de conversion de fichiers) : c'est là que j'apprends le plus vite, en cassant puis en réparant."
];


/* ==========================================================================
   5. COMPÉTENCES — le champ "ou" est OBLIGATOIRE : c'est lui la preuve
   --------------------------------------------------------------------------
   Les lignes dont le "ou" commence par TODO: viennent du programme commun
   de la classe. Elles restent CACHÉES tant que tu n'as pas confirmé que tu
   les as faites : remplace alors le TODO par la vraie source.
   ========================================================================== */

const COMPETENCES = [
  {
    domaine: "Systèmes Windows",
    items: [
      { nom: "Windows Server 2025 Datacenter", ou: "TP n°1 Bloc 2 (2026) — serveur srvad, contrôleur du domaine ville-abymes.fr" },
      { nom: "Windows Server 2022 Datacenter", ou: "1re année — TP n°5 Bloc 1 (service DHCP) et TP n°1 Bloc 2 (planification des rôles d'une infrastructure Windows)" },
      { nom: "Active Directory (AD DS)", ou: "TP n°1 Bloc 2 — nouvelle forêt, 4 unités d'organisation et leurs groupes de sécurité" },
      { nom: "Stratégies de groupe (GPO)", ou: "TP n°1 Bloc 2 — lecteurs réseau par service, pare-feu, fonds d'écran ; stage — déploiement de la sauvegarde Bareos sur le parc" },
      { nom: "Déploiement de logiciels MSI par GPO", ou: "TP n°1 Bloc 2 — Notepad++ et Firefox installés sans toucher aux postes" },
      { nom: "Profils itinérants et quotas", ou: "TP n°1 Bloc 2 — profils limités à 5 Go" },
      { nom: "Intégration de postes au domaine", ou: "TP n°1 Bloc 2 — un poste virtuel et un poste physique ; stage — ordinateur portable de la mairie" },
      { nom: "Gestion des disques et partages", ou: "TP n°1 Bloc 2 — partages par service sur un disque dédié, diagnostic d'un disque repassant hors ligne" },
      { nom: "Windows 10 Professionnel", ou: "1re année, TP n°2 Bloc 1 — installation, logiciels (Adobe Reader, OpenOffice, Avast, WinRAR, Firefox) et restrictions de sécurité pour Caribbean Project" }
    ]
  },
  {
    domaine: "Systèmes Linux",
    items: [
      { nom: "Debian 12", ou: "1re année, TP n°3 Bloc 1 — installation ; TP n°6, n°7 Bloc 1 et TP n°2 Bloc 2 — serveurs ; stage — bastion Guacamole" },
      { nom: "Commandes et shell Linux", ou: "1re année, TP n°3 bis Bloc 1 — fichiers, répertoires, paquets apt" },
      { nom: "Configuration réseau Linux", ou: "1re année, TP n°2 Bloc 2 — serveur à deux interfaces (dynamique et statique) dans /etc/network/interfaces" },
      { nom: "Serveur web Apache2", ou: "TP n°6 Bloc 1 — hébergement du site des Jardins de Saint-Éloi" },
      { nom: "DNS Bind9", ou: "1re année, TP n°7 Bloc 1 — résolution de noms pour les Jardins de Saint-Éloi" },
      { nom: "Haute disponibilité avec Heartbeat", ou: "TP n°3 Bloc 3 — cluster SRVWEB1 / SRVWEB2 (en cours)" }
    ]
  },
  {
    domaine: "Réseau",
    items: [
      { nom: "DHCP (Windows Server)", ou: "1re année, TP n°5 Bloc 1 ; TP n°1 Bloc 2 — étendue, bail de 8 jours, options DNS et passerelle" },
      { nom: "DNS (Windows Server)", ou: "TP n°1 Bloc 2 — zones directe et inversée, redirecteur vers Internet" },
      { nom: "Adressage IPv4", ou: "1re année, TP n°5 Bloc 1 — plan d'adressage et configuration des interfaces" },
      { nom: "Switch Cisco SG 300-10 et câblage RJ45", ou: "1re année, TP n°6 et n°7 Bloc 1 — infrastructure physique reliant deux postes" },
      { nom: "VLAN, trunks et routage inter-VLAN", ou: "TP réseau d'entreprise (Packet Tracer) — sous-interfaces sur le routeur R1" },
      { nom: "Listes de contrôle d'accès (ACL)", ou: "Stage — communication entre switchs de la mairie" },
      { nom: "Wi-Fi UniFi (U6 Mesh)", ou: "Stage — configuration d'une borne d'accès à la mairie" },
      { nom: "Cisco Packet Tracer 9", ou: "TP réseau d'entreprise — adressage, VLAN, trunks, routage" },
      { nom: "OSPF, NAT/PAT, SSH", ou: "TODO: TP réseau d'entreprise partie 2 — à ajouter quand elle est faite" }
    ]
  },
  {
    domaine: "Virtualisation",
    items: [
      { nom: "VirtualBox 7.2", ou: "Tous les TP de 1re année — création, clonage, modes pont et réseau interne" },
      { nom: "VMware Workstation", ou: "TP n°1 Bloc 2 — segment LAN isolé et carte NAT pour Internet" },
      { nom: "VMware vSphere", ou: "Stage — machines virtuelles de production de la mairie, diagnostic d'une carte réseau déconnectée" },
      { nom: "Docker", ou: "Stage — convertisseurs VERT et Transmute déployés en conteneurs sur Debian 13" },
      { nom: "Clonage de machines virtuelles", ou: "TP n°3 Bloc 3 — deux nœuds web clonés depuis un serveur existant" }
    ]
  },
  {
    domaine: "Sécurité et accès distant",
    items: [
      { nom: "Bastion Apache Guacamole", ou: "Stage — accès distant sécurisé, installation native sur Debian 12" },
      { nom: "Sauvegarde Bareos", ou: "Stage — script de déploiement de l'agent sur les postes" },
      { nom: "Cloisonnement par groupes et droits de partage", ou: "TP n°1 Bloc 2 — chaque service ne voit que son lecteur" },
      { nom: "Double authentification (TOTP)", ou: "Stage — connexion au bastion Guacamole avec un code à usage unique" },
      { nom: "Durcissement SSH (recommandations ANSSI)", ou: "TP de cybersécurité BTS SIO 2 — 10 directives OpenSSH, test face à une machine Kali Linux" },
      { nom: "Restrictions du poste utilisateur", ou: "1re année, TP n°2 Bloc 1 — empêcher les manipulations dangereuses pour le parc" }
    ]
  },
  {
    domaine: "Support et gestion de parc",
    items: [
      { nom: "GLPI 10.0.17", ou: "1re année, TP n°2 Bloc 2 — helpdesk du CHU de Pointe-à-Pitre : comptes, profils, suivi des incidents" },
      { nom: "Installation et maintenance de postes", ou: "Stage à la CGSS Guadeloupe — déploiement, inventaire du parc, installation d'OS" }
    ]
  },
  {
    domaine: "Scripts et documentation",
    items: [
      { nom: "Scripts d'installation silencieuse", ou: "Stage — client Bareos installé sur tout le parc via une GPO" },
      { nom: "PowerShell", ou: "TP n°1 Bloc 2 — configuration et vérification du serveur" },
      { nom: "Documentation technique", ou: "TP n°6 et n°7 Bloc 1, TP n°1 Bloc 2 — documentations avec page de garde, sommaire, recette et sitographie" },
      { nom: "Portail Dashy", ou: "Stage, en binôme — page unique regroupant les outils de la mairie, sous Docker sur Ubuntu Server 24.04" }
    ]
  }
];


/* ==========================================================================
   6. RÉALISATIONS — le cœur du site
   --------------------------------------------------------------------------
   Chaque réalisation a sa propre page : realisation.html?id=<id>
   Pas besoin de créer de fichier HTML, il suffit d'ajouter un bloc ici.

     id        → sans espace, sans accent, sans majuscule
     statut    → "termine" ou "en-cours"
     cadre     → "stage" ou "tp" ou "perso"
     resultats → DES FAITS VÉRIFIABLES, des chiffres si possible
     document  → { fichier: "assets/docs/xxx.pdf", pages: 28, poids: "2 Mo" }
                 (laisse le bloc absent tant que tu n'as pas mis le PDF)
   ========================================================================== */

const REALISATIONS = [

  {
    id: "bastion-guacamole",
    titre: "Bastion d'accès distant Apache Guacamole",
    sousTitre: "Stage de 1re année — mairie de Morne-à-l'Eau",
    periode: "Mai — juin 2026",
    statut: "termine",
    cadre: "stage",
    tags: ["Apache Guacamole", "Debian 12", "TOTP", "RDP", "SSH"],

    contexte: "La mairie de Morne-à-l'Eau fait tourner ses serveurs sur une infrastructure virtualisée sous vSphere, en production : les agents s'en servent tous les jours. Une partie des dépannages est faite à distance, y compris par des prestataires extérieurs.",
    probleme: "Les connexions à distance vers les postes et les serveurs devaient passer par un point d'entrée unique et contrôlé, au lieu d'ouvrir l'accès à chaque machine séparément.",
    solution: "J'ai installé un bastion Apache Guacamole sur un serveur Debian 12. Un bastion est le point d'entrée unique de toutes les connexions à distance : il fonctionne dans le navigateur, donc rien n'est à installer sur le poste de l'administrateur, et il donne accès aux machines en RDP pour Windows, en SSH pour Linux et en VNC. J'ai ajouté une double authentification par code TOTP à six chiffres, lu sur le téléphone. Mon binôme a ensuite configuré sur le pare-feu Stormshield un VPN qui donne aux prestataires un accès limité à ce seul bastion.",
    outils: ["Apache Guacamole", "Debian 12", "TOTP", "RDP", "SSH", "VNC", "VMware vSphere"],
    resultats: [
      "Un point d'accès unique, depuis un simple navigateur, vers les postes Windows et les serveurs Linux de la mairie.",
      "Chaque connexion demande un mot de passe et un code à usage unique : un mot de passe volé ne suffit pas.",
      "Les prestataires passent par ce bastion et n'ont pas accès au reste du réseau des serveurs.",
      "TODO: un chiffre — combien de machines ou de connexions configurées dans le bastion ?"
    ],
    appris: "Un jour, le serveur du bastion ne répondait plus ni au ping ni en SSH, avec l'erreur « Failed to start networking.service » au démarrage. Plutôt que de réinstaller, nous avons lu l'erreur, vérifié la configuration réseau, puis contrôlé la machine virtuelle dans vSphere : sa carte réseau n'était simplement plus connectée. J'en retiens qu'il faut toujours lire l'erreur et vérifier les couches dans l'ordre avant de tout refaire."
  },

  {
    id: "deploiement-bareos",
    titre: "Déploiement de la sauvegarde Bareos par GPO",
    sousTitre: "Stage de 1re année — mairie de Morne-à-l'Eau",
    periode: "Mai — juin 2026",
    statut: "termine",
    cadre: "stage",
    tags: ["Bareos", "GPO", "Script", "Sauvegarde"],

    contexte: "Les postes de la mairie sont rattachés à un domaine Active Directory. Les sauvegardes sont assurées par Bareos, un logiciel open source : pour qu'un PC soit sauvegardé, le client Bareos doit être installé dessus.",
    probleme: "Installer le client poste par poste aurait pris beaucoup de temps et laissé des machines oubliées, donc non sauvegardées.",
    solution: "J'ai écrit un script qui installe le client Bareos en mode silencieux, sans aucune fenêtre ni action de l'utilisateur. Le script contient déjà les paramètres nécessaires : le nom du poste et l'adresse du Director, le serveur qui pilote les sauvegardes. Une stratégie de groupe (GPO) du domaine lance ensuite ce script sur chaque PC.",
    outils: ["Bareos", "Active Directory", "Stratégies de groupe (GPO)", "Script d'installation silencieuse"],
    resultats: [
      "Le client de sauvegarde est installé sur tout le parc, sans passer poste par poste.",
      "Un nouveau poste ajouté au domaine reçoit le client automatiquement.",
      "TODO: un chiffre — sur combien de postes le script a-t-il été déployé ?"
    ],
    appris: "TODO: ce que tu retiens — par exemple la différence entre tester un script sur un poste et le déployer sur tout un parc."
  },

  {
    id: "serveurs-conversion",
    titre: "Serveurs de conversion de fichiers VERT et Transmute",
    sousTitre: "Stage de 1re année — mairie de Morne-à-l'Eau",
    periode: "Mai — juin 2026",
    statut: "termine",
    cadre: "stage",
    tags: ["Docker", "Debian 13", "Auto-hébergement", "Confidentialité"],

    contexte: "Les agents de la mairie ont régulièrement besoin de convertir des fichiers : documents, images, vidéos.",
    probleme: "Ils passaient par des sites de conversion en ligne, ce qui envoie des documents de la mairie sur des serveurs inconnus.",
    solution: "J'ai installé deux convertisseurs auto-hébergés avec Docker sur un serveur Debian 13, pour que les fichiers restent à la mairie. D'abord VERT, qui gère plus de 250 formats et convertit directement dans le navigateur, mais demande un serveur supplémentaire pour les vidéos. Puis Transmute, qui fait tout le travail côté serveur, avec plus de 3 000 conversions possibles et la compression de fichiers.",
    outils: ["VERT", "Transmute", "Docker", "Debian 13"],
    resultats: [
      "Les conversions de fichiers se font sur un serveur de la mairie : plus aucun document ne part sur un site extérieur.",
      "Deux outils complémentaires : VERT pour les conversions rapides dans le navigateur, Transmute pour les gros fichiers et la compression."
    ],
    appris: "Comparer deux solutions avant d'en garder une seule m'a montré qu'il n'existe pas d'outil parfait : VERT est léger mais limité pour la vidéo, Transmute est plus complet mais demande plus de ressources au serveur. Le bon choix dépend de l'usage réel des agents."
  },

  {
    id: "mairie-abymes",
    titre: "Infrastructure Active Directory pour la mairie des Abymes",
    sousTitre: "TP n°1 — Bloc 2, Administration des systèmes",
    periode: "Septembre 2026",
    statut: "termine",
    cadre: "tp",
    tags: ["Windows Server 2025", "Active Directory", "DNS", "DHCP", "GPO", "Profils itinérants"],

    contexte: "Cas d'entreprise : la mairie des Abymes, environ 450 postes. Le responsable demande une infrastructure centralisée autour d'un serveur unique. Réalisation sur une maquette VMware : un serveur et deux postes clients, dont un poste physique.",
    probleme: "Sans annuaire central, chaque compte est créé poste par poste, les documents restent sur les disques locaux et aucun réglage commun ne peut être imposé au parc.",
    solution: "Installation du serveur srvad sous Windows Server 2025 Datacenter, promu contrôleur du domaine ville-abymes.fr. DNS avec zones directe et inversée, DHCP sur le réseau 192.168.30.0/24 avec un bail de 8 jours. L'organigramme est reproduit en quatre unités d'organisation (Direction, Tech_logistique, Compta_finance, Informatique) avec leurs groupes de sécurité. Les GPO montent un lecteur réseau par service (W: à Z:), appliquent un fond d'écran, et installent Notepad++ et Firefox en MSI. Profils itinérants limités à 5 Go.",
    outils: ["Windows Server 2025", "Active Directory", "DNS", "DHCP", "Stratégies de groupe", "VMware Workstation", "PowerShell", "Windows 10 Pro"],
    resultats: [
      "Les 8 étapes du cahier des charges réalisées et testées.",
      "Chaque service monte uniquement son propre lecteur réseau : W: pour la Direction, X: pour la Compta, Y: pour la Logistique, Z: pour l'Informatique.",
      "Notepad++ et Firefox installés automatiquement sur les postes du domaine.",
      "Une documentation technique d'environ 28 pages, procédures décrites en interface graphique."
    ],
    appris: "Le disque de données du serveur repassait hors ligne à chaque redémarrage, ce qui cassait d'un coup tous les partages : lecteurs réseau, fonds d'écran et profils itinérants. Le problème ne venait pas des GPO mais de la stratégie de mise en ligne des nouveaux disques. J'ai retenu qu'avant de chercher l'erreur dans la dernière chose configurée, il faut vérifier la couche en dessous.",
    referentiel: [
      "Installer et configurer un système d'exploitation serveur",
      "Déployer et paramétrer des services réseau (DNS, DHCP)",
      "Gérer des comptes, des groupes et des droits d'accès",
      "Automatiser la configuration d'un parc par stratégies de groupe",
      "Documenter la solution livrée"
    ]
    // Quand tu as exporté ta doc en PDF, dépose-la dans assets/docs/ et ajoute :
    // , document: { fichier: "assets/docs/doc-tp1-mairie-abymes.pdf", pages: 28, poids: "2 Mo" }
  },

  {
    id: "durcissement-ssh",
    titre: "Attaque de l'homme du milieu et durcissement SSH",
    sousTitre: "TP de cybersécurité — BTS SIO 2",
    periode: "Septembre 2026",
    statut: "termine",
    cadre: "tp",
    tags: ["OpenSSH", "ANSSI", "Kali Linux", "Cybersécurité"],

    contexte: "Maquette de quatre machines virtuelles : un serveur SSH, un client, un routeur OpenBSD et une machine d'attaque sous Kali Linux, sur le même réseau.",
    probleme: "Une configuration SSH par défaut laisse des portes ouvertes : connexion directe en root, tentatives de mot de passe illimitées, algorithmes de chiffrement anciens.",
    solution: "J'ai vérifié les droits de la clé privée du serveur (600, propriétaire root), puis j'ai ajouté dix directives recommandées par l'ANSSI dans la configuration d'OpenSSH : changement de port, interdiction de la connexion root et des mots de passe vides, trois tentatives maximum, liste d'utilisateurs autorisés, affichage de la dernière connexion, et restriction des algorithmes d'échange de clés, de chiffrement et d'intégrité. J'ai validé le résultat depuis le client et depuis la machine d'attaque.",
    outils: ["OpenSSH", "Debian", "Kali Linux", "OpenBSD", "VirtualBox"],
    resultats: [
      "10 recommandations de l'ANSSI appliquées et vérifiées une par une.",
      "Les connexions non autorisées sont refusées depuis la machine d'attaque, alors que l'utilisateur légitime se connecte normalement.",
      "Un rapport technique de 6 pages avec 7 captures commentées et un tableau de conformité."
    ],
    appris: "Avant de redémarrer le service, j'ai testé la configuration avec la commande sshd -t. Elle a détecté une ligne coupée lors d'un copier-coller : sans ce test, le service ne serait pas reparti et j'aurais perdu l'accès au serveur. Depuis, je teste toujours une configuration avant de l'appliquer.",
    referentiel: [
      "Sécuriser les accès à un serveur",
      "Appliquer les recommandations de l'ANSSI",
      "Tester et documenter une configuration de sécurité"
    ]
  },

  {
    id: "glpi-chu",
    titre: "Helpdesk GLPI pour le CHU de Pointe-à-Pitre",
    sousTitre: "TP n°2 — Bloc 2, 1re année",
    periode: "2025 — 2026",
    statut: "termine",
    cadre: "tp",
    tags: ["GLPI 10", "Debian 12", "Helpdesk", "Gestion des incidents"],

    contexte: "Cas d'entreprise : le service micro-informatique du CHU de Pointe-à-Pitre veut un outil pour enregistrer, classer et suivre les incidents signalés par le personnel jusqu'à leur clôture.",
    probleme: "Sans outil de ticketing, les demandes d'assistance se perdent et il est impossible de savoir qui traite quoi, ni depuis quand.",
    solution: "Installation d'un serveur Debian 12 sans interface graphique (srvglpi) avec deux interfaces réseau : une pour Internet, une en adresse statique pour le réseau interne. Installation et configuration de GLPI 10.0.17, création des comptes du service avec leurs profils (administrateur-technicien et utilisateurs), puis test du cycle de vie d'un ticket depuis un poste client Windows.",
    outils: ["GLPI 10.0.17", "Debian 12", "Apache", "MariaDB", "PHP", "VirtualBox", "Windows 10"],
    resultats: [
      "Un helpdesk opérationnel, accessible depuis le navigateur d'un poste client.",
      "4 comptes créés avec des profils différents : un administrateur-technicien et trois utilisateurs.",
      "TODO: un résultat de test — par exemple un ticket déclaré par un utilisateur, pris en charge puis clôturé par le technicien."
    ],
    appris: "TODO: ce que tu retiens de ce TP."
  },

  {
    id: "reseau-entreprise",
    titre: "Mise en œuvre d'un réseau d'entreprise",
    sousTitre: "TP Packet Tracer — BTS SIO 2",
    periode: "Septembre 2026",
    statut: "en-cours",
    cadre: "tp",
    tags: ["Cisco", "VLAN", "Routage inter-VLAN", "Packet Tracer"],

    contexte: "Maquette d'un réseau d'entreprise sous Cisco Packet Tracer 9, avec plusieurs services séparés et un routeur central.",
    probleme: "Les services doivent être isolés les uns des autres tout en pouvant communiquer de façon contrôlée et accéder à Internet.",
    solution: "Partie 1 : plan d'adressage, création des VLAN, liens trunk entre switchs, et routage inter-VLAN par sous-interfaces sur le routeur R1 (quatre sous-interfaces sur G0/0/0). Partie 2 à venir : OSPFv2, DHCPv4, NAT/PAT, SSH et ACL.",
    outils: ["Cisco Packet Tracer 9", "Switchs Cisco", "Routeur Cisco", "IOS"],
    resultats: [
      "Partie 1 terminée et validée par l'enseignant.",
      "TODO: résultats de la partie 2 (OSPF, NAT, ACL) quand elle sera faite."
    ],
    appris: "TODO: à compléter à la fin du TP."
  },

  {
    id: "cluster-saint-eloi",
    titre: "Serveur web haute disponibilité — Les Jardins de Saint-Éloi",
    sousTitre: "TP n°6 et n°7 Bloc 1 (1re année), TP n°3 Bloc 3 (2e année)",
    periode: "2025 — 2026",
    statut: "en-cours",
    cadre: "tp",
    tags: ["Debian", "Apache2", "Bind9", "Switch Cisco", "Heartbeat"],

    contexte: "Les Jardins de Saint-Éloi, entreprise de vente de fleurs et de produits locaux, veulent un site web qui reste disponible même si un serveur tombe.",
    probleme: "Avec un seul serveur web, la moindre panne rend le site inaccessible aux clients.",
    solution: "En 1re année : serveur web Apache2 sur une Debian sans interface graphique, puis serveur DNS Bind9 pour que le site réponde à un nom plutôt qu'à une adresse IP, le tout sur une infrastructure physique reliée par un switch Cisco SG 300-10. En 2e année : clonage du serveur pour obtenir deux nœuds, SRVWEB1 et SRVWEB2, reliés par Heartbeat — si le nœud principal tombe, le second reprend l'adresse du site automatiquement.",
    outils: ["Debian 12", "Apache2", "Bind9", "Switch Cisco SG 300-10", "Heartbeat", "VirtualBox", "VMware Workstation"],
    resultats: [
      "Site accessible par son nom de domaine depuis les postes clients, grâce à Apache2 et Bind9.",
      "TODO: résultat du test de bascule (coupure de SRVWEB1, temps de reprise par SRVWEB2)."
    ],
    appris: "TODO: à compléter à la fin du TP."
  }

];


/* ==========================================================================
   7. PARCOURS — du plus récent au plus ancien
   type : "formation" | "stage"
   ========================================================================== */

const PARCOURS = [
  {
    periode: "2026 — 2027",
    type: "formation",
    titre: "BTS SIO option SISR — 2e année",
    lieu: "Lycée Baimbridge, Les Abymes",
    detail: "Solutions d'infrastructure, systèmes et réseaux : cybersécurité, haute disponibilité, réseau d'entreprise."
  },
  // Ton stage de 2e année : ajoute un bloc ici une fois le stage confirmé,
  // sur le modèle de celui de la mairie juste en dessous.
  {
    periode: "Mai — juin 2026",
    type: "stage",
    titre: "Stagiaire technicien informatique — 6 semaines",
    lieu: "Service informatique de la mairie de Morne-à-l'Eau",
    detail: "Bastion d'accès distant Apache Guacamole ; script de déploiement de la sauvegarde Bareos poussé sur le parc par GPO ; ACL entre switchs ; borne Wi-Fi UniFi U6 Mesh ; serveurs de conversion de fichiers (VERT, Transmute) ; intégration d'un portable au domaine."
  },
  {
    periode: "2025 — 2026",
    type: "formation",
    titre: "BTS SIO option SISR — 1re année",
    lieu: "Lycée Baimbridge, Les Abymes",
    detail: "Support des utilisateurs, mise à disposition de services, administration des systèmes."
  },
  {
    periode: "2022 — 2025",
    type: "formation",
    titre: "Bac Pro Systèmes numériques — option RISC",
    lieu: "Lycée professionnel Louis Delgrès, Le Moule",
    detail: "Réseaux informatiques et systèmes communicants : installation et maintenance de postes, câblage et mise en réseau (switchs, routeurs), diagnostic de pannes."
  },
  {
    periode: "Pendant le Bac Pro",
    type: "stage",
    titre: "Stagiaire technicien informatique",
    lieu: "CGSS Guadeloupe, Les Abymes",
    detail: "Installation et raccordement de postes de travail, inventaire du parc et recensement du matériel en fin de vie, installation de systèmes d'exploitation, maintenance de premier niveau."
  }
];


/* ==========================================================================
   8. CERTIFICATIONS
   --------------------------------------------------------------------------
   La PREMIÈRE catégorie doit rester celle des certifications réellement
   obtenues : c'est elle que compte le chiffre de l'accueil.
   Pour en ajouter une, mets le badge et le PDF dans assets/certifs/ :
     { nom: "Introduction to Cybersecurity", organisme: "Cisco Networking Academy",
       date: "12 novembre 2026", badge: "assets/certifs/badge-cyber.png",
       fichier: "assets/certifs/certificat-cyber.pdf", poids: "220 Ko",
       verif: "https://www.credly.com/...", couvre: "Ce que ça atteste." }
   Une catégorie vide affiche son texte "vide" à la place.
   ========================================================================== */

const CERTIFICATIONS = [
  {
    categorie: "Certifications obtenues",
    intro: "",
    vide: "Pas encore de certification obtenue : les premières sont prévues pour la fin de l'année 2026. Elles apparaîtront ici avec leur badge et leur lien de vérification.",
    items: []
  },
  {
    categorie: "Objectifs 2026 — 2027",
    intro: "Des parcours gratuits, passés en dehors des cours, choisis pour compléter le programme du BTS.",
    vide: "",
    items: [
      { nom: "Introduction to Cybersecurity", organisme: "Cisco Networking Academy", date: "Objectif : novembre 2026",
        couvre: "Menaces, vulnérabilités et bonnes pratiques de protection des données." },
      { nom: "Networking Basics", organisme: "Cisco Networking Academy", date: "Objectif : décembre 2026",
        couvre: "Fondamentaux des réseaux : adressage IP, Ethernet, services réseau." },
      { nom: "Introduction to Packet Tracer", organisme: "Cisco Networking Academy", date: "Objectif : décembre 2026",
        couvre: "Construction et test de réseaux simulés." },
      { nom: "Parcours « Décrire les concepts cloud » (AZ-900)", organisme: "Microsoft Learn", date: "Objectif : 2027",
        couvre: "Concepts du cloud et architecture Azure. Un parcours de formation, pas une certification." }
    ]
  }
];


/* ==========================================================================
   9. VEILLE TECHNOLOGIQUE
   --------------------------------------------------------------------------
   Sois précis sur les sources : « le CERT-FR » vaut beaucoup plus que
   « des vidéos YouTube ». Le champ "retiens" est celui que le jury lit.
   ========================================================================== */

const VEILLE = [
  {
    sujet: "Cybersécurité et vulnérabilités",
    sources: [
      "Alertes et bulletins du CERT-FR (cert.ssi.gouv.fr)",
      "Cybermalveillance.gouv.fr"
    ],
    retiens: "TODO: en deux phrases, une faille ou une alerte récente et ce qu'elle change pour un administrateur."
  },
  {
    sujet: "Administration sécurisée et accès distant",
    sources: [
      "Guide ANSSI « Recommandations relatives à l'administration sécurisée des SI »",
      "Notes de version d'Apache Guacamole"
    ],
    retiens: "TODO: pourquoi un bastion d'administration est recommandé, en lien avec ce que tu as fait en stage."
  },
  {
    sujet: "Windows Server 2025",
    sources: [
      "Blog Windows Server de Microsoft",
      "Documentation Microsoft Learn"
    ],
    retiens: "TODO: une nouveauté de Windows Server 2025 que tu as remarquée en TP."
  }
];
