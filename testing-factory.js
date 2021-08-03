let animal = {
  eats: true,
};

function Rabbit(name) {
  this.name = name;
}

// Rabbit.__proto__ = animal;
Rabbit.prototype = animal;
let rabbit = new Rabbit("kong");

console.log(rabbit.eats);
