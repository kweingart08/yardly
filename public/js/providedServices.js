class ProvidedServices extends React.Component {
  constructor(props){
    super(props)
    this.handleAddRequest = this.handleAddRequest.bind(this);

  }

  handleAddRequest(id){
    //when clicked want to take the user id and the service id and create a new job
    this.props.addJob(id, this.props.user.user_id, this.props.user.employee_id)
  }

  render(){
    console.log(this.props.availableServices);
    console.log(this.props.user);
    return (
      <div className="provided-services">

      <div className="header">
        <img src="../images/yardly-logo.png" className="small-logo"/>
        <h2>Welcome {this.props.user.username}</h2>
      </div>

        <h5 className="current">Available Services</h5>

        <div className="requests">

          {this.props.availableServices.map((service, index) => {
            return (
              <div className="request">
                <div className="service-type available-service">
                  <h4>{service.service_type}</h4>
                  <h4 className="service-price">${service.service_price}</h4>
                </div>

                <div className="worker-name">
                  <h5>Worker: <span>{service.username}</span> </h5>
                </div>


                <div className="delete">
                <i class="fas fa-plus add"
                onClick={ () => this.handleAddRequest(service.id)}
                ></i>
                </div>
              </div>
            )
          })}
        </div>

      <button className="see-list" onClick={ () => this.props.toggleState('providedServicesIsVisible', 'userIsVisible')} >Back</button>

      </div>
    )
  }
}
