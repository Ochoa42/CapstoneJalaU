export class PetStore {
    constructor(persistence) {
        this.persistence = persistence;
    }

    addPet(pet) {
        this.persistence.addPet(pet);
    }

    getPetInfo(pet) {
        return this.persistence.getPetInfo(pet);
    }
}