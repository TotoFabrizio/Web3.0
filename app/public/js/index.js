window.onload = async () => {
  if (window.ethereum) {
    if (await ethereum._metamask.isUnlocked()) {
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
        const result = await fetch(`/api/users/${selectedAccount}`, {
          method: "GET",
        });
        const response = await result.json();
        console.log(response);
        window.response = response;
      } catch (error) {
        console.error(error);
      }
    }else{
      console.log(await ethereum._metamask.isUnlocked() )
    }
  }
  window.userAddress = localStorage.getItem("userAddress");
  showData(window.response);
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
function showData(response) {
  if (!response) {
    document.getElementById("userData").classList.add("d-none");
    return false;
  }
  document.getElementById("userData").classList.remove("d-none");
  document.getElementById(
    "userAddress"
  ).innerText = `ETH Address: ${truncateAddress(response.walletaddress)}`;
  document.getElementById(
    "userName"
  ).innerText = `Username: ${response.username}`;
  document.getElementById("userEmail").innerText = `Email: ${response.email}`;
}
