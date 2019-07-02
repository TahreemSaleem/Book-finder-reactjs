import React from "react";
import "./App.css";
import arrow from './arrow.png';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
      totalItems: 0,
      pageIndex: 0,
      chunkedList: [],
      itemsPerPage: 5,
      totalPages: 0
    };
  }

  previousPage = () => {
    if (this.state.pageIndex !== 0) {
      this.setState(prevState => {
        return {
          pageIndex: prevState.pageIndex - 1
        };
      });
    }
  };

  nextPage = () => {
    if (this.state.pageIndex < this.state.totalPages - 1) {
      this.setState(prevState => {
        return {
          pageIndex: prevState.pageIndex + 1
        };
      });
    }
  };

  componentDidMount() {
    {
      const titlesResults = this.state.dataSource["GoodreadsResponse"]["search"][0]["results"][0]['work'];
      const titles = [...titlesResults]
        .map(item =>  item["best_book"][0]["title"][0])
        .reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / this.state.itemsPerPage);
          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
          }
          resultArray[chunkIndex].push(item);
          return resultArray;
        }, []);
      this.setState({
        chunkedList: titles,
        totalItems: titlesResults.length,
        totalPages: Math.ceil(titlesResults.length / this.state.itemsPerPage)
      });
      // console.log(titlesResults)
      // console.log(titlesResults.length);
      // console.log(this.state.totalItems);
      // console.log(this.state.totalPages);
    }
  }

  render() {
  
    return (
      <div className="dropdown">
        {this.state.pageIndex !== 0 && (
            <img
              className="arrow position-left"
              src={arrow}
              alt='arrow'
              onClick={this.previousPage}
            />
        )}
  
        <ul className="list">
          {this.state.chunkedList.length !==0 &&
            this.state.chunkedList[this.state.pageIndex].map((item,i) => (
            <li key={i}>
              <a>{item}</a>
            </li>
          ))}
        </ul>

        {(this.state.pageIndex !== this.state.totalPages) && (
            <img
              className="arrow reverse position-right"
              onClick={this.nextPage}
              src={arrow}
              alt='arrow'
            />
        )}
      </div>
    );
  }
}

export default Dropdown;
