function add2(arr) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
      arr2.push(arr[i] + 2);
    }
    return arr2;
  }
  
  function multiplyBy3(arr) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
      arr2.push(arr[i] * 3);
    }
    return arr2;
  }
  
  Array.prototype.myMap = function (fn) {
    var arr2 = [];
    for (var i = 0; i < this.length; i++) {
      arr2.push(fn(this[i]));
    }
    return arr2;
  };
  
  var arr = [1, 2, 3, 4, 5];
  var arr3 = multiplyBy3(arr);
  console.log(arr3);
  var arr4 = add2(arr);
  console.log(arr4);
  
  var arr5 = arr.myMap((item) => item * 3);
  console.log(arr5);
  
  function displayName(city, state) {
    return `${this.fname} ${this.lname} from ${city}, ${state}`;
  }
  
  var obj1 = {
    fname: "Ankit",
    lname: "Gupta",
  };
  
  const value1 = displayName.call(obj1, "Jhansi", "UP");
  console.log("value1 = ", value1);
  
  Function.prototype.myCallHalf = function (context, ...args) {
    context.myFunc = this; // There is catch here
    // What if myFunc property name already exists inside the conetxt object.
    // We need to handle that case.
    return context.myFunc(...args);
  };
  
  Function.prototype.myApply = function (context, args) {
    const currContext = context || globalThis;
    let randomProp = Math.random();
    while (currContext[randomProp] !== undefined) {
      randomProp = Math.random();
    }
    currContext[randomProp] = this;
    const result = currContext[randomProp](...args);
    delete currContext[randomProp];
    return result;
  };
  
  var obj2 = {
    fname: "Anil",
    lname: "Kapoor",
  };
  const valHalf = displayName.myCallHalf(obj2, "Mumbai", "MH");
  console.log("valHalf = ", valHalf);
  var obj3 = {
    fname: "Amitabh",
    lname: "Bachchan",
  };
  const val3 = displayName.myApply(obj3, ["Prayagraj", "UP"]);
  console.log("val3 = ", val3);
  
  Function.prototype.myBind = function (...args) {
    const myFunc = this;
    const remArgs = args.splice(1);
    return function (...args2) {
      return myFunc.apply(args[0], [...remArgs, ...args2]);
    };
  };
  
  const func = displayName.myBind(obj3, "Prayagraj");
  const val = func("UP");
  console.log("val = ", val);
  