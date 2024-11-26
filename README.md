# Nettbutikk Prosjekt

Dette prosjektet er en nettbutikkapplikasjon som lar brukere se og administrere et produktkatalog. Backend-delen av prosjektet gir tilgang til produktdata via en API, og frontend-delen viser disse dataene på en brukervennlig måte. Dette prosjektet benytter MongoDB som database og Express.js for backend-API-et.

## Hvorfor er backend data viktig for prosjektet?

Backend-data er essensielt for prosjektet fordi det gir en strukturert måte å lagre, hente og administrere produktinformasjon på. Uten et backend-system vil det være vanskelig å oppdatere og administrere store mengder data, spesielt når det gjelder produkter, priser og lagerstatus. Med en API som kobles til en database som MongoDB, kan vi effektivt hente og vise produkter på frontend, samtidig som vi kan utføre CRUD-operasjoner (Create, Read, Update, Delete) på dataene.

Backend gir også muligheten til å håndtere autentisering, autorisering, og kommunikasjon mellom server og klient, noe som er avgjørende for en dynamisk og funksjonell nettbutikk.

## Teknologier Brukt

Dette prosjektet benytter følgende teknologier:

- **Node.js**: JavaScript runtime brukt for å kjøre backend-serveren.
- **Express.js**: Rammeverk for å bygge backend API-er og håndtere HTTP-forespørsler.
- **MongoDB**: NoSQL-database for å lagre produktdata.
- **Mongoose**: JavaScript bibliotek som forenkler interaksjon med MongoDB i Node.js.
- **Axios**: HTTP-klient for å hente data fra backend til frontend.
- **React**: Frontend-rammeverk brukt for å bygge den dynamiske brukergrensesnittet.

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
- Koble frontend-applikasjonen (React) til backend via Axios for å hente produktdata.
- Implementert en enkel og brukervennlig måte å vise produkter på i frontend.
- Lært hvordan man setter opp og konfigurerer MongoDB for lagring av data.
- Prosjektet har gitt meg praktisk erfaring med å bygge en fullstack-applikasjon, inkludert både backend- og frontend-komponenter.

### Fremtidige Forbedringer

- Brukerautentisering: Legge til funksjonalitet for å registrere og logge inn brukere slik at de kan legge til produkter i en handlekurv og fullføre kjøp.
- Produktfiltrering og sortering: Legge til muligheter for å filtrere og sortere produkter etter pris, kategori eller vurdering.
- Betalingssystem: Integrere et betalingssystem (for eksempel Stripe eller PayPal) for å tillate brukere å betale for produktene sine.
- Responsiv design: Forbedre frontend-grensesnittet for bedre støtte på mobile enheter.
- Testdekningsgrad: Legge til tester for både backend-API-er og frontend-komponenter.
- Lisens
- Dette prosjektet er lisensiert under MIT-lisensen. Se LICENSE for mer informasjon.

## Forklaring av innholdet:

1. **Hvorfor backend data er viktig**: Her forklares hvorfor backend-data (som er lagret i MongoDB) er nødvendig for applikasjonen, spesielt når det gjelder håndtering av produktinformasjon.
2. **Teknologier Brukt**: Listet opp alle de viktigste teknologiene brukt i prosjektet (Node.js, Express, MongoDB, Mongoose, React, etc.).

3. **Instruksjoner for å lage og hente data**: Vist hvordan man oppretter nye produkter i MongoDB og hvordan man henter disse dataene fra backend-API-et til frontend-applikasjonen.

4. **Hva Jeg Har Oppnådd**: En kort oppsummering av hva du har lært og oppnådd gjennom prosjektet.

5. **Fremtidige Forbedringer**: En liste med potensielle forbedringer som kan implementeres i fremtiden for å gjøre applikasjonen mer funksjonell.

6. **Lisens**: Informasjon om lisensiering (du kan justere denne etter behov).

## Neste steg:

- Du kan legge til eventuelle spesifikke detaljer eller informasjon som gjelder for prosjektet ditt, og så kan du begynne å bruke denne `README.md`-filen som referanse.
- Husk å oppdatere GitHub-repositoriet etter at du har laget `README.md`-filen, så andre kan se dokumentasjonen.

Håper dette hjelper!
