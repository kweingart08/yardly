class Employee extends React.Component {
  render(){
    // console.log(this.props.employee);
    return (
      <div className="employee">
        <h5>Current Jobs To Do</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Requester Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.employee.open_jobs.map( (job, index) => {
              return (
                <tr>
                  <td>{job.service_type}</td>
                  <td>{job.requester_name}</td>
                  <td><i class="far fa-trash-alt" onClick={ () => this.props.deleteRequest(job, index)}></i></td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <h5>Services I Provide</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {this.props.employee.services.map((service, index) => {
            return (
              <tr>
                <td> {service.service_type} </td>
                <td> ${service.service_price} </td>
                <td><i class="far fa-edit" onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'editServiceIsVisible')}></i></td>
                <td><i class="far fa-trash-alt" onClick={ () => this.props.deleteService(service, index)}></i></td>
              </tr>
            )
          })}
          </tbody>
        </table>

        <button onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'addServiceIsVisibile')}>Add More Offered Services</button>

      </div>
    )
  }
}
