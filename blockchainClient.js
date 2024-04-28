const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, 'networkConnection.json');

async function connectToNetwork() {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');

    if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('mychaincode');

    return contract;
}

async function submitTransaction(functionName, ...args) {
    try {
        const contract = await connectToNetwork();
        const response = await contract.submitTransaction(functionName, ...args);
        console.log(`Transaction has been submitted, response is: ${response.toString()}`);
        return response;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return error;
    }
}
