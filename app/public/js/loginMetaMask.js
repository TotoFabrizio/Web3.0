window.onload = async () => {
  window.userAddress = null;
  // Init Web3 connected to ETH network
  if (window.ethereum) {
  } else {
    alert("No ETH brower extension detected.");
  }
  // Load in Localstore key
  window.userAddress = window.localStorage.getItem("userAddress");
  showAddress();
};

// Use this function to turn a 42 character ETH address
// into an address like 0x345...12345
function truncateAddress(address) {
  if (!address) {
    return "";
  }
  return `${address.substr(0, 5)}...${address.substr(
    address.length - 5,
    address.length
  )}`;
}

// Display or remove the users know address on the frontend
function showAddress() {
  if (!window.userAddress) {
    document.getElementById("userAddress").classList.add("d-none");
    document.getElementById("userAddress").innerText = "";
    return false;
  }
  document.getElementById("userAddress").classList.remove("d-none");
  document.getElementById(
    "userAddress"
  ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
}

// remove stored user address and reset frontend
function logout() {
  window.userAddress = null;
  window.localStorage.removeItem("userAddress");
  showAddress();
}

// Login with Web3 via Metamasks window.ethereum library
async function loginWithEth() {
  if (window.web3) {
    try {
      // We use this since ethereum.enable() is deprecated. This method is not
      // available in Web3JS - so we call it directly from metamasks' library
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("No account selected!");
        });
      window.userAddress = selectedAccount;
      window.localStorage.setItem("userAddress", selectedAccount);
      console.log(selectedAccount);
      const data = {
        walletaddress: selectedAccount
      }
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      window.location.replace(response.url)
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("No ETH brower extension detected.");
  }
}
