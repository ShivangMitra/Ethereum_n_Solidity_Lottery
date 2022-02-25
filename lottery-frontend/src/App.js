import React, {useState, useEffect} from 'react';
import './App.css';
import Web3 from 'web3'
import lottery from './lottery';

function App() {

  const web3 = new Web3(window.web3.currentProvider)

  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState('');

  async function getManager(){
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    setManager(manager)
    setPlayers(players)
    setBalance(balance)
  }

  useEffect(() => {
    // console.log(web3.version)
    // web3.eth.getAccounts().then(console.log)
    // web3.eth.requestAccounts().then(console.log)

    getManager()

  }, []);

  async function onSubmit(e){
    e.preventDefault()

    setMessage('Waiting on transaction success...')
    
    const accounts = await web3.eth.getAccounts()

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    })

    setMessage('You have been entered into the lottery!')
  }

  async function pickWinner(){
    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting on transaction success...')

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    setMessage('A winner has been picked!')
  }
  

  return (
    <div className="App">
      <h1>Lottery Contract</h1>
      <h3>{`Manager Address is: ${manager}`}</h3>
      <h3>{`Total Players: ${players.length}`}</h3>
      <h3>{`Current Prize Pool: ${web3.utils.fromWei(balance, 'ether')} ether`}</h3>

      <hr/>

      <form onSubmit={onSubmit} >
        <h2>Want to try your luck?</h2>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={e => {setValue(e.target.value)}} />
        </div>
        <button type='submit' >Enter</button>
      </form>

      <hr/>

      <h2>Ready to pick a winner?</h2>
      <button onClick={pickWinner} >Pick a Winner!</button>

      <hr/>

      <h1>{message}</h1>
    </div>
  );
}

export default App;
