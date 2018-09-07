import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner';
import Moment  from 'react-moment';

 class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount(){
        axios
        .get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=9b87314dd14886e69d73c0c9b0147391`)
        .then(res => {
            this.setState({lyrics: res.data.message.body.lyrics})
//    console.log(res.data)
            return  axios
            .get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=9b87314dd14886e69d73c0c9b0147391`)
        
       })
       .then(res => (
        this.setState({track: res.data.message.body.track})
       ))
       .catch(err => console.log(err));
    }
  render() {
      const { track, lyrics } = this.state;
    //   console.log(track)
       if(
            track  === undefined ||
            lyrics === undefined ||
            track  === Object.keys(track).length === 0 ||
            lyrics === Object.keys(lyrics).length === 0
         ) {
                return <Spinner />
       } else {
            return (
                <React.Fragment>
                 <Link to='/' className='btn btn-dark btn-sm mb-4' >Go Back</Link>
                 <div className='card'>
                  <h5 className='card-header'>
                      {track.track_name} by <span className='text-secondary'>{track.artist_name}</span>
                  </h5>
                  <div className='card-body'>{lyrics.lyrics_body}</div>

                 </div>

                 <ul className='list-group mt-3'>
                     <li className='list-group-item'>
                         <strong>Album ID</strong>: {track.album_id}
                     </li>
                     {/* <li className='list-group-item'>
                         <strong>Song Genre</strong>:
                          {
                              track.primary_genres.music_genre_list[0].music_genre.music_genre_name
                           }
                     </li> */}
                    {/* <li className="list-group-item">
                        <strong>Song Genre</strong>:{' '}
                        {track.primary_genres.music_genre_list.length === 0  ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : 'N/A'}

                    </li> */}
                     <li className='list-group-item'>
                     <strong>Releas Data</strong>: <Moment format='MM/DD/YYYY'>{track.first_release_date}</Moment>
                     </li>
                     <li className='list-group-item'>
                       <strong>Explicit World</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                     </li>
                     {/* <li className='list-group-item'>
                        <img src={track.album_coverart_100x100} alt={track.artist_name} />
                     </li> */}
                 </ul>
                </React.Fragment>
            )
       }
  }
}

export default Lyrics;
