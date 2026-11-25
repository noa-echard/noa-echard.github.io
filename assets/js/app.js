/* ==========================================================================
   app.js — LA MÉCANIQUE DU SITE (tu n'as pas besoin de modifier ce fichier)
   --------------------------------------------------------------------------
   L'accueil (index.html) est une seule page à sections numérotées.
   Chaque projet a sa page : realisation.html?id=<id>.
   Tout le contenu vient de data.js.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Thème jour / nuit ---------- */
  var THEME_CLE = "theme";
  function themeLu() { try { return localStorage.getItem(THEME_CLE); } catch (e) { return null; } }
  function appliquerTheme(t) {
    if (t === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#f4f6f9" : "#182029");
  }
  appliquerTheme(themeLu());

  var page = document.body.getAttribute("data-page") || "accueil";
  var app = document.getElementById("app");
  var ID = IDENTITE;
  var REDUIT = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Outils ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function estTodo(s) { return typeof s === "string" && s.trim().indexOf("TODO:") === 0; }
  function txt(s) {
    if (s === undefined || s === null || s === "") return "";
    if (estTodo(s)) {
      if (!AFFICHER_RAPPELS) return "";
      return '<span class="rappel">À compléter — ' + esc(s.replace(/^\s*TODO:\s*/, "")) + "</span>";
    }
    return esc(s);
  }
  function liste(arr) { return (arr || []).filter(function (s) { return txt(s) !== ""; }); }
  function visible(o, champs) {
    if (AFFICHER_RAPPELS) return true;
    return champs.every(function (c) { return !estTodo(o[c]); });
  }
  function email() {
    if (!ID.emailAvantArobase || estTodo(ID.emailAvantArobase)) return "";
    return ID.emailAvantArobase + "@" + ID.emailApresArobase;
  }
  function nomComplet() { return ID.prenom + " " + ID.nom; }
  function initiales() { return (ID.prenom[0] + ID.nom[0]).toUpperCase(); }
  function deux(n) { return (n < 10 ? "0" : "") + n; }
  function reals() { return REALISATIONS.filter(function (r) { return visible(r, ["titre", "id"]); }); }
  function nbCompetences() {
    var n = 0;
    COMPETENCES.forEach(function (d) { d.items.forEach(function (c) { if (visible(c, ["nom", "ou"])) n++; }); });
    return n;
  }
  function nbCertifs() { return CERTIFICATIONS.length ? CERTIFICATIONS[0].items.length : 0; }
  var CADRES = { projet: "Projet", stage: "Stage", tp: "TP", perso: "Perso" };
  function cadreNom(r) { return CADRES[r.cadre] || r.cadre; }
  function numero(r) { return deux(reals().indexOf(r) + 1); }

  var ICO = {
    fleche: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    soleil: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    lune: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    dl: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    ok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };

  function tags(arr, cls) {
    return '<ul class="tags ' + (cls || "") + '">' + liste(arr).map(function (t) { return "<li>" + txt(t) + "</li>"; }).join("") + "</ul>";
  }
  function etat(r) {
    return r.statut === "en-cours"
      ? '<span class="etat etat-cours"><span class="led"></span>En cours</span>'
      : '<span class="etat etat-ok"><span class="led"></span>Terminé</span>';
  }
  function entete(num, label, titre, chapo) {
    return '<header class="sec-tete reveal">' +
      '<p class="panneau-lib">' + esc(label) + "</p>" +
      "<h2>" + titre + "</h2>" + (chapo ? '<p class="sec-chapo">' + chapo + "</p>" : "") + "</header>";
  }
  function lienAncre(cle) { return (page === "accueil" ? "" : "index.html") + "#" + cle; }

  /* ---------- Barre de navigation ---------- */
  function nav() {
    var liens = '<li><a href="' + lienAncre("home") + '" data-cible="home">Accueil</a></li>' +
      PAGES.map(function (p) {
        return '<li><a href="' + lienAncre(p.cle) + '" data-cible="' + p.cle + '">' + esc(p.menu) + "</a></li>";
      }).join("");
    return '<a class="evitement" href="#contenu">Aller au contenu</a>' +
      '<header class="nav-wrap"><nav class="nav" aria-label="Navigation principale">' +
      '<a class="logo" href="' + lienAncre("home") + '" aria-label="Accueil — ' + esc(nomComplet()) + '">' +
      '<span class="logo-led"></span><span class="logo-txt">' + esc(nomComplet()) + '</span><span class="logo-role">BTS SIO SISR</span></a>' +
      '<ul id="menu" class="menu">' + liens + "</ul>" +
      '<div class="nav-actions">' +
      '<button class="theme-btn" type="button" aria-label="Changer de thème">' + ICO.soleil + ICO.lune + "</button>" +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="menu"><span class="sr">Menu</span><span></span></button>' +
      "</div></nav></header>";
  }

  function pied() {
    var mail = email();
    return '<footer class="pied"><div class="cadre pied-grille">' +
      '<div><a class="logo" href="' + lienAncre("home") + '"><span class="logo-led"></span><span class="logo-txt">' + esc(nomComplet()) + "</span></a>" +
      '<p class="muet">' + esc(ID.posteVise) + ".<br>" + esc(ID.statut) + ", " + esc(ID.etablissement) + ".</p></div>" +
      '<div><p class="pied-titre">Liens rapides</p><ul class="pied-liens">' +
      PAGES.map(function (p) { return '<li><a href="' + lienAncre(p.cle) + '">' + esc(p.menu) + "</a></li>"; }).join("") +
      "</ul></div>" +
      '<div><p class="pied-titre">Contact</p><ul class="pied-liens">' +
      (mail ? '<li><a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a></li>" : "") +
      "<li>Guadeloupe, France</li></ul></div></div>" +
      '<div class="cadre pied-bas"><span>© ' + new Date().getFullYear() + " " + esc(nomComplet()) + "</span>" +
      '<a href="mentions-legales.html">Mentions légales</a><span>Site statique, sans cookie ni traceur.</span></div></footer>';
  }

  /* ======================================================================
     ACCUEIL
     ====================================================================== */

  function valeurChiffre(c) {
    if (c.depuis === "realisations") return reals().length;
    if (c.depuis === "competences") return nbCompetences();
    if (c.depuis === "certifications") return nbCertifs();
    return c.valeur || "";
  }

  function hero() {
    var stats = CHIFFRES.map(function (c) {
      var v = valeurChiffre(c);
      if (!v && v !== 0) return "";
      if (v === 0) return "";
      return '<li class="stat glass reveal"><span class="stat-val" data-compte="' + esc(v) + '">' + esc(v) + "</span>" +
        '<span class="stat-lib">' + esc(c.libelle) + "</span>" + (c.desc ? '<span class="stat-desc">' + esc(c.desc) + "</span>" : "") + "</li>";
    }).join("");
    return '<section id="home" class="hero"><div class="cadre">' +
      '<p class="hero-surtitre reveal">' + esc(ID.statut) + " · " + esc(ID.etablissement) + "</p>" +
      '<h1 class="reveal">' + esc(nomComplet()) + "</h1>" +
      '<p class="hero-poste reveal">' + esc(ID.posteVise) + "</p>" +
      '<p class="hero-intro reveal">' + txt(ID.presentation || ID.accroche) + "</p>" +
      '<div class="boutons reveal">' +
      '<a class="btn btn-plein" href="#projets">Voir mes réalisations</a>' +
      (ID.cvFichier ? '<a class="btn" href="' + esc(ID.cvFichier) + '" target="_blank" rel="noopener">' + ICO.dl + " Télécharger mon CV" + (ID.cvPoids ? " (" + esc(ID.cvPoids) + ")" : "") + "</a>" : "") +
      '<a class="btn" href="#contact">' + ICO.mail + " Me contacter</a></div>" +
      '<ul class="stats">' + stats + "</ul></div></section>";
  }

  function consoleHero() {
    var rs = reals();
    var lignes = rs.map(function (r, i) {
      var ok = r.statut !== "en-cours";
      return '<tr><td>Gi0/' + (i + 1) + '</td><td><a href="realisation.html?id=' + encodeURIComponent(r.id) + '">' + esc(r.court || r.titre) + "</a></td>" +
        '<td class="' + (ok ? "st-ok" : "st-cours") + '">' + (ok ? "connected" : "en cours") + "</td><td>" + esc(cadreNom(r).toLowerCase()) + "</td></tr>";
    }).join("");
    return '<div class="console reveal" aria-label="Liste des projets">' +
      '<div class="console-barre"><span></span><span></span><span></span><p>noa@core — ssh</p></div>' +
      '<div class="console-corps"><p class="console-cmd"><span class="prompt">noa@core#</span> <span class="tape">show interfaces status</span></p>' +
      '<table><thead><tr><th>Port</th><th>Nom</th><th>Statut</th><th>Type</th></tr></thead><tbody>' + lignes + "</tbody></table>" +
      '<p class="console-cmd"><span class="prompt">noa@core#</span> <span class="curseur"></span></p></div></div>';
  }

  function marqueeItems() {
    var t = ["Windows Server 2025", "Active Directory", "GPO", "DNS", "DHCP", "Debian", "Apache2", "Bind9", "HAProxy",
      "Heartbeat", "pfSense", "Apache Guacamole", "Bareos", "Docker", "VMware vSphere", "VirtualBox", "GLPI", "Cisco", "TOTP", "PowerShell"];
    return t.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
  }

  /* --- Topologie réseau : le plan du site --- */
  function topologie() {
    var rs = reals();
    var proj = rs.filter(function (r) { return r.cadre === "projet"; });
    var stg = rs.filter(function (r) { return r.cadre === "stage"; });
    var tps = rs.filter(function (r) { return r.cadre === "tp"; });
    var N = [
      { id: "core", x: 500, y: 255, w: 190, h: 78, type: "RTR-CORE · 192.168.30.1", nom: nomComplet(), sous: "À propos", href: "#about", c: "core" },
      { id: "sw-p", x: 500, y: 92, type: "SW-PROJETS", nom: "Projets", sous: rs.length + " services", href: "#projets", c: "vert" },
      { id: "p-stage", x: 250, y: 60, type: "VLAN 10 · STAGE", nom: stg.length + " missions", sous: "mairie", href: "#projets", filtre: "stage", c: "vert", petit: true },
      { id: "p-tp", x: 750, y: 60, type: "VLAN 20 · TP", nom: tps.length + " TP", sous: "Blocs 1 à 3", href: "#projets", filtre: "tp", c: "vert", petit: true },
      { id: "p-ap", x: 500, y: -6, type: "VLAN 30 · AP", nom: proj.length + " projets", sous: "en équipe", href: "#projets", filtre: "projet", c: "vert", petit: true, cache: true },
      { id: "sw-c", x: 190, y: 255, type: "SW-COMP", nom: "Compétences", sous: nbCompetences() + " interfaces", href: "#competences", c: "ambre" },
      { id: "fw", x: 190, y: 420, type: "FW-CERT", nom: "Certifications", sous: "objectifs 2026-27", href: "#certifications", c: "ambre" },
      { id: "log", x: 810, y: 255, type: "SRV-LOG", nom: "Parcours", sous: "BTS · Bac Pro", href: "#parcours", c: "violet" },
      { id: "ids", x: 810, y: 420, type: "IDS-VEILLE", nom: "Veille", sous: VEILLE.periodes.length + " alertes suivies", href: "#veille", c: "violet" },
      { id: "gw", x: 500, y: 420, type: "GW-CONTACT", nom: "Contact", sous: "e-mail · CV", href: "#contact", c: "violet" }
    ].filter(function (n) { return !n.cache; });
    var L = [["core", "sw-p", "Gi0/0"], ["sw-p", "p-stage", "trunk"], ["sw-p", "p-tp", "trunk"], ["core", "sw-c", "Gi0/1"],
      ["sw-c", "fw", ""], ["core", "log", "Gi0/2"], ["log", "ids", ""], ["core", "gw", "Gi0/3"]];
    var pos = {}; N.forEach(function (n) { pos[n.id] = n; });

    var zones = '<rect class="zone" x="20" y="18" width="960" height="124" rx="14"/><text class="zone-lib" x="36" y="38">ZONE RÉALISATIONS</text>' +
      '<rect class="zone" x="20" y="190" width="300" height="290" rx="14"/><text class="zone-lib" x="36" y="210">ZONE COMPÉTENCES</text>' +
      '<rect class="zone" x="680" y="190" width="300" height="290" rx="14"/><text class="zone-lib" x="696" y="210">ZONE PROFIL</text>';

    var cables = L.map(function (l, i) {
      var a = pos[l[0]], b = pos[l[1]]; if (!a || !b) return "";
      var d = "M" + a.x + " " + a.y + " L" + b.x + " " + b.y;
      return '<g class="cable" data-a="' + l[0] + '" data-b="' + l[1] + '"><path id="c' + i + '" d="' + d + '"/>' +
        '<path class="flux" d="' + d + '" style="animation-delay:-' + (i * 0.37).toFixed(2) + 's"/>' +
        (l[2] ? '<text class="iface" x="' + ((a.x + b.x) / 2 + 8) + '" y="' + ((a.y + b.y) / 2 - 6) + '">' + l[2] + "</text>" : "") + "</g>";
    }).join("");

    var noeuds = N.map(function (n) {
      var w = n.w || (n.petit ? 160 : 170), h = n.h || (n.petit ? 56 : 64);
      return '<a class="noeud n-' + n.c + (n.id === "core" ? " n-core" : "") + '" href="' + n.href + '" data-id="' + n.id + '"' +
        (n.filtre ? ' data-filtre="' + n.filtre + '"' : "") + ' aria-label="' + esc(n.nom + " — " + n.sous) + '">' +
        '<rect x="' + (n.x - w / 2) + '" y="' + (n.y - h / 2) + '" width="' + w + '" height="' + h + '" rx="10"/>' +
        '<circle class="n-led" cx="' + (n.x + w / 2 - 13) + '" cy="' + (n.y - h / 2 + 13) + '" r="4"/>' +
        '<text class="n-type" x="' + (n.x - w / 2 + 12) + '" y="' + (n.y - h / 2 + 17) + '">' + esc(n.type) + "</text>" +
        '<text class="n-nom" x="' + n.x + '" y="' + (n.y + (n.petit ? 9 : 7)) + '" text-anchor="middle">' + esc(n.nom) + "</text>" +
        '<text class="n-sous" x="' + n.x + '" y="' + (n.y + (n.petit ? 23 : 24)) + '" text-anchor="middle">' + esc(n.sous) + "</text></a>";
    }).join("");

    var repli = N.map(function (n) {
      return '<li><a class="topo-item n-' + n.c + '" href="' + n.href + '"' + (n.filtre ? ' data-filtre="' + n.filtre + '"' : "") +
        '><span class="led"></span><span><span class="ti-type">' + esc(n.type) + "</span>" +
        '<span class="ti-nom">' + esc(n.nom) + '</span></span><span class="ti-sous">' + esc(n.sous) + "</span></a></li>";
    }).join("");

    return '<section class="section topo-sec"><div class="cadre">' +
      '<div class="glass topo-panneau reveal">' +
      '<div class="topo-tete"><div><p class="panneau-lib">Découvrir le site</p>' +
      "<h2>Le plan du site en schéma réseau</h2></div>" +
      '<div class="topo-console" aria-live="polite"><span class="prompt">noa@core:~$</span> <span id="topo-cmd">show cdp neighbors</span></div></div>' +
      '<svg class="topo" viewBox="0 0 1000 500" role="img" aria-label="Plan du site sous forme de schéma réseau : chaque équipement mène à une section">' +
      zones + cables + noeuds + "</svg>" +
      '<ul class="topo-repli">' + repli + "</ul>" +
      '<div class="topo-legende"><span class="lg lg-vert">Réalisations</span><span class="lg lg-ambre">Compétences</span>' +
      '<span class="lg lg-violet">Profil</span><span class="muet">Cliquez sur un équipement pour ouvrir la section.</span></div>' +
      "</div></div></section>";
  }

  /* --- 01 À propos + compétences --- */
  function secAbout() {
    var recit = liste(A_PROPOS.recit).map(function (p) { return "<p>" + txt(p) + "</p>"; }).join("");
    var fiche = [["Hostname", ID.prenom.toLowerCase() + "-" + ID.nom.toLowerCase()], ["Rôle visé", ID.posteVise],
      ["Formation", ID.statut], ["Site", ID.etablissement]]
      .map(function (l) { return "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>"; }).join("");
    var doms = COMPETENCES.map(function (d, i) {
      var items = d.items.filter(function (c) { return visible(c, ["nom", "ou"]); });
      if (!items.length) return "";
      return '<details class="comp glass reveal"' + (i === 0 ? " open" : "") + '><summary>' +
        '<span class="comp-num">' + deux(i + 1) + "</span>" +
        '<span class="comp-nom">' + esc(d.domaine) + "</span>" +
        '<span class="comp-compte">' + items.length + "</span>" +
        '<span class="comp-plus">' + ICO.plus + "</span></summary>" +
        '<ul class="comp-liste">' + items.map(function (c) {
          return "<li><span class=\"led\"></span><div><strong>" + txt(c.nom) + "</strong><span>" + txt(c.ou) + "</span></div></li>";
        }).join("") + "</ul></details>";
    }).join("");
    return '<section id="about" class="section"><div class="cadre">' +
      entete("", "Profil", "À propos") +
      '<div class="about-grille"><div class="glass about-recit reveal">' + recit +
      '<div class="boutons">' + (ID.cvFichier ? '<a class="btn btn-plein" href="' + esc(ID.cvFichier) + '" target="_blank" rel="noopener">' + ICO.dl + " Télécharger mon CV" + (ID.cvPoids ? " (" + esc(ID.cvPoids) + ")" : "") + "</a>" : "") +
      '<a class="btn" href="#parcours">Mon parcours</a></div></div>' +
      '<aside class="glass fiche-carte reveal"><div class="fiche-tete"><span class="avatar">' + initiales() + "</span><div>" +
      "<strong>" + esc(nomComplet()) + '</strong><span class="etat etat-ok"><span class="led"></span>En ligne</span></div></div>' +
      '<dl class="fiche">' + fiche + "</dl></aside></div>" +
      '<div id="competences" class="sous-sec"><div class="sous-tete reveal"><h3>Compétences</h3>' +
      '<p class="muet">Cliquez sur un domaine pour le détailler : chaque compétence indique le TP ou la mission de stage où je l\'ai utilisée.</p></div>' +
      '<div class="comp-grille">' + doms + "</div></div>" +
      "</div></section>";
  }

  /* --- 02 Certifications --- */
  function secCertifs() {
    var html = CERTIFICATIONS.map(function (cat) {
      var items = cat.items.filter(function (c) { return visible(c, ["nom"]); });
      var corps;
      if (!items.length) {
        if (!txt(cat.vide)) return "";
        corps = '<p class="vide glass">' + txt(cat.vide) + "</p>";
      } else {
        corps = '<ul class="cert-grille">' + items.map(function (c) {
          var visuel = c.badge ? '<img src="' + esc(c.badge) + '" alt="Badge ' + esc(c.nom) + '" width="56" height="56" loading="lazy">'
            : '<span class="cert-ico">' + esc((c.organisme || "?").split(" ")[0].slice(0, 2).toUpperCase()) + "</span>";
          var liens = (c.fichier ? '<a class="lien" href="' + esc(c.fichier) + '" target="_blank" rel="noopener">Certificat ' + ICO.ext + "</a>" : "") +
            (c.verif ? '<a class="lien" href="' + esc(c.verif) + '" target="_blank" rel="noopener">Vérifier ' + ICO.ext + "</a>" : "");
          return '<li class="cert glass reveal">' + visuel + "<div>" +
            '<p class="cert-org">' + txt(c.organisme) + "</p><p class=\"cert-nom\">" + txt(c.nom) + "</p>" +
            (txt(c.couvre) ? '<p class="muet">' + txt(c.couvre) + "</p>" : "") +
            '<p class="cert-date">' + txt(c.date) + "</p>" + (liens ? '<p class="liens">' + liens + "</p>" : "") + "</div></li>";
        }).join("") + "</ul>";
      }
      return '<div class="sous-sec"><div class="sous-tete reveal"><h3>' + esc(cat.categorie) + "</h3>" +
        (txt(cat.intro) && items.length ? '<p class="muet">' + txt(cat.intro) + "</p>" : "") + "</div>" + corps + "</div>";
    }).join("");
    return '<section id="certifications" class="section"><div class="cadre">' +
      entete("", "Certifications", "Certifications", "Les certifications obtenues, et celles que je prépare en dehors des cours.") +
      html + "</div></section>";
  }

  /* --- 03 Parcours --- */
  function secParcours() {
    var items = PARCOURS.filter(function (p) { return visible(p, ["titre", "periode"]); });
    var html = items.map(function (p, i) {
      var sigle = p.sigle || "•";
      return '<li class="etape reveal" data-type="' + esc(p.type) + '">' +
        '<span class="etape-point"></span>' +
        '<div class="etape-carte glass"><span class="etape-logo">' + esc(sigle) + "</span><div class=\"etape-corps\">" +
        '<p class="etape-meta"><span>' + txt(p.periode) + '</span><span class="badge badge-' + esc(p.type) + '">' +
        (p.type === "stage" ? "Expérience" : "Formation") + "</span></p>" +
        "<h3>" + txt(p.titre) + "</h3>" + (txt(p.lieu) ? '<p class="muet">' + txt(p.lieu) + "</p>" : "") +
        (txt(p.detail) ? '<details class="plus"><summary>En savoir plus</summary><p>' + txt(p.detail) + "</p></details>" : "") +
        "</div></div></li>";
    }).join("");
    return '<section id="parcours" class="section"><div class="cadre">' +
      entete("", "Parcours", "Mon parcours", "Formations et expériences, du plus récent au plus ancien.") +
      filtres("parcours", [["tout", "Tout voir"], ["formation", "Formation"], ["stage", "Expérience"]]) +
      '<ol class="frise" data-groupe="parcours">' + html + "</ol></div></section>";
  }

  function filtres(groupe, opts) {
    return '<div class="filtres reveal" role="group" aria-label="Filtrer" data-pour="' + groupe + '">' +
      opts.map(function (o, i) {
        return '<button type="button" class="filtre' + (i === 0 ? " actif" : "") + '" data-val="' + o[0] + '" aria-pressed="' + (i === 0) + '">' +
          esc(o[1]) + (o[2] != null ? ' <span class="filtre-n">' + o[2] + "</span>" : "") + "</button>";
      }).join("") + "</div>";
  }

  /* --- 04 Projets --- */
  function secProjets() {
    var rs = reals();
    function n(c) { return rs.filter(function (r) { return r.cadre === c; }).length; }
    var cartes = rs.map(function (r) {
      return '<li class="reveal" data-type="' + esc(r.cadre) + '"><a class="projet glass" href="realisation.html?id=' + encodeURIComponent(r.id) + '">' +
        '<span class="projet-tete"><span class="projet-cadre-badge">' + esc(cadreNom(r)) + "</span>" + etat(r) + "</span>" +
        '<span class="projet-cadre">' + esc(r.periode) + "</span>" +
        '<span class="projet-titre">' + txt(r.titre) + "</span>" +
        '<span class="projet-desc">' + txt(r.enBref || r.sousTitre) + "</span>" +
        tags((r.tags || []).slice(0, 4)) +
        '<span class="projet-lien">Lire la fiche ' + ICO.fleche + "</span></a></li>";
    }).join("");
    return '<section id="projets" class="section"><div class="cadre">' +
      entete("", "Réalisations", "Mes réalisations", "Projets en équipe, missions de stage et TP marquants. Chaque fiche raconte le contexte, ce qui a été fait, et le bilan.") +
      filtres("projets", [["tout", "Tous", rs.length], ["projet", "Projets", n("projet")], ["stage", "Stage", n("stage")], ["tp", "TP", n("tp")]]) +
      '<ul class="projets" data-groupe="projets">' + cartes + "</ul></div></section>";
  }

  /* --- 05 Veille : suivi par périodes --- */
  function secVeille() {
    var V = VEILLE, P = V.periodes || [];
    var pas = P.map(function (p, i) {
      return '<li><button type="button" class="pas' + (i === P.length - 1 ? " actif" : "") + '" data-i="' + i + '" aria-pressed="' + (i === P.length - 1) + '">' +
        '<span class="pas-n">' + esc(p.date) + '</span><span class="pas-mois">' + esc(p.titre) + "</span></button></li>";
    }).join("");
    var fiches = P.map(function (p, i) {
      return '<article class="fiche-veille' + (i === P.length - 1 ? " actif" : "") + '" data-i="' + i + '"' + (i === P.length - 1 ? "" : " hidden") + ">" +
        '<p class="fv-meta"><span class="fv-source">' + esc(p.source) + "</span><span>" + esc(p.date) + '</span><span class="fv-n">' + (i + 1) + " / " + P.length + "</span></p>" +
        "<h4>" + esc(p.titre) + "</h4><p>" + esc(p.resume) + "</p>" +
        '<div class="fv-impact"><p class="fv-lib">Ce que ça change pour un administrateur</p><p>' + esc(p.impact) + "</p></div>" +
        '<p class="fv-actions"><a class="btn" href="' + esc(p.lien) + '" target="_blank" rel="noopener">Lire l\'article ' + ICO.ext + "</a>" +
        '<span class="fv-nav"><button type="button" class="btn btn-ico" data-dir="-1" aria-label="Période précédente">‹</button>' +
        '<button type="button" class="btn btn-ico" data-dir="1" aria-label="Période suivante">›</button></span></p></article>';
    }).join("");
    return '<section id="veille" class="section"><div class="cadre">' +
      entete("", "Veille technologique", esc(V.sujet), esc(V.accroche)) +
      '<div class="glass veille-prob reveal"><p class="fv-lib">Problématique</p><p>' + esc(V.problematique) + "</p></div>" +
      '<div class="veille-suivi glass reveal"><div class="veille-journal"><p class="fv-lib">Journal de suivi · ' + P.length + ' entrées</p>' +
      '<ol class="pas-liste">' + pas + "</ol></div><div class=\"veille-detail\">" + fiches + "</div></div>" +
      '<div class="veille-bas"><div class="glass veille-concl reveal"><p class="fv-lib">Bilan du suivi</p><p>' + esc(V.conclusion) + "</p></div>" +
      '<div class="glass veille-sources reveal"><p class="fv-lib">Mes sources</p><ul>' +
      (V.sources || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div></div>" +
      "</div></section>";
  }

  /* --- 06 Contact --- */
  function secContact() {
    var mail = email();
    var form = mail ? '<form class="glass formulaire reveal" id="form-contact" novalidate>' +
      '<h3>Écrivez-moi d\'ici</h3><p class="muet">Un onglet Gmail s\'ouvre avec le message déjà rédigé : vous relisez, puis vous envoyez.</p>' +
      '<div class="champs"><div><label for="f-nom">Votre nom</label><input id="f-nom" name="nom" type="text" autocomplete="name" required></div>' +
      '<div><label for="f-mail">Votre e-mail</label><input id="f-mail" name="mail" type="email" autocomplete="email" required></div></div>' +
      '<label for="f-org">Entreprise ou établissement <span class="muet">(facultatif)</span></label><input id="f-org" name="org" type="text" autocomplete="organization">' +
      '<label for="f-msg">Votre message</label><textarea id="f-msg" name="msg" rows="6" maxlength="1500" required></textarea>' +
      '<p class="aide"><span id="f-compte">0</span> / 1500 caractères</p>' +
      '<p class="erreur" id="f-erreur" role="alert" hidden></p>' +
      '<button type="submit" class="btn btn-plein">Ouvrir mon message dans Gmail ' + ICO.fleche + "</button>" +
      '<div class="apres-envoi" id="f-apres" hidden><p class="muet">Gmail ne s\'est pas ouvert, ou vous utilisez une autre messagerie ?</p>' +
      '<p class="boutons"><a class="btn" id="f-mailto" href="#">Ouvrir ma messagerie</a><button type="button" class="btn" id="f-copier-msg">Copier le message</button></p></div>' +
      "</form>" : "";
    return '<section id="contact" class="section"><div class="cadre">' +
      entete("", "Contact", "Me contacter", "Pour un stage, une alternance ou une question sur un projet.") +
      '<div class="contact-grille"><div class="contact-col">' +
      '<div class="glass profil-carte reveal"><span class="avatar avatar-xl">' + initiales() + "</span><div>" +
      "<strong>" + esc(nomComplet()) + "</strong><span class=\"muet\">" + esc(ID.posteVise) + "</span>" +
      '<span class="muet ligne-ico">' + ICO.pin + " Guadeloupe, France (UTC−4)</span></div></div>" +
      (mail ? '<div class="glass mail-carte reveal"><p class="fv-lib">E-mail</p><a href="mailto:' + esc(mail) + '">' + esc(mail) + "</a>" +
        '<button type="button" class="btn btn-petit" data-copier="' + esc(mail) + '">Copier</button></div>' : "") +
      (ID.linkedin ? '<a class="glass mail-carte reveal" href="' + esc(ID.linkedin) + '" target="_blank" rel="noopener"><p class="fv-lib">LinkedIn</p><span>Mon profil professionnel ' + ICO.ext + "</span></a>" : "") +
      (ID.cvFichier ? '<a class="btn btn-plein reveal" href="' + esc(ID.cvFichier) + '" target="_blank" rel="noopener">' + ICO.dl + " Télécharger mon CV</a>" : "") +
      '<p class="muet petit">Je réponds en général sous 48 heures.</p></div>' + form + "</div></div></section>";
  }

  function accueil() {
    return hero() + topologie() + secAbout() + secCertifs() + secParcours() + secProjets() + secVeille() + secContact();
  }

  /* ======================================================================
     PAGE PROJET
     ====================================================================== */

  function schemaSVG(S) {
    if (!S || !S.noeuds) return "";
    var pos = {}; S.noeuds.forEach(function (n) { pos[n.id] = n; });
    var zones = (S.zones || []).map(function (z) {
      return '<rect class="zone" x="' + z.x + '" y="' + z.y + '" width="' + z.w + '" height="' + z.h + '" rx="14"/>' +
        '<text class="zone-lib" x="' + (z.x + 14) + '" y="' + (z.y + 20) + '">' + esc(z.label.toUpperCase()) + "</text>";
    }).join("");
    var liens = (S.liens || []).map(function (l, i) {
      var a = pos[l[0]], b = pos[l[1]]; if (!a || !b) return "";
      var d = "M" + a.x + " " + a.y + " L" + b.x + " " + b.y;
      return '<g class="cable' + (l[3] ? " pointille" : "") + '"><path d="' + d + '"/>' +
        (l[3] ? "" : '<path class="flux" d="' + d + '" style="animation-delay:-' + (i * 0.5) + 's"/>') +
        (l[2] ? '<text class="iface" text-anchor="middle" x="' + ((a.x + b.x) / 2) + '" y="' + ((a.y + b.y) / 2 - 8) + '">' + esc(l[2]) + "</text>" : "") + "</g>";
    }).join("");
    var noeuds = S.noeuds.map(function (n) {
      var w = 170, h = 62;
      return '<g class="noeud' + (n.actif ? " n-core" : "") + (n.eteint ? " n-off" : "") + '">' +
        '<rect x="' + (n.x - w / 2) + '" y="' + (n.y - h / 2) + '" width="' + w + '" height="' + h + '" rx="10"/>' +
        '<circle class="n-led" cx="' + (n.x + w / 2 - 13) + '" cy="' + (n.y - h / 2 + 13) + '" r="4"/>' +
        '<text class="n-type" x="' + (n.x - w / 2 + 12) + '" y="' + (n.y - h / 2 + 17) + '">' + esc(n.type) + "</text>" +
        '<text class="n-nom" x="' + n.x + '" y="' + (n.y + 7) + '" text-anchor="middle">' + esc(n.nom) + "</text>" +
        '<text class="n-sous" x="' + n.x + '" y="' + (n.y + 23) + '" text-anchor="middle">' + esc(n.sous) + "</text></g>";
    }).join("");
    return '<svg class="topo schema" viewBox="0 0 900 380" role="img" aria-label="Schéma de l\'infrastructure">' + zones + liens + noeuds + "</svg>";
  }

  function projet() {
    var id = new URLSearchParams(location.search).get("id");
    var rs = reals(), r = null;
    rs.forEach(function (x) { if (x.id === id) r = x; });
    if (!r) {
      return '<section class="section"><div class="cadre">' + entete("", "Projet", "Projet introuvable",
        "Aucun projet ne porte l'identifiant « " + esc(id || "") + " ».") +
        '<a class="btn btn-plein" href="index.html#projets">← Tous les projets</a></div></section>';
    }
    document.title = r.titre + " — " + nomComplet();
    var i = rs.indexOf(r), prec = rs[(i - 1 + rs.length) % rs.length], suiv = rs[(i + 1) % rs.length];
    var resultats = liste(r.resultats), ref = liste(r.referentiel), etapes = (r.etapes || []).filter(function (e) { return txt(e.titre); });
    var chiffres = (r.chiffres || []).map(function (c) {
      return '<li class="stat glass reveal"><span class="stat-val">' + esc(c.val) + '</span><span class="stat-desc">' + esc(c.lib) + "</span></li>";
    }).join("");
    var captures = (r.captures || []).filter(function (c) { return c && c.src; });
    var n = 0;
    function sec(titre, contenu, idAncre) {
      if (!contenu) return "";
      n++;
      return '<section class="p-sec reveal"' + (idAncre ? ' id="' + idAncre + '"' : "") + '><h2 class="p-titre">' + esc(titre) + "</h2>" + contenu + "</section>";
    }
    var metas = [["Période", r.periode], ["Cadre", r.sousTitre || cadreNom(r)], ["Équipe", r.equipe], ["Mon rôle", r.role]]
      .filter(function (m) { return m[1]; })
      .map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("");

    var corps =
      sec("Contexte", '<div class="duo"><div class="glass bloc"><h3>La situation</h3><p>' + txt(r.contexte) + '</p></div>' +
        '<div class="glass bloc"><h3>Le besoin</h3><p>' + txt(r.probleme) + "</p></div></div>", "contexte") +
      sec("Ce qui a été fait", etapes.length ? '<ol class="etapes">' + etapes.map(function (e, k) {
        return '<li class="glass"><span class="etape-n">' + deux(k + 1) + "</span><div><h3>" + txt(e.titre) + "</h3><p>" + txt(e.texte) + "</p></div></li>";
      }).join("") + "</ol>" + (txt(r.solution) ? '<details class="plus glass bloc"><summary>Le détail technique complet</summary><p>' + txt(r.solution) + "</p></details>" : "")
        : '<div class="glass bloc"><p>' + txt(r.solution) + "</p></div>") +
      sec("Captures d'écran", captures.length ? '<ul class="galerie">' + captures.map(function (c, k) {
        return '<li><button type="button" class="capture glass" data-k="' + k + '"><img src="' + esc(c.src) + '" alt="' + esc(c.legende || "") + '" loading="lazy">' +
          '<span>' + esc(c.legende || "") + "</span></button></li>";
      }).join("") + "</ul>" : "") +
      sec("Stack technique", tags(r.outils, "tags-grands")) +
      sec("Bilan",
        '<div class="bilan">' +
        (resultats.length ? '<div class="glass bloc"><h3>Résultats</h3><ul class="checks">' + resultats.map(function (s) { return "<li>" + ICO.ok + "<span>" + txt(s) + "</span></li>"; }).join("") + "</ul></div>" : "") +
        (txt(r.appris) ? '<div class="glass bloc bloc-citation"><h3>Ce que j\'en retiens</h3><p>' + txt(r.appris) + "</p></div>" : "") +
        (txt(r.ameliorations) ? '<div class="glass bloc"><h3>Pour aller plus loin</h3><p>' + txt(r.ameliorations) + "</p></div>" : "") +
        (ref.length ? '<div class="glass bloc"><h3>Compétences du référentiel</h3>' + tags(ref) + "</div>" : "") +
        "</div>" +
        (r.document && r.document.fichier ? '<p class="boutons"><a class="btn btn-plein" href="' + esc(r.document.fichier) + '" target="_blank" rel="noopener">' + ICO.dl +
          " Documentation technique" + (r.document.pages ? " · " + r.document.pages + " pages" : "") + "</a></p>" : ""));

    return '<section class="p-hero"><div class="cadre">' +
      '<a class="retour" href="index.html#projets">← Tous les projets</a>' +
      '<p class="panneau-lib reveal">' + esc(r.sousTitre || cadreNom(r)) + "</p>" +
      '<h1 class="reveal">' + txt(r.titre) + "</h1>" +
      '<p class="hero-intro reveal">' + txt(r.enBref || r.probleme) + "</p>" +
      '<div class="boutons reveal"><a class="btn btn-plein" href="#contexte">Découvrir le projet ' + ICO.fleche + "</a>" + etat(r) + "</div>" +
      '<dl class="p-metas glass reveal">' + metas + "</dl>" +
      (r.schema ? '<figure class="glass p-schema reveal"><figcaption><span class="led"></span>Schéma de l\'infrastructure</figcaption>' + schemaSVG(r.schema) + "</figure>" : "") +
      (chiffres ? '<ul class="stats stats-3">' + chiffres + "</ul>" : "") +
      "</div></section>" +

      '<div class="cadre p-corps">' + corps +
      '<nav class="p-nav" aria-label="Autres projets">' +
      '<a class="glass" href="realisation.html?id=' + encodeURIComponent(prec.id) + '"><span class="muet">← Précédent</span><strong>' + txt(prec.titre) + "</strong></a>" +
      '<a class="glass" href="realisation.html?id=' + encodeURIComponent(suiv.id) + '"><span class="muet">Suivant →</span><strong>' + txt(suiv.titre) + "</strong></a></nav>" +
      '<div class="glass auteur reveal"><span class="avatar">' + initiales() + "</span><div><strong>" + esc(nomComplet()) + "</strong>" +
      '<span class="muet">' + esc(ID.statut) + ", " + esc(ID.etablissement) + "</span></div>" +
      '<a class="btn" href="index.html#contact">Me contacter</a></div>' +
      "</div>" +
      '<div class="visionneuse" id="visionneuse" hidden><button type="button" class="vis-fermer" aria-label="Fermer">×</button><img alt=""><p></p></div>';
  }

  /* ======================================================================
     MENTIONS ET 404
     ====================================================================== */
  function mentions() {
    return '<section class="section p-hero"><div class="cadre etroit">' + entete("", "Informations", "Mentions légales") +
      '<div class="glass bloc prose">' +
      "<p><strong>Éditeur :</strong> " + esc(nomComplet()) + ", étudiant en " + esc(ID.statut) + ".</p>" +
      "<p><strong>Hébergement :</strong> GitHub Pages, GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</p>" +
      "<p><strong>Données personnelles :</strong> ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience et ne collecte aucune donnée. Seul votre choix de thème (jour ou nuit) est gardé dans votre navigateur.</p>" +
      "<p><strong>Contenu :</strong> les TP portent sur des cas d'entreprise fictifs fournis par les enseignants. Les adresses IP affichées sont celles de maquettes de test.</p>" +
      "<p><strong>Polices :</strong> Geist, Geist Mono et Instrument Serif, chargées depuis Google Fonts.</p>" +
      "</div></div></section>";
  }
  function erreur404() {
    return '<section class="section p-hero"><div class="cadre etroit">' + entete("", "Erreur 404", "Page introuvable",
      "% Destination unreachable : cette page n'existe pas ou a été déplacée.") +
      '<a class="btn btn-plein" href="index.html">← Retour à l\'accueil</a></div></section>';
  }

  /* ======================================================================
     ASSEMBLAGE
     ====================================================================== */
  var rendus = { accueil: accueil, realisation: projet, mentions: mentions, "404": erreur404 };
  var contenu;
  try { contenu = (rendus[page] || erreur404)(); }
  catch (e) { contenu = '<p class="rappel">Erreur dans data.js : ' + esc(e.message) + "</p>"; console.error(e); }
  app.innerHTML = nav() + '<main id="contenu">' + contenu + "</main>" + pied();

  /* ---------- Révélation au défilement ---------- */
  var aReveler = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !REDUIT) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    aReveler.forEach(function (el) { io.observe(el); });
  } else aReveler.forEach(function (el) { el.classList.add("vu"); });

  /* ---------- Thème ---------- */
  document.querySelector(".theme-btn").addEventListener("click", function () {
    var jour = document.documentElement.getAttribute("data-theme") === "light";
    var t = jour ? "dark" : "light";
    appliquerTheme(t);
    try { localStorage.setItem(THEME_CLE, t); } catch (e) {}
  });

  /* ---------- Menu téléphone ---------- */
  var burger = document.querySelector(".burger"), menu = document.getElementById("menu");
  function fermerMenu() { menu.classList.remove("ouvert"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var o = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!o)); menu.classList.toggle("ouvert", !o);
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) fermerMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fermerMenu(); fermerVis(); } });

  /* ---------- Barre de nav : fond au défilement + lien actif ---------- */
  var navEl = document.querySelector(".nav");
  function surDefilement() { navEl.classList.toggle("defile", window.scrollY > 20); }
  window.addEventListener("scroll", surDefilement, { passive: true }); surDefilement();
  if (page === "accueil" && "IntersectionObserver" in window) {
    var liensNav = document.querySelectorAll(".menu a[data-cible]");
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        liensNav.forEach(function (a) { a.classList.toggle("actif", a.getAttribute("data-cible") === e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home"].concat(PAGES.map(function (p) { return p.cle; })).forEach(function (c) { var s = document.getElementById(c); if (s) spy.observe(s); });
  }

  /* ---------- Filtres (parcours, projets) ---------- */
  function filtrer(groupe, val) {
    var bar = document.querySelector('.filtres[data-pour="' + groupe + '"]');
    if (!bar) return;
    bar.querySelectorAll(".filtre").forEach(function (x) {
      var on = x.getAttribute("data-val") === val; x.classList.toggle("actif", on); x.setAttribute("aria-pressed", on);
    });
    document.querySelectorAll('[data-groupe="' + groupe + '"] > li').forEach(function (li) {
      li.hidden = !(val === "tout" || li.getAttribute("data-type") === val);
    });
  }
  document.querySelectorAll(".filtres").forEach(function (bar) {
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filtre"); if (b) filtrer(bar.getAttribute("data-pour"), b.getAttribute("data-val"));
    });
  });
  document.querySelectorAll("[data-filtre]").forEach(function (a) {
    a.addEventListener("click", function () { filtrer("projets", a.getAttribute("data-filtre")); });
  });

  /* ---------- Topologie : surbrillance des liaisons ---------- */
  var topo = document.querySelector(".topo-sec .topo");
  if (topo) {
    var cmd = document.getElementById("topo-cmd");
    topo.querySelectorAll(".noeud").forEach(function (n) {
      function on() {
        var id = n.getAttribute("data-id");
        topo.classList.add("focus");
        n.classList.add("hl");
        topo.querySelectorAll(".cable").forEach(function (c) {
          var lie = c.getAttribute("data-a") === id || c.getAttribute("data-b") === id;
          c.classList.toggle("hl", lie);
          if (lie) {
            var autre = c.getAttribute("data-a") === id ? c.getAttribute("data-b") : c.getAttribute("data-a");
            var o = topo.querySelector('.noeud[data-id="' + autre + '"]'); if (o) o.classList.add("voisin");
          }
        });
        if (cmd) cmd.textContent = "ping " + n.querySelector(".n-nom").textContent.toLowerCase().replace(/\s+/g, "-") + " … reply in " + (1 + Math.floor(Math.random() * 9)) + " ms";
      }
      function off() {
        topo.classList.remove("focus");
        topo.querySelectorAll(".hl, .voisin").forEach(function (x) { x.classList.remove("hl"); x.classList.remove("voisin"); });
        if (cmd) cmd.textContent = "show cdp neighbors";
      }
      n.addEventListener("mouseenter", on); n.addEventListener("focus", on);
      n.addEventListener("mouseleave", off); n.addEventListener("blur", off);
    });
  }

  /* ---------- Veille : navigation par périodes ---------- */
  var suivi = document.querySelector(".veille-suivi");
  if (suivi) {
    var fichesV = suivi.querySelectorAll(".fiche-veille"), pasV = suivi.querySelectorAll(".pas"), prog = suivi.querySelector(".veille-prog");
    var courant = fichesV.length - 1;
    function montrer(i) {
      courant = (i + fichesV.length) % fichesV.length;
      fichesV.forEach(function (f, k) { f.hidden = k !== courant; f.classList.toggle("actif", k === courant); });
      pasV.forEach(function (p, k) { p.classList.toggle("actif", k === courant); p.classList.toggle("passe", k < courant); p.setAttribute("aria-pressed", k === courant); });

    }
    suivi.addEventListener("click", function (e) {
      var p = e.target.closest(".pas"); if (p) return montrer(+p.getAttribute("data-i"));
      var d = e.target.closest("[data-dir]"); if (d) montrer(courant + +d.getAttribute("data-dir"));
    });
    montrer(courant);
  }

  /* ---------- Visionneuse des captures ---------- */
  var vis = document.getElementById("visionneuse");
  function fermerVis() { if (vis) vis.hidden = true; }
  if (vis) {
    document.querySelectorAll(".capture").forEach(function (b) {
      b.addEventListener("click", function () {
        var img = b.querySelector("img");
        vis.querySelector("img").src = img.src; vis.querySelector("img").alt = img.alt;
        vis.querySelector("p").textContent = img.alt; vis.hidden = false;
        vis.querySelector(".vis-fermer").focus();
      });
    });
    vis.addEventListener("click", function (e) { if (e.target === vis || e.target.closest(".vis-fermer")) fermerVis(); });
  }

  /* ---------- Contact ---------- */
  function copier(texte, bouton, libelle) {
    function ok() { bouton.textContent = "Copié !"; setTimeout(function () { bouton.textContent = libelle; }, 2000); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texte).then(ok, function () { bouton.textContent = "Copie impossible"; });
    else {
      var z = document.createElement("textarea"); z.value = texte; document.body.appendChild(z); z.select();
      try { document.execCommand("copy"); ok(); } catch (e) { bouton.textContent = "Copie impossible"; }
      document.body.removeChild(z);
    }
  }
  document.querySelectorAll("[data-copier]").forEach(function (b) {
    b.addEventListener("click", function () { copier(b.getAttribute("data-copier"), b, "Copier"); });
  });
  var form = document.getElementById("form-contact");
  if (form) {
    var msg = document.getElementById("f-msg"), compte = document.getElementById("f-compte"),
      erreur = document.getElementById("f-erreur"), apres = document.getElementById("f-apres"), corpsM = "", sujet = "";
    msg.addEventListener("input", function () { compte.textContent = msg.value.length; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = form.nom.value.trim(), mv = form.mail.value.trim(), org = form.org.value.trim(), t = msg.value.trim(), manque = [];
      if (!nom) manque.push("votre nom");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mv)) manque.push("une adresse e-mail valide");
      if (!t) manque.push("votre message");
      if (manque.length) { erreur.textContent = "Il manque " + manque.join(", ") + "."; erreur.hidden = false; return; }
      erreur.hidden = true;
      sujet = "Contact depuis votre portfolio : " + nom + (org ? " (" + org + ")" : "");
      corpsM = t + "\n\n—\n" + nom + (org ? "\n" + org : "") + "\n" + mv;
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email()) + "&su=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corpsM), "_blank", "noopener");
      document.getElementById("f-mailto").href = "mailto:" + email() + "?subject=" + encodeURIComponent(sujet) + "&body=" + encodeURIComponent(corpsM);
      apres.hidden = false;
    });
    document.getElementById("f-copier-msg").addEventListener("click", function () {
      copier("À : " + email() + "\nObjet : " + sujet + "\n\n" + corpsM, this, "Copier le message");
    });
  }

  /* ---------- Globe réseau animé (accueil) ---------- */
  var cv = document.querySelector(".globe");
  if (cv && cv.getContext) {
    var ctx = cv.getContext("2d"), pts = [], NB = 230, ang = 0.6, visibleG = true, W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var or = Math.PI * (3 - Math.sqrt(5));
    for (var k = 0; k < NB; k++) {
      var yy = 1 - (k / (NB - 1)) * 2, rr = Math.sqrt(1 - yy * yy), th = or * k;
      pts.push([Math.cos(th) * rr, yy, Math.sin(th) * rr]);
    }
    var paquets = [];
    function taille() {
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W * 0.21, H * 0.31, 270); cx = W > 900 ? W * 0.76 : W * 0.5; cy = W > 900 ? H * 0.42 : 210;
    }
    function couleur() { return document.documentElement.getAttribute("data-theme") === "light" ? "37,99,235" : "96,165,250"; }
    function dessin() {
      var c = couleur(), P = [], i, j;
      ctx.clearRect(0, 0, W, H);
      var ca = Math.cos(ang), sa = Math.sin(ang), cb = Math.cos(0.35), sb = Math.sin(0.35);
      for (i = 0; i < NB; i++) {
        var p = pts[i], x = p[0] * ca - p[2] * sa, z = p[0] * sa + p[2] * ca, y = p[1] * cb - z * sb; z = p[1] * sb + z * cb;
        P.push([cx + x * R, cy + y * R, z]);
      }
      for (i = 0; i < NB; i++) for (j = i + 1; j < NB; j++) {
        var dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], dz = pts[i][2] - pts[j][2];
        if (dx * dx + dy * dy + dz * dz < 0.05) {
          var al = ((P[i][2] + P[j][2]) / 2 + 1) / 2;
          ctx.strokeStyle = "rgba(" + c + "," + (0.04 + al * 0.22) + ")"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke();
        }
      }
      for (i = 0; i < NB; i++) {
        var a2 = (P[i][2] + 1) / 2;
        ctx.fillStyle = "rgba(" + c + "," + (0.25 + a2 * 0.75) + ")";
        ctx.beginPath(); ctx.arc(P[i][0], P[i][1], 1 + a2 * 1.6, 0, 6.283); ctx.fill();
      }
      if (!REDUIT && Math.random() < 0.06) {
        var s = Math.floor(Math.random() * NB), best = -1, bd = 9;
        for (j = 0; j < NB; j++) if (j !== s) {
          var ex = pts[s][0] - pts[j][0], ey = pts[s][1] - pts[j][1], ez = pts[s][2] - pts[j][2], dd = ex * ex + ey * ey + ez * ez;
          if (dd < 0.05 && dd < bd && Math.random() < 0.6) { bd = dd; best = j; }
        }
        if (best >= 0) paquets.push({ a: s, b: best, t: 0 });
      }
      paquets = paquets.filter(function (q) { return q.t <= 1; });
      paquets.forEach(function (q) {
        q.t += 0.03;
        var x1 = P[q.a][0] + (P[q.b][0] - P[q.a][0]) * q.t, y1 = P[q.a][1] + (P[q.b][1] - P[q.a][1]) * q.t;
        ctx.fillStyle = "rgba(52,211,153,0.95)"; ctx.beginPath(); ctx.arc(x1, y1, 2.4, 0, 6.283); ctx.fill();
      });
    }
    function boucle() { if (visibleG) { ang += 0.0022; dessin(); } requestAnimationFrame(boucle); }
    taille(); window.addEventListener("resize", function () { taille(); dessin(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visibleG = es[0].isIntersecting; }).observe(cv);
    if (REDUIT) dessin(); else requestAnimationFrame(boucle);
  }

  /* ---------- Ancre au chargement (après rendu dynamique) ---------- */
  if (location.hash) {
    var cible = document.getElementById(location.hash.slice(1));
    if (cible) setTimeout(function () { cible.scrollIntoView(); }, 30);
  }
})();
