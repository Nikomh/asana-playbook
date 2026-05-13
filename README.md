# Agile X Playbooks

Internes Arbeitsportal für Asana-Board-Owner-Playbooks, Prompt-Bibliothek, Automations-Übersicht und Board-Übergaben.

## Setup

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Beschreibung |
|---------|-------------|
| `npm run dev` | Lokaler Dev-Server |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktions-Server starten |
| `npm run lint` | ESLint ausführen |
| `npm run typecheck` | TypeScript-Check ohne Build |

## Projektstruktur

```
app/                    # Next.js App Router Pages
  page.tsx              # Dashboard / Startseite
  playbooks/            # 5 Playbook-Seiten
  prompts/              # Prompt-Bibliothek
  automations/          # Automations & Rules
  handoffs/             # Board-Übergaben
  glossar/              # Glossar & Arbeitsregeln

components/
  layout/               # AppShell, Sidebar, TopNav
  ui/                   # Badge, Callout, CopyButton, Search
  playbook/             # Playbook-spezifische Komponenten

data/                   # Alle Inhalte als TypeScript-Daten
  types.ts              # Typdefinitionen
  playbooks.ts          # Die 5 Playbooks
  prompts.ts            # KI-Prompts
  automations.ts        # Asana-Automationen
  handoffs.ts           # Board-Übergaben
  glossary.ts           # Glossar & Arbeitsregeln
  navigation.ts         # Navigation
```

## Inhalte erweitern

### Neues Playbook hinzufügen

1. In `data/playbooks.ts` neues Objekt zur `playbooks`-Array hinzufügen
2. Neuen Ordner `app/playbooks/[slug]/` erstellen
3. `page.tsx` mit gleichem Muster wie bestehende Playbooks anlegen
4. In `data/navigation.ts` den Eintrag unter `children` ergänzen

### Neuen Prompt hinzufügen

In `data/prompts.ts` neues Objekt zur `prompts`-Array hinzufügen. Der `board`-Wert muss einem der Einträge in `promptBoards` entsprechen.

## Deployment

### Vercel (empfohlen)

1. Repo zu GitHub pushen
2. Auf vercel.com mit GitHub verbinden, Projekt importieren
3. Deploy — Vercel erkennt Next.js automatisch

### GitHub Pages (statisch)

In `next.config.ts` aktivieren:

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/agile-x-playbooks",
  trailingSlash: true,
};
```

Dann `npm run build` — der `out/`-Ordner enthält die statische Site.

## Zu GitHub pushen

```bash
git add .
git commit -m "Initial commit: Agile X Playbooks"
git remote add origin https://github.com/USERNAME/agile-x-playbooks.git
git push -u origin main
```

## Annahmen & Validierung

- Inhalte basieren auf Stand Mai 2026 — vom Team validieren lassen
- Rollen P01–P04 entsprechen dem internen Personen-Mapping
- Kundennamen sind anonymisiert oder als Platzhalter
- Ohne Authentifizierung zugänglich — bei Bedarf Vercel Password Protection aktivieren

---

Original Next.js Setup:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
