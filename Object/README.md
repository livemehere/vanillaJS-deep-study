# 객체

## 객체란 ?

- {...} 중괄호를 이용해 만들수 있는 `key`와 `value`의 쌍으로 이루어진 `property`의 집합체이다.

## 생성법 2가지

```js
const user = {}; //객체 리터럴 문법
const user = new Object(); //객체 생성자 문법
```

## 참조하는 방법 2가지

```js
const user = {
  name: "kong",
  age: 24,
};

console.log(user.name); //'kong' 1. dot notation
console.log(user[name]); //'kong'  2. square bracket notation
```

## const 객체는 수정이 가능하다!

- `const`는 상수이지만, 객채로 선언했을때 객체내의 `property`는 수정이가능하다
- 다만 ex) `const user = ...;` `user=...` 이런식으로 전체적으로 변경하는 것이 불가능하다

## 계산된 property(Computed property)

- 프로퍼티의 `key` 값을 변수로 설정해둘 수 있다

```js
const fruit = "apple";

const user = {
  [fruit]: 5,
};

console.log(user.apple); // 5
```

## Property value shorthand

- 객체를 생성하는데 그 값을 파라미터로 받아서 생성하는 함수가 있다고 해보자, 그때 `key`값와 `value`값의 이름이 동일할 때 아래와 같이 축약할 수 있다

```js
function User(name, age) {
  return {
    name: name,
    age: age,
  };
}

// 두개의 함수는 동일한 동작을 함

function User(name, age) {
  return {
    name,
    age,
  };
}
```

## Undefined

- 존재하지 않는 `property`를 참조시에 에러를 발생하는 대신 `undefined`를 반환한다

```js
const user = {
  name: "kong",
};

console.log(user.age); //undefined
```

## in 연산자로 property 존재 여부 확인하기

- `undefined`를 활용해서 찾을 수 도있지만, `value`값이 `undefined`일경우가 있을 수도 있기 때문에 정확하다고 볼수는 없다. 그래서 in 연산자를 사용한다

```js
const user = {
  name: "kong",
  age: 24,
  location: undefined,
};

console.log(name in user); //true   'key in Object'
console.log(name === undefined); // false 'name이 있기 때문에 false'
console.log(login === undefined); // true  '존재하지 않는 property이기 때문에'
console.log(location === undefined); // true 'location의 value값이 undefined이기 때문에 true' : 이경우가 모호한경우임
```

## for(... in ...) 연산자로 key값 순회하기

- 이 연산자를 사용하면 객체내의 key 값을 쭉 반환하고, 이를 활용하여 값도 참조할 수 있다

```js
const user = {
  name: "kong",
  age: 24,
  location: "한국",
};

for (key in user) {
  console.log(key); // name, age, location
  console.log(user[key]); // kong, 24, 한국
  console.log(user.key); // undefined , undefined, undefined  -> for in 문은 string으로 반환하기 때문에 [] 방식을 사용해야함
}
```

## 참조에의한 객체 복사

- 객체는 `call by reference`이다
- C언어로 치면 포인터가된다
- 그래서 아래와 같이 복제를 한다면 같은 객체에 대해서 `참조값`이 복사가 된다

```js
let user = { name: "kong" };
let admin = user;

console.log(user === admin); // true
```

### 그럼 정말 객체를 복제하고싶다면?

- `for..in` 을 사용하여 순회하여 직접복사

```js
const user = {
  name: "kong",
  age: 24,
  location: "한국",
};

let clone = {};

for (let key in user) {
  clone[key] = user[key];
}
```

- `Object.assign(객체,병합할객체,병합할객체...)`를 사용하여 복사

```js
const user = {
  name: "kong",
  age: 24,
  location: "한국",
};

const clone = Object.assign({}, user);
```

> 하지만 이렇게 복사하는 방식의 문제는 객체내에 객체를 참조하는 값이 있으면 그것은 참조값을 복사하는게 된다

```js
let user = {
  name: "kong",
  body: {
    weight: "88kg",
    height: "180cm",
  },
};

let clone = Object.assign({}, user);

console.log(user.sizes === clone.sizes); // true, 같은 객체
```

## 가비지 컬렉션(Garbage collector)

- 객체는 메모리에저장되고, 그 값을 변수를 통해 참조해서 접근한다. 그런데 그 변수가 null 이된다면 메모리에 위치한 객체에 접근할 방법이 없어진다. 그럼 메모리를 차지하면서 영원히 접근할 수 없게 된다. 이것을 `garbage` 라고 하고 자바스크립트는 끊임없이 가비지 컬렉터가 검사하며 메모리를 정리해준다.

## 메서드

- 객체 `property` 에 함수를 할당하면 그것을 함수라하지 않고, `method`(메서드) 라고한다

```js
let user = {
  name: "kong",
};
user.sayHi = function () {
  alert("HI");
};

user.sayHi(); // hi
```

- 단축구문

