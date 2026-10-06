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
  },
  {
    id: "flode", name: "FLODE", platform: "Home Assistant", repo: "SH1FT-W/flode",
    site: "https://sh1ft-w.github.io/flode/", icon: "icons/flode.svg", color: "#4cc9fb",
    tagline: "See and edit your automations and scripts as a flow, saved as plain Home Assistant YAML.",
  },
  {
    id: "pulse", name: "Pulse", platform: "Home Assistant", soon: true, icon: "icons/pulse.svg", color: "#a78bfa",
    tagline: "Notices when battery sensors in Home Assistant go quiet, without polling them.",
  },
  {
    id: "evenlight", name: "Evenlight", platform: "Home Assistant", soon: true, icon: "icons/evenlight.png", iconStyle: "glyph", color: "#E8A33D",
    tagline: "Every lamp, one light: mixed brands in the same warm white, following the sun.",
  },
  {
    id: "agentbar", name: "AgentBar", platform: "macOS", repo: "SH1FT-W/agentbar",
    site: "https://sh1ft-w.github.io/agentbar/", icon: "icons/agentbar.png", iconStyle: "mac", color: "#2997ff",
    tagline: "Your Claude Code agents in the macOS menu bar, with a tiny animated office.",
  },
  {
    id: "sharemount", name: "ShareMount", platform: "macOS", repo: "SH1FT-W/sharemount",
    site: "https://sh1ft-w.github.io/sharemount/", icon: "icons/sharemount.png", iconStyle: "mac", color: "#5b8def",
    tagline: "Network shares that reconnect by themselves, right from the menu bar.",
  },
  {
    id: "issuebar", name: "IssueBar", platform: "macOS", soon: true, icon: "icons/issuebar.png", iconStyle: "mac", color: "#6366f1",
    tagline: "An AI agent in your menu bar that answers GitHub issues and prepares tested fixes for you to approve.",
  },
];

// Optional display names for the start page's section headings (platform value -> heading).
window.SH1FTW_GROUP_LABELS = { macOS: "Mac" };
