import { Product } from "./product.js";

export class Toy extends Product {
    constructor(name, price, material) {
        super(name, price);
        this.material = material;
    }

    getProductInfo() {
        return `${super.getProductInfo()}, Material: ${this.material}`;
    }
}