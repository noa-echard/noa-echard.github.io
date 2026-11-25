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

  statut: "BTS SIO option SISR, 2e année",
  etablissement: "Lycée Baimbridge, Les Abymes (Guadeloupe)",

  // La phrase la plus importante du site : ce que tu SAIS FAIRE.
  accroche: "Étudiant en BTS SIO SISR, je monte et j'administre des serveurs Windows et Linux, et je documente tout ce que je fais.",

  // Le texte de bienvenue de l'accueil : tu te présentes et tu présentes le site.
  presentation: "Bienvenue sur mon portfolio. Je m'appelle Noa, je suis étudiant en deuxième année de BTS SIO option SISR. Sur ce site, je présente les infrastructures que j'ai montées en projet, en TP et en stage, avec pour chacune le contexte, la solution mise en place et ce que j'en ai retenu.",

  // Ce qui te distingue. Ton stage est ton meilleur argument : du vrai matériel, en production.
  angle: "",

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
  github: "",            // laissé vide : pas de lien vers GitHub sur le site
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
  { cle: "about",          menu: "À propos" },
  { cle: "certifications", menu: "Certifications" },
  { cle: "parcours",       menu: "Parcours" },
  { cle: "projets",        menu: "Projets" },
  { cle: "veille",         menu: "Veille" },
  { cle: "contact",        menu: "Contact" }
];


/* ==========================================================================
   3. CHIFFRES CLÉS — la bande sous ton nom sur l'accueil
   --------------------------------------------------------------------------
   depuis: "competences" / "realisations" / "certifications" → calculé tout seul
   valeur: 28 → écrit à la main (seulement si tu peux le prouver)
   Un chiffre à 0 n'est pas affiché.
   ========================================================================== */

const CHIFFRES = [
  { depuis: "realisations", libelle: "Réalisations",      desc: "Projets, TP et missions de stage documentés" },
  { depuis: "competences",  libelle: "Compétences",       desc: "Chacune liée à un TP ou à un stage" },
  { valeur: "2",            libelle: "Stages en mairie",  desc: "Service informatique de Morne-à-l'Eau" },
  { valeur: "Bac +2",       libelle: "BTS SIO SISR",      desc: "Lycée Baimbridge, 2025-2027" }
];


/* ==========================================================================
   4. À PROPOS — 4 à 6 lignes, à la première personne, sans « passionné »
   ========================================================================== */

