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
          <button onClick={() => this.props.logout()}>Log Out</button>
        </div>

        <h5>Current Requests</h5>

        <div className="requests">

          {this.props.user.open_requests.map( (request, index) => {
            return (
              <div className="request">
                <div className="service-type">
                  {request.service_type}
                </div>

                <div className="worker-name">
                  {request.workers_name}
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
          >See List of Services</button>

      </div>
    )
  }
}
