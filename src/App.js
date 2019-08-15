import React, {Component} from 'react';
import uuid from 'uuid';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      numbers: [],
      sorted: false,
      quantity: null,
      toasterText: null,
      displayToaster: 'none'
    };
    this.handleGenerate = this.handleGenerate.bind(this);
    this.sortNumbers = this.sortNumbers.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteNumbers = this.deleteNumbers.bind(this);
  }

  handleInput(e){
    e.preventDefault();
    this.setState({quantity: e.target.value})
  }

  deleteNumbers(e){
    e.preventDefault();
    localStorage.removeItem('numbers');
    this.setState({numbers: []});
    this.setState({toasterText: 'Numbers deleted successfully', displayToaster: 'block'});
    setTimeout(()=>this.setState({displayToaster: 'none'})
      , 1500);
  }

  handleGenerate(e){
    e.preventDefault();
    let quantity = this.state.quantity;
    if(localStorage.getItem('numbers')){
      this.setState({toasterText: 'Numbers fetched from Storage', displayToaster: 'block'});
      setTimeout(()=>this.setState({displayToaster: 'none'})
        , 3000);
      this.setState({numbers: JSON.parse(localStorage.getItem('numbers'))});
      return
    }
    if(!this.state.quantity){
      this.setState({toasterText: 'You have not entered any number, we defaulted to 200', displayToaster: 'block'});
      setTimeout(()=>this.setState({displayToaster: 'none'})
    , 3000);
      quantity = 200;
    }
    if(this.state.quantity>250){
      this.setState({toasterText: 'You have entered a number larger than 250, we defaulted to 200', displayToaster: 'block'});
      setTimeout(()=>this.setState({displayToaster: 'none'})
        , 3000);
      quantity = 200;
    }
      const numberArray = Array.from({length: quantity},
        () => '0' + Math.floor( 100000000 + Math.random() * 900000000));
      this.setState({numbers: numberArray});
      localStorage.setItem('numbers', JSON.stringify(numberArray));
  }
  sortNumbers(e){
    e.preventDefault();
    let sorted = this.state.sorted;
    let numbers = this.state.numbers;
    sorted ? this.setState({ sorted: false, numbers: numbers.reverse()}) : this.setState({ sorted: true, numbers: numbers.sort((a,b)=>a-b)})
  }

  render() {
    return (
      <div className="App">
        <div style={{display: this.state.displayToaster}} className="toaster">{this.state.toasterText}</div>
        <div className="controls">
          <form>
            <div className="form-div">
          <input onChange={this.handleInput} type="number" name="quantity" placeholder="Enter number of phone numbers" autoFocus/>
          <button onClick={this.handleGenerate} type="submit">Generate Numbers</button>
            </div>
          </form>
          <button onClick={this.sortNumbers}>Toggle Sort Numbers</button>
          <button style={{background: "#d50000"}} onClick={this.deleteNumbers}>Delete Stored Numbers</button>
        </div>
        <label>{this.state.numbers.length}</label>
          <div className="number-list-div">
          {
            this.state.numbers && this.state.numbers.map((number)=>{
              return <h4 key={uuid()} className="number">{number}</h4>
            })
          }
          </div>
      </div>
    );
  }
}

export default App;
