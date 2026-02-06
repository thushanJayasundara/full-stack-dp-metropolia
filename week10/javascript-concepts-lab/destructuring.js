console.log('---------------------Part 01---------------------');
const person = { name: 'Alice', age: 30, city: 'New York' };

const { name, age } = person;

console.log('Name:', name);
console.log('Age:', age);

console.log('---------------------Part 02---------------------');
const person1 = { name1: 'Alice2', info: { age1: 33, occupation: 'Engineer' } };

const { name1, info: { age1, occupation } } = person1;

console.log('Name:', name1);
console.log('Age:', age1);
console.log('Occupation:', occupation);

console.log('---------------------Part 03---------------------');

function greetUser({ name, age }) {
    console.log(`Hello, ${name}! You're ${age} years old.`);
}

greetUser({ name: 'Bob', age: 25 });