const A_PROPOS = {
  // Ton parcours raconté en quelques paragraphes courts, à la première personne.
  recit: [
    "Je suis en deuxième année de BTS SIO option SISR au lycée Baimbridge, aux Abymes, après un Bac Pro Systèmes numériques option RISC.",
    "En première année, j'ai appris à monter une infrastructure de A à Z en machines virtuelles : serveur web Apache, DNS Bind9, DHCP, helpdesk GLPI, puis un domaine Active Directory complet avec ses stratégies de groupe. J'ai aussi câblé du vrai matériel autour d'un switch Cisco SG 300-10.",
    "Au printemps 2026, j'ai passé six semaines au service informatique de la mairie de Morne-à-l'Eau. Là, ce n'était plus une maquette : j'ai installé un bastion d'accès distant et déployé la sauvegarde sur tout le parc, sur une infrastructure dont les agents dépendent tous les jours.",
    "Cette année, je travaille sur la sécurité et la disponibilité des serveurs : haute disponibilité avec un cluster Heartbeat, répartition de charge avec HAProxy, et sécurisation de l'accès Internet avec un serveur proxy.",
    "Le TP sur Heartbeat m'a particulièrement marqué : en arrêtant volontairement le serveur principal, j'ai pu vérifier que le service web restait disponible grâce à la bascule automatique sur le serveur secondaire."
  ],

  // Partie « En dehors des cours » : laissée vide, elle n'est pas affichée.
  intro: "",
  blocs: []
};


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
      { nom: "Windows Server 2025 Datacenter", ou: "TP n°1 Bloc 2 (2026) : serveur srvad, contrôleur du domaine ville-abymes.fr" },
      { nom: "Windows Server 2022 Datacenter", ou: "1re année : TP n°5 Bloc 1 (service DHCP) et TP n°1 Bloc 2 (planification des rôles d'une infrastructure Windows)" },
      { nom: "Active Directory (AD DS)", ou: "TP n°1 Bloc 2 : nouvelle forêt, 4 unités d'organisation et leurs groupes de sécurité" },
      { nom: "Stratégies de groupe (GPO)", ou: "TP n°1 Bloc 2 : lecteurs réseau par service, pare-feu, fonds d'écran ; stage : déploiement de la sauvegarde Bareos sur le parc" },
      { nom: "Déploiement de logiciels MSI par GPO", ou: "TP n°1 Bloc 2 : Notepad++ et Firefox installés sans toucher aux postes" },
      { nom: "Profils itinérants et quotas", ou: "TP n°1 Bloc 2 : profils limités à 5 Go" },
      { nom: "Intégration de postes au domaine", ou: "TP n°1 Bloc 2 : un poste virtuel et un poste physique ; stage : ordinateur portable de la mairie" },
      { nom: "Gestion des disques et partages", ou: "TP n°1 Bloc 2 : partages par service sur un disque dédié, diagnostic d'un disque repassant hors ligne" },
      { nom: "Windows 10 Professionnel", ou: "1re année, TP n°2 Bloc 1 : installation, logiciels (Adobe Reader, OpenOffice, Avast, WinRAR, Firefox) et restrictions de sécurité pour Caribbean Project" }
    ]
  },
  {
    domaine: "Systèmes Linux",
    items: [
      { nom: "Debian 12", ou: "1re année, TP n°3 Bloc 1 : installation ; TP n°6, n°7 Bloc 1 et TP n°2 Bloc 2 : serveurs ; stage : bastion Guacamole" },
      { nom: "Commandes et shell Linux", ou: "1re année, TP n°3 bis Bloc 1 : fichiers, répertoires, paquets apt" },
      { nom: "Configuration réseau Linux", ou: "1re année, TP n°2 Bloc 2 : serveur à deux interfaces (dynamique et statique) dans /etc/network/interfaces" },
      { nom: "Serveur web Apache2", ou: "TP n°6 Bloc 1 : hébergement du site des Jardins de Saint-Éloi" },
      { nom: "DNS Bind9", ou: "1re année, TP n°7 Bloc 1 : résolution de noms pour les Jardins de Saint-Éloi" },
      { nom: "Debian 13 Trixie", ou: "TP n°3 et n°4 Bloc 3 : serveurs web SRVWEB1, SRVWEB2 et répartiteur SRVHAPROXY" },
      { nom: "Haute disponibilité avec Heartbeat", ou: "TP n°3 Bloc 3 : cluster actif/passif SRVWEB1 / SRVWEB2, IP virtuelle 192.168.30.4, bascule et retour automatiques testés" },
      { nom: "Répartition de charge avec HAProxy", ou: "TP n°4 Bloc 3 : cluster actif/actif derrière SRVHAPROXY, algorithme roundrobin et page de statistiques" }
    ]
  },
  {
    domaine: "Réseau",
    items: [
      { nom: "DHCP (Windows Server)", ou: "1re année, TP n°5 Bloc 1 ; TP n°1 Bloc 2 : étendue, bail de 8 jours, options DNS et passerelle" },
      { nom: "DNS (Windows Server)", ou: "TP n°1 Bloc 2 : zones directe et inversée, redirecteur vers Internet" },
      { nom: "Adressage IPv4", ou: "1re année, TP n°5 Bloc 1 : plan d'adressage et configuration des interfaces" },
      { nom: "Switch Cisco SG 300-10 et câblage RJ45", ou: "1re année, TP n°6 et n°7 Bloc 1 : infrastructure physique reliant deux postes" },
      { nom: "Listes de contrôle d'accès (ACL)", ou: "Stage : communication entre switchs de la mairie" },
      { nom: "Wi-Fi UniFi (U6 Mesh)", ou: "Stage : configuration d'une borne d'accès à la mairie" },
      { nom: "Proxy inverse et réseau privé de serveurs", ou: "TP n°4 Bloc 3 : serveurs web isolés sur le réseau HA 10.0.0.0/24, joignables uniquement par le répartiteur" }
    ]
  },
  {
    domaine: "Virtualisation",
    items: [
      { nom: "VirtualBox 7.2", ou: "Tous les TP de 1re année : création, clonage, modes pont et réseau interne" },
      { nom: "VMware Workstation", ou: "TP n°1 Bloc 2 : segment LAN isolé et carte NAT pour Internet ; TP n°4 Bloc 3 : serveur à trois cartes sur trois réseaux" },
      { nom: "VMware vSphere", ou: "Stage : machines virtuelles de production de la mairie, diagnostic d'une carte réseau déconnectée" },
      { nom: "Docker", ou: "Stage : convertisseurs VERT et Transmute déployés en conteneurs sur Debian 13" },
      { nom: "Clonage de machines virtuelles", ou: "TP n°3 Bloc 3 : deux nœuds web clonés en clones complets, avec régénération des adresses MAC ; TP n°4 Bloc 3 : répartiteur cloné depuis une Debian vierge" }
    ]
  },
  {
    domaine: "Sécurité et accès distant",
    items: [
      { nom: "Bastion Apache Guacamole", ou: "Stage : accès distant sécurisé, installation native sur Debian 12" },
      { nom: "Sauvegarde Bareos", ou: "Stage : script de déploiement de l'agent sur les postes" },
      { nom: "Cloisonnement par groupes et droits de partage", ou: "TP n°1 Bloc 2 : chaque service ne voit que son lecteur" },
      { nom: "Double authentification (TOTP)", ou: "Stage : connexion au bastion Guacamole avec un code à usage unique" },
      { nom: "Restrictions du poste utilisateur", ou: "1re année, TP n°2 Bloc 1 : empêcher les manipulations dangereuses pour le parc" }
    ]
  },
  {
    domaine: "Support et gestion de parc",
    items: [
      { nom: "GLPI 10.0.17", ou: "1re année, TP n°2 Bloc 2 : helpdesk du CHU de Pointe-à-Pitre : comptes, profils, suivi des incidents" },
      { nom: "Installation et maintenance de postes", ou: "Stage à la CGSS Guadeloupe : déploiement, inventaire du parc, installation d'OS" }
    ]
  },
  {
    domaine: "Scripts et documentation",
    items: [
      { nom: "Scripts d'installation silencieuse", ou: "Stage : client Bareos installé sur tout le parc via une GPO" },
      { nom: "PowerShell", ou: "TP n°1 Bloc 2 : configuration et vérification du serveur" },
      { nom: "Documentation technique", ou: "TP n°6 et n°7 Bloc 1, TP n°1 Bloc 2, TP n°3 et n°4 Bloc 3 : documentations avec page de garde, sommaire, recette et sitographie" },
      { nom: "Portail Dashy", ou: "Stage, en binôme : page unique regroupant les outils de la mairie, sous Docker sur Ubuntu Server 24.04" }
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
    court: "Bastion Guacamole",
    titre: "Bastion d'accès distant Apache Guacamole",
    sousTitre: "Stage de 1re année à la mairie de Morne-à-l'Eau",
    periode: "Mai à juin 2026",
    statut: "termine",
    cadre: "stage",
    enBref: "Un point d'entrée unique et sécurisé, dans le navigateur, pour administrer à distance les postes et les serveurs de la mairie.",
    equipe: "En binôme (stage)",
    role: "Installation et configuration du bastion, double authentification",
    domaine: "securite",
    chiffres: [
      { val: "1", lib: "point d'entrée pour tout l'accès distant" },
      { val: "3", lib: "protocoles : RDP, SSH et VNC" },
      { val: "2", lib: "facteurs : mot de passe et code TOTP" }
    ],
    etapes: [
      { titre: "Choix de l'installation", texte: "J'ai d'abord envisagé Docker, puis retenu une installation native sur Debian 12, plus simple à maintenir pour le service informatique." },
      { titre: "Installation du bastion", texte: "Installation de Guacamole et de son serveur d'applications sur une machine virtuelle de l'infrastructure vSphere de la mairie." },
      { titre: "Déclaration des connexions", texte: "Ajout des machines à administrer : RDP pour les postes Windows, SSH pour les serveurs Linux, VNC en complément." },
      { titre: "Double authentification", texte: "Activation d'un code TOTP à six chiffres, lu sur le téléphone, en plus du mot de passe." },
      { titre: "Accès des prestataires", texte: "Mon binôme a limité l'accès VPN des prestataires, sur le pare-feu Stormshield, à ce seul bastion." }
    ],
    ameliorations: "Enregistrer les sessions d'administration pour garder une trace de chaque intervention, comme le recommande l'ANSSI pour les accès à privilèges.",
    schema: {
      zones: [ { label: "Infrastructure vSphere de la mairie", x: 330, y: 20, w: 550, h: 340 } ],
      noeuds: [
        { id: "adm", x: 120, y: 110, type: "CLIENT", nom: "Administrateur", sous: "navigateur web" },
        { id: "pres", x: 120, y: 280, type: "EXTERNE", nom: "Prestataire", sous: "VPN Stormshield" },
        { id: "bas", x: 470, y: 190, type: "BASTION", nom: "Guacamole", sous: "Debian 12 · TOTP", actif: true },
        { id: "win", x: 740, y: 80, type: "RDP", nom: "Postes Windows", sous: "port 3389" },
        { id: "lin", x: 740, y: 190, type: "SSH", nom: "Serveurs Linux", sous: "port 22" },
        { id: "vnc", x: 740, y: 300, type: "VNC", nom: "Autres machines", sous: "port 5900" }
      ],
      liens: [ ["adm","bas","HTTPS + TOTP"], ["pres","bas","VPN limité"], ["bas","win",""], ["bas","lin",""], ["bas","vnc",""] ]
    },
    captures: [],
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
    court: "Sauvegarde Bareos",
    titre: "Déploiement de la sauvegarde Bareos par GPO",
    sousTitre: "Stage de 1re année à la mairie de Morne-à-l'Eau",
    periode: "Mai à juin 2026",
    statut: "termine",
    cadre: "stage",
    enBref: "Le client de sauvegarde installé sur tout le parc par une stratégie de groupe, sans passer poste par poste.",
    equipe: "En binôme (stage)",
    role: "Écriture du script et déploiement par GPO",
    domaine: "systemes",
    chiffres: [
      { val: "1", lib: "script d'installation silencieuse" },
      { val: "1", lib: "GPO pour tout le domaine" },
      { val: "0", lib: "intervention manuelle par poste" }
    ],
    etapes: [
      { titre: "Analyse du besoin", texte: "Chaque PC doit avoir le client Bareos pour être sauvegardé ; l'installer à la main aurait laissé des postes oubliés." },
      { titre: "Écriture du script", texte: "Le script installe le client en mode silencieux, avec les paramètres déjà renseignés : nom du poste et adresse du Director, le serveur qui pilote les sauvegardes." },
      { titre: "Test sur un poste", texte: "Vérification de l'installation et de la connexion au Director sur une seule machine avant le déploiement." },
      { titre: "Déploiement par GPO", texte: "Une stratégie de groupe du domaine lance le script sur chaque PC, y compris sur les postes ajoutés plus tard." }
    ],
    ameliorations: "Ajouter un contrôle automatique qui signale les postes où le client n'a pas répondu au Director depuis plusieurs jours.",
    schema: {
      zones: [ { label: "Domaine Active Directory de la mairie", x: 20, y: 20, w: 860, h: 340 } ],
      noeuds: [
        { id: "dc", x: 160, y: 190, type: "AD DS", nom: "Contrôleur de domaine", sous: "GPO de déploiement", actif: true },
        { id: "p1", x: 470, y: 90, type: "POSTE", nom: "Poste 1", sous: "client Bareos" },
        { id: "p2", x: 470, y: 190, type: "POSTE", nom: "Poste 2", sous: "client Bareos" },
        { id: "p3", x: 470, y: 290, type: "POSTE", nom: "Poste n", sous: "client Bareos" },
        { id: "dir", x: 760, y: 190, type: "BAREOS", nom: "Director", sous: "pilote les sauvegardes" }
      ],
      liens: [ ["dc","p1","script"], ["dc","p2",""], ["dc","p3",""], ["p1","dir",""], ["p2","dir","sauvegarde"], ["p3","dir",""] ]
    },
    captures: [],
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
    court: "VERT et Transmute",
    titre: "Serveurs de conversion de fichiers VERT et Transmute",
    sousTitre: "Stage de 1re année à la mairie de Morne-à-l'Eau",
    periode: "Mai à juin 2026",
    statut: "termine",
    cadre: "stage",
    enBref: "Deux convertisseurs de fichiers hébergés à la mairie, pour que les documents des agents ne partent plus sur des sites inconnus.",
    equipe: "En binôme (stage)",
    role: "Installation et comparaison des deux outils",
    domaine: "systemes",
    chiffres: [
      { val: "250+", lib: "formats pris en charge par VERT" },
      { val: "3 000+", lib: "conversions possibles avec Transmute" },
      { val: "0", lib: "fichier envoyé à un site extérieur" }
    ],
    etapes: [
      { titre: "Constat", texte: "Les agents passaient par des sites de conversion en ligne, qui reçoivent donc des documents de la mairie." },
      { titre: "Serveur Docker", texte: "Préparation d'un serveur Debian 13 avec Docker pour héberger les outils dans des conteneurs." },
      { titre: "Mise en place de VERT", texte: "Plus de 250 formats, conversion directement dans le navigateur ; les vidéos demandent un serveur en plus." },
      { titre: "Mise en place de Transmute", texte: "Tout le travail se fait côté serveur, avec plus de 3 000 conversions et la compression de fichiers." },
      { titre: "Suivi en 2e année", texte: "En octobre 2026, mon tuteur m'a confié la vérification du serveur VERT dont la page ne répondait plus, puis son passage en HTTPS." }
    ],
    ameliorations: "Passer tous les serveurs Linux de la mairie en HTTPS avec un certificat, comme prévu pour SVR-VERT.",
    schema: {
      zones: [ { label: "Réseau de la mairie", x: 20, y: 20, w: 600, h: 340 } ],
      noeuds: [
        { id: "ag", x: 140, y: 190, type: "CLIENT", nom: "Agents", sous: "navigateur web" },
        { id: "srv", x: 460, y: 190, type: "DOCKER", nom: "Debian 13", sous: "conteneurs", actif: true },
        { id: "vert", x: 460, y: 70, type: "APP", nom: "VERT", sous: "250+ formats" },
        { id: "tra", x: 460, y: 310, type: "APP", nom: "Transmute", sous: "3 000+ conversions" },
        { id: "web", x: 770, y: 190, type: "INTERNET", nom: "Sites en ligne", sous: "plus utilisés", eteint: true }
      ],
      liens: [ ["ag","srv","HTTP"], ["srv","vert",""], ["srv","tra",""], ["ag","web","abandonné", true] ]
    },
    captures: [],
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
    id: "web-dns-saint-eloi",
    court: "Apache et Bind9",
    titre: "Hébergement web et service DNS pour Les Jardins de Saint-Éloi",
    sousTitre: "TP n°6 et n°7 du Bloc 1, 1re année",
    periode: "Février à avril 2026",
    statut: "termine",
    cadre: "tp",
    enBref: "Un serveur Linux qui héberge le site des Jardins de Saint-Éloi et le rend accessible par son nom de domaine.",
    equipe: "Seul",
    role: "Installation et configuration complètes",
    domaine: "systemes",
    chiffres: [
      { val: "2", lib: "services : web et DNS" },
      { val: "2", lib: "zones DNS : directe et inverse" },
      { val: "2", lib: "comptes rendus rédigés" }
    ],
    etapes: [
      { titre: "Serveur Debian", texte: "srvlinux (192.168.10.4), sans interface graphique, avec une carte sur le réseau interne et une pour Internet." },
      { titre: "Serveur web Apache2", texte: "Création d'un hôte virtuel dédié au site, servi sur le port 8080." },
      { titre: "Serveur DNS Bind9", texte: "Zone directe jardinsainteloi.com (A pour srvlinux et www, alias CNAME www2) et zone inverse avec les PTR." },
      { titre: "Vérifications", texte: "Contrôle de la syntaxe avec named-checkzone et named-checkconf avant de démarrer le service." },
      { titre: "Tests côté client", texte: "Poste Windows configuré sur ce DNS : nslookup et navigateur sur www et www2." }
    ],
    ameliorations: "Ajouter un second serveur DNS secondaire pour que la résolution de noms ne dépende plus d'une seule machine.",
    schema: {
      zones: [ { label: "Réseau interne 192.168.10.0/24", x: 20, y: 20, w: 860, h: 340 } ],
      noeuds: [
        { id: "cli", x: 160, y: 190, type: "CLIENT", nom: "Poste Windows", sous: "DNS → 192.168.10.4" },
        { id: "srv", x: 520, y: 190, type: "DEBIAN 12", nom: "srvlinux", sous: "192.168.10.4", actif: true },
        { id: "dns", x: 780, y: 100, type: "BIND9", nom: "DNS", sous: "jardinsainteloi.com" },
        { id: "web", x: 780, y: 280, type: "APACHE2", nom: "Site web", sous: "port 8080" }
      ],
      liens: [ ["cli","srv","www.jardinsainteloi.com"], ["srv","dns",""], ["srv","web",""] ]
    },
    captures: [],
    tags: ["Debian 12", "Apache2", "Bind9", "DNS", "Hôte virtuel"],

    contexte: "Les Jardins de Saint-Éloi vendent des fleurs exotiques et des produits locaux en Guadeloupe. La gérante, Mme Bourgeois, veut développer son activité avec un site de vente en ligne, et l'ESN IPEOS I Solutions est chargée de mettre en place l'infrastructure qui l'hébergera.",
    probleme: "Il fallait un serveur capable d'héberger le site de l'entreprise, puis un service DNS pour que les postes y accèdent par un nom de domaine, jardinsainteloi.com, plutôt que par une adresse IP.",
    solution: "Sur un serveur Debian 12 sans interface graphique, srvlinux (192.168.10.4), avec une carte sur le réseau interne en adresse fixe et une seconde pour l'accès Internet, j'ai installé Apache2 et créé un hôte virtuel dédié au site, servi sur le port 8080. Dans le TP suivant, j'ai installé Bind9 sur le même serveur et créé deux zones : une zone directe, avec les enregistrements A de srvlinux et de www et un alias CNAME www2, et une zone inverse en 10.168.192.in-addr.arpa avec les enregistrements PTR. J'ai vérifié la syntaxe avec named-checkzone et named-checkconf avant de démarrer le service, puis configuré le poste Windows pour qu'il utilise ce serveur DNS.",
    outils: ["Debian 12", "Apache2", "Bind9", "VirtualBox", "Windows (poste client)", "nslookup, dig, host"],
    resultats: [
      "Le site s'affiche depuis le poste Windows à l'adresse www.jardinsainteloi.com, et aussi par l'alias www2.",
      "La résolution directe renvoie 192.168.10.4 pour www et www2, et la résolution inverse renvoie le nom www.jardinsainteloi.com pour cette adresse.",
      "Les tests sont validés côté serveur avec host, nslookup et dig, et côté client avec nslookup et le navigateur.",
      "Deux comptes rendus rédigés, avec page de garde, sommaire et sitographie."
    ],
    appris: "Dans un fichier de zone, un nom complet doit se terminer par un point : sans lui, Bind9 ajoute le nom de la zone à la fin et l'enregistrement devient faux. J'ai aussi appris à toujours vérifier la configuration avec les outils de contrôle avant de redémarrer un service, et que le fichier /etc/resolv.conf est réécrit au redémarrage du réseau : je l'ai protégé avec l'attribut immuable.",
    referentiel: [
      "Installer et configurer un serveur sous Linux",
      "Mettre à disposition un service web",
      "Déployer un service de résolution de noms",
      "Tester et documenter un service"
    ]
  },

  {
    id: "mairie-abymes",
    court: "Active Directory",
    titre: "Infrastructure Active Directory pour la mairie des Abymes",
    sousTitre: "TP n°1 du Bloc 2, administration des systèmes",
    periode: "Septembre 2026",
    statut: "termine",
    cadre: "tp",
    enBref: "Un domaine Active Directory complet pour une mairie de 450 postes : comptes, droits, lecteurs réseau et logiciels gérés depuis un seul serveur.",
    equipe: "Seul",
    role: "Installation et configuration complètes",
    domaine: "systemes",
    chiffres: [
      { val: "8", lib: "étapes du cahier des charges réalisées" },
      { val: "4", lib: "unités d'organisation et groupes" },
      { val: "28", lib: "pages de documentation" }
    ],
    etapes: [
      { titre: "Serveur et domaine", texte: "srvad sous Windows Server 2025, promu contrôleur du domaine ville-abymes.fr." },
      { titre: "DNS et DHCP", texte: "Zones directe et inversée, étendue DHCP sur 192.168.30.0/24 avec un bail de 8 jours." },
      { titre: "Organigramme", texte: "Quatre unités d'organisation (Direction, Tech_logistique, Compta_finance, Informatique) avec leurs groupes de sécurité." },
      { titre: "Stratégies de groupe", texte: "Un lecteur réseau par service (W: à Z:), fond d'écran, et installation de Notepad++ et Firefox en MSI." },
      { titre: "Profils et postes", texte: "Profils itinérants limités à 5 Go, intégration d'un poste virtuel et d'un poste physique au domaine." }
    ],
    ameliorations: "Ajouter un second contrôleur de domaine pour que l'authentification continue de fonctionner si srvad tombe en panne.",
    schema: {
      zones: [ { label: "Réseau mairie 192.168.30.0/24", x: 20, y: 20, w: 640, h: 340 } ],
      noeuds: [
        { id: "ad", x: 200, y: 190, type: "WS 2025", nom: "srvad", sous: "AD DS · DNS · DHCP · GPO", actif: true },
        { id: "p0", x: 520, y: 100, type: "POSTE", nom: "poste0", sous: "Windows 10 (VM)" },
        { id: "p1", x: 520, y: 280, type: "POSTE", nom: "poste1", sous: "poste physique" },
        { id: "nat", x: 790, y: 190, type: "NAT", nom: "Internet", sous: "redirecteur DNS" }
      ],
      liens: [ ["ad","p0","GPO · DHCP"], ["ad","p1",""], ["ad","nat","carte NAT"] ]
    },
    captures: [],
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
    id: "glpi-chu",
    court: "Helpdesk GLPI",
    titre: "Helpdesk GLPI pour le CHU de Pointe-à-Pitre",
    sousTitre: "TP n°2 du Bloc 2, 1re année",
    periode: "2025-2026",
    statut: "termine",
    cadre: "tp",
    enBref: "Un outil de ticketing pour que les incidents signalés au service informatique du CHU soient suivis jusqu'à leur clôture.",
    equipe: "Seul",
    role: "Installation et configuration complètes",
    domaine: "support",
    chiffres: [
      { val: "4", lib: "comptes avec des profils différents" },
      { val: "1", lib: "serveur Debian sans interface" },
      { val: "2", lib: "cartes réseau configurées" }
    ],
    etapes: [
      { titre: "Serveur", texte: "srvglpi sous Debian 12 sans interface graphique, une carte pour Internet et une en adresse fixe pour le réseau interne." },
      { titre: "Socle web", texte: "Installation d'Apache, de MariaDB et de PHP, nécessaires à GLPI." },
      { titre: "GLPI 10.0.17", texte: "Installation, création de la base de données et configuration de l'application." },
      { titre: "Comptes et profils", texte: "Un administrateur-technicien et trois utilisateurs du service." },
      { titre: "Test depuis un client", texte: "Accès à l'application depuis le navigateur d'un poste Windows 10." }
    ],
    ameliorations: "Relier GLPI à un annuaire Active Directory pour que les agents se connectent avec leur compte habituel.",
    schema: {
      zones: [ { label: "Réseau interne du CHU", x: 20, y: 20, w: 600, h: 340 } ],
      noeuds: [
        { id: "cli", x: 150, y: 190, type: "CLIENT", nom: "Poste Windows 10", sous: "navigateur web" },
        { id: "glpi", x: 460, y: 190, type: "DEBIAN 12", nom: "srvglpi", sous: "GLPI 10.0.17", actif: true },
        { id: "bdd", x: 460, y: 320, type: "MARIADB", nom: "Base GLPI", sous: "tickets, comptes" },
        { id: "net", x: 780, y: 190, type: "NAT", nom: "Internet", sous: "mises à jour" }
      ],
      liens: [ ["cli","glpi","HTTP"], ["glpi","bdd",""], ["glpi","net","carte NAT"] ]
    },
    captures: [],
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
    id: "cluster-saint-eloi",
    court: "Cluster Heartbeat",
    titre: "Serveur web haute disponibilité avec Heartbeat",
    sousTitre: "TP n°3 du Bloc 3, pour Les Jardins de Saint-Éloi",
    periode: "Septembre 2026",
    statut: "termine",
    cadre: "tp",
    enBref: "Deux serveurs web en cluster : si le premier tombe, le second reprend le site à la même adresse en quelques secondes.",
    equipe: "Seul",
    role: "Installation, configuration et recette",
    domaine: "dispo",
    chiffres: [
      { val: "16/16", lib: "tests de recette conformes" },
      { val: "5 s", lib: "pour déclarer un nœud mort" },
      { val: "27", lib: "captures commentées dans la doc" }
    ],
    etapes: [
      { titre: "Clonage du serveur web", texte: "Deux clones complets du serveur existant, SRVWEB1 (192.168.30.14) et SRVWEB2 (192.168.30.15), avec des adresses MAC régénérées." },
      { titre: "Remise en état d'Apache", texte: "Retour du site sur le port 80 et une page différente par serveur pour voir lequel répond." },
      { titre: "Configuration de Heartbeat", texte: "Les fichiers ha.cf (battement toutes les 2 secondes, nœud mort après 5), authkeys et haresources." },
      { titre: "Adresse IP virtuelle", texte: "Les clients utilisent 192.168.30.4, portée par le serveur actif et déplacée en cas de panne." },
      { titre: "Recette", texte: "Panne simulée de SRVWEB1, bascule vers SRVWEB2, puis retour automatique quand SRVWEB1 revient." }
    ],
    ameliorations: "Surveiller aussi le service Apache lui-même : Heartbeat ne détecte que la panne d'un serveur entier. C'est ce que corrige le TP suivant avec HAProxy.",
    schema: {
      zones: [ { label: "Cluster actif / passif · 192.168.30.0/24", x: 300, y: 20, w: 580, h: 340 } ],
      noeuds: [
        { id: "cli", x: 130, y: 190, type: "CLIENT", nom: "Clients", sous: "navigateur" },
        { id: "vip", x: 430, y: 190, type: "IP VIRTUELLE", nom: "192.168.30.4", sous: "portée par le nœud actif", actif: true },
        { id: "w1", x: 740, y: 90, type: "ACTIF", nom: "SRVWEB1", sous: "192.168.30.14" },
        { id: "w2", x: 740, y: 290, type: "PASSIF", nom: "SRVWEB2", sous: "192.168.30.15" }
      ],
      liens: [ ["cli","vip","HTTP"], ["vip","w1",""], ["vip","w2","bascule", true], ["w1","w2","battement 2 s", true] ]
    },
    captures: [],
    tags: ["Debian 13", "Apache2", "Heartbeat", "Cluster actif/passif", "IP virtuelle"],

    contexte: "Les Jardins de Saint-Éloi, entreprise de vente de fleurs et de produits locaux, hébergent leur site sur un serveur Apache2 sous Debian, monté en 1re année avec un DNS Bind9. Ce serveur unique est un point unique de défaillance.",
    probleme: "Si le serveur web tombe en panne, le site n'est plus accessible aux clients. Mme Bourgeois veut un serveur de secours qui prenne le relais automatiquement.",
    solution: "J'ai cloné le serveur web existant en deux clones complets, SRVWEB1 (192.168.30.14) et SRVWEB2 (192.168.30.15), en régénérant les adresses MAC et en gardant une copie de sauvegarde. Après avoir remis Apache sur le port 80, j'ai installé Heartbeat sur les deux nœuds et rédigé ses trois fichiers : ha.cf (battements toutes les 2 secondes, nœud déclaré mort après 5 secondes), authkeys et haresources. Les clients utilisent une adresse IP virtuelle, 192.168.30.4, portée par le serveur actif : Heartbeat la déplace et démarre Apache sur le serveur de secours en cas de panne.",
    outils: ["Debian 13 Trixie", "Apache 2.4", "Heartbeat 3.0.6", "VMware Workstation", "Windows Server 2025 (DHCP)", "Firefox"],
    resultats: [
      "16 tests de recette, tous conformes.",
      "Panne simulée de SRVWEB1 : SRVWEB2 reprend l'IP virtuelle et le site en quelques secondes, à la même adresse.",
      "Retour automatique : dès que SRVWEB1 revient, il reprend l'IP virtuelle et la page « site n°1 » s'affiche de nouveau.",
      "Une documentation technique avec 27 captures commentées, rédigée comme un guide pas à pas pour un technicien débutant."
    ],
    appris: "Heartbeat refusait de s'installer : le serveur n'avait plus accès à Internet. La cause était la passerelle 192.168.30.1 demandée par l'énoncé, qui n'existe pas dans mon réseau virtuel et créait une route par défaut inutilisable. En la retirant, la sortie s'est faite par la carte NAT. J'ai aussi compris une limite de Heartbeat : il surveille les serveurs, pas Apache lui-même. Si seul Apache plante, aucune bascule n'a lieu.",
    referentiel: [
      "Assurer la disponibilité d'un service",
      "Installer et configurer un cluster de serveurs",
      "Tester une solution de tolérance aux pannes",
      "Documenter la solution livrée"
    ]
  },

  {
    id: "haproxy-saint-eloi",
    court: "HAProxy",
    titre: "Répartition de charge avec HAProxy",
    sousTitre: "TP n°4 du Bloc 3, pour Les Jardins de Saint-Éloi",
    periode: "Octobre 2026",
    statut: "termine",
    cadre: "tp",
    enBref: "Un répartiteur de charge qui fait travailler les deux serveurs web en même temps et écarte celui qui tombe en panne.",
    equipe: "Seul",
    role: "Installation, configuration et recette",
    domaine: "dispo",
    chiffres: [
      { val: "17/18", lib: "tests de recette conformes" },
      { val: "3", lib: "réseaux sur le répartiteur" },
      { val: "37", lib: "captures commentées dans la doc" }
    ],
    etapes: [
      { titre: "Le répartiteur", texte: "SRVHAPROXY créé à partir d'une Debian 13 vierge, avec trois cartes : clients (192.168.30.4), réseau privé des serveurs (10.0.0.1) et NAT." },
      { titre: "Réseau privé des serveurs", texte: "SRVWEB1 et SRVWEB2 déplacés sur 10.0.0.2 et 10.0.0.3, Heartbeat désactivé : ils ne sont joignables que par le répartiteur." },
      { titre: "Configuration de HAProxy", texte: "Un frontend sur le port 80, un backend en roundrobin avec vérification de l'état des serveurs." },
      { titre: "Page de statistiques", texte: "Une page protégée par un compte qui affiche l'état et les compteurs de chaque serveur." },
      { titre: "Recette", texte: "Alternance des requêtes, panne d'Apache sur SRVWEB1, puis réintégration automatique après réparation." }
    ],
    ameliorations: "Doubler le répartiteur avec Keepalived : aujourd'hui, c'est lui qui devient le point unique de défaillance.",
    schema: {
      zones: [ { label: "Réseau clients 192.168.30.0/24", x: 20, y: 20, w: 360, h: 340 }, { label: "Réseau privé HA 10.0.0.0/24", x: 520, y: 20, w: 360, h: 340 } ],
      noeuds: [
        { id: "cli", x: 140, y: 190, type: "CLIENT", nom: "Clients", sous: "navigateur" },
        { id: "ha", x: 450, y: 190, type: "HAPROXY", nom: "SRVHAPROXY", sous: ".30.4 · 10.0.0.1", actif: true },
        { id: "w1", x: 750, y: 100, type: "APACHE", nom: "SRVWEB1", sous: "10.0.0.2" },
        { id: "w2", x: 750, y: 280, type: "APACHE", nom: "SRVWEB2", sous: "10.0.0.3" }
      ],
      liens: [ ["cli","ha","port 80"], ["ha","w1","roundrobin"], ["ha","w2",""] ]
    },
    captures: [],
    tags: ["HAProxy", "Debian 13", "Apache2", "Cluster actif/actif", "Roundrobin"],

    contexte: "Suite du TP Heartbeat : le cluster actif/passif fonctionne, mais SRVWEB2 ne sert qu'en cas de panne et reste inutilisé le reste du temps.",
    probleme: "Mme Bourgeois veut que les deux serveurs web travaillent en même temps, sans que l'un soit surchargé pendant que l'autre ne fait rien, tout en gardant le site accessible si l'un tombe.",
    solution: "J'ai créé un répartiteur de charge, SRVHAPROXY, à partir d'une Debian 13 vierge, avec trois cartes : une côté clients (192.168.30.4), une sur un réseau privé dédié aux serveurs web (10.0.0.1) et une NAT pour Internet. Les deux serveurs web ont été déplacés sur ce réseau privé (10.0.0.2 et 10.0.0.3) et Heartbeat y a été désactivé. Dans la configuration de HAProxy, j'ai défini un frontend qui reçoit les requêtes sur le port 80, un backend qui les envoie à tour de rôle aux deux serveurs (roundrobin) en vérifiant leur état, et une page de statistiques protégée par un compte.",
    outils: ["HAProxy 3.0", "Debian 13 Trixie", "Apache 2.4", "curl", "VMware Workstation", "Windows 10 (poste client)"],
    resultats: [
      "18 tests de recette réalisés, 17 conformes avec capture à l'appui.",
      "Les requêtes alternent entre SRVWEB1 et SRVWEB2, ce que confirment les compteurs de la page de statistiques.",
      "Panne simulée d'Apache sur SRVWEB1 : il passe DOWN en quelques secondes et SRVWEB2 répond seul, sans coupure du site.",
      "Le serveur réparé est réintégré automatiquement : le backend repasse à 2 serveurs sur 2.",
      "Une documentation technique avec 37 captures commentées."
    ],
    appris: "Dans Firefox, la page semblait toujours venir du même serveur. En lisant les compteurs de HAProxy, j'ai compris que chaque chargement envoie deux requêtes, la page et l'icône favicon.ico : le roundrobin les répartit bien, mais la page tombe toujours sur le même serveur. Les tests avec curl l'ont confirmé. J'en retiens qu'il faut vérifier un résultat avec un outil qui montre ce qui se passe vraiment. J'ai aussi noté que le répartiteur devient à son tour un point unique de défaillance : il faudrait en ajouter un second avec Keepalived.",
    referentiel: [
      "Assurer la disponibilité d'un service",
      "Répartir la charge entre plusieurs serveurs",
      "Segmenter le réseau des serveurs",
      "Tester et documenter la solution"
    ]
  },

  {
    id: "projet-mirbeau",
    court: "Projet Mirbeau",
    titre: "Extension et sécurisation du réseau de l'huilerie Mirbeau",
    sousTitre: "AP2, projet en binôme, BTS SIO 1re année",
    periode: "Avril 2026",
    statut: "termine",
    cadre: "projet",
    enBref: "Le réseau de l'huilerie étendu à un second bâtiment, avec des données strictement séparées entre la Comptabilité et la Direction.",
    equipe: "En binôme",
    role: "Partie bâtiment Administratif : AD, DNS, DHCP, droits et GPO",
    domaine: "reseau",
    chiffres: [
      { val: "2", lib: "sites reliés par deux routeurs" },
      { val: "3", lib: "dossiers partagés aux droits distincts" },
      { val: "2", lib: "groupes de sécurité par service" }
    ],
    etapes: [
      { titre: "Répartition du travail", texte: "Prototype monté sur deux ordinateurs portables : je me suis occupé du bâtiment Administratif, mon binôme du bâtiment Production." },
      { titre: "Services du domaine", texte: "Sur MIRPRIM (192.168.2.2) : domaine mirbeau.com avec AD DS, DNS et DHCP, et l'agent relais DHCP pour l'autre sous-réseau." },
      { titre: "Comptes et groupes", texte: "Unité d'organisation ADMINISTRATIF, utilisateurs de chaque service, groupes G_COMPTA et G_DIRECTION." },
      { titre: "Partage et droits NTFS", texte: "Partage DONNEES en lecteur Z: avec COMPTABILITE, DIRECTION et COMMUN ; héritage désactivé sur les dossiers sensibles." },
      { titre: "Stratégies de groupe", texte: "Panneau de configuration bloqué et fond d'écran propre à chaque service grâce au filtrage de sécurité." }
    ],
    ameliorations: "Mettre en place une sauvegarde du partage DONNEES et un second contrôleur de domaine sur le site Production.",
    schema: {
      zones: [ { label: "Administratif · 192.168.2.0/24", x: 20, y: 20, w: 400, h: 340 }, { label: "Production · 192.168.3.0/24", x: 480, y: 20, w: 400, h: 340 } ],
      noeuds: [
        { id: "dc", x: 130, y: 110, type: "AD · DNS · DHCP", nom: "MIRPRIM", sous: "192.168.2.2", actif: true },
        { id: "pa", x: 130, y: 280, type: "POSTE", nom: "Compta · Direction", sous: "lecteur Z:" },
        { id: "r1", x: 340, y: 190, type: "ROUTEUR", nom: "R1", sous: "site Administratif" },
        { id: "r2", x: 560, y: 190, type: "ROUTEUR", nom: "R2", sous: "relais DHCP" },
        { id: "pp", x: 780, y: 190, type: "POSTE", nom: "Postes Production", sous: "adresse par relais" }
      ],
      liens: [ ["dc","r1",""], ["pa","r1",""], ["r1","r2","interconnexion"], ["r2","pp",""] ]
    },
    captures: [],
    tags: ["Windows Server", "Active Directory", "DHCP", "DNS", "GPO", "NTFS"],

    contexte: "L'huilerie Mirbeau s'agrandit avec un nouveau bâtiment. Son réseau doit relier deux sites : le bâtiment Administratif (192.168.2.0/24), qui regroupe la Comptabilité et la Direction, et le bâtiment Production (192.168.3.0/24), interconnectés par deux routeurs. Nous avons monté le prototype en binôme sur deux ordinateurs portables : je me suis occupé de la partie Administratif, mon binôme de la partie Production.",
    probleme: "L'entreprise veut une infrastructure centralisée : adressage automatique des postes sur les deux sous-réseaux, résolution de noms, comptes gérés dans un annuaire, et surtout une séparation stricte des données, la Comptabilité ne devant pas accéder aux dossiers confidentiels de la Direction, tout en gardant un espace d'échange commun.",
    solution: "Sur le serveur MIRPRIM (192.168.2.2), j'ai créé le domaine mirbeau.com avec les rôles AD DS, DNS et DHCP, et configuré l'agent relais DHCP pour que les postes de l'autre sous-réseau reçoivent aussi leur adresse. Dans l'annuaire, j'ai créé l'unité d'organisation ADMINISTRATIF, les utilisateurs de chaque service et les groupes de sécurité G_COMPTA et G_DIRECTION. J'ai mis en place un partage DONNEES, connecté en lecteur Z:, avec trois dossiers : COMPTABILITE, DIRECTION et COMMUN. Sur les dossiers sensibles, j'ai désactivé l'héritage des permissions NTFS, retiré le groupe « Utilisateurs du domaine » et donné le droit de modification au seul groupe concerné. Enfin, j'ai créé des stratégies de groupe : interdiction du Panneau de configuration et fond d'écran propre à chaque service, appliqué grâce au filtrage de sécurité.",
    outils: ["Windows Server", "Active Directory (AD DS)", "DNS", "DHCP et agent relais", "Stratégies de groupe (GPO)", "Permissions NTFS", "Windows 10 (poste client)", "VMware Workstation"],
    resultats: [
      "Un utilisateur de la Comptabilité qui tente d'ouvrir le dossier DIRECTION obtient « Accès refusé », et inversement.",
      "Le dossier COMMUN reste accessible à tous les utilisateurs du domaine.",
      "Le lecteur réseau Z: et le fond d'écran du service s'appliquent automatiquement à l'ouverture de session.",
      "Le Panneau de configuration est bloqué sur les postes, ce qui empêche les utilisateurs de modifier les réglages réseau ou système."
    ],
    appris: "Donner des droits à un groupe ne suffit pas à protéger un dossier : tant que l'héritage est actif, le groupe « Utilisateurs du domaine » garde son accès depuis le dossier parent. C'est en désactivant l'héritage puis en retirant ce groupe que l'isolation entre les services est devenue réelle. J'ai aussi retenu l'intérêt de gérer les droits et les GPO par groupe plutôt qu'utilisateur par utilisateur : l'arrivée d'un nouvel employé se résume à l'ajouter au bon groupe.",
    referentiel: [
      "Concevoir et étendre un réseau multi-sites",
      "Installer et configurer les services AD DS, DNS et DHCP",
      "Gérer les identités et les droits d'accès",
      "Sécuriser l'accès aux données",
      "Travailler en binôme et répartir les tâches"
    ]
  },

  {
    id: "projet-proxy",
    court: "Projet Proxy",
    titre: "Serveur proxy et sécurisation de l'accès Internet",
    sousTitre: "AP3, projet en équipe pour Caribbean Project",
    periode: "Novembre 2026",
    statut: "en-cours",
    cadre: "projet",
    enBref: "Une DMZ pour les services exposés et un proxy qui filtre, authentifie et journalise la navigation des salariés.",
    equipe: "En binôme",
    role: "Ma partie : la DMZ et l'accès à Internet",
    domaine: "securite",
    chiffres: [
      { val: "3", lib: "zones : réseau privé, DMZ, Internet" },
      { val: "3 mois", lib: "d'historique de navigation à conserver" },
      { val: "25", lib: "salariés concernés" }
    ],
    etapes: [
      { titre: "Analyse du cahier des charges", texte: "Besoins de Caribbean Project : DMZ, routeur/pare-feu, filtrage des sites non professionnels, authentification et historique de navigation." },
      { titre: "Répartition en binôme", texte: "Mon binôme s'occupe du réseau local (contrôleur de domaine, DHCP, poste client et proxy) ; je prends la partie DMZ et accès Internet." },
      { titre: "Routeur/pare-feu côté Internet", texte: "Un pfSense pour la sortie Internet, la liaison avec le routeur du réseau local et la DMZ." },
      { titre: "Serveur en DMZ", texte: "Un serveur Linux qui regroupe les services exposés, web et FTP, pour limiter le nombre de machines." },
      { titre: "Tests et présentation", texte: "Vérification du filtrage et de l'authentification, puis présentation de la solution. En cours." }
    ],
    ameliorations: "",
    schema: {
      zones: [ { label: "Réseau privé (binôme)", x: 20, y: 20, w: 280, h: 340 }, { label: "DMZ (ma partie)", x: 600, y: 210, w: 280, h: 150 } ],
      noeuds: [
        { id: "lan", x: 160, y: 110, type: "AD · DNS · DHCP", nom: "Serveur LAN", sous: "binôme" },
        { id: "prx", x: 160, y: 280, type: "PROXY", nom: "Proxy filtrant", sous: "authentification" },
        { id: "fw", x: 450, y: 190, type: "PFSENSE", nom: "Routeur/pare-feu", sous: "privé · DMZ · Internet", actif: true },
        { id: "dmz", x: 740, y: 290, type: "DEBIAN", nom: "Serveur DMZ", sous: "Web + FTP" },
        { id: "net", x: 740, y: 90, type: "WAN", nom: "Internet", sous: "" }
      ],
      liens: [ ["lan","fw",""], ["prx","fw","navigation filtrée"], ["fw","dmz",""], ["fw","net",""] ]
    },
    captures: [],
    tags: ["Serveur proxy", "DMZ", "pfSense", "Filtrage web", "Authentification"],

    contexte: "Caribbean Project est une start-up parisienne de 25 salariés spécialisée dans le commerce international. Elle veut étendre son système d'information : ses services n'ont pas encore de réseau commun, et ses commerciaux, qui se déplacent dans toute la France, doivent accéder à distance et de façon sécurisée aux applications de l'entreprise.",
    probleme: "L'entreprise veut une DMZ pour ses services exposés (web, messagerie, fichiers, applications métiers), un routeur/pare-feu au cœur du réseau, et un contrôle de la navigation des salariés : bloquer les sites non professionnels (streaming, réservation de voyages), authentifier chaque utilisateur par identifiant et mot de passe, et conserver l'historique des sites visités pendant au moins trois mois, le tout de façon transparente pour les salariés.",
    solution: "Avec mon équipe, nous réalisons d'abord un prototype de l'infrastructure : un réseau privé en 172.16.0.0/16 avec les serveurs DNS/contrôleur de domaine, DHCP, base de données et sauvegarde, une DMZ en 172.17.1.0/24 pour les serveurs web, messagerie, applications et fichiers, et un routeur/pare-feu à trois interfaces (réseau privé, DMZ, Internet). Nous déployons ensuite un serveur proxy filtrant sur le réseau local, avec authentification des utilisateurs et journalisation des accès, puis nous le testons avant de présenter la solution.",
    outils: ["Debian 13 Trixie", "Windows Server 2022/2025", "Windows 11", "Routeur/pare-feu", "Commutateurs Cisco", "Virtualisation"],
    referentiel: [
      "Analyser les besoins et les contraintes d'un client",
      "Concevoir et réaliser le prototype d'une infrastructure réseau",
      "Sécuriser l'accès à Internet et contrôler la navigation",
      "Travailler en équipe et répartir les tâches",
      "Tester, documenter et présenter la solution"
    ]
  }

];


