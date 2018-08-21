class EditService extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      service_type: '',
      service_price: null,
      employee_id: null
    }
  }



  render(){
    return (
      <div className="edit-service">

      <form onSubmit={this.props.updateService}>
        <fieldset>
          <legend>Edit Provided Service</legend>

            <label for="service_type">Service Name</label>
            <input
              type="text"
              id="service_type"
              value={this.state.service_type}
            />

            <label for="service_price">Price</label>
            <input
              type="number"
              id="service_price"
              value={this.state.service_price}
            />

            <label for="employee_id">Employee ID</label>
            <input type="text" id="employee_id" />

            <div className="submit">
              <input className="button" type="submit" value="Submit Edit" />
            </div>
        </fieldset>
      </form>

      <button onClick={()=> this.props.toggleState('employeeIsVisible', 'userIsVisible', 'editServiceIsVisible')}>Back</button>

      </div>
    )
  }
}
