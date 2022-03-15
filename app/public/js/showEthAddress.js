window.onload = ()=>{
    window.userAddress = localStorage.getItem("userAddress");
    showAddress();
}


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