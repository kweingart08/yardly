class EditService extends React.Component {
  render(){
    return (
      <div className="edit-service">

      <form>
        <fieldset>
          <legend>Edit Provided Service</legend>

            <label for="service_type">Service Name</label>
            <input type="text" id="service_type" />

            <label for="service_price">Price</label>
            <input type="number" id="service_price" />

            <label for="employee_id">Employee ID</label>
            <input type="text" id="employee_id" />

            <div className="submit">
              <input className="button" type="submit" value="Submit Edit" />
            </div>
        </fieldset>
      </form>

      </div>
    )
  }
}
