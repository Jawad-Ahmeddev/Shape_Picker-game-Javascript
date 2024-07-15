var arr = [1,2,3,4,5,6,7,8,9,10]
console.log(arr.length)
console.log("Array = " + arr)

arr.push(11)

console.log(arr.length)
console.log("Array = " + arr)

num1= 2

console.log(num1==2?"Good":"Very good ")

var myname=function(x,y){
    console.log("My name is "+ x + " " + y)
}

var x = "jawad"
var y = "Ahmed"

myname(x,y)

var object = {
    make : "Toyota",
    model : "Paso",
    speed : function(a){console.log(`Car runs in speed ${a}km`);},
};

function CarObject(make, model, year, color, sunRoof) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.sunRoof = sunRoof;
    this.drive = function(speed) { console.log("Moving forward at " + speed + " mph"); };
}

var petersCar = new CarObject('Honda', 'Civic', '2015', 'Blue', true);
var johnsCar = new CarObject('Ford', 'Mustang', '2017', 'Black', false);

console.log(johnsCar.make);
petersCar.drive(80);
johnsCar.drive(70);