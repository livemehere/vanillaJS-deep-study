# NODE를 파해쳐보자

## Blocking과 Non-Blocking

- `Blocking` 이라는 것은 작업들이 동기적으로 수행된다는 것이다. 아래의 코드의 결과값은 당연히 먼저 실행되는 순서대로인 `1,2,3` 이 출력이된다

```js
function someTask() {
  console.log("task2");
}

console.log("task1");
someTask();
console.log("task3");

//1, 2, 3
```

- 반대로 `Non-Blocking` 이라는 것은 비동기적으로 수행되는 것을 말한는데, 아래의 코드는 함수가 `background`->`taskQueue`->`call stack` 순서로 이동하게되는데 바로 `call stack`으로 들어가 실행되는 것이 아니라, `call stack`이 비어있을 때, 비로소 `call stack`에 쌓이게되고 실행된다.

```js
function someTask() {
  console.log("task2");
}

console.log("task1");
setTimeout(someTask, 0); //background로 보내지고 다음 라인의 코드 실행
console.log("task3");

// 1, 3, 2
```

## var, const, let 의 차이

- `var`, `let` : 변수, 선언한 값을 수정가능
- `const` : 상수, 선언한값을 수정할 수 없음

- 공통적으로 모두, `함수 스코프`는 무시할 수 없다.
- 하지만 var 같은 경우 `block scope`는 무시할 수 있다.

```js
function box() {
  var x = 3;
  const y = 4;
  let z = 5;
}

console.log(x); // not defined
console.log(y); // not defined
console.log(z); // not defined

if (true) {
  var a = 3;
  const b = 4;
  let c = 5;
}

console.log(a); // 3
console.log(b); // not defined
console.log(c); // not defined
```

## 새로운 문법

- 객체에 property 를 넣을때, key,value의 변수명이 같으면 아래와 같이 생략이 가능하다.

```js
const name = "kong";
const age = 24;

function main(name, age) {
  obj = {
    name, // name: name 와같음
    age, // age: age 와같음
  };

  console.log(obj);
}

main(name, age);
//{ name: 'kong', age: 24 }
```

- 객체에 메서드를 정의할 때 아래와같이 생략할 수 있다

```js
const user = {
  name: "kong",
  age: 24,
  // 이 코드를
  sayHi: function sayHi() {
    console.log("HI");
  },
};

const user = {
  name: "kong",
  age: 24,
  // 이렇게
  sayHi() {
    console.log("HI");
  },
};
```

- 함수선언의 간략화

```js
const add = (x, y) => x + y; // = (x + y)
const add = (x) => !x; //매개변수가 1개 라면, 매개변수 에 ()를 생략해줄 수 있음
```

## this와 Arrow function

- this의 정의는 선언되는, 생성되는 시점이다
- 일반 함수는 자기 자신만의 this를 가진다
- arrow function은 자기 자신의 한단계 상위의 this 를 가르킨다

> 쉽게 요약하자면, function(){}은 선언된 객체에 바인딩 되고, ()=>{}은 상위 스코프의 객체를 가르킨다

- arrow의 함수의 경우

> 참고로 전역 객체에 대한 this는 module.exports를 가르킨다. 즉, (this == module.exports == exports)

```js
module.exports.name = "global";
exports.gender = "Man";
this.age = 80;

const user = {
  name: "kong",
  age: 24,
  nums: () => {
    console.log(this.name); // global
    console.log(this.age); // 80
    console.log(this.gender); // Man
  },
};
```

- 일반 함수의 경우

```js
module.exports.name = "global";
this.age = 80;

const user = {
  name: "kong",
  age: 24,
  nums() {
    console.log(this.name); // kong
    console.log(this.age); // 24
    console.log(this.gender); //undefined
  },
};
```

- 아래 코드를 유의깊게 보자, 이것을 이해하면 이해가 된것이다

```js
module.exports.name = "global";
exports.gender = "Man";
this.age = 80;

const user = {
  name: "kong",
  age: 24,
  nums() {
    this.name = "inside";
    console.log(this.name);
    console.log(this.age);
    console.log(this.age);
    const arrowfunc = () => {
      console.log(this.name); //inside
    };
    arrowfunc();

    function basicfunc() {
      console.log(this.name); // kong
    }
    basicfunc();
  },
};

user.nums();
```

- 이해를 돕기위한 예제 추가

> 일반 함수를 사용했기때문에 선언될때의 객체와 바인딩되어 this는 모두 각자의 name,age를 가르킨다

- 일반함수와 arrow function의 this 가 같은것을 가리키는 경우

```js
function User(name, age) {
  this.name = name;
  this.age = age;

  this.say = () => {
    console.log(this.name);
    console.log(this.age);
  };
  this.say2 = function () {
    s;
    console.log(this.name);
    console.log(this.age);
  };
}

const kong = new User("kong", 24);

kong.say(); //kong ,24
kong.say2(); //kong ,24
```

## Prototype
