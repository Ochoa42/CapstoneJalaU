import { Care } from "../Models/care.js";

export class BasicCare extends Care {
    performCare(pet) {
        return `${pet.name} has received basic care.`;
    }
}