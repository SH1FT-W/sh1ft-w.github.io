// Single source for the project list: used by the start page and by bar.js on every project site.
// New project: add one entry here (icon into icons/), every page picks it up automatically.
window.SH1FTW_PROJECTS = [
  {
    id: "casora", name: "Casora", platform: "Home Assistant", repo: "SH1FT-W/casora",
    site: "https://sh1ft-w.github.io/casora/", icon: "icons/casora.png", color: "#B67A50",
    tagline: "A calm, room-by-room dashboard for Home Assistant, with its own Studio.",
  },
  {
    id: "flode", name: "FLODE", platform: "Home Assistant", repo: "SH1FT-W/flode",
    site: "https://sh1ft-w.github.io/flode/", icon: "icons/flode.svg", color: "#4cc9fb",
    tagline: "See your automations and scripts as a flow, edited with Home Assistant's own editors.",
  },
  {
    id: "agentbar", name: "AgentBar", platform: "macOS", repo: "SH1FT-W/agentbar",
    site: "https://sh1ft-w.github.io/agentbar/", icon: "icons/agentbar.png", color: "#2997ff",
    tagline: "Your Claude Code agents in the macOS menu bar, with a tiny animated office.",
  },
  {
    id: "pulse", name: "Pulse", platform: "Home Assistant", soon: true, icon: "icons/pulse.svg", color: "#a78bfa",
    tagline: "A passive watchdog for battery devices in Home Assistant.",
  },
  {
    id: "sharemount", name: "ShareMount", platform: "macOS", soon: true, icon: "icons/sharemount.png", color: "#5b8def",
    tagline: "Network shares that reconnect by themselves, right from the menu bar.",
  },
];
