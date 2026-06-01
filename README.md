# 📚 Personlig bogreol – React og Next.js Eksamensprojekt

Dette projekt er en interaktiv, responsiv bogreol inspireret af det klassiske Apple iBooks-design. Projektet er udviklet i **Next.js (App Router)**, **TypeScript** og **Tailwind CSS**. 

Formålet med projektet er empirisk at demonstrere og sammenligne tre forskellige softwarearkitekturer i moderne webudvikling: **Client-Side Rendering (CSR)**, **Server-Side Rendering (SSR)** og den avancerede **Islands Architecture (Hybrid)**.

## 🛠️ Projektets Arkitektur & UI
- **Dynamisk CSS-Reol**: Hylderne er kodet i et tredimensionelt "Dark Oak"-trædesign udelukkende ved hjælp af Tailwind CSS-utility classes.
- **Responsivt Design**: Systemet anvender et fuldstændig flydende grid-layout, der tilpasser sig automatisk på tværs af mobil-, tablet- og desktop-skærmstørrelser.
- **Billed- & Fallback-håndtering**: Bogomslagene indlæses dynamisk via inline-styles (`bg-cover bg-center`). Systemet implementerer en robust fejlsikring med et `default.png`-omslag for dataenheder uden definerede billed-URL'er.

---

## 🔬 Rendering-paradigmer (Eksamensfokus)

Applikationen er opdelt i tre isolerede ruter for at demonstrere rendering-metoder under motorhjelmen i et Next.js-miljø:

### 1. Client-Side Rendering (CSR) – `/bookshelf-csr`
- **Metode**: Data-fetching foregår asynkront i browseren efter komponentens *mount* via et specialbygget Custom Hook (`useFetchBooks`).
- **Karakteristika**: Applikationen leverer en tom HTML-skal fra serveren. Brugeren præsenteres for en synlig loading-state under en simuleret netværksforsinkelse på 1,2 sekunder, mens browserens JavaScript-motor henter data og tegner UI'et.

### 2. Server-Side Rendering (SSR) – `/bookshelf-ssr`
- **Metode**: Data hentes direkte i et lukket Node.js-servermiljø via en asynkron Server Component (`getSSRBooks`) med *top-level await*.
- **Karakteristika**: Det fulde HTML-dokument og bogreolen præ-renderes 100 % på serveren. Siden popper op med det samme ved indlæsning uden nogen loading-skærm, hvilket sikrer optimal søgemaskine-indeksering (**SEO**).

### 3. Island Hybrid Architecture (Sprint 2) – `/bookshelf-island` 🏝️
- **Metode**: En avanceret hybrid-model, der kombinerer SSR og CSR. Selve træhylderne, sidetekster og bog-kontrakter genereres på serveren (SSR). De enkelte 3D-bøger er isoleret i mindre, uafhængige klientside-komponenter (Client Islands) ved brug af `"use client"`.
- **Karakteristika**: Siden eliminerer det hårde valg mellem SEO og rige animationer/events. For at beskytte mod **The Uncanny Valley** (det visuelle bedrag under hydration), viser de klientside-baserede bøger en lokal loading-spinner og et gråtonet default-cover. Efter en simuleret netværksforsinkelse på 2,5 sekunder fuldføres **hydration-processen**, hvorefter bøgernes rigtige covers indlæses, og 3D-hover samt `onClick`-events vågner til liv uden at blokere for sidens indledende **First Contentful Paint (FCP)**.

---

## 🚀 Opsætning og Lokal Afvikling

For at installere projektets afhængigheder og starte den lokale udviklingsserver, kør følgende kommandoer i din terminal:

```bash
npm install
npm run dev
# eller
yarn dev
# eller
pnpm dev
Åbn derefter http://localhost:3000 i din browser.

Projektet er ligeledes deployet og kan tilgås live på:

🔗 [INDSÆT LINK TIL DIT VERCEL DEPLOYMENT HER]

📂 Projektstruktur & Routing
Projektet overholder Next.js App Router-konventionerne, hvor mappestrukturen definerer applikationens ruter:

app/page.tsx – Hovedmenu og forside. Fungerer som den centrale portal med adgang til de tre arkitektoniske testzoner.

app/bookshelf-csr/page.tsx – Bogreolen isoleret som ren klientside-rendering (CSR).

app/bookshelf-ssr/page.tsx – Bogreolen isoleret som ren serverside-rendering (SSR).

app/bookshelf-island/page.tsx – Den hybride Server Component, der orkestrerer vores Island-rute.

app/ui/InteractiveBook.tsx – Vores klientside-ø ("use client"). Håndterer lokal loading-state, simuleret hydration-forsinkelse og 3D-interaktivitet.

app/ui/navbar.tsx – Global og tilgængelig (W3C/WCAG) navigationsbar.

app/hooks/useFetchBooks.ts – Custom React Hook til styring af den asynkrone livscyklus på CSR-siden.

public/covers/ – Statiske aktiver, herunder bøgernes baggrundsbilleder og default-omslag.

🎨 Anvendte Teknologier
Framework: Next.js (React Server Components-arkitektur)

Styling: Tailwind CSS (Utility-first CSS med 3D-transformationshåndtering)

Sprog: TypeScript (Stærkt typet JavaScript for øget kodesikkerhed og datakontrakter)