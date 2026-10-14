/* ==========================================================================
   app.js — LA MÉCANIQUE DU SITE (tu n'as pas besoin de modifier ce fichier)
   --------------------------------------------------------------------------
   Chaque page HTML contient seulement <body data-page="...">.
   Ce script construit l'en-tête, le menu, le contenu et le pied de page
   à partir des données de data.js.
   ========================================================================== */

(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "accueil";
  var app = document.getElementById("app");
  var ID = IDENTITE;

  /* ---------- Outils ---------- */

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function estTodo(s) {
    return typeof s === "string" && s.trim().indexOf("TODO:") === 0;
  }

  // Renvoie le texte prêt à afficher, ou "" s'il doit être caché.
  function txt(s) {
    if (s === undefined || s === null || s === "") return "";
    if (estTodo(s)) {
      if (!AFFICHER_RAPPELS) return "";
      return '<span class="rappel">À compléter — ' + esc(s.replace(/^\s*TODO:\s*/, "")) + "</span>";
    }
    return esc(s);
  }

  // Filtre une liste de textes en retirant les TODO cachés.
  function liste(arr) {
    return (arr || []).filter(function (s) { return txt(s) !== ""; });
  }

  // Un élément est visible si aucun de ses champs clés n'est un TODO caché.
  function visible(obj, champs) {
    if (AFFICHER_RAPPELS) return true;
    return champs.every(function (c) { return !estTodo(obj[c]); });
  }

  function lien(url, texte, ext) {
    if (!url || estTodo(url)) return "";
    return '<a class="btn" href="' + esc(url) + '"' +
      (ext ? ' target="_blank" rel="noopener"' : "") + ">" + texte + "</a>";
  }

  function email() {
    if (estTodo(ID.emailAvantArobase) || !ID.emailAvantArobase) return "";
    return ID.emailAvantArobase + "@" + ID.emailApresArobase;
  }

  function nomComplet() { return ID.prenom + " " + ID.nom; }

  function pageInfo(cle) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].cle === cle) return PAGES[i];
    return null;
  }

  function realisationsVisibles() {
    return REALISATIONS.filter(function (r) { return visible(r, ["titre", "id"]); });
  }

  function competencesVisibles() {
    var n = 0;
    COMPETENCES.forEach(function (d) {
      d.items.forEach(function (c) { if (visible(c, ["nom", "ou"])) n++; });
    });
    return n;
  }

  function certifsObtenues() {
    return CERTIFICATIONS.length ? CERTIFICATIONS[0].items.length : 0;
  }

  /* ---------- En-tête et menu ---------- */

  function entete() {
    var liens = PAGES.map(function (p) {
      var actif = p.cle === page || (page === "realisation" && p.cle === "realisations");
      return '<li><a href="' + p.fichier + '"' + (actif ? ' aria-current="page"' : "") + ">" +
        esc(p.menu) + "</a></li>";
    }).join("");

    return '<a class="evitement" href="#contenu">Aller au contenu</a>' +
      '<header class="entete"><div class="enveloppe entete-ligne">' +
      '<a class="logo" href="index.html" aria-label="Accueil — ' + esc(nomComplet()) + '">' +
      '<span class="logo-led" aria-hidden="true"></span>' +
      '<span class="logo-nom">' + esc(nomComplet()) + '</span>' +
      '<span class="logo-role">NetAdmin</span></a>' +
      '<button class="burger" aria-expanded="false" aria-controls="menu">' +
      '<span class="sr">Menu</span><span class="burger-barres" aria-hidden="true"></span></button>' +
      '<nav aria-label="Navigation principale"><ul id="menu" class="menu">' + liens + "</ul></nav>" +
      "</div></header>";
  }

  function piedDePage() {
    var annee = new Date().getFullYear();
    var plan = PAGES.map(function (p) {
      return '<li><a href="' + p.fichier + '">' + esc(p.menu) + "</a></li>";
    }).join("");
    return '<footer class="pied"><div class="enveloppe">' +
      '<div class="pied-grille">' +
      '<div><p class="pied-nom">' + esc(nomComplet()) + "</p>" +
      '<p class="discret">' + esc(ID.statut) + "<br>" + esc(ID.etablissement) + "</p></div>" +
      '<ul class="pied-plan">' + plan + "</ul></div>" +
      '<p class="pied-bas discret"><span>© ' + annee + " " + esc(nomComplet()) + "</span>" +
      '<a href="mentions-legales.html">Mentions légales</a>' +
      '<span>Site statique, sans cookie ni traceur.</span></p>' +
      "</div></footer>";
  }

  function titrePage(info, commande) {
    return '<header class="titre-page">' +
      '<p class="fil-ariane"><a href="index.html">' + esc(ID.prenom.toLowerCase()) + '-' + esc(ID.nom.toLowerCase()) +
      '</a><span aria-hidden="true"> / </span>' + esc(info.menu || info.titre) + "</p>" +
      "<h1>" + esc(info.titre) + "</h1>" +
      (txt(info.chapo) ? '<p class="chapo">' + txt(info.chapo) + "</p>" : "") +
      "</header>";
  }

  /* ---------- Accueil ---------- */

  function valeurChiffre(c) {
    if (c.depuis === "realisations") return realisationsVisibles().length;
    if (c.depuis === "competences") return competencesVisibles();
    if (c.depuis === "certifications") return certifsObtenues();
    return c.valeur || 0;
  }

  /* Topologie : chaque équipement est un lien vers une page du site. */
  function topologie() {
    var reals = realisationsVisibles();
    var r1 = reals[0], r2 = reals.length > 2 ? reals[2] : reals[1];
    var N = [
      { id: "core", x: 500, y: 250, w: 170, type: "RTR-CORE", nom: nomComplet(), sous: "À propos", href: "a-propos.html", cls: "n-core" },
      { id: "real", x: 500, y: 95, type: "SW-01", nom: "Réalisations", sous: reals.length + " services", href: "realisations.html", cls: "n-real" },
      { id: "r1", x: 285, y: 55, w: 170, type: "SRV", nom: r1 ? r1.titre.split(" ").slice(0, 2).join(" ") : "", sous: r1 ? (r1.cadre === "stage" ? "stage" : "TP") : "", href: r1 ? "realisation.html?id=" + r1.id : "#", cls: "n-real n-petit" },
      { id: "r2", x: 715, y: 55, w: 170, type: "SRV", nom: r2 ? r2.titre.split(" ").slice(0, 2).join(" ") : "", sous: r2 ? (r2.cadre === "stage" ? "stage" : "TP") : "", href: r2 ? "realisation.html?id=" + r2.id : "#", cls: "n-real n-petit" },
      { id: "comp", x: 200, y: 250, type: "SW-02", nom: "Compétences", sous: competencesVisibles() + " interfaces", href: "competences.html", cls: "n-comp" },
      { id: "cert", x: 200, y: 415, type: "FW", nom: "Certifications", sous: "objectifs 2026", href: "certifications.html", cls: "n-comp" },
      { id: "parc", x: 800, y: 250, type: "SRV-LOG", nom: "Parcours", sous: "BTS · Bac Pro", href: "parcours.html", cls: "n-info" },
      { id: "veil", x: 800, y: 415, type: "IDS", nom: "Veille", sous: VEILLE.length + " sujets suivis", href: "veille.html", cls: "n-info" },
      { id: "cont", x: 500, y: 415, type: "GW", nom: "Contact", sous: "e-mail · CV", href: "contact.html", cls: "n-info" }
    ];
    var L = [["core","real","Gi0/0"],["real","r1",""],["real","r2",""],["core","comp","Gi0/1"],["comp","cert",""],["core","parc","Gi0/2"],["parc","veil",""],["core","cont","Gi0/3"]];
    var pos = {}; N.forEach(function (n) { pos[n.id] = n; });

    var liens = L.map(function (l, i) {
      var a = pos[l[0]], b = pos[l[1]];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      return '<line class="cable" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>' +
        '<line class="paquet" style="animation-delay:-' + (i * 0.4) + 's" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>' +
        (l[2] ? '<text class="iface" x="' + (mx + 6) + '" y="' + (my - 6) + '">' + l[2] + "</text>" : "");
    }).join("");

    var noeuds = N.map(function (n) {
      var w = n.w || 150, h = n.id === "core" ? 74 : 62;
      return '<a class="noeud ' + n.cls + '" href="' + esc(n.href) + '">' +
        '<rect x="' + (n.x - w / 2) + '" y="' + (n.y - h / 2) + '" width="' + w + '" height="' + h + '" rx="8"/>' +
        '<circle class="noeud-led" cx="' + (n.x + w / 2 - 12) + '" cy="' + (n.y - h / 2 + 12) + '" r="4"/>' +
        '<text class="noeud-type" x="' + (n.x - w / 2 + 12) + '" y="' + (n.y - h / 2 + 16) + '">' + esc(n.type) + "</text>" +
        '<text class="noeud-nom" x="' + n.x + '" y="' + (n.y + 4) + '" text-anchor="middle">' + esc(n.nom) + "</text>" +
        '<text class="noeud-sous" x="' + n.x + '" y="' + (n.y + 22) + '" text-anchor="middle">' + esc(n.sous) + "</text></a>";
    }).join("");

    return '<svg class="topo" viewBox="0 0 1000 470" role="img" aria-label="Plan du site sous forme de schéma réseau">' +
      liens + noeuds + "</svg>";
  }

  function accueil() {
    var kpis = CHIFFRES.map(function (c) {
      var v = valeurChiffre(c);
      if (!v) return "";
      return '<li class="kpi"><span class="kpi-lib">' + esc(c.libelle) + '</span><span class="kpi-val">' + v + "</span></li>";
    }).join("");

    var services = realisationsVisibles().map(function (r) {
      return '<li><a href="realisation.html?id=' + encodeURIComponent(r.id) + '">' +
        '<span class="svc-nom">' + txt(r.titre) + "</span>" +
        '<span class="svc-cadre">' + (r.cadre === "stage" ? "Stage" : r.cadre === "tp" ? "TP" : "Perso") + "</span>" +
        badgeStatut(r) + "</a></li>";
    }).join("");

    var cartes = PAGES.map(function (p) {
      return '<li><a class="carte-page" href="' + p.fichier + '">' +
        '<span class="carte-titre">' + esc(p.menu) + "</span>" +
        '<span class="carte-resume">' + txt(p.resume) + "</span></a></li>";
    }).join("");

    var photo = ID.photo ? '<img class="portrait" src="' + esc(ID.photo) + '" alt="' + esc(ID.photoAlt) + '" width="96" height="96">' : "";

    var boutons =
      '<a class="btn btn-plein" href="realisations.html">Voir mes réalisations</a>' +
      (ID.cvFichier ? lien(ID.cvFichier, "Télécharger mon CV" + (ID.cvPoids ? " (" + esc(ID.cvPoids) + ")" : ""), false) : "") +
      '<a class="btn" href="contact.html">Me contacter</a>';

    var fiche = [
      ["Hostname", ID.prenom.toLowerCase() + "-" + ID.nom.toLowerCase()],
      ["Rôle", ID.posteVise],
      ["Formation", ID.statut],
      ["Site", ID.etablissement]
    ].map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("");

    return '<section class="hero">' +
      '<div class="panneau hero-fiche">' +
      '<div class="panneau-tete"><span>Fiche équipement</span><span class="etat etat-ok"><span class="led" aria-hidden="true"></span>En ligne</span></div>' +
      '<div class="hero-identite">' + photo + "<div><h1>" + esc(nomComplet()) + "</h1>" +
      '<p class="hero-poste">' + esc(ID.posteVise) + "</p></div></div>" +
      '<p class="hero-accroche">' + txt(ID.accroche) + "</p>" +
      '<dl class="fiche">' + fiche + "</dl>" +
      '<div class="boutons">' + boutons + "</div></div>" +
      (kpis ? '<ul class="kpis">' + kpis + "</ul>" : "") +
      "</section>" +
      '<section class="section panneau">' +
      '<div class="panneau-tete"><span>Topologie du site</span><span class="discret">cliquez sur un équipement</span></div>' +
      topologie() +
      '<ul class="grille-pages topo-repli">' + cartes + "</ul></section>" +
      '<section class="section panneau">' +
      '<div class="panneau-tete"><span>Services déployés</span><span class="discret">' + realisationsVisibles().length + " supervisés</span></div>" +
      '<ul class="services">' + services + "</ul></section>";
  }

  /* ---------- À propos ---------- */

  function aPropos() {
    var info = pageInfo("a-propos");
    var blocs = (A_PROPOS.blocs || []).filter(function (b) { return visible(b, ["titre"]); }).map(function (b) {
      return '<section class="bloc apropos-bloc"><h2 class="h-domaine"><span aria-hidden="true">## </span>' + txt(b.titre) + "</h2>" +
        (txt(b.texte) ? "<p>" + txt(b.texte) + "</p>" : "") + tags(b.tags) + "</section>";
    }).join("");
    var recit = liste(A_PROPOS.recit).map(function (para) { return "<p>" + txt(para) + "</p>"; }).join("");
    return titrePage(info, "cat a-propos.md") +
      (recit ? '<div class="apropos-recit">' + recit + "</div>" : "") +
      '<h2 class="h-section apropos-perso">En dehors des cours</h2>' +
      (txt(A_PROPOS.intro) ? '<p class="apropos-intro">' + txt(A_PROPOS.intro) + "</p>" : "") +
      '<div class="grille-apropos">' + blocs + "</div>" +
      '<div class="boutons">' +
      '<a class="btn btn-plein" href="realisations.html">Mes réalisations</a>' +
      '<a class="btn" href="competences.html">Mes compétences</a>' +
      '<a class="btn" href="parcours.html">Mon parcours</a></div>';
  }

  /* ---------- Compétences ---------- */

  function competences() {
    var info = pageInfo("competences");
    var blocs = COMPETENCES.map(function (d) {
      var items = d.items.filter(function (c) { return visible(c, ["nom", "ou"]); });
      if (!items.length) return "";
      var lignes = items.map(function (c) {
        return '<li class="comp"><span class="comp-nom">' + txt(c.nom) + "</span>" +
          '<span class="comp-ou"><span class="comp-fleche" aria-hidden="true">↳ </span>' + txt(c.ou) + "</span></li>";
      }).join("");
      return '<section class="domaine bloc"><h2 class="h-domaine"><span aria-hidden="true">[</span>' +
        esc(d.domaine) + '<span aria-hidden="true">]</span> <span class="compte">' + items.length + "</span></h2>" +
        '<ul class="comp-liste">' + lignes + "</ul></section>";
    }).join("");
    return titrePage(info, "ls -l competences/") + '<div class="grille-domaines">' + blocs + "</div>";
  }

  /* ---------- Réalisations ---------- */

  function badgeStatut(r) {
    return r.statut === "en-cours"
      ? '<span class="etat etat-cours"><span class="led" aria-hidden="true"></span>En cours</span>'
      : '<span class="etat etat-ok"><span class="led" aria-hidden="true"></span>Opérationnel</span>';
  }

  function badgeCadre(r) {
    var noms = { stage: "Stage", tp: "TP", perso: "Projet perso" };
    return '<span class="pastille pastille-cadre">' + esc(noms[r.cadre] || r.cadre) + "</span>";
  }

  function tags(arr) {
    return '<ul class="tags">' + liste(arr).map(function (t) { return "<li>" + txt(t) + "</li>"; }).join("") + "</ul>";
  }

  function realisations() {
    var info = pageInfo("realisations");
    var groupes = [
      { cadre: "stage", titre: "En stage" },
      { cadre: "tp", titre: "En TP" },
      { cadre: "perso", titre: "Projets personnels" }
    ];
    var html = groupes.map(function (g) {
      var rs = realisationsVisibles().filter(function (r) { return r.cadre === g.cadre; });
      if (!rs.length) return "";
      var cartes = rs.map(function (r) {
        return '<li><a class="carte-real" href="realisation.html?id=' + encodeURIComponent(r.id) + '">' +
          '<span class="carte-meta">' + badgeStatut(r) + '<span class="discret">' + esc(r.periode) + "</span></span>" +
          '<span class="carte-titre">' + txt(r.titre) + "</span>" +
          '<span class="carte-resume">' + txt(r.sousTitre) + "</span>" +
          tags(r.tags) + '<span class="carte-lire" aria-hidden="true">lire la suite →</span></a></li>';
      }).join("");
      return '<section class="section"><h2 class="h-section"><span aria-hidden="true">## </span>' + g.titre + "</h2>" +
        '<ul class="grille-real">' + cartes + "</ul></section>";
    }).join("");
    return titrePage(info, "ls realisations/") + html;
  }

  function realisation() {
    var id = new URLSearchParams(window.location.search).get("id");
    var r = null;
    realisationsVisibles().forEach(function (x) { if (x.id === id) r = x; });

    if (!r) {
      return '<header class="titre-page"><p class="invite"><span class="prompt">$</span> cat realisation</p>' +
        "<h1>Réalisation introuvable</h1>" +
        '<p class="chapo">Aucune réalisation ne porte l\'identifiant « ' + esc(id || "") + " ».</p></header>" +
        '<a class="btn btn-plein" href="realisations.html">← Toutes les réalisations</a>';
    }

    document.title = r.titre + " — " + nomComplet();

    function rubrique(titre, contenu) {
      if (!contenu) return "";
      return '<section class="rubrique bloc"><h2 class="h-rubrique"><span aria-hidden="true">## </span>' + titre + "</h2>" + contenu + "</section>";
    }

    var resultats = liste(r.resultats);
    var ref = liste(r.referentiel);
    var doc = r.document && r.document.fichier
      ? '<div class="document bloc"><p><strong>Documentation technique</strong>' +
        (r.document.pages ? " — " + r.document.pages + " pages" : "") + "</p>" +
        lien(r.document.fichier, "Télécharger le PDF" + (r.document.poids ? " (" + esc(r.document.poids) + ")" : ""), true) + "</div>"
      : "";

    return '<p class="fil"><a href="realisations.html">← Réalisations</a></p>' +
      '<header class="titre-page">' +
      '<p class="invite" aria-hidden="true"><span class="prompt">$</span> cat realisations/' + esc(r.id) + ".md</p>" +
      "<h1>" + txt(r.titre) + "</h1>" +
      '<p class="chapo">' + txt(r.sousTitre) + " · " + esc(r.periode) + "</p>" +
      '<p class="carte-meta">' + badgeCadre(r) + badgeStatut(r) + "</p>" + tags(r.tags) +
      "</header>" +
      '<div class="real-corps">' +
      rubrique("Contexte", txt(r.contexte) ? "<p>" + txt(r.contexte) + "</p>" : "") +
      rubrique("Besoin", txt(r.probleme) ? "<p>" + txt(r.probleme) + "</p>" : "") +
      rubrique("Solution mise en place", txt(r.solution) ? "<p>" + txt(r.solution) + "</p>" : "") +
      rubrique("Outils", tags(r.outils)) +
      rubrique("Résultats", resultats.length ? '<ul class="puces">' + resultats.map(function (s) { return "<li>" + txt(s) + "</li>"; }).join("") + "</ul>" : "") +
      rubrique("Ce que j'en retiens", txt(r.appris) ? "<p>" + txt(r.appris) + "</p>" : "") +
      rubrique("Compétences du référentiel mobilisées", ref.length ? '<ul class="puces">' + ref.map(function (s) { return "<li>" + txt(s) + "</li>"; }).join("") + "</ul>" : "") +
      doc + "</div>";
  }

  /* ---------- Certifications ---------- */

  function certifications() {
    var info = pageInfo("certifications");
    var html = CERTIFICATIONS.map(function (cat) {
      var items = cat.items.filter(function (c) { return visible(c, ["nom"]); });
      var corps;
      if (!items.length) {
        corps = txt(cat.vide) ? '<p class="vide">' + txt(cat.vide) + "</p>" : "";
        if (!corps) return "";
      } else {
        corps = '<ul class="grille-certifs">' + items.map(function (c) {
          var visuel = c.badge
            ? '<img src="' + esc(c.badge) + '" alt="Badge ' + esc(c.nom) + '" width="72" height="72" loading="lazy">'
            : '<span class="cert-icone" aria-hidden="true">◇</span>';
          var liens = lien(c.fichier, "Certificat" + (c.poids ? " (" + esc(c.poids) + ")" : ""), true) +
            lien(c.verif, "Vérifier", true);
          return '<li class="cert">' + visuel + '<div><p class="cert-nom">' + txt(c.nom) + "</p>" +
            '<p class="discret">' + txt(c.organisme) + " · " + txt(c.date) + "</p>" +
            (txt(c.couvre) ? '<p class="cert-couvre">' + txt(c.couvre) + "</p>" : "") +
            (liens ? '<div class="boutons boutons-petits">' + liens + "</div>" : "") +
            "</div></li>";
        }).join("") + "</ul>";
      }
      return '<section class="section"><h2 class="h-section"><span aria-hidden="true">## </span>' + esc(cat.categorie) + "</h2>" +
        (txt(cat.intro) && items.length ? '<p class="intro">' + txt(cat.intro) + "</p>" : "") + corps + "</section>";
    }).join("");

    var profils = lien(ID.credly, "Profil Credly", true) + lien(ID.microsoftLearn, "Profil Microsoft Learn", true);
    return titrePage(info, "ls certifications/") + html +
      (profils ? '<div class="boutons">' + profils + "</div>" : "");
  }

  /* ---------- Parcours ---------- */

  function parcours() {
    var info = pageInfo("parcours");
    var items = PARCOURS.filter(function (p) { return visible(p, ["titre", "periode"]); });
    var html = items.map(function (p) {
      return '<li class="etape etape-' + esc(p.type) + '">' +
        '<p class="etape-periode">' + txt(p.periode) + ' <span class="pastille ' +
        (p.type === "stage" ? "pastille-cours" : "pastille-cadre") + '">' + (p.type === "stage" ? "stage" : "formation") + "</span></p>" +
        '<h2 class="etape-titre">' + txt(p.titre) + "</h2>" +
        (txt(p.lieu) ? '<p class="discret">' + txt(p.lieu) + "</p>" : "") +
        (txt(p.detail) ? "<p>" + txt(p.detail) + "</p>" : "") + "</li>";
    }).join("");
    return titrePage(info, "git log --parcours") + '<ol class="frise">' + html + "</ol>";
  }

  /* ---------- Veille ---------- */

  function veille() {
    var info = pageInfo("veille");
    var html = VEILLE.filter(function (v) { return visible(v, ["sujet"]); }).map(function (v) {
      var sources = liste(v.sources);
      return '<section class="veille bloc"><h2 class="h-domaine">' + txt(v.sujet) + "</h2>" +
        (sources.length ? '<p class="etiquette">Sources</p><ul class="puces">' +
          sources.map(function (s) { return "<li>" + txt(s) + "</li>"; }).join("") + "</ul>" : "") +
        (txt(v.retiens) ? '<p class="etiquette">Ce que j\'en retiens</p><p>' + txt(v.retiens) + "</p>" : "") +
        "</section>";
    }).join("");
    return titrePage(info, "tail -f veille.log") + '<div class="grille-domaines">' + html + "</div>";
  }

  /* ---------- Contact ---------- */

  function contact() {
    var info = pageInfo("contact");
    var mail = email();
    var carteMail = mail
      ? '<div class="carte-mail bloc"><div><p class="etiquette">E-mail</p>' +
        '<p class="contact-mail"><a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a></p></div>" +
        '<button type="button" class="btn btn-copier" data-copier="' + esc(mail) + '">Copier</button></div>'
      : (AFFICHER_RAPPELS ? '<p><span class="rappel">À compléter — ton adresse e-mail dans data.js</span></p>' : "");
    var cv = ID.cvFichier
      ? '<div class="boutons"><a class="btn btn-plein" href="' + esc(ID.cvFichier) + '" target="_blank" rel="noopener">' +
        "Télécharger mon CV (PDF" + (ID.cvPoids ? ", " + esc(ID.cvPoids) : "") + ")</a></div>"
      : "";
    var profils = [
      [ID.linkedin, "LinkedIn", "Mon profil professionnel"],
      [ID.github, "GitHub", "Mes dépôts"],
      [ID.credly, "Credly", "Mes badges Cisco vérifiables"],
      [ID.microsoftLearn, "Microsoft Learn", "Mes modules vérifiables"]
    ].filter(function (p) { return p[0]; }).map(function (p) {
      return '<li><a href="' + esc(p[0]) + '" target="_blank" rel="noopener"><span class="etiquette">' + esc(p[1]) +
        '</span><span class="profil-titre">' + esc(p[2]) + '</span><span class="profil-fleche" aria-hidden="true">↗</span></a></li>';
    }).join("");

    var formulaire = mail
      ? '<form class="bloc formulaire" id="form-contact" novalidate>' +
        '<p class="discret">Remplissez ces champs : un nouvel onglet Gmail s\'ouvrira avec le message déjà rédigé. ' +
        "Vous relisez, puis vous envoyez. Vous n'utilisez pas Gmail ? D'autres options s'affichent juste après.</p>" +
        '<label for="f-nom">Votre nom</label><input id="f-nom" name="nom" type="text" autocomplete="name" required>' +
        '<label for="f-mail">Votre adresse e-mail</label><input id="f-mail" name="mail" type="email" autocomplete="email" required aria-describedby="f-mail-aide">' +
        '<p class="aide" id="f-mail-aide">Pour que je puisse vous répondre.</p>' +
        '<label for="f-org">Entreprise ou établissement <span class="discret">— facultatif</span></label>' +
        '<input id="f-org" name="org" type="text" autocomplete="organization">' +
        '<label for="f-msg">Votre message</label><textarea id="f-msg" name="msg" rows="7" maxlength="1500" required aria-describedby="f-msg-aide"></textarea>' +
        '<p class="aide" id="f-msg-aide"><span id="f-compte">0</span> / 1500 caractères : au-delà, certains logiciels de courrier coupent le texte.</p>' +
        '<p class="erreur" id="f-erreur" role="alert" hidden></p>' +
        '<button type="submit" class="btn btn-plein">Ouvrir mon message dans Gmail</button>' +
        '<div class="apres-envoi" id="f-apres" hidden><p>Gmail ne s\'est pas ouvert, ou vous utilisez une autre messagerie ?</p>' +
        '<div class="boutons boutons-petits"><a class="btn" id="f-mailto" href="#">Ouvrir ma messagerie habituelle</a>' +
        '<button type="button" class="btn" id="f-copier-msg">Copier le message</button></div></div>' +
        "</form>"
      : "";

    return titrePage(info, "ping " + ID.prenom.toLowerCase()) +
      '<div class="grille-contact"><div>' +
      '<h2 class="h-contact">Me joindre directement</h2>' + carteMail + cv +
      (profils ? '<h2 class="h-contact">Mes profils</h2><ul class="profils">' + profils + "</ul>" : "") +
      '<p class="discret">Je réponds en général sous 48 heures. Je suis basé en Guadeloupe (UTC−4).</p>' +
      "</div>" +
      (formulaire ? '<div><h2 class="h-contact">Écrivez-moi d\'ici</h2>' + formulaire + "</div>" : "") +
      "</div>" +
      '<p class="discret note-contact">Ce site ne collecte aucune donnée. Le formulaire n\'envoie rien : il prépare votre message dans Gmail, et c\'est vous qui l\'envoyez.</p>';
  }

  function brancherContact() {
    function copier(texte, bouton, libelle) {
      function ok() { bouton.textContent = "Copié !"; setTimeout(function () { bouton.textContent = libelle; }, 2000); }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texte).then(ok, function () { bouton.textContent = "Copie impossible"; });
      } else {
        var zone = document.createElement("textarea");
        zone.value = texte; document.body.appendChild(zone); zone.select();
        try { document.execCommand("copy"); ok(); } catch (e) { bouton.textContent = "Copie impossible"; }
        document.body.removeChild(zone);
      }
    }

    document.querySelectorAll("[data-copier]").forEach(function (b) {
      b.addEventListener("click", function () { copier(b.getAttribute("data-copier"), b, "Copier"); });
    });

    var form = document.getElementById("form-contact");
    if (!form) return;
    var msg = document.getElementById("f-msg");
    var compte = document.getElementById("f-compte");
    var erreur = document.getElementById("f-erreur");
    var apres = document.getElementById("f-apres");
    var corps = "", sujet = "";

    msg.addEventListener("input", function () { compte.textContent = msg.value.length; });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = form.nom.value.trim(), mailVisiteur = form.mail.value.trim();
      var org = form.org.value.trim(), texte = msg.value.trim();
      var manque = [];
      if (!nom) manque.push("votre nom");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailVisiteur)) manque.push("une adresse e-mail valide");
      if (!texte) manque.push("votre message");
      if (manque.length) {
        erreur.textContent = "Il manque " + manque.join(", ") + ".";
        erreur.hidden = false;
        return;
      }
      erreur.hidden = true;
      sujet = "Contact depuis votre portfolio — " + nom + (org ? " (" + org + ")" : "");
      corps = texte + "\n\n—\n" + nom + (org ? "\n" + org : "") + "\n" + mailVisiteur;
      var gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email()) +
        "&su=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);
      window.open(gmail, "_blank", "noopener");
      document.getElementById("f-mailto").href = "mailto:" + email() +
        "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corps);
      apres.hidden = false;
    });

    document.getElementById("f-copier-msg").addEventListener("click", function () {
      copier("À : " + email() + "\nObjet : " + sujet + "\n\n" + corps, this, "Copier le message");
    });
  }

  /* ---------- Mentions légales et 404 ---------- */

  function mentions() {
    return '<header class="titre-page"><p class="invite" aria-hidden="true"><span class="prompt">$</span> cat mentions-legales</p>' +
      "<h1>Mentions légales</h1></header>" +
      '<section class="bloc prose">' +
      "<p><strong>Éditeur :</strong> " + esc(nomComplet()) + ", étudiant en " + esc(ID.statut) + ".</p>" +
      "<p><strong>Hébergement :</strong> GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</p>" +
      "<p><strong>Données personnelles :</strong> ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience et ne collecte aucune donnée.</p>" +
      "<p><strong>Contenu :</strong> les réalisations présentées en TP portent sur des cas d'entreprise fictifs fournis par l'enseignant. Les adresses IP affichées sont celles de maquettes de test.</p>" +
      "</section>";
  }

  function erreur404() {
    return '<header class="titre-page"><p class="invite"><span class="prompt">$</span> cd page-demandee</p>' +
      '<h1>404</h1><p class="chapo">bash: cd: page-demandee: Aucun fichier ou dossier de ce type</p></header>' +
      '<a class="btn btn-plein" href="index.html">← Retour à l\'accueil</a>';
  }

  /* ---------- Assemblage ---------- */

  var rendus = {
    "accueil": accueil, "a-propos": aPropos, "competences": competences,
    "realisations": realisations, "realisation": realisation,
    "certifications": certifications, "parcours": parcours, "veille": veille,
    "contact": contact, "mentions": mentions, "404": erreur404
  };

  var contenu;
  try {
    contenu = (rendus[page] || erreur404)();
  } catch (e) {
    contenu = '<p class="rappel">Erreur dans data.js : ' + esc(e.message) +
      ". Ouvre la console (F12) pour voir la ligne concernée.</p>";
    console.error(e);
  }

  app.innerHTML = entete() +
    '<main id="contenu" class="enveloppe principal' + (page === "accueil" ? " principal-accueil" : "") + '">' +
    contenu + "</main>" + piedDePage();

  if (page === "contact") brancherContact();

  /* ---------- Menu burger (téléphone) ---------- */

  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var ouvert = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!ouvert));
    menu.classList.toggle("ouvert", !ouvert);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("ouvert")) {
      menu.classList.remove("ouvert");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });
})();
