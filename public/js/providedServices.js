class ProvidedServices extends React.Component {
  render(){
    console.log(this.props.availableServices);
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
                <td><i class="fas fa-plus"></i></td>
              </tr>
            )
            })}
          </tbody>
        </table>


      </div>
    )
  }
}
