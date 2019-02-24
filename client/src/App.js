import React, { Component } from 'react';
import './App.css';
import AddItem from './components/AddItem';
import axios from 'axios';
import { OPEN_WEATHER_MAP_API_KEY, API_URL_NEW_YORK } from './Secrets';
import convertToFahrenheit from './utils/convertToFahrenheit';

class App extends Component {
  constructor() {
    super();

    this.state = {
      clothing: [],
      currentWeather: null,
      loading: false,
    };

    this.fetchNewData = this.fetchNewData.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });

    //ping weather api and set data on local state
    try {
      const currentWeather = await axios.get(
        `${API_URL_NEW_YORK}${OPEN_WEATHER_MAP_API_KEY}`
      );

      const weatherArray = [
        { City: currentWeather.data.name },
        {
          Temperature:
            convertToFahrenheit(currentWeather.data.main.temp) + `\u2109`,
        },
        {
          Low:
            convertToFahrenheit(currentWeather.data.main.temp_min) + `\u2109`,
        },
        {
          High:
            convertToFahrenheit(currentWeather.data.main.temp_max) + `\u2109`,
        },
        { Humidity: currentWeather.data.main.humidity },
        { Pressure: currentWeather.data.main.pressure },
        { 'Wind Speed': currentWeather.data.wind.speed },
      ];

      this.setState({ currentWeather: weatherArray });
    } catch (error) {
      console.error(error);
    }

    //set all clothing items from database onto local state
    try {
      const { data } = await axios.get('/clothing');
      this.setState({ clothing: data });
    } catch (error) {
      console.error(error);
    }

    this.setState({ loading: false });
  }

  fetchNewData = async () => {
    //reset all clothing items from database onto local state
    try {
      const { data } = await axios.get('/clothing');
      this.setState({ clothing: data });
    } catch (error) {
      console.error(error);
    }
  };

  deleteItem = async event => {
    try {
      await axios.delete(`/clothing/${event.target.id}`);
      this.fetchNewData();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <div>
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
        )}
      </div>
    );
  }
}

export default App;
