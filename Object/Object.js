function User(name, age) {
  return {
    name,
    age,
  };
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const kong = User("kong", 24);
const ha = new Person("ha", 24);
console.log(kong, ha);
console.log("name" in kong);

const arr = [1, 2, 3, 4];

for (key in kong) {
  console.log(key);
}
