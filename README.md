# WP_2_Amir_Avdic
> **Autor:** Amir Avdić | **Indeks:** I-0116/23 | **Godina:** Treća

---

## Sadržaj
- [Opis projekta](#opis-projekta)
- [Pokretanje projekta](#pokretanje-projekta)
- [Struktura projekta](#struktura-projekta)
- [Funkcionalnosti](#funkcionalnosti)
- [Teme sučelja](#teme-sučelja)
- [Trackeri i moduli](#trackeri-i-moduli)
- [Student Fun Zone](#student-fun-zone)
- [GitHub historija](#github-historija)

---

## Opis projekta

**Personal Life Dashboard** je Angular web aplikacija za praćenje svakodnevnih
aktivnosti i navika. Sastoji se od statičke HTML stranice (IPI Akademija landing page)
i Angular SPA aplikacije sa sistemom prijave, dashboardom i interaktivnim modulima.

---

## Pokretanje projekta

### ⚠️ VAŽNO — obavezni korak prije pokretanja

Zbog konflikta verzija paketa, **npm install neće raditi** bez legacy flag-a.
Obavezno unesite sljedeću komandu:

```bash
cd ipi-angular
npm install --legacy-peer-deps
```

Tek nakon toga pokrenite aplikaciju:

```bash
ng serve
```

Aplikacija se otvara na: **http://localhost:4200**

### Statička HTML stranica
```
1. Otvori folder  →  WP_2_Amir_Avdic/
2. Pokreni fajl   →  index.html
```

---

## Struktura projekta

```
WP_2_Amir_Avdic/
├── index.html                     # Glavna IPI Akademija stranica
├── style.css                      # Stilovi za statičke stranice
├── favicon.ico                    # Favicon
├── kontakt.html                   # Kontakt stranica
├── popis.html                     # Popis kurseva
├── raspored.html                  # Raspored kurseva
├── slike/                         # Slike i resursi
├── WP_2_Amir_Avdic_izvjestaj.pdf  # Izvještaj projekta
└── ipi-angular/
    ├── src/
    │   ├── app/
    │   │   ├── auth/              # Login i Register komponente
    │   │   ├── funzone/           # Student Fun Zone komponenta
    │   │   ├── app.ts             # Glavna app komponenta
    │   │   ├── app.routes.ts      # Rute aplikacije
    │   │   ├── auth.service.ts    # Servis za autentifikaciju
    │   │   └── firestore.service.ts  # Firebase servis
    │   ├── dashboard/             # Dashboard komponenta
    │   ├── modules/               # Svi tracker moduli
    │   │   ├── bingo/
    │   │   ├── calendar/
    │   │   ├── finance/
    │   │   ├── fitness/
    │   │   ├── gratitude/
    │   │   ├── habit/
    │   │   ├── kanbanboard/
    │   │   ├── kviz/
    │   │   ├── meal/
    │   │   ├── mood/
    │   │   ├── reflection/
    │   │   ├── sleep/
    │   │   ├── study/
    │   │   ├── tasks/
    │   │   ├── visionboard/
    │   │   ├── water/
    │   │   └── whiteboard/
    │   ├── assets/                # Angular assets
    │   └── styles.css             # Globalni stilovi
    └── public/                    # Favicon i logo
```

---

## Funkcionalnosti

### Autentifikacija
- Registracija sa imenom, emailom, lozinkom i odabirom teme
- Login sa provjerom podataka iz localStorage-a
- AuthGuard zaštita ruta od neautoriziranog pristupa
- Automatski redirect na login ako korisnik nije prijavljen

### Dashboard
- Personalizirani pozdrav sa imenom korisnika
- Prikaz svih modula kao clickable kartice
- Brza navigacija tipkovnicom (Ctrl+K)
- Dugme za odjavu

---

## Teme sučelja

Korisnik pri registraciji bira jednu od 6 CSS tema koje se automatski primjenjuju pri prijavi:

| Tema | Opis |
|------|------|
| 🌑 Tamna | Dark navy pozadina |
| 🔵 Plava | IPI blue paleta |
| 🟢 Zelena | Fresh green |
| 🌸 Roza | Pink accent |
| 🟠 Narandžasta | Warm orange |
| 🤖 Cyberpunk | Neon purple/magenta |

---

## Trackeri i moduli

Svaki modul je zasebna Angular komponenta. Svi podaci se čuvaju u **localStorage**.

| Modul | Opis |
|-------|------|
| 💧 Water Tracker | Dnevni unos vode |
| 🍽️ Meal Planner | Obroci i ishrana |
| 📅 Calendar | Događaji i planovi |
| 😊 Mood Tracker | Dnevno raspoloženje |
| 🔄 Habit Tracker | Svakodnevne navike |
| 😴 Sleep Tracker | Kvalitet i trajanje sna |
| 📚 Study Planner | Sesije učenja |
| 🏋️ Fitness/Yoga | Fizičke aktivnosti |
| ✅ Task Planner | Zadaci i projekti |
| 💰 Finance Tracker | Prihodi i rashodi |
| 🙏 Gratitude Journal | Dnevnik zahvalnosti |
| 🪞 Daily Reflection | Dnevna refleksija |

---

## Student Fun Zone

Interaktivne aktivnosti dostupne nakon prijave:

| Aktivnost | Opis |
|-----------|------|
| 🎯 Bingo | Interaktivna bingo kartica |
| ❓ Kviz | Kviz iz IT znanja |
| ✏️ Whiteboard | Digitalna tabla za crtanje |
| 📋 Kanban Board | Organizacija zadataka |
| 🎨 Vision Board | Vizualni board ciljeva |

---

## GitHub historija

Projekat je commitovan postepeno, simulirajući realni tok razvoja:

1. `init: dodaj .gitignore`
2. `Dodana glavna stranica`
3. `Dodani stilovi`
4. `Dodane slike`
5. `Dodan favicon`
6. `Dodana kontakt stranica`
7. `Dodana popis stranica`
8. `Dodana raspored stranica`
9. `Dodan README`
10. `Dodan Angular projekat setup`
11. `Dodan src folder...` *(i dalje po modulima)*

---

Ime i prezime: Amir Avdić
Broj indeksa: I-0116/23
Godina studija: Treća
