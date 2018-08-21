class Register extends React.Component {
  render(){
    return (
      <div className="register">

      <form>
        <fieldset>
          <legend>Register</legend>

            <label for="username">Username</label>
            <input type="text" id="username" />

            <label for="password">Password</label>
            <input type="text" id="password" />

            <label for="address">Address</label>
            <input type="text" id="address" />

            <div className="submit">
              <input className="button" type="submit" value="Register" />
            </div>
        </fieldset>
      </form>

      </div>
    )
  }
}
