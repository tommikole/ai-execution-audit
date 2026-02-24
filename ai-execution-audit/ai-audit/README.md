# AI Execution Audit™

Verkkopohjainen AI-kypsyysarviointi — Next.js + Vercel.

## Tiedostorakenne

```
ai-execution-audit/
├── pages/
│   ├── _app.js       ← Next.js app wrapper
│   └── index.js      ← Koko sovellus tässä
├── styles/
│   └── globals.css   ← Perus CSS reset
├── package.json      ← Riippuvuudet
└── next.config.js    ← Next.js konfiguraatio
```

## Deploy Verceliin (ei koodia tarvita)

1. Mene osoitteeseen **vercel.com** ja kirjaudu GitHub-tilillä
2. Klikkaa **"Add New Project"**
3. Valitse tämä repositorio listasta
4. Klikkaa **"Deploy"** — valmis! (~2 min)

Saat oman URL:n muodossa `https://ai-execution-audit.vercel.app`

## Muutokset ilman koodia

- **CTA-nappi (varaa sessio):** Etsi tiedostosta `index.js` teksti `VARAA STRATEGIASESSIO` — vaihda sen yläpuolisen `<button>` tilalle `<a href="https://calendly.com/sinun-linkki">` -elementti
- **Yhteystiedot raportissa:** Etsi `Lataa PDF-raportti` ja lisää sen yläpuolelle yrityksen nimi/logo
- **Värit:** Muokkaa tiedoston alussa olevia `C = { ... }` arvoja

## Tekninen tuki

Muutoksia varten: avaa `index.js` GitHub.dev:ssä (paina `.` repositoriossa) ja muokkaa — Vercel päivittää automaattisesti.
