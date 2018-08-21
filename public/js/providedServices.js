class ProvidedServices extends React.Component {
  constructor(props){
    super(props)
    this.handleAddRequest = this.handleAddRequest.bind(this);

  }

  handleAddRequest(id){
    console.log('handled', id, this.props.user.user_id);
    //when clicked want to take the user id and the service id and create a new job
    this.props.addJob(id, this.props.user.user_id, this.props.user.employee_id)
  }

  render(){
    console.log(this.props.availableServices);
    console.log(this.props.user);
    return (
      <div className="provided-services">

        <h5>Available Services</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Employee</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {this.props.availableServices.map((service, index) => {
              return (
              <tr>
                <td>{service.service_type}</td>
                <td>{service.service_price}</td>
                <td>{service.username}</td>
                <td><i class="fas fa-plus"
                onClick={ () => this.handleAddRequest(service.id)}
                ></i></td>
              </tr>
            )
            })}
          </tbody>
        </table>


      </div>
    )
  }
}
