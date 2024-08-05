import { Persistence } from "../interface/persistence.js";

export class InMemoryPersistence extends Persistence {
    constructor() {
        super();
        this.pets = [];
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    getPetInfo(pet) {
        const foundPet = this.pets.find(p => p.name === pet.name);
        return foundPet ? foundPet.getPetInfo() : "Pet not found";
    }
}