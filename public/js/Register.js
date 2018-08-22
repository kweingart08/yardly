class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      address: ''
    }
    this.handleRegisterUsername = this.handleRegisterUsername.bind(this);
    this.handleRegisterPassword = this.handleRegisterPassword.bind(this);
    this.handleRegisterAddress = this.handleRegisterAddress.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleRegisterUsername(){
    this.setState({
      username: event.target.value
    })
  }

  handleRegisterPassword(){
    this.setState({
      password: event.target.value
    })
  }

  handleRegisterAddress(){
    this.setState({
      address: event.target.value
    })
  }

  registerUser(){
    this.props.createUser(this.state.username, this.state.password, this.state.address)
  }

  render(){
    return (
      <div className="register">

      <form onSubmit={this.registerUser}>
        <fieldset>
          <legend>Register</legend>

            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={this.handleRegisterUsername}
            />

            <label for="password">Password</label>
            <input
              type="text"
              id="password"
              onChange={this.handleRegisterPassword}
            />

            <label for="address">Address</label>
            <input
              type="text"
              id="address"
              onChange={this.handleRegisterAddress}
            />

            <div className="submit">
              <input
                className="button"
                type="submit"
                value="Register"
              />

            </div>
        </fieldset>
      </form>

      </div>
    )
  }
}
