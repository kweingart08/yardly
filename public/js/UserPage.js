class UserPage extends React.Component {
  render(){
    console.log(this.props.user);
    return (
      <div className="user">
        <h2>Welcome {this.props.user.username}</h2>
        <button onClick={() => this.props.logout()}>Log Out</button>

        <h5>Current Requests</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.user.open_requests.map( (request, index) => {
              return (
                <tr>
                  <td>{request.service_type}</td>
                  <td>
                    <i class="far fa-trash-alt"
                    onClick={ () => this.props.deleteRequest(request, index)}
                    >
                    </i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {this.props.employee_id !== 0?
          <button
            onClick={ () => this.props.toggleState('providedServicesIsVisible', 'userIsVisible', 'employeeIsVisible')}
          >See List of Services</button>

          :

          <button
            onClick={ () => this.props.toggleState('providedServicesIsVisible', 'userIsVisible')}
          >See List of Services</button>
        }


      </div>
    )
  }
}
