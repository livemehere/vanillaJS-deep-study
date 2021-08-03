# Prototype 과 상속

## Prototype 이란?

- 객체의 숨김프로퍼티로써 값은 null 이거나 다른대상을 참조하는데, 다른 대상을 참조하게되면 그것을 Prototype 이라고 부른다
- 객체에서 프로퍼티를 읽는데 없다면 자동적으로 prototype에서 프로퍼티를 찾는다. 이것을 프로토타입 상속이라고 부른다

```js
let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; //__proto__ 를 사용하여 값을 설정할 수 있다

console.log(rabbit.eats); // rabbit에는 eats가 없지만, prototype을 연결해두었기때문에, animal의 eats를 가져온다
```

> "위와같은 상황을 rabbit은 animal을 상속받는다" 라고 한다
> eats는 프로토타입에서 상속받은 inherited property 라고 한다
> 그리고 객체는 단 하나의 prototype 만 있을 수 있다는 제약이 있다

```js
let animal = {
  walk() {
    console.log("walk");
  },
};
let rabbit = {
  jumps: true,
  __proto__: animal,
};

rabbit.walk(); //walk
```

## this는 항상 .앞에 있는 객체를 가리킨다

```js
let animal = {
  walk() {
    if (!this.isSleeping) {
      console.log("동물이 걷습니다");
    } else {
      console.log("자는중 입니다");
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

let rabbit = {
  name: "검은 토끼",
  __proto__: animal,
};

rabbit.sleep();
rabbit.walk(); // 자는중 입니다
```

> 즉, 메서드는 공유되지만 상태는 공유되지 않는다!

## 상속받은 객체의 키값들

- 그냥 `Object.keys()`는 자신의 키만 반환함
- for...in 은 자신과 상속받은 프로퍼티의 키까지 순회함

```js
let animal = {
  walk() {
    if (!this.isSleeping) {
      console.log("동물이 걷습니다");
    } else {
      console.log("자는중 입니다");
    }
  },
  sleep() {
    this.isSleeping = true;
  },
  hot: true,
};

let rabbit = {
  name: "검은 토끼",
  __proto__: animal,
};

console.log(Object.keys(rabbit)); // name, isSleeping
for (props in rabbit) {
  console.log(props); //name, isSleeping, walk, sleep, hot
}
```

- 만약 상속받은 프로퍼티를 제외하고싶다면 true or false를 반환하는 아래의 함수를 통해 제외할 수 있음

```js
let animal = {
  eats: true,
};

let rabbit = {
  jumps: true,
  __proto__: animal,
};

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`객체 자신의 프로퍼티: ${prop}`); // 객체 자신의 프로퍼티: jumps
  } else {
    alert(`상속 프로퍼티: ${prop}`); // 상속 프로퍼티: eats
  }
}
```

## 마무리

- 프로토타입은 개념이 아주 복잡한것같다. 현재로서 핵심은 어느정도 이해했지만 깊게들어가기에는 아직 필요를 못느꼈다. 아직은 좀 어렵기도하고.. 나중에 돌고돌아 다시 공부할 필요를 느끼면 다시하겠다..!
