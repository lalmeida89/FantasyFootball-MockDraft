import React from 'react';
import AnalysisPage from './component';

class AnalysisPageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state={isOpen : false}
  }
  componentDidMount(){
    this.setState({isOpen : true})
  }
  render(){
    const {teams, draftPos, finalPage} = this.props
    return (
      <div className='analysisPage'>
        <div className='teams-container'>
          <AnalysisPage teams={teams} draftPos={draftPos} finalPage={this.state.isOpen}/>
        </div>
      </div>
    )
  }
}

export default AnalysisPageContainer
