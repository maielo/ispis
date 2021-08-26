## ispis

```sh
npm i ispis
```

- node.js client for [ispis.cz](https://ispis.cz/) to search for execution
    - written in TS :check:
    - handling authentication :check:
    - more friendly API :check:
    - normalized input data :check:
    - TODO: make batch API call
    - TODO: make downloadFile API call

- official documentation [http://document.profisms.cz/](https://ispis.cz/lustrace/apidocs) TODO:

#### Basic usage

```js
// commonJS
const Ispis = require('ispis').default;
// ES6 modules
import Ispis from 'ispis';

const ispis = new Ispis({
    login: `<username>`, // xx@xx.cz - your sign up credentials
    password: `<password>` // xx@xx.cz - your sign up password
});

// ...
try {
    const data = await ispis.searchPerson({
      profile: "Devel", // Devel = development | CEE | CRE
      firstName: "Tomáš",
      lastName: "Novák",
      birthDate: new Date(`06.16.1975`),
    });

} catch (err) {

    console.error(err);
}

// ...
try {
    const data = await ispis.searchCompany({
      profile: "Devel",
      IC: "26185610"
    });
} catch (err) {

    console.error(err);
}
```