import { Care } from "../Models/care.js";

export class SpecialCare extends Care {
    performCare(pet) {
        return `${pet.name} has received special care.`;
    }
}