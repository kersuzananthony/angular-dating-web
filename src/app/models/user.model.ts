import {Photo} from "./photo.model";

export interface User {
  id: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  createdAt: Date;
  lastActiveAt: Date;
  country: string;
  city: string;
  photoUrl: string;
  introduction?: string;
  lookingFor?: string;
  interests?: string;
  photos?: Photo[];
}

