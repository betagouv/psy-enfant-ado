# PsyEnfantAdo | https://www.psyenfantado.sante.gouv.fr/
Faites bénéficier votre enfant d’un accompagnement psychologique gratuit

CI branche `main` :  ![image](https://github.com/betagouv/psy-enfant-ado/workflows/Node.js%20CI/badge.svg)

## Lancer ce site localement
Vous devez avoir npm installé et [docker-compose](https://docs.docker.com/compose/install/) sur votre machine.

```bash
git clone https://github.com/betagouv/psy-enfant-ado
cd psy-enfant-ado
docker-compose up -d # start PG, create SQL tables, and import some data
# Or use this if you don't want to use docker-compose
npm install
npm run dev
```

### Test
```bash
docker-compose up db init_db -d # start PG, create SQL tables, and import some data
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
## Déployé le site
Psy enfant ado possède 2 environements hebergés sur scalingo 
Staging et Prod

La branch dev est automatiquement déployé sur Staging et la branche main sur Prod.
Les PR se font sur dev (squash).

Pour déployer, il faut rebase dev sur main:
```bash
git checkout dev
git pull origin dev
git checkout main
git rebase dev
git push origin main
```

## Données
### Démarches Simplifiées (DS) 
Pour afficher une liste de psychologues, nous importons les données venant de l'API démarches simplifiées (DS) dans la base de données Postgresql à l'aide d'un cron. Cela nous permet un meilleur taux de réponses et une maitrise en cas de pic de traffic.

L'API DS est appellée à intervalle regulier à l'aide d'un CRON pour mettre à jour la table PG psychologists et on stockera le dernier cursor qui correspond à la dernière page requête de l'API dans la table PG ds_api_cursor pour ne rappeller que les pages necessaires et limiter le nombre d'appel à l'API DS.

Cependant, certaines données dans DS vont être modifiées au fil du temps, et il nous est donc obligatoire de mettre à jour toutes les données, dans ce cas là nous n'utilisons pas le cursor de l'API à l'aide d'un 2ème CRON moins fréquent.

API de démarches simplifiées :

    Documentation : https://doc.demarches-simplifiees.fr/pour-aller-plus-loin/graphql
    Schema: https://demarches-simplifiees-graphql.netlify.app/query.doc.html

Pour mettre à jour toutes les données venant de DS vers PG, un cron est lancé à intervalle régulier (voir la page containers de Scalingo) :

$ node ./cron_jobs/cron.js


### Pour tester les évolutions de base de données

#### Créer un fichier de migration

    $ npm run makeMigration migration-name

#### Importer des fausses données
Voir le fichier dans `test/seed/fake_data.js` qui va créer quelques psychologues

Pour l'exécuter:

    $ npm run seed

### Accès à la base de données Postgres sur Scalingo
Avec [le scalingo CLI](https://doc.scalingo.com/cli) et le nom de l'app sur scalingo

    $ scalingo -a APP_NAME pgsql-console

On peut insérer des données comme ceci :
```sql
INSERT INTO public.psychologists
("dossierNumber", adeli, "firstNames", "lastName", email, address, departement, region, phone, website, teleconsultation, description, languages, training, diploma, "createdAt", "updatedAt", archived, state, "personalEmail")
VALUES('77356ab0-349b-4980-899f-bad2ce87e2f1', 'adeli', 'firstname', 'lastname', 'publicemail@beta.gouv.fr', '', '', '', '', '', false, 'accfzfz', '', '[]', '',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, 'accepte', 'private.email@beta.gouv.fr');
```

Autre solution : utiliser le code Node au lieu de SQL.

    $ scalingo -a APP_NAME run node

Puis une fois la console node ouverte :
```js
const dbPsychologists = require('./db/psychologists')

let psy = { 'dossierNumber': '77356ab0-349b-4980-899f-bad2ce87e2f1', 'adeli': 123, firstNames: 'Stevie', 'lastName': 'Wonder', 'email': 'meetwithstevie@wonder.com', archived: true, state: 'accepte', personalEmail: 'stevie@wonder.com'}

dbPsychologists.savePsychologistInPG([psy])
```
