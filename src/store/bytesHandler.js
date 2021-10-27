// const [priceBtoD, setPriceBtoD] = useState();
// const [priceDtoB, setPriceDtoB] = useState();

// const [dailyPriceBtoD, setDailyPriceBtoD] = useState();
// const [dailyPriceDtoB, setDailyPriceDtoB] = useState();

const BITSIZE_MAX_VALUE = 32;
const PRICE_BITSIZE = 32;
const HALF_BITSIZE = 16;
const MAX_PRICE = 9999.9999;
const NUM_BITS_IN_BYTE = 8;

const decimalToPaddedHexString = (
number,
bitsize
) => {
const byteCount = Math.ceil(bitsize / 8);
const maxBinValue = Math.pow(2, bitsize) - 1;
if (bitsize > 32) throw "number above maximum value";
if (number < 0) number = maxBinValue + number + 1;
return (
  "0x" +
  (number >>> 0)
    .toString(16)
    .toUpperCase()
    .padStart(byteCount * 2, "0")
);
};

export const unpackDailyPrice = (price) => {
// let price = "0x13880000";
// price is from 1 to 4294967295. i.e. from 0x00000001 to 0xffffffff
const numHex = decimalToPaddedHexString(Number(price), PRICE_BITSIZE).slice(
  2
);
let whole = parseInt(numHex.slice(0, 4), 16);
let decimal = parseInt(numHex.slice(4), 16);
if (whole > 9999) whole = 9999;
if (decimal > 9999) decimal = 9999;

let decimalStr = decimal.toString();
const decimalLen = decimalStr.length;
const maxLen = 4
for (let i = 0; i < (maxLen - decimalLen); i++) {
  decimalStr = '0' + decimalStr;
}

const number = parseFloat(`${whole}.${decimalStr}`);
// setDailyPriceBtoD(number);
return number
}

export const packPrice = (price) => {
if (price > MAX_PRICE) throw new Error(`supplied price exceeds ${MAX_PRICE}`);

const parts = price.toString().split('.');
const whole = Number(parts[0]);
if (whole < 0) throw new Error("can't pack negative price");
const wholeHex = toPaddedHex(Number(whole), HALF_BITSIZE);

// if (parts.length === 1) return setDailyPriceDtoB(wholeHex.concat("0000"));
if (parts.length === 1) return wholeHex.concat("0000");

if (parts.length !== 2) throw new Error('price packing issue');

let decimal = scaleDecimal(parts[1].slice(0, 4));

// setDailyPriceDtoB(wholeHex.concat(toPaddedHex(Number(decimal), HALF_BITSIZE).slice(2)));
return wholeHex.concat(toPaddedHex(Number(decimal), HALF_BITSIZE).slice(2))
};

const toPaddedHex = (number, bitsize) => {
// in node.js this function fails for bitsize above 32 bits
if (bitsize > BITSIZE_MAX_VALUE)
  throw new Error(
    `bitsize ${bitsize} above maximum value ${BITSIZE_MAX_VALUE}`
  );
// conversion to unsigned form based on
if (number < 0) throw new Error('unsigned number not supported');

// 8 bits = 1 byteCount; 16 bits = 2 byteCount, ...
const byteCount = Math.ceil(bitsize / NUM_BITS_IN_BYTE);
console.log('byteCount: ', byteCount);
// shifting 0 bits removes decimals
// toString(16) converts into hex
// .padStart(byteCount * 2, "0") adds byte
return (
  '0x' +
  (number >>> 0)
    .toString(16)
    .toUpperCase()
    // 1 nibble = 4 bits. 1 byte = 2 nibbles
    .padStart(bytesToNibbles(byteCount), '0')
);
};

const scaleDecimal = (num) => {
const numLen = num.length;
const maxLen = 4;
for (let i = 0; i < (maxLen - numLen); i++) {
  num = num + '0';
}
return Number(num);
}



const bytesToNibbles = (byteCount) => {
if (typeof byteCount != 'number') throw new Error('only numbers supported');
if (byteCount < 1) throw new Error('invalid byteCount');
return byteCount * 2;
};



