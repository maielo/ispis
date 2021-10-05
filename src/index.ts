import fetch from "node-fetch";
import queryString from "query-string";
import dayjs from "dayjs";

type IspisProfile = "CEE" | "CRE" | "Devel";

export interface SearchPerson {
  profile?: IspisProfile;
  firstName: string;
  lastName: string;
  birthDate: Date;
  RC?: string;
};

export interface SearchCompany {
  profile?: IspisProfile;
  IC: string;
}

export type IspisSubject = {
  balanceCents: number;
  batchId: string;
  costCents: number;
  detail: {
    CEE?: string;
    CEE_Adresy_JSON?: string;
    CEE_Datumy?: string;
    CEE_Detaily?: string;
    CEE_Exekuce_JSON?: string;
    CEE_Pocet?: string;
    CasLustrace: string;
    Devel: string;
    Jmeno: string;
    Narozen: string;
    Osloveni: string;
    Prijmeni: string;
  }
  done: 1 | null;
  files: { contentBase64: string; name: string; }[];
  html: string;
  warnings: string | null;
}

export default class Ispis {
  login: string;
  password: string;
  url: "https://ispis.cz";
  constructor({ login, password }: { login: string; password: string }) {

    this.login = login;
    this.password = password;
    this.url = `https://ispis.cz`;
  }

  async searchPerson ({ profile = "CEE", firstName, lastName, birthDate, RC }: SearchPerson): Promise<IspisSubject | null> {

    const _config = {
      username: this.login,
      password: this.password,
      profile,
      Jmeno: firstName,
      Prijmeni: lastName,
    }

    if (birthDate) {
      // @ts-ignore
      _config.Narozen = dayjs(birthDate).format("DD.MM.YYYY");
    } else {
      throw new Error("ispis - birthDate is required");
    }

    if (RC) {
      // @ts-ignore
      _config.RC = RC;
    }
    try {

      const _queryString = queryString.stringify(_config)
      const response = await fetch(`${this.url}/api/lustraceSearchSubject?${_queryString}`)
      const text = await response.text(); // this action will not fail

      return JSON.parse(text);

    } catch (err) {
      return null;
    }
  }

  async searchCompany ({ profile, IC }: SearchCompany): Promise<IspisSubject | null> {

    const _config = {
      username: this.login,
      password: this.password,
      profile,
      IC
    }

    try {

      const _queryString = queryString.stringify(_config)
      const response = await fetch(`${this.url}/api/lustraceSearchSubject?${_queryString}`)
      const text = await response.text(); // this action will not fail

      return JSON.parse(text);

    } catch (err) {
      return null;
    }
  }
}
