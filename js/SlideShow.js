let snacks = document.getElementById("snacks")
setInterval(function() {
  var burgers = ["./img/kipfingers.jpg", "./img/kipnuggets.jpg","./img/kipnuggets2.jpg", "./img/hotwingss.jpg"]
  const random = burgers[Math.floor(Math.random() * burgers.length)];
  snacks.style.backgroundImage = `url(${random}` 
}, 5000);

let backgroundid = document.getElementById("burgers")
setInterval(function() {
    var burgers = ["./img/burger1.jpg", "./img/burger2.jpg","./img/burger3.jpg", "./img/burger4.jpg", "./img/bacon\ boss.jpg"]
    const random = burgers[Math.floor(Math.random() * burgers.length)];
    backgroundid.style.backgroundImage = `url(${random}` 
}, 5000);

let saus = document.getElementById("saus")
setInterval(function() {
    var burgers = ["./img/mayo.jpg", "./img/satesaus.png","./img/curry.png"]
    const random = burgers[Math.floor(Math.random() * burgers.length)];
    saus.style.backgroundImage = `url(${random}`
}, 5000);



let menu = document.getElementById("menus")
setInterval(function() {
    var burgers = ["./img/friet.png", "./img/shoarma.jpg"]
    const random = burgers[Math.floor(Math.random() * burgers.length)];
    menu.style.backgroundImage = `url(${random}`
 }, 5000);
              

let chinees = document.getElementById("chinees")
setInterval(function() {
    var burgers = ["./img/ajampangang.jpg", "./img/babipangang.jpg"]
    const random = burgers[Math.floor(Math.random() * burgers.length)];
    chinees.style.backgroundImage = `url(${random}`
}, 5000);
                        
let drinken = document.getElementById("drinken")
setInterval(function() {
    var burgers = ["./img/cola.png", "./img/IJsthee.jpg", "./img/sinas.jpg", "./img/dommelsch.jpg", "./img/jupiler.jpg"]
    const random = burgers[Math.floor(Math.random() * burgers.length)];
    drinken.style.backgroundImage = `url(${random}`
}, 5000);
        
let ijs = document.getElementById("ijs")
setInterval(function() {
  var burgers = ["./img/bluemonster.jpg", "./img/kinderijsje.jpeg", "./img/reuzebeker.jpg"]
  const random = burgers[Math.floor(Math.random() * burgers.length)];
  ijs.style.backgroundImage = `url(${random}`
}, 5000);

let sushi = document.getElementById("sushi")
setInterval(function() {
  var burgers = ["./img/sushi1.jpg", "./img/sushi2.jpg", "./img/sushi3.jpg", "./img/sushi4.jpg", "./img/sushi5.jpg", "./img/sushi6.jpg", "./img/sushi7.jpg", "./img/sushi8.jpg", "./img/sushi9.jpg"]
  const random = burgers[Math.floor(Math.random() * burgers.length)];
  sushi.style.backgroundImage = `url(${random}`
}, 5000);
