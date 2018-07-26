import React from 'react';
import {connect} from 'react-redux';

class AnalysisPage extends React.Component{
  render(){
    return (
      <div>
        <h1>This is the final Page </h1>
      </div>
    )
  }
}

export const mapStateToProps =({analysisReducer})=> {
  return ({
    finalPage: analysisReducer.finalPage
  })
}

export default connect (mapStateToProps)(AnalysisPage)
