# Nettbutikk Prosjekt

En nettbutikkapplikasjon som bl.a. lar brukere handle diverse søvn-relaterte produkter. Backend-delen av prosjektet gir tilgang til produktdata via en API, og frontend-delen viser disse dataene på en brukervennlig måte. Dette prosjektet benytter MongoDB som database og Express.js for backend-API-et.

## Hvorfor er backend-data viktig for prosjektet?

Backend-data er essensielt for prosjektet fordi det gir en strukturert måte å lagre, hente og administrere produktinformasjon på. Uten et backend-system vil det være vanskelig å oppdatere og administrere store mengder data, spesielt når det gjelder produkter, priser og lagerstatus. Med en API som kobles til en database som MongoDB, kan vi effektivt hente og vise produkter på frontend, samtidig som vi kan utføre CRUD-operasjoner (Create, Read, Update, Delete) på dataene.

Backend gir også muligheten til å håndtere autentisering, autorisering, og kommunikasjon mellom server og klient, noe som er avgjørende for en dynamisk og funksjonell nettbutikk.

### Databaseskjema

```javascript
{
  "_id": "ObjectId", // Automatisk generert av MongoDB
  "id": "Number", // Unik ID for produktet
  "name": "String", // Produktnavn
  "description": "String", // Produktbeskrivelse
  "price": "Number", // Pris på produktet
  "currency": "String", // Valuta, for eksempel "NOK"
  "category": "String", // Kategori, for eksempel "Sengeartikler"
  "subCategory": "String", // Underkategori, for eksempel "Sengetøy"
  "stock": "Number", // Antall på lager
  "sizes": ["String"], // Tilgjengelige størrelser, f.eks. ["Single", "Queen", "King"]
  "colors": ["String"], // Tilgjengelige farger, f.eks. ["Hvit", "Grå"]
  "rating": "Number", // Gjennomsnittlig vurdering
  "images": ["String"], // Array med URL-er til produktbilder
  "isFeatured": "Boolean", // Markering for om produktet skal fremheves
  "createdAt": "Date", // Når produktet ble lagt til
  "updatedAt": "Date" // Når produktet sist ble oppdatert
}
```

## Teknologier Brukt

Dette prosjektet benytter følgende teknologier:

- **Node.js**: JavaScript runtime brukt for å kjøre backend-serveren.
- **Express.js**: Rammeverk for å bygge backend API-er og håndtere HTTP-forespørsler.
- **MongoDB**: NoSQL-database for å lagre produktdata.
- **Mongoose**: JavaScript bibliotek som forenkler interaksjon med MongoDB i Node.js.
- **Axios**: HTTP-klient for å hente data fra backend til frontend.
- **React**: Frontend-rammeverk.

## Instruksjoner

### Hvordan opprette data i backend (MongoDB)

1. **Legg til data i MongoDB**:

   - Koble til din MongoDB-database.
   - Bruk `Item` modellen for å opprette nye produkter og legg til dataene via MongoDB Shell eller en MongoDB GUI som MongoDB Compass.

   Eksempel på opprettelse av et nytt produkt i backend:

   ```javascript
   const newItem = new Item({
     id: 1,
     name: "Bambus sengetøy - Pustende Komfort",
     description:
       "Mykt og pustende sengetøy laget av bambus for en luksuriøs og temperaturregulerende søvnopplevelse.",
     price: 899,
     currency: "NOK",
     category: "Sengeartikler",
     stock: 100,
     sizes: ["Single", "Queen", "King"],
     colors: ["Hvit", "Grå"],
     rating: 4.7,
     images: ["./bambus-laken.webp"],
     isFeatured: true,
   })

   newItem
     .save()
     .then(() => console.log("Produkt lagret"))
     .catch((err) => console.error("Feil ved lagring av produkt:", err))
   ```

## Kjør backend-serveren:

- Sørg for at MONGO_URI er korrekt satt i .env-filen, og at du har installert alle nødvendige avhengigheter.
- Start serveren med npm start for å kjøre backend-serveren.

### Hvordan hente data fra backend (via API)

Hente produktdata: Backend gir et API-endepunkt for å hente produktdata. For å hente produkter, send en GET-forespørsel til http://localhost:5000/api/items.

#### Eksempel med Axios i frontend (React):

```javascript
import axios from "axios"

const fetchItems = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/items")
    console.log(response.data)
  } catch (error) {
    console.error("Feil ved henting av produkter:", error)
  }
}

fetchItems()
```

Vis data i frontend: Når dataene er hentet, kan de vises i frontend som en liste med produkter. Bruk React state for å håndtere og vise dataene.

## Hva Jeg Har Oppnådd

### Gjennom dette prosjektet har jeg:

- Bygget et fullt fungerende backend-API med Express.js og MongoDB.
- Implementert datamodellen Item for å håndtere produktdata effektivt.
- Koblet frontend-applikasjonen (React) til backend via Axios for å hente produktdata.
- Implementert en enkel og brukervennlig måte å vise produkter på i frontend.
- Lært hvordan man setter opp og konfigurerer MongoDB for lagring av data.
- Prosjektet har gitt meg praktisk erfaring med å bygge en fullstack-applikasjon.

### Fremtidige Forbedringer

- Brukerautentisering: Legge til funksjonalitet for å registrere og logge inn brukere slik at de kan legge til produkter i en handlekurv og fullføre kjøp.
- Produktfiltrering og sortering: Legge til muligheter for å filtrere og sortere produkter etter pris, kategori eller vurdering.
- Betalingssystem: Integrere et betalingssystem (for eksempel Stripe eller PayPal) for å tillate brukere å betale for produktene sine.
- Responsiv design: Forbedre frontend-grensesnittet for bedre støtte på mobile enheter.
- Testdekningsgrad: Legge til tester for både backend-API-er og frontend-komponenter.

## Lisens

Dette prosjektet er lisensiert under MIT-lisensen. Se LICENSE for mer informasjon.
