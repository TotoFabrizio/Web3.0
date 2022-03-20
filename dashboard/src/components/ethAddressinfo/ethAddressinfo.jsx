import React, { Component } from "react";

class ethAddressinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.state.data) {
      return <div>Cargando...</div>;
    }
    return (
      <div class="">
        <div class="d-flex justify-content-center mt-5">
          <div
            class="card alert alert-success"
            style={{maxWidth: "500px"}}
            id="userData"
          >
            <div class="card-body">
              <ul>
                <li class="" role="alert" id="userAddress">
                  Eth adress: {this.truncateAddress(this.state.data.walletaddress)}
                </li>
                <li class="" role="alert" id="userName">
                  Username: {this.state.data.username}
                </li>
                <li class="" role="alert" id="userEmail">
                  Email: {this.state.data.email}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    await this.getAddress();
    if (this.state.userAddress) {
      this.fetchData();
    }
  }
  async getAddress() {
    if (window.ethereum) {
      if (await window.ethereum._metamask.isUnlocked()) {
        try {
          const selectedAccount = await window.ethereum
            .request({
              method: "eth_requestAccounts",
            })
            .then((accounts) => accounts[0])
            .catch(() => {
              throw Error("No account selected!");
            });
          this.setState({ userAddress: selectedAccount });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(await window.ethereum._metamask.isUnlocked());
      }
    }
  }
  async fetchData() {
    const result = await fetch(`/api/users/${this.state.userAddress}`, {
      method: "GET",
    });
    const response = await result.json();
    console.log(response);
    this.setState({ data: response });
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
}

export default ethAddressinfo;
