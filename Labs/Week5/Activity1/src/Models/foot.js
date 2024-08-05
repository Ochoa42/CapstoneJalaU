import { Product } from "./product.js";

export class Food extends Product {
    constructor(name, price, expirationDate) {
        super(name, price);
        this.expirationDate = expirationDate;
    }

    getProductInfo() {
        return `${super.getProductInfo()}, Expiration Date: ${this.expirationDate}`;
    }
}