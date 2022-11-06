const getInt64Bytes = (x, bigEndian = true) => {
	// big endian - take last two bytes
	let bytes = []
	let i = 8
	do {
		bytes[--i] = x & 255
		x = x >> 8
	} while (i)
	return bigEndian ? bytes : bytes.reverse()
}
const stringToArray = (input) => {
	let utf8Encode = new TextEncoder()
	return utf8Encode.encode(input)
}

const hexStringToArray = (hexString) => {
	if (hexString.length % 2 !== 0) {
		throw 'Must have an even number of hex digits to convert to bytes'
	}
	let numBytes = hexString.length / 2
	let byteArray = new Array(numBytes)
	for (let i = 0; i < numBytes; i++) {
		byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16)
	}
	return byteArray
}

const toHexString = (bytes) => {
	return bytes
		.map(function (byte) {
			return (byte & 0xff).toString(16).padStart(2, '0')
		})
		.join('')
}

const checksum = (
	seerToken = 'b6ff9488b6cf454a83d5abe3cc5b376d',
	score = 90 // or "90"
) => {
	// test output 844e720c0d7c2c909a615cc3cd9fabf3cd588

	const tokenBytes = hexStringToArray(seerToken)
	console.log(tokenBytes)
	let len = tokenBytes.length
	//The final array is the length of the token + 2 + 2
	let totalLen = len + 2 + 2
	let result = new Array(totalLen)
	let sum = 0
	let j = 0

	// Obfuscate bytes according to the following rules
	for (let i = 0; i < len + 2; i++) {
		if (i == 3 || i == 8) {
			//3rd and 8th are fractions
			result[i] = score //getInt64Bytes(score, false)
		} else {
			// tokenBytes swap head and tail and >= 200 minus 12, less than 200 + 23
			var value = tokenBytes[len - 1 - j]
			console.log('value', value)
			result[i] = value >= 200 ? value - 12 : value + 23
			j++
		}
		if (i % 2 == 0) {
			//for even i add to checksum
			sum += parseInt(result[i])
		}
	}

	//The last two bits are the sum of all even bytes, transfer the byte array, and take the first two bits
	sumBytes = getInt64Bytes(sum, false)
	console.log('sum', sumBytes)
	result[totalLen - 1] = sumBytes[0]
	result[totalLen - 2] = sumBytes[1]
	//Convert to hexadecimal string
	let hex = toHexString(result)
	console.log(result)
	return hex
}

// console.log(
// 	'hexStringToArray',
// 	hexStringToArray('844e725ac0d7c2c95a9a615cc3cd9fabf3cd0588')
// )
console.log(checksum())

/*
844e720c0d7c2c909a615cc3cd9fabf3cd588
84 4e 72 5a c0 d7 c2 c9 09 a6 15 cc 3c d9 fa bf 3c d0 58 8
00 01 02 03 04 05 06 07 08
03 and 08 fill with: 90 => 0x5a (score)


84 4e 72 5a c0 d7 c2 c9 5a 9a 61 5c c3 cd 9f ab f3 cd 05 88
84 4e 72 0c 
0d 7c 2c 90 
9a 61 5c c3 
cd 9f ab f3 
cd 58 8

*/
