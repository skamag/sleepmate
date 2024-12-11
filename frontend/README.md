# Nettbutikk Prosjekt

En nettbutikkapplikasjon for en imaginær butikk som selger søvnrelaterte produkter. Backend-delen av prosjektet gir tilgang til produkt- og brukerdata, mens frontend-delen viser butikkens brukergrensesnitt.

## Hvorfor er backend-data viktig for prosjektet?

Backend-data er essensielt for prosjektet fordi det gir en strukturert måte å lagre, hente og administrere produkt- og brukerinformasjon på. Uten et backend-system vil det være vanskelig å oppdatere og administrere store mengder data. Med en API som kobles til en database som MongoDB, kan vi effektivt hente og vise produkter på nettsiden, samtidig som vi kan utføre CRUD-operasjoner på dataene.

## Teknologier Brukt

- **Node.js**: JavaScript runtime brukt for å kjøre backend-serveren.
- **Express.js**: Rammeverk for å bygge backend API-er og håndtere HTTP-forespørsler.
- **MongoDB**: NoSQL-database for å lagre produktdata.
- **Mongoose**: JavaScript bibliotek som forenkler interaksjon med MongoDB i Node.js.
- **Axios**: HTTP-klient for å hente data fra backend til frontend.
- **React**: Frontend-rammeverk.
- **JSON Web Token**: Pollett for autentisering av brukere.
- **Stripe**: Betalingsløsning (ikke integrert per 10.12.2024).
- **Render**: Skylagrinsplatform for hosting av front- og backend (ikke integrert per 10.12.2024).

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

- Prosjektet har gitt meg praktisk erfaring med å bygge en fullstack-applikasjon hvor jeg har integrert et fullt fungerende backend-API med Express.js og MongoDB.
- Implementert en enkel og brukervennlig måte å vise produkter på i frontend og koblet frontend-applikasjonen (React) til backend via Axios for å hente produktdata.
- Fått bygget på tidligere erfaring med API-testing gjennom Postman.

### Fremtidige Forbedringer

- Katalogside med produktfiltrering og sortering, "om"-side med informasjon om butikken, "kontakt"-side.
- Betalingssystem: Integrere et betalingssystem (for eksempel Stripe og/eller Vipps) for å tillate brukere å betale for produktene sine.

## Lisens

Dette prosjektet er lisensiert under MIT-lisensen. Se LICENSE for mer informasjon.
