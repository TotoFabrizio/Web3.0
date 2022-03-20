import React, { Component, createRef } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputAddress = createRef();
    this.inputEmail = createRef();
    this.inputUsername = createRef();
  }
  render() {
    return (
      <div class="">
        <form
          className="d-flex justify-content-center mt-5"
          id="uploadForm"
          onSubmit={this.onSubmit}
        >
          <div className="card" style={{ maxWidth: "500px" }}>
            <h2 className="align-self-center">Register</h2>
            <div
              className="alert alert-info"
              role="alert"
              id="userAddress"
            > {this.state.userAddress ? 'ethAddress: '+ this.truncateAddress(this.state.userAddress) : ""}</div>
            <input
              type="text"
              className="d-none"
              aria-describedby="addon-wrapping"
              name="walletAddress"
              id="walletAddress"
              defaultValue={this.state.userAddress}
              ref={this.inputAddress}
            />
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Email
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="addon-wrapping"
                name="email"
                ref={this.inputEmail}
              />
            </div>
            <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping">
                Username
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="username"
                aria-describedby="addon-wrapping"
                name="username"
                ref={this.inputUsername}
              />
            </div>
            <div className="align-self-center mt-3">
              <button type="submit" className="btn btn-secondary">
                Register
              </button>
            </div>
            {this.state.errors ? this.error() : ""}
          </div>
        </form>
      </div>
    );
  }
  async componentDidMount() {
    await this.getAddress();
  }
  onSubmit = async (event) => {
    event.preventDefault();
    console.log(this.inputAddress.current.value)
    console.log(this.inputEmail.current.value)
    const data = {
        walletaddress: this.inputAddress.current.value,
        username: this.inputUsername.current.value,
        email: this.inputEmail.current.value
    }
    console.log(data)
    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (result.errors) {
      this.setState({ errors: result.errors });
      return;
    }
    window.location.replace("/")
  };
  error() {
    return (
      <div className="alert alert-danger" role="alert">
        <p>Errors:</p>
        <ul>
          {this.state.errors.map((error) => {
            return <li>{error.msg}</li>;
          })}
        </ul>
      </div>
    );
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

export default Login;
