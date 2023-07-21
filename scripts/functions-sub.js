// const ethers = require("hardhat")
const linkAbi = require("./linkAbi.json")

async function main() {
  // 1 LINK is sufficient for this example
  const linkAmount = "10"
  // // Set your consumer contract address. This contract will
  // // be added as an approved consumer of the subscription.
  const consumer = "0x919491A0625e296A3A0361494798cC01429c8A26" //https://mumbai.polygonscan.com/address/0x9bc48d89fa54bbc9ed634effafa25f8e6847eb0d

  // // Network-specific configs
  // // Polygon Mumbai LINK 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
  // // See https://docs.chain.link/resources/link-token-contracts
  // // to find the LINK token contract address for your network.
  const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
  // // Polygon Mumbai billing registry: 0xEe9Bf52E5Ea228404bB54BCFbbDa8c21131b9039
  // // See https://docs.chain.link/chainlink-functions/supported-networks
  // // for a list of supported networks and registry addresses.
  const functionsBillingRegistryProxy = "0xEe9Bf52E5Ea228404bB54BCFbbDa8c21131b9039"

  const RegistryFactory = await ethers.getContractFactory(
    "contracts/dev/functions/FunctionsBillingRegistry.sol:FunctionsBillingRegistry"
  )
  const registry = await RegistryFactory.attach(functionsBillingRegistryProxy)

  // const createSubscriptionTx = await registry.createSubscription();
  // const createSubscriptionReceipt = await createSubscriptionTx.wait(1);
  //below is undefined as the wait above doesn't seem to catch the event. So hard coding it:
  const subscriptionId = 1956
  // const subscriptionId = createSubscriptionReceipt.events[0].args["subscriptionId"].toNumber();
  // console.log(`Subscription created with ID: ${subscriptionId}`);

  //Get the amount to fund, and ensure the wallet has enough funds
  const juelsAmount = ethers.utils.parseUnits(linkAmount)
  const LinkTokenFactory = await ethers.getContractFactory("LinkToken")
  const linkToken = await LinkTokenFactory.attach(linkTokenAddress)

  // const linkToken = new ethers.Contract(linkTokenAddress, linkAbi);

  const accounts = await ethers.getSigners()
  const signer = accounts[0]

  // Check for a sufficent LINK balance to fund the subscription
  const balance = await linkToken.balanceOf(signer.address)
  // console.log(balance)
  if (juelsAmount.gt(balance)) {
    throw Error(`Insufficent LINK balance`)
  }

  console.log(`Funding with ` + juelsAmount + ` Juels (1 LINK = 10^18 Juels)`)
  const fundTx = await linkToken.transferAndCall(
    functionsBillingRegistryProxy,
    juelsAmount,
    ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
  )
  await fundTx.wait(1)
  console.log(`Subscription ${subscriptionId} funded with ${juelsAmount} Juels (1 LINK = 10^18 Juels)`)

  //Authorize deployed contract to use new subscription
  // console.log(
  //     `Adding consumer contract address ${consumer} to subscription ${subscriptionId}`
  // );
  // const addTx = await registry.addConsumer(subscriptionId, consumer);
  // await addTx.wait(1);
  // console.log(`Authorized consumer contract: ${consumer}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
