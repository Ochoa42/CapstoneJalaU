export class Pet {
    constructor(name, type, age) {
        this.name = name;
        this.type = type;
        this.age = age;
    }

    getPetInfo() {
        return `${this.name}, ${this.type}, ${this.age}`;
    }
}