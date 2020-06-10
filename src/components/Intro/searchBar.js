import React from 'react'

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showSearchBar: false
    }
  }

  filterList = (val, arr) =>{
    let currentList = [];
    let newList = [];
    if(val!==""){
      currentList = arr
      newList = currentList.filter(player => {
        const lc = player.displayName.toLowerCase();
        const filter = val.toLowerCase();
        return lc.includes(filter)
      });
    } else {
      newList = arr;
    }
    return newList
  };

  handleChange = (e, playerList) => {
    let playersToDisplay = this.filterList(e.target.value, playerList);
    this.props.filteredPlayers(playersToDisplay);
  };

  renderSearchBar = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar
    }));
  };

  render() {
    const {showSearchBar} = this.state;
    const {isOpen, playerList, filteredPlayers} = this.props;

    //console.log(this.props, this.state);
    return (
      <div className='searchBar-wrapper'>
        <h4><i className="fas fa-search" onClick={()=>this.renderSearchBar()}></i></h4>
        {showSearchBar ?
          <div>
            <div className='searchBar-container'
              id={!isOpen ?
                'searchBar-container-extended':
                'searchBar-container-shortened'}>
              <input type="text" className='input' name="searchBar"
              onChange={(e)=>this.handleChange(e, playerList)}
              placeholder='Search...' />
            </div>
            <div onClick={()=>this.renderSearchBar()} className='searchBar-outerDiv'></div>
          </div>
          : null }
      </div>
    );
  }
}
