import React from 'react';

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
    if(val!==''){
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
    return (
      <div id={showSearchBar ? 'filter-options-searchBar-extended' : 'filter-options-searchBar-shortened'}
        className='searchBar-wrapper'
        onClick={()=>this.renderSearchBar()}>
          <div className='searchBar-container'>
            <div className='searchBar-input-container'>
              <input type='text' className='searchBar-input' name='searchBar'
              onChange={(e)=>this.handleChange(e, playerList)}
              placeholder='Search...' />
              <i className='fas fa-search searchBar-icon'></i>
            </div>
          </div>
      </div>
    );
  }
}
