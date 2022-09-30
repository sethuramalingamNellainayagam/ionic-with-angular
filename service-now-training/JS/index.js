document.addEventListener("DOMContentLoaded", function () {
  const globalVar = "GLOBALVAR";
  // var grandparent = document.querySelector(".grandparent");
  // var parent = document.querySelector(".parent");
  // var child = document.querySelector(".child");
  // console.log(grandparent, " grandparent");
  // grandparent.addEventListener("click", (event) => {
  //   console.log("grand parent 1 event", event);
  // }, {capture: true});

  // grandparent.addEventListener("click", (event) => {
  //   console.log("grand parent 2 event.target", event.target);
  // });

  // parent.addEventListener("click", (event) => {
  //   console.log("parent 1 event", event);
  // });

  // child.addEventListener("click", (event) => {
  //   console.log("child 1 event", event);
  // });

  // document.addEventListener("click", (event) => {
  //   console.log("document 1 event", event);
  // });

  // const companies = [
  //   {
  //     name: "Big corporation",
  //     numberOfEmployees: 10000,
  //     ceo: "max",
  //     rating: 4,
  //   },
  //   {
  //     name: "Startup company",
  //     numberOfEmployees: 5,
  //     ceo: "tim",
  //     rating: 4.2,
  //   },
  // ];

  // console.log(companies, " companies");

  //event delegation
  //const divs = document.querySelectorAll("div");

  // divs.forEach((div) => {
  //   div.addEventListener("click", () => {
  //     console.log("Hi");
  //   });
  // });

  //   document.addEventListener("click", (event) => {
  //     if (event.target.matches("div")) {
  //       console.log("Hi");
  //     }
  //   });

  //   const newDiv = document.createElement("div");
  //   newDiv.style.width = "200px";
  //   newDiv.style.height = "200px";
  //   newDiv.style.backgroundColor = "purple";
  //   document.body.appendChild(newDiv);
});

// string literals
//const user = "max";

//fetch(`https://getUserData/${user}`);

// const a = 7;
// const b = 4;
// const result = a + b;

// console.log("The addition of 7 and 4 is 11");

// arrow funtion
// function add(a, b) {
//   return a + b;
// }
// function isPositive(a) {
//   return a >= 0;
// }
// function randomNumber() {
//   return Math.random();
// }
// document.addEventListener("click", function () {
//   console.log("document click");
// });
// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   printNameArrow() {
//     setTimeout(() => {
//       console.log("name from arrow ", this.name);
//     }, 1000);
//   }

//   printNameFuntion() {
//     setTimeout(function () {
//       console.log("name from function ", this.name);
//     }, 1000);
//   }
// }

// const person = new Person("Mac");
// person.printNameArrow();
// person.printNameFuntion();

//scoping - global, module, function, block
//let - block scope, var - functio scope

// const globalA = 5;

// function test() {
//   const fcScopeB = 4;
//   console.log("inside fn ", globalA + " , " + fcScopeB);
// }

// test();
//console.log("outside fn ", globalA + " , " + fcScopeB);

// let exArray = ["red", "blue", "green"];
// exArray = exArray.filter((el) => {
//   return el === "green";
// });

// console.log(exArray, " exArray");

