# Malung

En privatpräglad samlingsplats för det årliga Malung-gänget: årets plan,
matmeny, nedräkning, deltagare och bilder från tidigare resor.

## Utveckling

```bash
npm install
npm run dev
```

## Innehåll

Det redaktionella innehållet finns samlat i `src/data.ts`. Deltagarnamn,
smeknamn, aktiviteter och meny kan ändras där utan att sidans struktur behöver
byggas om.

Resebilder läggs senare i `public/images/<år>/` och kopplas till respektive år
i datan.

## Publicering

Varje push till `main` bygger webbplatsen och publicerar den till GitHub Pages
via `.github/workflows/deploy.yml`.
