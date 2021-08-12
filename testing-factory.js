this.name = "global";

let user = {
  name: "kong",
  age: 24,
  say: () => {
    console.log(this);
  },
  hi() {
    console.log(this.name);
  },
};

user.say();
user.hi();
console.log(this);
