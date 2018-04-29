import React from 'react';
import {connect} from 'react-redux';

class PlayerProfile extends React.Component {
  render(){
    if(!this.props.profile){
      return null
    }
    if (this.props.profile !== undefined ){
      //let profile = this.props.profile;
      console.log(this.props.profile)
      return (
        <div>
          <h1>{this.props.profile.name} {this.props.profile.position}</h1>
          <h2>{this.props.profile.status}</h2>
          <p>{this.props.profile.jerseyNumber}</p>
        </div>
      )
    }
  }
}

export const mapStateToProps = (state, props) => {
  console.log(state, props);
  return ({
    profile: state.profile
  })
}
export default connect (mapStateToProps)(PlayerProfile)
