function MyNumber(arg) {
  if (MyNumber.arguments.length == 0 || arg === null) {
    arg = 0;
  }
  if (!new.target) {
    if (typeof arg === "object") {
     if (typeof arg.valueOf() == "object") {
      return +arg.toString();
     } else {
      return arg.valueOf();
     }
    } else {
      if (typeof arg == "bigint") {
        return +(arg + "");
      }
      return +arg;
    }
  }

  this.value = +arg;
}

MyNumber.myParseInt = function (str, radix = 10) {
  if (radix > 36 || radix < 0) {
    return NaN;
  }
  if (typeof str == "number" || typeof str == "bigint") {
    str += "";
  } else if (Array.isArray(str)) {
    str = str[0] + "";
  } else if (typeof str == "object" || typeof str == "boolean" || typeof str == "function") {
    return NaN;
  } else if (typeof str == "symbol") {
    throw new Error("Cannot convert a Symbol value to a string");
  }

  if (typeof radix == "bigint") {
    throw new Error("Cannot convert a BigInt value to a number");
  } else if (typeof radix == "symbol") {
    throw new Error("Cannot convert a Symbol value to a number");
  } else if (Array.isArray(radix)) {
    if (radix.length == 0 || radix.length > 1) {
      radix = 10
    } else if (MyNumber.isNaN(MyNumber(radix[0])) || MyNumber(radix[0]) < 2) {
      radix = 10;
    } else {
      radix = MyNumber(radix[0]);
    }
  } else if (typeof radix == "object" || radix == false || typeof radix == "function") {
    radix = 10;
  }
  str = str.trim();
  str = str.toLowerCase();
  let sign = 1;
  let i = 0;
  let j = str.length - 1;
  if (str[0] == "-") {
    sign = -1;
    i = 1;
    j = str.length - 2;
  } else if (str[0] == "+") {
    i = 1;
    j = str.length - 2
  }
  const allNumbers = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35
  };
  if (str == "" || str.split("").every((val) => allNumbers[val] === undefined)) {
    return NaN;
  }
  let res = 0;
  let flag = 0;
  let tmp = "";
  if (sign == -1) {
    tmp += "-";
  }
  for (; i < str.length; ++i, --j) {
    if (str[i] == "0") { 
      flag = 1;
      tmp += str[i];     
      continue;
    }
    if (allNumbers[str[i]] >= radix || !allNumbers[str[i]]) {
      if (!flag) {
        return NaN;
      } else {
        return myParseInt(tmp, radix);
      }
    }
    
    res += allNumbers[str[i]] * radix ** j;
    flag = 1;
    tmp += str[i];
  }

  return res * sign;
}

MyNumber.myParseFloat = function (str) {
  if (!str || typeof str == "boolean" || typeof str == "function") {
    return NaN;
  }

  if (typeof str == "number") {
    return str;
  } else if (typeof str == "bigint") {
    return MyNumber(str + "");
  } else if (typeof str == "symbol") {
    throw new Error("Symbole is not defined");
  } else if (Array.isArray(str)) {
    if (str.length == 0) {
      return NaN;
    }
    str = str[0] + "";
  } else if (typeof str == "object") {
    return NaN;
  }
  
  if (str == "" || str.split("").every((val) => val === " ")) {
    return NaN;
  }
  str = str.trim();
  let arr = str.split(".");
  
  let res = "";
  res += arr[0][0];
  for (let i = 1; i < arr[0].length; ++i) {
    if (arr[0][i] >= "0" && arr[0][i] <= "9" || arr[0][i] == "e") {
      res += arr[0][i];
    } else {
      return MyNumber(res);
    }
  }

  if (arr.length > 1) {
    res += ".";
    for (let i = 0; i < arr[1].length; ++i) {
      if (arr[1][i] >= "0" && arr[1][i] <= "9" || arr[1][i] == "e" && !res.includes("e")) {
        res += arr[1][i]
      } else {
        if (res[res.length - 1] == "e") {
          res = res.slice(0, res.indexOf("e"));
        }
        return MyNumber(res);
      }
    }
  }

  return MyNumber(res);
    
}






