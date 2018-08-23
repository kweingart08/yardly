class Employee extends React.Component {
  render(){
    // console.log(this.props.employee);
    return (
      <div className="employee">

        <h5 className="current">Current Jobs To Do</h5>


        <div className="requests">

          {this.props.employee.open_jobs.map( (job, index) => {
            return (
              <div className="request">

                <div className="service-type">
                  <h4>{job.service_type}</h4>
                </div>

                <div className="worker-name">
                  <h5>Requester: <span>{job.requester_name}</span> </h5>
                </div>

                <div className="delete">
                  <i class="far fa-trash-alt" onClick={ () => this.props.deleteRequest(job, index)}></i>
                </div>

              </div>
            )
          })}
        </div>

        <h5 className="current">Services I Provide</h5>

        <div className="requests">

          {this.props.employee.services.map((service, index) => {
            return (

              <div className="request">

                <div className="service-type available-service">
                  <h4>{service.service_type}</h4>
                  <h4 className="service-price">${service.service_price}</h4>
                </div>

                <div className="delete">
                  <i class="far fa-edit" onClick={()=> { this.props.editService(service),  this.props.toggleState('employeeIsVisible', 'userIsVisible', 'editServiceIsVisible') }}></i>
                  <i class="far fa-trash-alt" onClick={ () => this.props.deleteService(service, index)}></i>
                </div>

              </div>
            )
          })}
        </div>

        <button className="see-list" id="add-service-employee" onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'addServiceIsVisibile')}>Add More Offered Services</button>

      </div>
    )
  }
}
