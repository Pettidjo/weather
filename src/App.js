import React, { Component, Fragment } from 'react';

import './App.css';
import * as utils from './utils';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cityName: "",
      cityList: "",
      citySelected: "",
      weather: ""
    }
  }

  handleChange = (e) => {
    let resultListCity = utils.findCityList(e.target.value);
    let cityName = utils.capitalizeFirstLetter(e.target.value);
    
    this.setState({ cityName: cityName, cityList: resultListCity, citySelected: resultListCity.length === 1 ? resultListCity[0] : "" });
  }

  selectCity = (city) => {
    this.setState({ citySelected: city }, async () => {
      let res = await utils.fetchAPI(this.state.citySelected);
      this.setState({ weather: res });
    });
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <input placeholder='enter your city' onChange={this.handleChange} />
        <button onClick={async () => this.setState({ weather: await utils.fetchAPI(this.state.citySelected) })} >generate weather</button>
        { this.state.cityList !== "" && 
          this.state.cityList.length > 1 &&
        <Fragment>
          <p>Plusieurs résultats trouvé, veillez en sélectionner une : </p>        
          {this.state.cityList.map( (city, id) => <button key={id} onClick={() => this.selectCity(city)}>{city.name}, {city.country}</button>)}
        </Fragment>
        }
      </div>
    );
  }
}

export default App;
