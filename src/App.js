import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Shows from './components/ItemsList/ItemsList';
import Pagination from './components/Pagination/Pagination'

import './App.css';

class App extends Component {
  state = {
    shows: [],
    totalShows: 0,
    sortTypes: {
      name: '',
      premiered: '',
      rating: '',
    },
    pagination: {
      currentPage: 1,
      showsPerPage: 500
    },
    tableHeader: {
      firstColumn: {
        title: 'name',
        displayTitle: 'Show Name'
      },
      secondColumn: {
        title: 'premiered',
        displayTitle: 'Premiered'
      },
      thirdColumn: {
        title: 'rating',
        displayTitle: 'Rating'
      }
    },
    loading: true,
    selectedItem: {
      showItem: false,
      selectedId: null,
      selectedName: '',
      selectedPremiered: '',
      selectedRating: ''
    }
  }

  componentDidMount() {
    axios.get('https://shows-database.firebaseio.com/showsData.json')
      .then(res => {
        const data = Object.values(res.data);
        this.setState({ 
          shows: data,
          totalShows: data.length,
          loading: false
         });
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
  }

  sortingData = (newState, columnType, type) => {
    const { firstColumn, secondColumn, thirdColumn } = this.state.tableHeader;
    if (type === firstColumn.title) {
      const isReserved = (columnType === 'asc') ? 1 : -1;
      newState.shows.sort((a, b) => {
        return isReserved * a[type].localeCompare(b[type])
      })
    } else if (type === secondColumn.title) {
      const isReserved = (columnType === 'asc') ? -1 : 1;
      newState.shows.sort((a, b) => {
        const aData = Date.parse(a[type]);
        const bData = Date.parse(b[type]);
        return isReserved * (aData - bData)
      })
    } else if (type === thirdColumn.title) {
      const isReserved = (columnType === 'asc') ? -1 : 1;
      newState.shows.sort((a, b) => {
        const aData = Number(a[type]);
        const bData = Number(b[type]);
        return isReserved * (aData - bData)
      })
    }

    this.setState( newState );
  }

  onSortType = (type) => {
    let cloneState = _.cloneDeep(this.state);
    let columnType  = cloneState.sortTypes[type];

    if (columnType === '') {
      columnType = 'asc'
    } else if (columnType === 'asc') {
      columnType = 'desc'
    } else if (columnType === 'desc') {
      columnType = 'asc'
    }

    for(let key of Object.keys(cloneState.sortTypes)) {
      cloneState.sortTypes[key] = '';
    }
    cloneState.sortTypes[type] = columnType;

    this.sortingData(cloneState, columnType, type)
  }

  changeCurrentPageHandler = (num) => {
    if (num === 'prev') {
      num = this.state.pagination.currentPage - 1;
    } else if (num === 'next') {
      num = this.state.pagination.currentPage + 1;
    }
    this.setState( {
      pagination: {
        ...this.state.pagination,
        currentPage: num
      }
    } )
  }

  changeShowsPerPageHandler = (num) => {
    if (num === 'all') {
      num = this.state.totalShows;
    }

    this.setState( {
      pagination: {
        ...this.state.pagination,
        currentPage: 1,
        showsPerPage: num
      }
    } )
  }

  selectedItemIdHandler = (id, name, premiered, rating) => {
    this.setState( {
      selectedItem: {
        ...this.state.selectedItem,
        showItem: true,
        selectedId: id,
        selectedName: name,
        selectedPremiered: premiered,
        selectedRating: rating
      }
    })
  }

  render() {
    let showsData = <h2>Loading...</h2>
    let showData = null;
    const { shows, totalShows, loading } = this.state;
    const { currentPage, showsPerPage } = this.state.pagination;
    const { firstColumn, secondColumn, thirdColumn } = this.state.tableHeader;
    const { showItem, selectedId, selectedName, selectedPremiered, selectedRating } = this.state.selectedItem;

    if (showItem) {
      showData = (
        <div
          className="card border-dark mb-3"
          style={{
            maxWidth: '600px',
            width: '100%',
            margin: 'auto'
          }}
        >
          <div className="card-header">Your selected show:</div>
          <div className="card-body text-dark">
            <h5 className="card-title">Name</h5>
            <p className="card-text">{selectedName}</p>
            <h5 className="card-title">Premeried</h5>
            <p className="card-text">{selectedPremiered}</p>
            <h5 className="card-title">Rating</h5>
            <p className="card-text">{selectedRating}</p>
          </div>
        </div>
      )
    }

    if (!loading) {
      showsData = (
        <>
          <p>Total shows: {totalShows}</p>
          <Pagination 
            data={shows}
            currentPage={currentPage} 
            itemsPerPage={showsPerPage} 
            changeCurrentPage={this.changeCurrentPageHandler}
            itemsPerPageHandler={this.changeShowsPerPageHandler}
          />
          {showData}
          <table className='table-fill'>
            <thead>
              <tr>
                <th 
                className="text-left" 
                onClick={() => this.onSortType(firstColumn.title)}>{firstColumn.displayTitle}</th>
              <th 
                className="text-left" 
                onClick={() => this.onSortType(secondColumn.title)}>{secondColumn.displayTitle}</th>
              <th 
                className="text-left" 
                onClick={() => this.onSortType(thirdColumn.title)}>{thirdColumn.displayTitle}</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              <Shows 
                currentPage={currentPage} 
                itemsPerPage={showsPerPage} 
                data={shows}
                columnNames={this.state.tableHeader}
                clickedOnShow={this.selectedItemIdHandler}
                selectedItemId={selectedId}
              />
            </tbody>
          </table>
            <Pagination 
              data={shows}
              currentPage={currentPage} 
              itemsPerPage={showsPerPage} 
              changeCurrentPage={this.changeCurrentPageHandler}
              itemsPerPageHandler={this.changeShowsPerPageHandler}
            />
        </>
      )
    }

    return (
      <div className="App">
        <h1 className='u-margin-top-50'>Shows Database</h1>
        {showsData}
      </div>
    );
  }
}

export default App;