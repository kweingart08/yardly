class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      user: {}
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.getUser = this.getUser.bind(this);
  }


  handleUsername(){
    console.log(event.target.value);
    this.setState({
      username: event.target.value
    })
  }

  handlePassword(){
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    })
    console.log(this.state.password);
  }

  getUser(){
    event.preventDefault()
    console.log('USERNAME', this.state.username);

    fetch('users/' + this.state.username, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      this.setState({
        user: data
      });
    }).catch(error => console.log(error))
  }

  render(){
    return (
      <div className="login">
      // {this.state.username}
      // {this.state.password}
      // {this.state.user.address}
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