/* ==========================================================================
   7. PARCOURS — du plus récent au plus ancien
   type : "formation" | "stage"
   ========================================================================== */

const PARCOURS = [
  {
    periode: "2026-2027",
    sigle: "BTS",
    type: "formation",
    titre: "BTS SIO option SISR, 2e année",
    lieu: "Lycée Baimbridge, Les Abymes",
    detail: "Solutions d'infrastructure, systèmes et réseaux : cybersécurité, haute disponibilité et répartition de charge des serveurs."
  },
  {
    periode: "Octobre 2026 à janvier 2027",
    sigle: "MAE",
    type: "stage",
    titre: "Stagiaire technicien systèmes et réseaux (2e année)",
    lieu: "Service informatique de la mairie de Morne-à-l'Eau",
    detail: "Installation des outils d'administration RSAT (AD DS, DHCP) sur un serveur de rebond pour administrer avec des droits limités ; configuration du Wi-Fi des clients légers ; diagnostic du serveur de conversion VERT et passage en HTTPS ; analyse des fermetures de session lentes ; remplacement des pare-feu pfSense virtuels hébergés chez OVH sans couper la production."
  },
  {
    periode: "Mai à juin 2026",
    sigle: "MAE",
    type: "stage",
    titre: "Stagiaire technicien informatique (6 semaines)",
    lieu: "Service informatique de la mairie de Morne-à-l'Eau",
    detail: "Bastion d'accès distant Apache Guacamole ; script de déploiement de la sauvegarde Bareos poussé sur le parc par GPO ; ACL entre switchs ; borne Wi-Fi UniFi U6 Mesh ; serveurs de conversion de fichiers (VERT, Transmute) ; intégration d'un portable au domaine."
  },
  {
    periode: "2025-2026",
    sigle: "BTS",
    type: "formation",
    titre: "BTS SIO option SISR, 1re année",
    lieu: "Lycée Baimbridge, Les Abymes",
    detail: "Support des utilisateurs, mise à disposition de services, administration des systèmes."
  },
  {
    periode: "2022-2025",
    sigle: "BAC",
    type: "formation",
    titre: "Bac Pro Systèmes numériques, option RISC",
    lieu: "Lycée professionnel Louis Delgrès, Le Moule",
    detail: "Réseaux informatiques et systèmes communicants : installation et maintenance de postes, câblage et mise en réseau (switchs, routeurs), diagnostic de pannes."
  },
  {
    periode: "Pendant le Bac Pro",
    sigle: "CGSS",
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
    categorie: "Objectifs Cisco Networking Academy",
    intro: "Des parcours gratuits, passés en dehors des cours, choisis pour compléter le programme du BTS.",
    vide: "",
    items: [
      { nom: "Introduction to Cybersecurity", organisme: "Cisco Networking Academy", date: "Objectif : novembre 2026",
        couvre: "Menaces, vulnérabilités et bonnes pratiques de protection des données." },
      { nom: "Networking Basics", organisme: "Cisco Networking Academy", date: "Objectif : décembre 2026",
        couvre: "Fondamentaux des réseaux : adressage IP, Ethernet, services réseau." },
      { nom: "Introduction to Packet Tracer", organisme: "Cisco Networking Academy", date: "Objectif : décembre 2026",
        couvre: "Construction et test de réseaux simulés." },
      { nom: "Exploring Networking with Cisco Packet Tracer", organisme: "Cisco Networking Academy", date: "Objectif : début 2027",
        couvre: "Conception et test de topologies réseau en environnement simulé." },
      { nom: "Exploring Internet of Things with Cisco Packet Tracer", organisme: "Cisco Networking Academy", date: "Objectif : début 2027",
        couvre: "Simulation d'objets connectés et de réseaux domestiques intelligents." }
    ]
  },
  {
    categorie: "Objectifs cloud et intelligence artificielle",
    intro: "Des parcours courts et gratuits chez les éditeurs eux-mêmes. Ce sont des badges de formation, pas des certifications.",
    vide: "",
    items: [
      { nom: "Parcours « Présentation de l'infrastructure cloud : décrire les concepts cloud »", organisme: "Microsoft Learn", date: "Objectif : 2027",
        couvre: "Concepts du cloud, types de services (IaaS, PaaS, SaaS) et composants d'Azure. Prépare à l'AZ-900." },
      { nom: "AWS Cloud Practitioner Essentials (préparation au CLF-C02)", organisme: "AWS Skill Builder", date: "Objectif : 2027",
        couvre: "Bases du cloud AWS : services, sécurité, tarification." },
      { nom: "Introduction to Generative AI et Introduction to Responsible AI", organisme: "Google Skills", date: "Objectif : 2027",
        couvre: "Fonctionnement de l'IA générative et principes d'un usage responsable." },
      { nom: "AI Fluency: Framework & Foundations", organisme: "Anthropic Academy", date: "Objectif : 2027",
        couvre: "Utiliser un assistant IA de façon efficace, critique et sûre." },
      { nom: "AI Foundations", organisme: "OpenAI Academy", date: "Objectif : 2027",
        couvre: "Capacités et limites de l'intelligence artificielle." }
    ]
  }

];


