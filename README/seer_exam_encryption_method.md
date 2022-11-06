# Seer score Encryption method:

```js
Encryption:
  //SeerToken is a hexadecimal string, converted into a byte array
 var tokenBytes = SeerToken.HexToBytes();
var len = tokenBytes.Length;
 //The final array is the length of the token + 2 + 2
 var totalLen = len + 2 + 2;
var result = new byte[totalLen];//20
 int sum = 0;
 int index = 0;
  // Obfuscate bytes according to the following rules
  for (int i = 0; i< totalLen - 2; i++)
 {
     if (i == 3 || i == 8)//3rd and 8th are fractions
     {
     result[i] = (byte) score;
     }
     else
     {
         // tokenBytes swap head and tail and >= 200 minus 12, less than 200 + 23
          var value = tokenBytes[len - 1 - index];
         result[i] = value >= 200 ? (byte) (value - 12) : (byte) (value + 23);
         index++;
     }
     if (i % 2 == 0){//for even i add to checksum
         sum += result[i];
     }
 }
 //The last two bits are the sum of all even bytes, transfer the byte array, and take the first two bits
 var sumBytes = BitConverter.GetBytes(sum);
result[totalLen - 1] = sumBytes[0];
result[totalLen - 2] = sumBytes[1];
 //Convert to hexadecimal string
var hex = result.ToHex(false);
```

where `seerToken` = `b6ff9488b6cf454a83d5abe3cc5b376d` with score = 90 should give:
// [ 182, 255, 148, 136, 182, 207, 69, 74, 131, 213, 171, 227, 204, 91, 55, 109 ]

```json
{
	"code": 0,
	"message": "Success",
	"data": "844e725ac0d7c2c95a9a615cc3cd9fabf3cd0588"
}
```

# How to convert a String to Bytearray

```js
var utf8Encode = new TextEncoder()
utf8Encode.encode('90')
```

- Uint8Array(2)[57, 48]

## How to convert hex string into a bytes array js

```js
function hexStringToByteArray(hexString) {
	if (hexString.length % 2 !== 0) {
		throw 'Must have an even number of hex digits to convert to bytes'
	}
	var numBytes = hexString.length / 2
	var byteArray = new Uint8Array(numBytes)
	for (var i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16)
	}
	return byteArray
}
hexStringToByteArray('ff') // avoid 0x
Uint8Array(1)[255]

function hexStringToArray(hexString) {
	if (hexString.length % 2 !== 0) {
		throw 'Must have an even number of hex digits to convert to bytes'
	}
	var numBytes = hexString.length / 2
	var byteArray = new Array(numBytes)
	for (var i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16)
	}
	return byteArray
}
```

b6ff9488b6cf454a83d5abe3cc5b376d -> Uint8Array(16) [
182, 255, 148, 136, 182,
207, 69, 74, 131, 213,
171, 227, 204, 91, 55,
109
]

## Convert checksum int to bytes

```js
function getInt64Bytes( x, bigEndian = true ){ // big endian - take last two bytes
    var bytes = [];
    var i = 8;
    do {
    bytes[--i] = x & (255);
    x = x>>8;
    } while ( i )
    return bytes;
}

> getInt64Bytes(2550000000002529)
[
   0,  0,   0,   0,
  36, 45, 105, 225
]
> getInt64Bytes(2550000000002530)
[
   0,  0,   0,   0,
  36, 45, 105, 226
]

```

## Convert bytes to hex string

```js
function toHexString(bytes) {
	return bytes
		.map(function (byte) {
			return (byte & 0xff).toString(16)
		})
		.join('')
}
toHexString([0, 0, 0, 0, 36, 45, 105, 225])
```

// '0000242d69e1'
// SeerToken 32 lengh or 16 bytes 'b6ff9488b6cf454a83d5abe3cc5b376d'
// result should be 16+2 = 18 bytes
844e725ac0d7c2c95a9a615cc3cd9fabf3cd0588 - 40 or 20 bytes

padStart(2,'0') each byte
