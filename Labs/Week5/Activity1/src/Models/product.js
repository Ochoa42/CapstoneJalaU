export class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getProductInfo() {
        return `${this.name}, ${this.price}`;
    }
}