import Ispis from "../src/index";
import credentials from "../config/credentials";

const ispis = new Ispis({ login: credentials.login , password: credentials.password });

describe('iSpis', () => {
  it('Should find dev record in iSpis using `ispis.searchPerson`', async () => {
    expect.assertions(2);
    const data = await ispis.searchPerson({
      profile: "Devel",
      firstName: "Tomáš",
      lastName: "Novák",
      birthDate: new Date(`06.16.1975`),
    });
    expect(data.done).toEqual(1);
    expect(data.warnings).toEqual(null);

  });

  it('Should find dev record in iSpis using `ispis.searchCompany`', async () => {
    expect.assertions(2);
    const data = await ispis.searchCompany({
      profile: "Devel",
      IC: "26185610"
    });

    expect(data.done).toEqual(1);
    expect(data.warnings).toEqual(null);
  });
});