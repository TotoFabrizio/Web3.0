import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="">
        <div className="d-flex justify-content-center">
          <div className="card mt-5 p-2 col-6" style={{maxWidth: "500px"}}>
            <h2 className="align-self-center">Log in</h2>
            <div className="align-self-center">
              <button className="btn btn-secondary" onClick={this.onClick}>
                Log in with MetaMask
              </button>
            </div>
          </div>
        </div>
        {this.state.userAddress ? this.showAddress() : ""}
      </div>
    );
  }
  componentDidMount() {
    window.userAddress = null;
    if (window.ethereum) {
    } else {
      alert("No ETH brower extension detected.");
    }
    window.userAddress = window.localStorage.getItem("userAddress");
    this.getAddress();
  }
  onClick = async (event)=>{
    event.preventDefault();
    this.loginWithEth();
  }
  truncateAddress(address) {
    if (!address) {
      return "";
    }
    return `${address.substr(0, 5)}...${address.substr(
      address.length - 5,
      address.length
    )}`;
  }
  showAddress() {
      return(
        <div className="col-6" style={{maxWidth: "500px"}} >
          <div
            className="alert alert-success m-auto"
            role="alert"
            id="userAddress"
          >
            ETH Address: ${this.truncateAddress(this.state.userAddress)}
          </div>
        </div>
      )
  }
  async loginWithEth() {
    if (window.web3) {
      try {
        const selectedAccount = await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts) => accounts[0])
          .catch(() => {
            throw Error("No account selected!");
          });
        window.localStorage.setItem("userAddress", selectedAccount);
        this.setState({userAddress: selectedAccount})
        console.log(selectedAccount);
        const data = {
          walletaddress: selectedAccount
        }
        const response = await fetch("/api/users/create", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        });
        window.location.replace("/")
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("No ETH brower extension detected.");
    }
  }
  getAddress(){
    if(window.localStorage.getItem("userAddress")){
      this.setState({userAddress: window.localStorage.getItem("userAddress")})
    }
  } 
}

export default Login;
