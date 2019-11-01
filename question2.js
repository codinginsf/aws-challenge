const groupNumByThree = (num) => {
    const thousands = [];
    while (num > 0) {
        thousands.push(num % 1000);
        num = Math.floor(num / 1000);
    }

    return thousands.reverse();
};

const convertByHundred = (n) => {
  let str = '';
  const key = {
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
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety"
  }
  if (n === 0) return key[0];
  while (n > 0) {
    if (n < 20) {
      str += key[n];
      return str;
    }
    if (n < 100) {
      const ten = Math.floor(n / 10) * 10;
      const one = n % 10;
      str += `${key[ten]}-${key[one]}`;
      return str;
    }
    const hundreds = Math.floor(n / 100);
    n %= 100;
    str += `${key[hundreds]} hundred`;
    if (n > 0) {
      str += ' and '
    }
  }
  return str;
};

const convertNumberToWords = (num) => {
  const key = ['', 'thousand', 'million']
  const cent = Math.round((num - Math.floor(num)) * 100);
  num = Math.floor(num);
  const chunkedArr = groupNumByThree(num)
  let str = "";
  let nonZero = chunkedArr.filter(el => el > 0).length;

  chunkedArr.forEach((el, i) => {
    if (el > 0) {
      const val = chunkedArr.length - i - 1
      str += `${convertByHundred(el)} ${key[val]}`
      nonZero--;
    }
    if (nonZero > 0) {
      str += ', '
    }
  })
  str = str.trim();
  const capitalizedNumInStr = str[0].toUpperCase() + str.slice(1);
  return cent ? capitalizedNumInStr + ` and ${cent} /100` : capitalizedNumInStr;
}