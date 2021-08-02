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
