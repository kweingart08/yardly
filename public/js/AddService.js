class AddService extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }

  }




  render(){
    console.log(this.props.user);
    console.log(this.props.employee);
    return (
      <div className="add-service">

      <form onSubmit={this.props.addNewService}>
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
              onChange={this.handlePriceChange}
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
