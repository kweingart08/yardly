class ProvidedServices extends React.Component {
  render(){
    return (
      <div className="provided-services">

        <h5>Available Services</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Employee/Rating</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Mow </td>
              <td> $25 </td>
              <td> Kate 4.5 </td>
              <td><i class="fas fa-plus"></i></td>
            </tr>
            <tr>
              <td> Water Flowers </td>
              <td> $12 </td>
              <td> Andy 4.2 </td>
              <td><i class="fas fa-plus"></i></td>
            </tr>
          </tbody>
        </table>


      </div>
    )
  }
}
