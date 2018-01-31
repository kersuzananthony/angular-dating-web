import {Photo} from "./photo.model";

export const MALE = "male";
export const FEMALE = "female";

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

