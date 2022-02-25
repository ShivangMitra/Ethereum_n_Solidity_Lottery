const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { abi, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'page unfair combine dog sketch mirror pull animal decorate lab analyst grass',
    'https://rinkeby.infura.io/v3/77e8ff36463d47128901ebd80576ae42'
)

const web3 = new Web3(provider)

const deploy = async () => {

    const accounts = await web3.eth.getAccounts()
  
    console.log('Attempting to deploy from account', accounts[0])
  
    const result = await new web3.eth.Contract(abi)
    .deploy({data: '0x' + bytecode})
    .send({from: accounts[0]})
  
    console.log(JSON.stringify(abi))
    console.log('contract deployed to : ', result.options.address)
  
}
deploy();
