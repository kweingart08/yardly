class Login extends React.Component {
  render(){
    return (
      <div className="login">

      <form>
        <fieldset>
          <legend>Log In</legend>
            <label for="username">Username</label>
            <input type="text" id="username" />

            <label for="password">Password</label>
            <input type="text" id="password" />

            <div className="submit">
              <input className="button" type="submit" value="Login" />
            </div>
        </fieldset>
      </form>

      </div>
    )
  }
}
