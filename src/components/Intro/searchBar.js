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
    this.setState({showSearchBar: true})
  };

  hideSearchBar = arr => {
    this.props.filteredPlayers(arr);
    this.refs.searchBar.value = '';
    this.setState({showSearchBar: false});
  };

  render() {
    const {showSearchBar} = this.state;
    const {isOpen, playerList, filteredPlayers, allPlayers} = this.props;
    return (
      <div id={showSearchBar ? 'filter-options-searchBar-extended' : 'filter-options-searchBar-shortened'}
        className='searchBar-wrapper'
        onFocus={()=>this.renderSearchBar()}>
          <div className='searchBar-container'>
            <div className='searchBar-input-container'>
              <input type='text' className='searchBar-input' ref='searchBar'
              onChange={(e)=>this.handleChange(e, playerList)}
              placeholder='Search..' />
              <i className='fas fa-search searchBar-icon'></i>
              {showSearchBar ?
                <i onClick={()=> this.hideSearchBar(allPlayers)}
                  className='fas fa-times searchBar-clear-icon'></i>
                : null}
            </div>
          </div>
      </div>
    );
  }
}
