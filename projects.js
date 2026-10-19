// Single source for the project list: used by the start page and by bar.js on every project site.
// New project: add one entry here (icon into icons/), every page picks it up automatically.
// Projects are grouped by `platform`, in the order the platforms first appear.
// iconStyle: omit for a full-bleed square icon; "mac" for a macOS icon with its built-in margin;
// "glyph" for a transparent mark that gets a neutral tile behind it; "glyph light" keeps that tile white in dark mode (dark marks); "glyph grey" tints it for white marks.
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
    id: "jbl-bar", name: "JBL Bar", platform: "Home Assistant", repo: "SH1FT-W/jbl-bar",
    site: "https://sh1ft-w.github.io/jbl-bar/", icon: "icons/jbl-bar.png", iconStyle: "glyph light", color: "#ff6a00",
    tagline: "JBL soundbars with JBL One, fully local in Home Assistant: fast, complete, no cloud.",
    tagline_de: "JBL-Soundbars mit JBL One komplett lokal in Home Assistant: schnell, vollständig, ohne Cloud.",
  },
  {
    id: "reolink-plus", name: "Reolink Plus", platform: "Home Assistant", soon: true, icon: "icons/reolink-plus.png", color: "#1a5cf5",
    tagline: "Live video for Reolink cameras that have no stream of their own, attached right to the Reolink device, with the proxy app controlled from Home Assistant.",
    tagline_de: "Live-Bild für Reolink-Kameras ohne eigenen Stream, direkt am Gerät der Reolink-Integration, mit der Proxy-App gesteuert aus Home Assistant.",
  },
  {
    id: "pflanzenmonitor-plus", name: "Pflanzenmonitor Plus", platform: "Home Assistant", soon: true, icon: "icons/pflanzenmonitor-plus.png", iconStyle: "glyph", color: "#4caf50",
    tagline: "Companion to Plant Monitor: learns each plant's watering cycle, predicts the next watering and suggests thresholds with AI, approved by you.",
    tagline_de: "Begleiter zum Plant Monitor: lernt den Gießzyklus jeder Pflanze, sagt das nächste Gießen voraus und schlägt Grenzwerte per KI vor, freigegeben von dir.",
  },
  {
    id: "ps5", name: "PS5", platform: "Home Assistant", repo: "SH1FT-W/playstation-5",
    site: "https://sh1ft-w.github.io/playstation-5/", icon: "icons/ps5.png", color: "#0070d1",
    tagline: "Your PlayStation 5 in Home Assistant: status, wake and rest mode, fully local without cloud or MQTT.",
    tagline_de: "Deine PlayStation 5 in Home Assistant: Status, Aufwecken und Ruhemodus, komplett lokal ohne Cloud oder MQTT.",
  },
  {
    id: "unifi-network-plus", name: "UniFi Network Plus", platform: "Home Assistant", repo: "SH1FT-W/unifi-network-plus",
    site: "https://sh1ft-w.github.io/unifi-network-plus/", icon: "icons/unifi-network-plus.png", color: "#006fff",
    tagline: "Adds what the UniFi Network app shows and Home Assistant doesn't: throughput, clients, internet quality and speed tests.",
    tagline_de: "Ergänzt, was die UniFi-Network-App zeigt und Home Assistant nicht: Durchsatz, Clients, Internetqualität und Speedtest.",
  },
  {
    id: "wetter", name: "Wetter", platform: "Home Assistant", soon: true, icon: "icons/wetter.png", iconStyle: "glyph", color: "#3d8bff",
    tagline: "Weather for your home in Home Assistant: the German Weather Service forecast, the nearest station and every official warning (DWD, NINA). Starts instantly, no account.",
    tagline_de: "Wetter fürs Zuhause in Home Assistant: Vorhersage des Deutschen Wetterdienstes, nächste Station und alle amtlichen Warnungen (DWD, NINA). Startet sofort, ohne Konto.",
  },
  {
    id: "recall", name: "Recall", platform: "Home Assistant", soon: true, icon: "icons/recall.png", color: "#ff7a45",
    tagline: "Remembers a state and restores it later, unless someone changed it by hand in the meantime. A modern replacement for Saver.",
    tagline_de: "Merkt sich einen Zustand und stellt ihn später wieder her, außer jemand hat ihn inzwischen von Hand geändert. Moderner Ersatz für Saver.",
  },
  {
    id: "unas", name: "UniFi UNAS", platform: "Home Assistant", repo: "SH1FT-W/unifi-unas",
    site: "https://sh1ft-w.github.io/unifi-unas/", icon: "icons/unas.png", iconStyle: "glyph grey", color: "#006fff",
    tagline: "UniFi NAS in Home Assistant: storage, drives, data scrubs and health, locally through UniFi OS and UniFi Drive.",
    tagline_de: "UniFi-NAS in Home Assistant: Speicher, Laufwerke, Datenprüfung und Zustand, lokal über UniFi OS und UniFi Drive.",
  },
  {
    id: "ring-plus", name: "Ring Intercom Plus", platform: "Home Assistant", repo: "SH1FT-W/ring-intercom-plus",
    site: "https://sh1ft-w.github.io/ring-intercom-plus/", icon: "icons/ring-plus.png", iconStyle: "glyph", color: "#1998d5",
    tagline: "Extra controls for the Ring Intercom, added to the official Ring integration: door opener, Ring-to-Open, unlock duration, restart.",
    tagline_de: "Zusatzfunktionen für die Ring Intercom neben der offiziellen Ring-Integration: Türöffner, Ring-to-Open, Öffnungsdauer, Neustart.",
  },
  {
    id: "chihiros", name: "Chihiros", platform: "Home Assistant", repo: "SH1FT-W/chihiros",
    site: "https://sh1ft-w.github.io/chihiros/", icon: "icons/chihiros.png", color: "#e60012",
    tagline: "Chihiros LEDs, Commander and dosing pump in Home Assistant, fully local over Bluetooth proxies: every channel, schedules and doses.",
    tagline_de: "Chihiros-Lampen, Commander und Dosierpumpe in Home Assistant, komplett lokal über Bluetooth-Proxys: jeder Kanal, Zeitpläne und Dosen.",
  },
  {
    id: "fluval", name: "Fluval", platform: "Home Assistant", repo: "SH1FT-W/fluval",
    site: "https://sh1ft-w.github.io/fluval/", icon: "icons/fluval.png", iconStyle: "glyph light", color: "#0a8fd0",
    tagline: "Fluval Bluetooth LEDs in Home Assistant, fully local: Reef and Plant 4.0, the Nanos, Plant PRO and more.",
    tagline_de: "Fluval-Bluetooth-Lampen in Home Assistant, komplett lokal: Reef und Plant 4.0, die Nanos, Plant PRO und mehr.",
  },
  {
    id: "helialux", name: "HeliaLux", platform: "Home Assistant", repo: "SH1FT-W/helialux",
    site: "https://sh1ft-w.github.io/helialux/", icon: "icons/helialux.png", iconStyle: "glyph light", color: "#003a5d",
    tagline: "The Juwel HeliaLux SmartControl in Home Assistant, local, robust and without surprises.",
    tagline_de: "Die Juwel HeliaLux SmartControl in Home Assistant, lokal, robust und ohne Überraschungen.",
  },
  {
    id: "delonghi", name: "De'Longhi", platform: "Home Assistant", soon: true, icon: "icons/delonghi.png", color: "#94623F",
    tagline: "Your De'Longhi coffee machine in Home Assistant with just a smart plug: learns every program, counts every cup, knows when it needs care.",
    tagline_de: "Dein De'Longhi-Kaffeevollautomat in Home Assistant, nur mit einer Steckdose: lernt jedes Programm, zählt jede Tasse, weiß, wann Pflege fällig ist.",
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
];

// Optional display names for the start page's section headings (platform value -> heading).
window.SH1FTW_GROUP_LABELS = { macOS: "Mac" };
// tagline_de: German tagline, shown when the page language is German (falls back to tagline).
