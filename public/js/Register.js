class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      address: ''
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleUsername(){
    this.setState({
      username: event.target.value
    })
  }

  handlePassword(){
    this.setState({
      password: event.target.value
    })
  }

  handleAddress(){
    this.setState({
      address: event.target.value
    })
  }

  createUser(){
    this.props.createUser(this.state.username, this.state.password, this.state.address)
  }

  render(){
    return (
      <div className="register">

      <form onSubmit={this.createUser}>
        <fieldset>
          <legend>Register</legend>

            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={this.handleUsername}
            />

            <label for="password">Password</label>
            <input
              type="text"
              id="password"
              onChange={this.handlePassword}
            />

            <label for="address">Address</label>
            <input
              type="text"
              id="address"
              onChange={this.handleAddress}
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
