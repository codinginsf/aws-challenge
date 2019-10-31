const groupNumByThree = (num) => {
    const thousands = [];
    while (num > 0) {
        thousands.push(num % 1000);
        num = Math.floor(num / 1000);
    }

    return thousands;
};

const convertByHundred = (num, place = 1) => {
  const teens = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
  };
  const adults = {
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };
  const elders = {
    100: "hundred",
    1000: "thousand",
    1000000: "million"
  };

  const singleDigits = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  }

  if (num < 20) {
    return teens[num];
  }

  const arr = [];
  while (num > 0) {
    const current = num % 10;
    num = Math.floor(num / 10);

    switch (place) {
      case 1:
        arr.push(teens[current]);
        break;
      case 2:
        const realNumber = (current * 10) + singleDigits[arr[0]];
        if (realNumber < 20) {
          arr.push(adults[realNumber]);
          arr[0] = "";
        } else {
          arr.push(adults[current * 10]);
        }
        break;
      case 3:
        arr.push(`${teens[current]} hundred and `);
        break;
      case 4:
        break;

      default:
        break;
    }

    place += 1;
  }

  let ans = "";
  for (let i = arr.length - 1; i >= 0; i--) {
    const currentNumberInWord = arr[i];
    if (currentNumberInWord == "zero") {
      continue;
    }

    if (i === 0 && currentNumberInWord) {
      ans += `-${currentNumberInWord}`;
    } else {
      ans += currentNumberInWord;
    }
  }

  return ans;
};

const convertNumberToWords = (num) => {
    const delta = num - Math.floor(num);
    num = Math.floor(num);
    const chunkedArr = groupNumByThree(num)
    let decimalPlaces = chunkedArr.length;
    let numberInStr = "";
    while (chunkedArr.length) {
        const current = chunkedArr.pop();
        if (current > 0) {
            numberInStr += convertByHundred(current);

            switch (decimalPlaces) {
                case 2:
                    if (chunkedArr.every(val => val > 0)) {
                        numberInStr += " thousand, ";
                    } else {
                        numberInStr += " thousand";
                    }
                    decimalPlaces--;
                    break;
                case 3:
                    if (chunkedArr.every(val => val > 0)) {
                        numberInStr += " million, ";
                    } else {
                        numberInStr += " million";
                    }
                    decimalPlaces--;
                    break;
                default:
                    break;
            }
        };
    }

    const capitalizedNumInStr = numberInStr[0].toUpperCase() + numberInStr.slice(1);
    return delta ? capitalizedNumInStr + ` and ${ Math.round(delta * 100) } /100` : capitalizedNumInStr;
}