this.name = "global";
this.age = 888;

function User(name, age) {
  this.name = name;
  this.age = age;

  this.say = () => {
    console.log(this.name);
    console.log(this.age);
  };
  this.say2 = function () {
    console.log(this.name);
    console.log(this.age);
  };
}

const kong = new User("kong", 24);
const ha = new User("ha", 30);

kong.say();
ha.say();

kong.say2();
ha.say2();
