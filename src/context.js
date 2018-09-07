import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACK':
          return {
              ...state,
              track_list: action.payload,
              heading: 'Search Resulte'
          };
          default:
           return state;
    }
}

export  class Provider extends Component {
    state = {
        track_list : [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    };

    componentDidMount(){
        axios
        .get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=9b87314dd14886e69d73c0c9b0147391`)
         .then(res => {
             this.setState({track_list: res.data.message.body.track_list})
            // console.log(res.data)
        })
        .catch(err => console.log(err));
    }
  render() {
    return (
     <Context.Provider value={this.state}>
        {this.props.children}
     </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;