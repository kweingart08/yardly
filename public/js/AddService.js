class AddService extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      service_type: '',
      service_price: null,
      employee_id: null
    }
    this.handleServiceChange = this.handleServiceChange.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.addService = this.addService.bind(this);
  }

  handleServiceChange(){
    this.setState({
      service_type: event.target.value
    })
  }

  handlePrice(){
    this.setState({
      service_price: event.target.value
    })
  }

  addService(event){
    // console.log(this.state.service_type);
    // console.log(this.state.service_price);
    event.preventDefault();
    this.props.addNewService(this.state.service_type, this.state.service_price, this.props.employee.employee_id, this.props.user.username)
  }

  render(){
    // console.log(this.props.user);
    // console.log(this.props.employee);
    return (
      <div className="login-register">

      <form onSubmit={this.addService}>
        <fieldset>
          <legend>Add a New Provided Service</legend>

            <label for="service_type">Service Name</label>
            <input
              type="text"
              id="service_type"
              onChange={this.handleServiceChange}
            />

            <label for="service_price">Price</label>
            <input
              type="number"
              id="service_price"
              onChange={this.handlePrice}
            />

            <div className="submit">
              <input
                className="button"
                type="submit"
                value="Add Service to My Requests" />
            </div>
        </fieldset>
      </form>

      <button onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'addServiceIsVisibile')}>Back</button>

      </div>
    )
  }
}
