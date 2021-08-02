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
````
