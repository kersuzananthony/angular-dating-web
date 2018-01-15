export interface DecodedToken {
  exp: number;
  iat: number;
  nbf: number;
  nameid?: string;
  unique_name?: string;
}

export class Token {
  constructor(public rawToken, public decodedToken) {}

  public static build(rawToken: string, decodedToken: DecodedToken): Token {
    return new Token(rawToken, decodedToken);
  }
}
