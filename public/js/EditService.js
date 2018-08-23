class EditService extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      service_type: this.props.serviceToEdit.service_type,
      service_price: this.props.serviceToEdit.service_price
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.changeService = this.changeService.bind(this);
  }

  handleTypeChange(){
    this.setState({
      service_type: event.target.value
    })
  }

  handlePriceChange(){
    this.setState({
      service_price: event.target.value
    })
  }

  changeService(event){
    event.preventDefault();
    this.props.updateService(this.state.service_type, this.state.service_price)
  }

  render(){
    console.log(this.props.serviceToEdit);
    console.log(this.props.employee);
    return (
      <div className="login-register">

        <form onSubmit={this.changeService}>
          <fieldset>
            <legend>Edit Provided Service</legend>

              <label for="service_type">Service Name</label>
              <input
                type="text"
                id="service_type"
                value={this.state.service_type}
                onChange={this.handleTypeChange}
              />

              <label for="service_price">Price</label>
              <input
                type="number"
                id="service_price"
                value={this.state.service_price}
                onChange={this.handlePriceChange}
              />

              <div className="submit">
                <input
                  className="button"
                  type="submit"
                  value="Submit Edit" />
              </div>
          </fieldset>
        </form>

        <button onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'editServiceIsVisible')}>Back</button>

      </div>
    )
  }
}
