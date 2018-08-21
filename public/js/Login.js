class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.getUser = this.getUser.bind(this);
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

  getUser(){
    this.props.setUser(this.state.username, this.state.password)
  }

  render(){
    return (
      <div className="login">
        <form onSubmit={this.getUser}>
          <fieldset>
            <legend>Log In</legend>
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

              <div className="submit">
                <input
                  className="button"
                  type="submit"
                  value="Log In"
                />
              </div>
          </fieldset>
        </form>

      </div>
    )
  }
}
