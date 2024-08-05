export class Customer {
    constructor(name) {
        this.name = name;
    }

    getCustomerInfo() {
        return `Customer Name: ${this.name}`;
    }
}