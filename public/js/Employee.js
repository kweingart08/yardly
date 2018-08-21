class Employee extends React.Component {
  render(){
    return (
      <div className="employee">

        <h5>Current Jobs To Do</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Mow </td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
            <tr>
              <td> Water Flowers </td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
          </tbody>
        </table>

        <h5>Services I Provide</h5>
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Mow </td>
              <td> $25 </td>
              <td><i class="far fa-edit"></i></td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
            <tr>
              <td> Water Flowers </td>
              <td> $12 </td>
              <td><i class="far fa-edit"></i></td>
              <td><i class="far fa-trash-alt"></i></td>
            </tr>
          </tbody>
        </table>

        <button>Add More Offered Services</button>

      </div>
    )
  }
}
