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
      '<span class="logo-user">' + esc(ID.prenom.toLowerCase()) + "@portfolio</span>" +
      '<span class="logo-sep">:</span><span class="logo-path">~</span>' +
      '<span class="logo-dollar">$</span><span class="curseur" aria-hidden="true"></span></a>' +
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
      '<p class="invite" aria-hidden="true"><span class="prompt">$</span> ' + esc(commande) + "</p>" +
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

  function accueil() {
    var chiffres = CHIFFRES.map(function (c) {
      var v = valeurChiffre(c);
      if (!v) return "";
      return '<li><span class="chiffre">' + v + '</span><span class="chiffre-lib">' +
        esc(c.libelle) + "</span></li>";
    }).join("");

    var cartes = PAGES.map(function (p) {
      return '<li><a class="carte-page" href="' + p.fichier + '">' +
        '<span class="carte-cmd" aria-hidden="true">./' + esc(p.cle) + "</span>" +
        '<span class="carte-titre">' + esc(p.menu) + "</span>" +
        '<span class="carte-resume">' + txt(p.resume) + "</span></a></li>";
    }).join("");

    var photo = ID.photo ? '<img class="portrait" src="' + esc(ID.photo) + '" alt="' + esc(ID.photoAlt) + '" width="160" height="160">' : "";

    var boutons =
      '<a class="btn btn-plein" href="realisations.html">Voir mes réalisations</a>' +
      (ID.cvFichier ? lien(ID.cvFichier, "Télécharger mon CV" + (ID.cvPoids ? " (" + esc(ID.cvPoids) + ")" : ""), false) : "") +
      '<a class="btn" href="contact.html">Me contacter</a>';

    return '<section class="hero">' +
      '<div class="terminal" role="presentation">' +
      '<div class="terminal-barre" aria-hidden="true"><span></span><span></span><span></span>' +
      '<p>' + esc(ID.prenom.toLowerCase()) + "@portfolio: ~</p></div>" +
      '<div class="terminal-corps">' +
      '<p class="invite" aria-hidden="true"><span class="prompt">$</span> whoami</p>' +
      '<div class="hero-identite">' + photo + "<div>" +
      "<h1>" + esc(nomComplet()) + "</h1>" +
      '<p class="hero-poste">' + esc(ID.posteVise) + "</p>" +
      '<p class="hero-statut">' + esc(ID.statut) + " · " + esc(ID.etablissement) + "</p>" +
      "</div></div>" +
      '<p class="invite" aria-hidden="true"><span class="prompt">$</span> cat competences.txt</p>' +
      '<p class="hero-accroche">' + txt(ID.accroche) + "</p>" +
      (txt(ID.angle) ? '<p class="hero-angle">' + txt(ID.angle) + "</p>" : "") +
      '<div class="boutons">' + boutons + "</div>" +
      "</div></div>" +
      (chiffres ? '<ul class="chiffres">' + chiffres + "</ul>" : "") +
      "</section>" +
      '<section class="section"><h2 class="h-section"><span aria-hidden="true">## </span>Explorer</h2>' +
      '<ul class="grille-pages">' + cartes + "</ul></section>";
  }

  /* ---------- À propos ---------- */

  function aPropos() {
    var info = pageInfo("a-propos");
    var paras = liste(A_PROPOS).map(function (p) { return "<p>" + txt(p) + "</p>"; }).join("");
    return titrePage(info, "cat a-propos.md") +
      '<section class="prose bloc">' + paras + "</section>" +
      '<div class="boutons">' +
      '<a class="btn btn-plein" href="competences.html">Mes compétences</a>' +
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
      ? '<span class="pastille pastille-cours">en cours</span>'
      : '<span class="pastille pastille-ok">terminé</span>';
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
    var blocMail = mail
      ? '<p class="contact-mail"><a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a></p>"
      : (AFFICHER_RAPPELS ? '<p><span class="rappel">À compléter — ton adresse e-mail dans data.js</span></p>' : "");
    var profils = lien(ID.linkedin, "LinkedIn", true) + lien(ID.github, "GitHub", true) +
      lien(ID.credly, "Credly", true) + lien(ID.cvFichier, "Mon CV (PDF)", true);
    return titrePage(info, "ping " + ID.prenom.toLowerCase()) +
      '<section class="bloc prose">' +
      (blocMail ? '<p class="etiquette">E-mail</p>' + blocMail : "") +
      (profils ? '<p class="etiquette">En ligne</p><div class="boutons">' + profils + "</div>" : "") +
      '<p class="discret">Je réponds en général sous 48 heures. Je suis basé en Guadeloupe (UTC−4).</p>' +
      "</section>";
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
