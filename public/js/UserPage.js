class UserPage extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.user);
    return (
      <div className="user">

        <div className="header">
          <img src="../images/yardly-logo.png" className="small-logo"/>
          <h2>Welcome {this.props.user.username}</h2>
          <button onClick={() => this.props.logout()} className="logout">Log Out</button>
        </div>

        <h5 className="current">Current Requests</h5>

        <div className="requests">

          {this.props.user.open_requests.map( (request, index) => {
            return (
              <div className="request">
                <div className="service-type">
                  <h4>{request.service_type}</h4>
                </div>

                <div className="worker-name">
                  <h5>Worker: <span>{request.workers_name}</span> </h5>
                </div>

                <div className="delete">
                  <i class="far fa-trash-alt"
                  onClick={ () => this.props.deleteRequest(request, index)}
                  >
                  </i>
                </div>
              </div>
            )
          })}
        </div>

          <button
            onClick={ () => this.props.toggleState('providedServicesIsVisible', 'userIsVisible')}
          className="see-list">See List of Services</button>

      </div>
    )
  }
}
