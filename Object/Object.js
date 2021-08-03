const user = {
  name: "kong",
  age: 24,
  location: "한국",
};

const clone = Object.assign({}, user);

console.log(user.name === clone.name); // true