/* ==========================================================================
   9. VEILLE TECHNOLOGIQUE — un suivi daté, période par période
   --------------------------------------------------------------------------
   Pour ajouter une période : copie un bloc { } dans "periodes", à la fin.
   Mets toujours la vraie date, la source et le lien de l'article.
   ========================================================================== */

const VEILLE = {
  sujet: "La cybersécurité des collectivités territoriales",
  accroche: "Mairies, régions, lycées : les collectivités sont devenues des cibles prioritaires. Je suis le sujet depuis octobre 2025, parce que c'est exactement le terrain de mes stages au service informatique de la mairie de Morne-à-l'Eau.",
  problematique: "Comment une collectivité aux moyens limités peut-elle protéger un système d'information dont dépendent tous les services aux habitants ?",
  periodes: [
    {
      mois: "Octobre 2025",
      date: "14 octobre 2025",
      source: "Microsoft",
      titre: "Fin du support de Windows 10",
      resume: "Depuis le 14 octobre 2025, Windows 10 ne reçoit plus de mises à jour de sécurité. Les PC continuent de fonctionner, mais chaque nouvelle faille reste ouverte sur les postes qui n'ont pas migré.",
      impact: "Pour un service informatique, c'est un chantier de parc : recenser les postes encore sous Windows 10, vérifier leur compatibilité avec Windows 11, et remplacer ou isoler ceux qui ne le sont pas.",
      lien: "https://support.microsoft.com/fr-fr/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025"
    },
    {
      mois: "Octobre 2025",
      date: "10 octobre 2025",
      source: "Région Hauts-de-France",
      titre: "80 % des lycées publics des Hauts-de-France touchés par un rançongiciel",
      resume: "Le rançongiciel Qilin paralyse le système d'information de près de 80 % des lycées publics de la région. L'accès au réseau et à Internet est suspendu, et les attaquants revendiquent le vol d'environ un téraoctet de données.",
      impact: "Un système d'information partagé par des centaines d'établissements tombe d'un seul coup : cloisonner les réseaux et disposer de sauvegardes hors ligne limite la propagation et accélère la reprise.",
      lien: "https://www.hautsdefrance.fr/incident-de-cybersecurite-dans-plusieurs-lycees-de-la-region-hauts-de-france/"
    },
    {
      mois: "Mars 2026",
      date: "17 mars 2026",
      source: "ANSSI",
      titre: "L'ANSSI publie le Référentiel Cyber France (ReCyF)",
      resume: "En attendant la loi qui transpose la directive européenne NIS 2, l'ANSSI met à disposition le ReCyF, un document de travail qui liste les mesures recommandées pour atteindre les objectifs de sécurité de NIS 2.",
      impact: "Les collectivités ont désormais une liste concrète de mesures à viser : sauvegardes, gestion des accès à privilèges, journalisation, mises à jour. C'est un bon fil conducteur pour un petit service informatique.",
      lien: "https://cyber.gouv.fr/reglementation/cybersecurite-systemes-dinformation/directives-nis-nis2-et-dispositif-saiv/directive-nis-2/"
    },
    {
      mois: "Mai 2026",
      date: "22 mai 2026",
      source: "Cyberattaque.org",
      titre: "La mairie d'Eyguières paralysée par un rançongiciel",
      resume: "Cette commune d'environ 7 000 habitants voit l'ensemble de son système informatique mis hors service par le rançongiciel Qilin, ce qui perturbe fortement les services administratifs.",
      impact: "Une commune de taille comparable à Morne-à-l'Eau : le risque n'est pas réservé aux grandes villes. Une sauvegarde testée et un plan de reprise font la différence entre quelques jours et plusieurs semaines d'arrêt.",
      lien: "https://www.cyberattaque.org/la-mairie-deyguieres-paralysee-par-un-ransomware/"
    },
    {
      mois: "Juillet 2026",
      date: "8 juillet 2026",
      source: "Pilote NIS2",
      titre: "La France renvoyée devant la Cour de justice de l'UE pour le retard de NIS 2",
      resume: "La Commission européenne saisit la Cour de justice de l'Union européenne contre la France, l'Espagne, l'Irlande et les Pays-Bas pour défaut de transposition de NIS 2, dont l'échéance était le 17 octobre 2024.",
      impact: "Le cadre légal tarde, mais la menace, elle, n'attend pas : les bonnes pratiques du ReCyF peuvent être appliquées dès maintenant, sans attendre l'obligation.",
      lien: "https://www.pilote-nis2.fr/guides/loi-resilience-nis2-france"
    },
    {
      mois: "Septembre 2026",
      date: "4 septembre 2026",
      source: "Cyberattaque.org",
      titre: "Fuite de données à l'Association des maires de France",
      resume: "L'AMF confirme une fuite de données. L'attaquant affirme avoir exploité une injection SQL sur le site de l'association pour en extraire plusieurs tables de la base de données.",
      impact: "Une faille applicative classique suffit : maintenir à jour les applications web, filtrer les entrées et ne pas exposer directement les bases de données sont des règles de base, valables aussi pour un serveur comme GLPI.",
      lien: "https://www.cyberattaque.org/association-des-maires-de-france-114-000-lignes-en-fuite-apres-une-cyberattaque/"
    },
    {
      mois: "Octobre 2026",
      date: "26 octobre 2026",
      source: "CERT-FR",
      titre: "Alerte CERT-FR : failles critiques de PHP exploitées",
      resume: "Le CERT-FR constate des tentatives d'exploitation des vulnérabilités CVE-2026-109618 et CVE-2026-109619, qui ciblent des déploiements spécifiques de PHP. L'éditeur a publié des correctifs.",
      impact: "PHP fait tourner beaucoup d'outils internes, dont GLPI. Suivre les alertes du CERT-FR permet d'appliquer les correctifs avant que les failles ne soient exploitées à grande échelle.",
      lien: "https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-014/"
    },
    {
      mois: "Novembre 2026",
      date: "17 novembre 2026",
      source: "Pilote NIS2",
      titre: "La loi Résilience adoptée en première lecture à l'Assemblée nationale",
      resume: "Le projet de loi qui transpose NIS 2 est adopté par 464 voix contre 64. La version française fait entrer explicitement les collectivités territoriales dans le champ : régions, départements, grandes communes et intercommunalités.",
      impact: "Les collectivités concernées auront des obligations de sécurité et de déclaration d'incident. Les mesures que je découvre en TP et en stage, comme le bastion d'administration ou la sauvegarde du parc, en font partie.",
      lien: "https://www.pilote-nis2.fr/guides/loi-resilience-nis2-france"
    }
  ],
  conclusion: "Sur un an, le constat est net : les attaques visent des collectivités de toutes tailles, souvent par des portes d'entrée classiques comme un poste non mis à jour, une application web vulnérable ou un accès distant mal protégé. Dans le même temps, le cadre se met en place avec le ReCyF puis la loi Résilience. Pour un administrateur, les priorités restent les mêmes : mettre à jour, cloisonner, contrôler les accès à privilèges et tester les sauvegardes.",
  sources: [
    "Alertes et bulletins du CERT-FR (cert.cyber.gouv.fr)",
    "ANSSI (cyber.gouv.fr) et Cybermalveillance.gouv.fr",
    "Sites spécialisés : Cyberattaque.org, IT-Connect",
    "Presse régionale et communiqués officiels des collectivités",
    "Dovacre (@dovacre sur TikTok), pour la cybersécurité, le DNS et l'actualité d'Internet",
    "Estherium (@estherium__ sur TikTok), pour l'actualité de l'IA"
  ]
};
