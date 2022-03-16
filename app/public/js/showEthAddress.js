window.onload = async () => {
  if (window.ethereum) {
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
    } catch (error) {
      console.error(error);
    }
  }
  window.userAddress = localStorage.getItem("userAddress");
  showAddress();
};

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
    document.getElementById("userAddress").classList.add("invisible");
    document.getElementById("userAddress").innerText = "";
    return false;
  }
  document.getElementById("userAddress").classList.remove("invisible");
  document.getElementById(
    "userAddress"
  ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
}
