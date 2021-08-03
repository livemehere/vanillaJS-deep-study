# Class

## Class란?

- 멤버변수 + 메서드로 구성된 객체틀
- new function ≒ class
- class란 함수의 한 종류이다

```js
class MyClass { //기본 문법
  // 여러 메서드를 정의할 수 있음
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

- new MyClass() 를 호출하면 내부에 정의한 메서드가 들어있는 객체가 생성된다
- constructor() 은 new 에 의해 자동으로 호출된다

> 클래스 메서드 사이에는 쉼표가 없다

```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}

// User가 함수라는 증거
alert(typeof User); // function
```

## binding

- js의 함수는 동적인 `this`를 가진다. 따라서 객체 메서드를 여기저기 전달해서 전혀 다른 컨텍스트에서 호출하게 되면 `this`는 원래 객체를 참조하지 않는다

```js
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

- 해결방안은 arrow function을 사용하는 것이다
- `click = () => {...}` 은 객체마다 독립적인 함수를 만들고 함수의 `this`를 해당 객체에 바인딩 시켜준다

## Class extends (상속)
