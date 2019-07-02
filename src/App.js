import React from 'react';
import './App.css';
import Dropdown from "./Dropdown"
import { parseString } from 'xml2js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      dataSource: {},
      resultCount: 0
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleResponse = response => {
    return response.text().then(xml => {
      if (response.ok) {
        parseString(xml, (err, result) => {
          if (err) {
            return Promise.reject(xml);
          }
          this.setState({ 
            dataSource: result,
            resultCount: result['GoodreadsResponse']['search'][0]['total-results']});
          return Promise.resolve(result);
        });
      } else {
        return Promise.reject(xml);
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault(); //so that page doesnt reloads
    console.log(this.state.bookName);
    const url = new URL("https://www.goodreads.com/search.xml");
    const key = "o3ZEitH9EZ1E7JYpQ6BHHQ";
    const params = { key, q: this.state.bookName };
    url.search = new URLSearchParams(params);
    fetch(url)
      .then(this.handleResponse)
      // .then(getTitleList)
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {

    return (
      <div>
        <p className="heading">Book Finder</p>
        <div className="flexbox flex-column">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="bookName"
              value={this.state.bookName}
              className="form-control book-name"
              placeholder="Book name"
              onChange={this.handleChange}
              autoComplete="off"
            />
            <button className="btn">Search</button>
          </form>
           {(Object.entries(this.state.dataSource).length !== 0 ) && <Dropdown dataSource = {this.state.dataSource}/>}
          <div className="flexbox">
            <ul className="list result-count" >
              {this.state.resultCount !== 0  && <li>Total Results: {this.state.resultCount}</li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
