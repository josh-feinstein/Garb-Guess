import React, { Component } from 'react';
import axios from 'axios';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      whereWorn: '',
      warmthLevel: '',
      classynessIndex: '',
      color: '',
    };
  }

  componentDidMount() {}

  async addItem(body) {
    await axios.post('clothing', body);
  }

  updateItemName = event => {
    this.setState({ itemName: event.target.value });
  };

  updateWhereWorn = event => {
    this.setState({ whereWorn: event.target.value });
  };

  updateWarmthLevel = event => {
    this.setState({ warmthLevel: event.target.value });
  };

  updateClassynessIndex = event => {
    this.setState({ classynessIndex: event.target.value });
  };

  updateColor = event => {
    this.setState({ color: event.target.value });
  };

  deleteItem = event => {
    console.log('delete');
  };

  handleSubmit = event => {
    event.preventDefault();
    const objectForDatabase = { ...this.state };

    if (
      objectForDatabase.itemName === '' ||
      objectForDatabase.whereWorn === '' ||
      objectForDatabase.warmthLevel === '' ||
      objectForDatabase.classynessIndex === '' ||
      objectForDatabase.color === ''
    ) {
      alert(`Make sure you don't leave any fields blank.`);
      return;
    }

    objectForDatabase.warmthLevel = Number.parseFloat(
      objectForDatabase.warmthLevel
    );
    objectForDatabase.classynessIndex = Number.parseFloat(
      objectForDatabase.classynessIndex
    );

    this.addItem(objectForDatabase);

    this.setState({
      itemName: '',
      whereWorn: '',
      warmthLevel: '',
      classynessIndex: '',
      color: '',
    });
    this.props.fetchNewData();
  };

  render() {
    return (
      <div>
        <h1>Add New Item to Your Wardrobe:</h1>
        <form>
          <table align="center">
            <tbody>
              <tr>
                <td>
                  <input
                    onChange={this.updateItemName}
                    name="item-name"
                    value={this.state.itemName}
                    type="text"
                    placeholder="Item Name"
                  />
                </td>
                <td>
                  <input
                    onChange={this.updateWhereWorn}
                    name="where-worn"
                    value={this.state.whereWorn}
                    type="text"
                    placeholder="Where Worn"
                  />
                </td>
                <td>
                  <input
                    onChange={this.updateWarmthLevel}
                    name="warmth-level"
                    value={this.state.warmthLevel}
                    type="text"
                    placeholder="Warmth Level"
                  />
                </td>
                <td>
                  <input
                    onChange={this.updateClassynessIndex}
                    name="classiness-index"
                    type="text"
                    value={this.state.classynessIndex}
                    placeholder="Classyness Index"
                  />
                </td>
                <td>
                  <input
                    onChange={this.updateColor}
                    name="color"
                    type="text"
                    value={this.state.color}
                    placeholder="Color"
                  />
                </td>
                <td>
                  <button onClick={this.handleSubmit} type="submit">
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default AddItem;
