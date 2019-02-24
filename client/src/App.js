import React, { Component } from 'react';
import './App.css';
import AddItem from './components/AddItem';
import axios from 'axios';
import { OPEN_WEATHER_MAP_API_KEY, API_URL_NEW_YORK } from './Secrets';
class App extends Component {
  constructor() {
    super();

    this.state = {
      clothing: [],
      currentWeather: null,
    };
  }

  async componentDidMount() {
    fetch('/clothing')
      .then(res => res.json())
      .then(clothing => this.setState({ clothing }));

    try {
      const currentWeather = await axios.get(
        `${API_URL_NEW_YORK}${OPEN_WEATHER_MAP_API_KEY}`
      );

      console.log('weather2', currentWeather.data);

      const convertToFarenheit = temp => {
        return ((9 / 5) * (temp - 273) + 32).toFixed(1);
      };

      const weatherArray = [
        { City: currentWeather.data.name },
        {
          Temperature: convertToFarenheit(currentWeather.data.main.temp),
        },
        {
          Low: convertToFarenheit(currentWeather.data.main.temp_min),
        },
        { High: convertToFarenheit(currentWeather.data.main.temp_max) },
        { Humidity: currentWeather.data.main.humidity },
        { Pressure: currentWeather.data.main.pressure },
        { 'Wind Speed': currentWeather.data.wind.speed },
      ];

      this.setState({ currentWeather: weatherArray });
    } catch (error) {
      console.error(error);
    }
  }

  fetchNewData = () => {
    fetch('/clothing')
      .then(res => res.json())
      .then(clothing => this.setState({ clothing }));
  };

  deleteItem = async event => {
    await axios.delete(`/clothing/${event.target.id}`);
  };

  render() {
    return (
      <div className="App">
        <h1>Current Weather:</h1>

        <div id="current-weather">
          {this.state.currentWeather ? (
            <div>
              {this.state.currentWeather.map(property => (
                <div>{JSON.stringify(property).slice(1, -1)}</div>
              ))}
            </div>
          ) : null}
        </div>

        <h1>Clothing:</h1>
        <table align="center">
          <tr>
            <td>Item Name: </td>
            <td>Where Worn: </td>
            <td>Warmth Level: </td>
            <td>Classyness Index: </td>
            <td>Color: </td>
            <td>Image: </td>
            <td>Delete: </td>
          </tr>
          {this.state.clothing.map(item => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.whereWorn}</td>
              <td>{item.warmthLevel}</td>
              <td>{item.classynessIndex}</td>
              <td>{item.color}</td>
              <td>
                <img src={`${item.imageUrl}`} />
              </td>
              <td>
                <img
                  id={item.id}
                  src="/images/garbage.png"
                  onClick={this.deleteItem}
                />
              </td>
            </tr>
          ))}
        </table>

        <AddItem
          currentWeather={this.state.currentWeather}
          fetchNewData={this.fetchNewData}
        />
      </div>
    );
  }
}

export default App;
