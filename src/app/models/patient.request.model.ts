import {Gender} from "./gender.enum";
import {DiabetesState} from "./diabetes.state.enum";

export class PatientRequest {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  city?: string;
  country?: string;
  age?: number;
  diabetesState?: DiabetesState;

}
