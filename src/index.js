import "./styles.css";
let acctData = [
  { user: "Alice", acctNum: "AAA - 1234" },
  { user: "Bob", acctNum: "AAA - 5231" },
  { user: "Alice", acctNum: "AAA - 9921" },
  { user: "Alice", acctNum: "AAA - 8191" }
];
let balance = {
  "AAA - 1234": 4593.22,
  "AAA - 9921": 0,
  "AAA - 5231": 232142.5,
  "AAA - 8191": 4344
};
function sorting(userName, propertyName, sortDir) {
  let filteredArr = [];
  let filteredUser = [];
  let dir = "";
  let propName = "";
  propName = propertyName ? propertyName : "acctNum";
  if (arguments.length === 1) {
    dir = userName && userName.toLowerCase() === "desc" ? "desc" : "asc";
    if (userName === "balance") {
      propName = "balance";
    }
  } else if (arguments.length === 2) {
    if (arguments[0] === "acctNum") {
      propName = "acctNum";
    } else if (arguments[0] === "balance") {
      propName = "balance";
    } else {
      propName = "";
    }
    if (arguments[1].toLowerCase() === "desc") {
      dir = "desc";
    } else if (arguments[1].toLowerCase() === "asc") {
      dir = "asc";
    } else {
      dir = "";
    }
  } else {
    dir = sortDir ? sortDir.toLowerCase() : "asc";
  }
  if (userName) {
    filteredUser = acctData.filter(
      (u) => u.user.toLowerCase() === userName.toLowerCase()
    );
  }
  filteredArr = userName
    ? (userName === "acctNum" ||
        userName === "balance" ||
        propertyName === "balance") &&
      filteredUser.length === 0
      ? [...acctData]
      : filteredUser.length > 0
      ? [...filteredUser]
      : []
    : [...acctData];
  if (arguments.length === 1) {
    if (userName.toLowerCase() === "desc" || userName.toLowerCase() === "asc") {
      filteredArr = [...acctData];
    }
  }
  if (propName === "acctNum") {
    let resultArr = [];
    filteredArr.sort(function (x, y) {
      const a = x[propName].toUpperCase();
      const b = y[propName].toUpperCase();
      const r = dir === "asc" ? (a > b ? 1 : -1) : b > a ? 1 : -1;
      return r;
    });
    filteredArr.forEach((item) => {
      resultArr.push(item.acctNum);
    });
    return resultArr;
  } else if (propName === "balance") {
    let res = [];
    let obj = [];
    Object.keys(balance).forEach(function (key) {
      for (let i = 0; i < filteredArr.length; i++) {
        if (filteredArr[i].acctNum === key) {
          obj[i] = { acctNum: key, balance: balance[key] };
        }
      }
    });
    obj.sort(function (a, b) {
      const result =
        dir === "asc" ? a.balance - b.balance : b.balance - a.balance;
      return result;
    });
    obj.forEach((item) => {
      res.push(item.acctNum);
    });
    return res;
  } else {
    return [];
  }
}
console.log(sorting("Bob"));
console.log(sorting("Charlie"));
console.log(sorting("acctNum"));
console.log(sorting("Alice", "balance", "asc"));
console.log(sorting("Alice", "balance", "desc"));
