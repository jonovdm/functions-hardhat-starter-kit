// const moneriumURL = "https://api.monerium.dev/auth/token"

// console.log(`Sending HTTP request to ${moneriumURL}`)

// const moneriumRequest = Functions.makeHttpRequest({
//     url: `${moneriumURL}`,
//     method: "POST",
//     params: {
//         'grant_type': 'client_credentials',
//         'client_id': '4ef7adfa-20be-11ee-ad2d-92520e0bb667',
//         'client_secret': '5037b5cba40761bc500d3317f6eb6fb8c6bcae50b5aa56f3b3359932148b1ae0'
//     }
// })

// // Execute the API request (Promise)
// const moneriumResponse = await moneriumRequest

// if (moneriumResponse.error) {
//     console.error(moneriumResponse.error)
//     throw Error("Request failed, try checking the params provided")
// }

// console.log(moneriumResponse)

// // gets the Base Experience, Weight, Height of Pokemon
// const reqData = moneriumResponse.data

// // Gives the whole response from the request
// // console.log(reqData)

// // result is in JSON object, containing Base Experience, Weight, Height of Pokemon
// const myData = {
//     access_token: reqData.access_token,
//     expires_in: reqData.expires_in,
//     refresh_token: reqData.refresh_token,
//     token_type: reqData.token_type
// }

// const orderId = args[0]
// const orderRequest = Functions.makeHttpRequest({
//     url: `https://api.monerium.dev/orders/${orderId}`,
//     method: "GET",
//     headers: {
//         "Authorization": "Bearer " + myData.access_token
//     }
// })

// // Execute the API request (Promise)
// const orderResponse = await orderRequest

// if (orderResponse.error) {
//     console.error(orderResponse.error)
//     throw Error("Request failed, try checking the params provided")
// }

// console.log(orderResponse)

// // gets the Base Experience, Weight, Height of Pokemon
// const orderReqData = orderResponse.data
// // Use JSON.stringify() to convert from JSON object to JSON string
// // Finally, use the helper Functions.encodeString() to encode from string to bytes
// if (orderReqData.meta.state == "processed") {
//     return Functions.encodeUint256(1)
// }
// else {
//     return Functions.encodeString(0)
// }

// This function fetches Base Experience, Weight, Height of Pokemon results from Poke API
// Args include name of pokemon

const pokiURL = "https://pokeapi.co/api/v2/pokemon"

const pokemonCharacter = args[0]

console.log(`Sending HTTP request to ${pokiURL}/${pokemonCharacter}/`)

const pokiRequest = Functions.makeHttpRequest({
  url: `${pokiURL}/${pokemonCharacter}`,
  method: "GET",
})

// Execute the API request (Promise)
const pokiResponse = await pokiRequest

if (pokiResponse.error) {
  console.error(pokiResponse.error)
  throw Error("Request failed, try checking the params provided")
}

console.log(pokiResponse)

// gets the Base Experience, Weight, Height of Pokemon
const reqData = pokiResponse.data

// Gives the whole response from the request
console.log(reqData)

// result is in JSON object, containing Base Experience, Weight, Height of Pokemon
const myData = {
  base_experience: reqData.base_experience,
  weight: reqData.weight / 10, // The weight of this Pokemon in hectograms which is converted into kilograms by dividing by 10
  height: reqData.height / 10, // The height of this Pokemon in decimetres which is converted into metres by dividing by 10
}

// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
return Functions.encodeString(JSON.stringify(myData))

//
// const URL = "https://developer.worldcoin.org/api/v1/verify/app_staging_84dd85a2ac852d698c11c8eca5d33096"

// console.log(`Sending HTTP request to ${URL}`)

// const nullifier_hash = args[0]
// const merkle_root = args[1]
// const proof = args[2]
// const credential_type = args[3]
// // console.log(nullifier_hash, merkle_root, proof, credential_type)

// const reqData = {
//         "nullifier_hash": nullifier_hash,
//         "merkle_root": merkle_root,
//         "proof": proof,
//         "credential_type": credential_type,
//         "action": 'register',
//         "signal": ''
//     }

// const wcRequest = Functions.makeHttpRequest({
//     url: `${URL}`,
//     method: 'POST',
//     //   headers: {
//     //     'Content-Type': "application/json",
//     // },
//     body: JSON.stringify(reqData)
//     // data: {
//     //     "nullifier_hash": nullifier_hash,
//     //     "merkle_root": merkle_root,
//     //     "proof": proof,
//     //     "credential_type": credential_type,
//     //     "action": 'register',
//     //     "signal": ''
//     // }
// })

// // Execute the API request (Promise)
// const wcResponse = await wcRequest

// if (wcResponse.error) {
//     console.log(wcResponse)
//     // console.log(JSON.stringify(wcResponse))
//     console.error(wcResponse.error)
//     throw Error("Request failed, try checking the params provided")
// }

// console.log(wcResponse)

// return Functions.encodeString(JSON.stringify("123"))

// import type { NextApiRequest, NextApiResponse } from "next";

// export type Reply = {
// 	code: string
//   }

// export default function handler(req: NextApiRequest, res: NextApiResponse<Reply>) {
// 	const reqBody = {
// 		nullifier_hash: req.body.nullifier_hash,
// 		merkle_root: req.body.merkle_root,
// 		proof: req.body.proof,
// 		credential_type: req.body.credential_type,
// 		action: "register", //hardcoded this
// 		signal: "", //hardcoded
// 	};

// 	console.log('request:', req);
// 	console.log('reqBody:', reqBody);

// 	fetch(`https://developer.worldcoin.org/api/v1/verify/${process.env.NEXT_PUBLIC_WLD_APP_ID}`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(reqBody),
// 	}).then(async (verifyRes) => {
// 		const wldResponse = await verifyRes.json()
// 		console.log('wldResponse:', wldResponse)
// 		if (verifyRes.status == 200) {
// 			res.status(200).send({ code: wldResponse.code });

// 			// This is where you should perform backend actions based on the verified credential, such as setting a user as "verified" in a database

// 		} else {
// 			res.status(400).send({ code: wldResponse.code });
// 		}
// 	});
// };

//return uint256 nullifierHash or zero

// action: "register"
// credential_type: "orb"
// merkle_root: "0x1048b7f3d636655759614bcb67686cd977c82b1765ca2ee730a7f928ce227e67"
// nullifier_hash: "0x10298b4adbc6b9b8fc7c7ba13261f65fa7b7eb58127b31ff922c5de34d1bc8c6"
// proof:"0x27ceba2a55ea74c4dd01f6f85ac91b6d3748a54405e29791db8959f30aa7b7bf26bf62549515529429e8f8469d033bf18522eff794fc588da34222a47db7f6f52e8aed4dc94897693221f2b03395f31efadf047e9cc6d68f135c5123d17e042b0d3261982d3aa4021704791d46fc541804434413afe21f0ebe86d60f091e50041b292db70ca123c8323dc49971ac47ef5a13897502ee0a81d930bbfdf0d9911f16bedba20aff23fc51c1df4a5cb8c9f3b81c87e06bfa26b2c8ce5e516f641a112d0390dc0658689b266e7bbeb96ac203bc5cfea612fd83c53c40142e30a68d2b1c7f06941b0c89adeaeac8faa75267d1a90b546e390edaf5a22307f6ddc8abe8"
// signal: ""