```js
let user = {
  name: "kong",
  say() {
    console.log("hi");
  },
};

user.say();
```

## this

- this를 사용하는것은 객체 자기자신을 말한다 아래에서는 `user`을 가리킨다

```js
const name = "global";
let user = {
  name: "kong",
  say() {
    console.log(this.name);
    console.log(name);
  },
};

const admin = user;

admin.say(); // kong, global
user.say(); // kong, global
```

```js
let user = { name: "kong" };
let admin = { name: "ha" };

function sayHi() {
  console.log(this.name);
}

user.f = sayHi;
admin.f = sayHi;

user.f(); //kong
admin.f(); //ha
```

- 객체없이 그냥 함수에서 `this` 를 호출할 경우 Undefined 가 할당된다 (엄격모드 사용시)
- 엄격모드가 아닐경우에는 window 라는 전역객체를 참조한다
- 자바스크립트에서 `this` 는 메서드가 정의되지 않아도 `this`는 점앞의 객체에 무엇인가에 따라 자유롭게 결정된다
- 반대로 항상 매서드가 정의된 객체를 참조하는 것을 bound `this` 라고 한다

## Arrow function 에서의 this

- 화살표 함수는 자신만의 `this`를 가지지 않고 외부에서 `this` 값을 가져온다(나중에 binding과 관련)

```js
const name = "global";

let user = {
  name: "kong",
  say() {
    let arrow = () => {
      console.log(this.name); //kong
    };
    let just = function () {
      const name = "infunction";
      console.log(this.name); //undefined (global도 아님)
    };
    arrow();
    just();
  },
};
```

> this에 대해서는 좀더 공부가 필요하다

## new 연산자와 생성자 함수

- 객체는 {} 를 사용하여 쉽게 만들수있다
- 하지만 유사한 객체를 여러개 만들어야할 때면 `new` 연산자 + `생성자` 함수를 사용하면 쉽게 만들수 있다

> 생성자 함수(constructor function)과 일반함수에 기술적인 차이는없으나 생성자함수는 2가지의 관례를 따른다

1. 함수 이름의 첫글자는 반드시 대문자이다
2. 반드시 `new` 연산자를 붙여 실행한다

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

function just(name) {
  return {
    name,
    isAdmin: false,
  };
}

const kong = new User("kong");
const ha = just("ha");

console.log(kong); //name:kong, isAdmin:false
console.log(ha); //name:ha, isAdmin:false
```

- 위 두개의 함수는 같은 동작을 한다
- 그럼 `new User()`가 실행될 경우 무슨 일이일어나는지 보자

```js
function User(name) {
  // this = {};  (빈 객체가 암시적으로 만들어짐)

  // 새로운 프로퍼티를 this에 추가함
  this.name = name;
  this.isAdmin = false;

  // return this;  (this가 암시적으로 반환됨)
}
```

- 일반함수에서 객체를 `return` 하는 것을 암시적(자동적으로)으로 해준다

> 생성자 = 재사용할 수 있는 객체 생성 코드를 구현하는 것이다
> new 연산자를 사용하면 어떤 함수든지 위와같이 암시적 동작을 수행한다

## 생성자 내 메서드

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.say = () => {
    //메서드는 이와같이 선언
    console.log(`${this.name} hi`);
  };
  const global = () => {
    // 동작하지 않음
    console.log(this.name);
  };
}

const kong = new User("kong");
const ha = new User("ha");

kong.say(); // kong hi
ha.say(); // ha hi
ha.global(); //이런건안됨 생성자 함수는 this만을 반환하기때문에 함수도 this에 바인딩한 것만 가능
```

> new 연산자는 내부에서 this를 암시적으로 만들고, 마지막에 this를 반환한다

## Optional Chaining

### 옵셔널 체이닝이 필요한이유?

- 만약 없는 `property`에 접근을 하게된다면 에러를 발생시킵니다
- 그래서 기존에는 `&&` (AND연산)을 사용하여 해결했지만, 단점은 코드가 길어진다는 것입니다

```js
let user = {}; // 주소 정보가 없는 사용자

alert(user.address.street); // TypeError: Cannot read property 'street' of undefined
--------------------------------------------
let user = {}; // 주소 정보가 없는 사용자

alert(user && user.address && user.address.street); // undefined, 에러가 발생하지 않습니다.
```

```js
let user = {}; // 주소 정보가 없는 사용자

alert(user?.address?.street); // undefined, 에러가 발생하지 않습니다.
```

- 이런식으로 변경 가능
- `?.`은 앞의 대상이 `undefined` 나 `null` 일 경우에 평가를 멈추고 `undefined` 를 반환함

## symbol() 심볼

- 유일한 식별자를 만들고 싶을때 사용함(깊게 하진 않고 정의만)

```js
let id = Symbol("dd");
let id2 = Symbol("dd");

console.log(id);
console.log(typeof id);
console.log(typeof id.toString());
console.log(id.description);
```
