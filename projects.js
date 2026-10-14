// Single source for the project list: used by the start page and by bar.js on every project site.
// New project: add one entry here (icon into icons/), every page picks it up automatically.
// Projects are grouped by `platform`, in the order the platforms first appear.
// iconStyle: omit for a full-bleed square icon; "mac" for a macOS icon with its built-in margin;
// "glyph" for a transparent mark that gets a neutral tile behind it.
window.SH1FTW_PROJECTS = [
  {
    id: "casora", name: "Casora", platform: "Home Assistant", repo: "SH1FT-W/casora",
    site: "https://sh1ft-w.github.io/casora/", icon: "icons/casora.png", iconStyle: "glyph", color: "#B67A50",
    tagline: "A calm, room-by-room dashboard for Home Assistant, with a visual studio to shape each room.",
    tagline_de: "Ein ruhiges Dashboard für Home Assistant, Raum für Raum, mit einem Studio, in dem du jeden Raum gestaltest.",
  },
  {
    id: "flode", name: "FLODE", platform: "Home Assistant", repo: "SH1FT-W/flode",
    site: "https://sh1ft-w.github.io/flode/", icon: "icons/flode.svg", color: "#4cc9fb",
    tagline: "See and edit your automations and scripts as a flow, saved as plain Home Assistant YAML.",
    tagline_de: "Automationen und Skripte als Ablauf sehen und bearbeiten, gespeichert als ganz normales Home-Assistant-YAML.",
  },
  {
    id: "pulse", name: "Pulse", platform: "Home Assistant", repo: "SH1FT-W/pulse",
    site: "https://sh1ft-w.github.io/pulse/", icon: "icons/pulse.svg", color: "#a78bfa",
    tagline: "Notices when battery sensors in Home Assistant go quiet, without polling them.",
    tagline_de: "Merkt, wenn Batteriesensoren in Home Assistant verstummen, ohne sie abzufragen.",
  },
  {
    id: "evenlight", name: "Evenlight", platform: "Home Assistant", soon: true, icon: "icons/evenlight.png", iconStyle: "glyph", color: "#E8A33D",
    tagline: "Adaptive lighting done right: follows the sun, gets the most out of every lamp, wakes you with a sunrise and leaves alone what you set by hand.",
    tagline_de: "Adaptives Licht, richtig gemacht: folgt der Sonne, holt aus jeder Lampe das Beste heraus, weckt dich mit einem Sonnenaufgang und lässt in Ruhe, was du selbst einstellst.",
  },
  {
    id: "agentbar", name: "AgentBar", platform: "macOS", repo: "SH1FT-W/agentbar",
    site: "https://sh1ft-w.github.io/agentbar/", icon: "icons/agentbar.png", iconStyle: "mac", color: "#2997ff",
    tagline: "Your Claude Code agents in the macOS menu bar, with a tiny animated office.",
    tagline_de: "Deine Claude-Code-Agenten in der macOS-Menüleiste, mit einem kleinen animierten Büro.",
  },
  {
    id: "sharemount", name: "ShareMount", platform: "macOS", repo: "SH1FT-W/sharemount",
    site: "https://sh1ft-w.github.io/sharemount/", icon: "icons/sharemount.png", iconStyle: "mac", color: "#5b8def",
    tagline: "Network shares that reconnect by themselves, right from the menu bar.",
    tagline_de: "Netzwerkfreigaben, die sich von selbst wieder verbinden, direkt aus der Menüleiste.",
  },
  {
    id: "issuebar", name: "IssueBar", platform: "macOS", soon: true, icon: "icons/issuebar.png", iconStyle: "mac", color: "#6366f1",
    tagline: "Suggests replies to your GitHub issues and prepares tested fixes, right from the menu bar. Nothing goes out until you approve it.",
    tagline_de: "Schlägt Antworten auf deine GitHub-Issues vor und bereitet getestete Fixes vor, direkt aus der Menüleiste. Raus geht erst etwas, wenn du es freigibst.",
  },
  {
    id: "threadbar", name: "ThreadBar", platform: "macOS", soon: true, icon: "icons/threadbar.png", iconStyle: "mac", color: "#14a3b0",
    tagline: "Watches your threads in the Home Assistant forum and on Reddit and suggests replies. Nothing is posted until you approve it.",
    tagline_de: "Behält deine Themen im Home-Assistant-Forum und auf Reddit im Blick und schlägt Antworten vor. Gepostet wird erst, wenn du freigibst.",
  },
];

// Optional display names for the start page's section headings (platform value -> heading).
window.SH1FTW_GROUP_LABELS = { macOS: "Mac" };
// tagline_de: German tagline, shown when the page language is German (falls back to tagline).
