class User extends React.Component {
  render(){
    console.log(this.state.user);
    return (
      <div className="user">
        <h2>Welcome NAME </h2>

        <h5>Current Requests</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Mow </td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
            <tr>
              <td> Water Flowers </td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
          </tbody>
        </table>

        <button>Add More Services</button>
      </div>
    )
  }
}
