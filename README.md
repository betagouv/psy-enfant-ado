# PsyEnfantAdo | https://psyenfantado.beta.gouv.fr
Faites bénéficier votre enfant d’un accompagnement psychologique gratuit

CI branche `main` :  ![image](https://github.com/betagouv/psy-enfant-ado/workflows/Node.js%20CI/badge.svg)

## Lancer ce site localement
Vous devez avoir npm installé et [docker-compose](https://docs.docker.com/compose/install/) sur votre machine.

```bash
git clone https://github.com/betagouv/psy-enfant-ado
cd psy-enfant-ado
npm install
docker-compose up -d # start PG, create SQL tables, and import some data
npm run dev
```

### Test
```bash
docker-compose up -d # start PG, create SQL tables, and import some data
npm test
```

Alternativement, en une seule ligne (utilisé par la CI) :
```bash
docker-compose -f docker-compose.yml -f docker-compose-test.yml up;
```
Voir [ce lien](https://docs.docker.com/compose/extends/#understanding-multiple-compose-files) pour comprendre comment utiliser plusieurs docker-compose.yml dans une seule commande.

### Lint
```bash
npm run lint
```
