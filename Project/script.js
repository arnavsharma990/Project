// Check if Web3 is injected by the browser (e.g., by MetaMask)
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  
  let web3 = new Web3(window.ethereum);
  let userAccount;
  const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
  const abi = [ /* Add your contract ABI here */ ];
  
  let contract = new web3.eth.Contract(abi, contractAddress);
  
  // Connect Wallet
  document.getElementById('connectWallet').onclick = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      document.getElementById('walletAddress').innerText = `Connected: ${userAccount}`;
    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  };
  
  // Fund a Project
  document.getElementById('fundButton').onclick = async () => {
    const fundAmount = document.getElementById('fundAmount').value;
    if (!fundAmount) {
      alert('Please enter an amount.');
      return;
    }
  
    const amountInWei = web3.utils.toWei(fundAmount, 'ether');
    
    try {
      const transaction = await contract.methods.fundProject().send({
        from: userAccount,
        value: amountInWei
      });
      document.getElementById('status').innerText = 'Transaction successful!';
      console.log('Transaction:', transaction);
    } catch (error) {
      console.error(error);
      alert("Transaction failed.");
    }
  };
  
  // Voting on a Project
  document.getElementById('voteButton').onclick = async () => {
    try {
      const voteTransaction = await contract.methods.voteForProject().send({
        from: userAccount
      });
      document.getElementById('status').innerText = 'Vote submitted!';
      console.log('Vote Transaction:', voteTransaction);
    } catch (error) {
      console.error(error);
      alert("Voting failed.");
    }
  };
  