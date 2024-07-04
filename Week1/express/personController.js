const people = [];

export const createPerson = ({age, name}) => {
    const person = {
        name,
        age
    }
    // const person = {
    //     name: name,
    //     age: age
    // }
    people.push(person); // person.save(person);
    return person;
};