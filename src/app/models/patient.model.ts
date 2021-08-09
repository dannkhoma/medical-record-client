import {Gender} from "./gender.enum";
import {DiabetesState} from "./diabetes.state.enum";
import {City} from "./city.model";
import {Country} from "./country.model";

export class Patient {

  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  city?: City;
  country?: Country;
  age?: number;
  diabetesState?: DiabetesState;

}
