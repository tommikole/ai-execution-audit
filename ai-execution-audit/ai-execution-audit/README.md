# AI Execution Audit™

Verkkopohjainen AI-kypsyysarviointi organisaatioille.

---

## 🚀 Käyttöönotto — vaihe vaiheelta (ei koodaustaitoa tarvita)

### Vaihe 1 — Luo GitHub-tili (jos ei ole)
1. Mene osoitteeseen **github.com**
2. Klikkaa "Sign up" ja luo tili

---

### Vaihe 2 — Luo repositorio GitHubissa
1. Kirjaudu GitHubiin
2. Klikkaa oikeassa yläkulmassa **"+"** → **"New repository"**
3. Anna nimeksi: `ai-execution-audit`
4. Valitse **"Private"** (yksityinen)
5. Klikkaa **"Create repository"**

---

### Vaihe 3 — Lisää tiedostot GitHubiin

**Tapa A: Drag & drop selaimessa**
1. Avaa juuri luomasi repositorio GitHubissa
2. Klikkaa **"uploading an existing file"** -linkkiä
3. Pura lataamasi zip-paketti omalle koneellesi
4. Vedä KAIKKI tiedostot ja kansiot GitHubin upload-ikkunaan
5. Kirjoita viesti: `Initial commit`
6. Klikkaa **"Commit changes"**

**Tapa B: GitHub.dev (selainpohjainen editori)**
1. Avaa repositoriosi GitHubissa
2. Paina näppäimistöltä **`.`** (piste) — editori avautuu
3. Luo tiedostorakenne vasemmalta paneelista
4. Kopioi tiedostojen sisällöt
5. Tallenna ja commitoi

---

### Vaihe 4 — Deploy Verceliin (hosting, ilmainen)
1. Mene osoitteeseen **vercel.com**
2. Klikkaa **"Sign Up"** → valitse **"Continue with GitHub"**
3. Anna Vercelille lupa nähdä repositoriosi
4. Klikkaa **"Add New Project"**
5. Valitse `ai-execution-audit` listalta
6. Klikkaa **"Deploy"** — Vercel rakentaa sivuston automaattisesti (~2 min)
7. Saat osoitteen muodossa: `ai-execution-audit.vercel.app`

---

### Vaihe 5 — Oma domain (valinnainen)
1. Vercelissä avaa projektisi → **"Settings"** → **"Domains"**
2. Kirjoita oma domain (esim. `audit.yrityksesi.fi`)
3. Lisää DNS-ohjaus domainisi hallintapaneelissa

---

## 📁 Projektin rakenne

```
ai-execution-audit/
├── src/
│   └── app/
│       ├── layout.jsx    ← Sivun rakenne ja meta-tiedot
│       └── page.jsx      ← Koko sovellus
├── package.json          ← Riippuvuudet
└── next.config.js        ← Next.js asetukset
```

---

## 🔧 Muokkaaminen myöhemmin

Kaikki muutokset tehdään tiedostoon `src/app/page.jsx`:

| Mitä muokata | Missä kohtaa koodia |
|---|---|
| Kysymykset | `sections`-taulukko alussa |
| Värit | `C`-objekti alussa |
| CTA-nappi teksti | `"VARAA STRATEGIASESSIO"` -kohta |
| Yhteystiedot / linkki | Napin `onClick`-toiminto |
| Taloudellinen laskentamalli | `calcExposure`-funktio |

Muutosten jälkeen: tallenna GitHubiin → Vercel päivittää automaattisesti.

---

## 💡 Seuraavat kehitysvaiheet

- **Sähköpostikirjautuminen**: Supabase magic link (erillinen ohje)
- **Vastausten tallennus**: Supabase-tietokanta (erillinen ohje)
- **PDF-raportti**: Vercel serverless function + Puppeteer
- **CRM-integraatio**: Zapier/Make webhook

---

*AI Execution Audit™*
