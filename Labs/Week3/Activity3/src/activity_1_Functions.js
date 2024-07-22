const filterAdults = people => people.filter(person => person.age >= 18);
const getNames = people => people.map(person => person.name);
const sortByName = names => names.sort();
const toUpperCase = names => names.map(name => name.toUpperCase());

const compose = (...funcs) => x => funcs.reduceRight((v, f) => f(v), x);

const processPeople = compose(
  toUpperCase,
  sortByName,
  getNames,
  filterAdults
);

module.exports = {
  processPeople,
};