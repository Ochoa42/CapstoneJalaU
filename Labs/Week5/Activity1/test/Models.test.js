import { InMemoryPersistence } from "../src/Data/inMemoryPersistence.js";
import { BasicCare } from "../src/interface/basicCare.js";
import { SpecialCare } from "../src/interface/specialCare.js";
import { Customer } from "../src/Models/customer.js";
import { Food } from "../src/Models/foot.js";
import { Pet } from "../src/Models/pet.js";
import { PetStore } from "../src/Models/petStore.js";
import { Toy } from "../src/Models/toy.js";

const pet1 = new Pet('Rex', 'Dog', 5); 
const food = new Food('Dog Food', 25, '2025-01-01');
const toy = new Toy('Chew Toy', 10, 'Rubber');

const basicCare = new BasicCare();
const specialCare = new SpecialCare();

const customer = new Customer('Alice');

const inMemoryPersistence = new InMemoryPersistence();
const petStore = new PetStore(inMemoryPersistence);

test('Add pet to store and get info', () => {
    petStore.addPet(pet1);
    expect(petStore.getPetInfo(pet1)).toBe('Rex, Dog, 5');
});

test('Provide basic care to pet', () => {
    expect(basicCare.performCare(pet1)).toBe('Rex has received basic care.');
});

test('Provide special care to pet', () => {
    expect(specialCare.performCare(pet1)).toBe('Rex has received special care.');
});

test('Get product info for food', () => {
    expect(food.getProductInfo()).toBe('Dog Food, 25, Expiration Date: 2025-01-01');
});

test('Get product info for toy', () => {
    expect(toy.getProductInfo()).toBe('Chew Toy, 10, Material: Rubber');
});

test('Get customer info', () => {
    expect(customer.getCustomerInfo()).toBe('Customer Name: Alice');
});