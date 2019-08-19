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
    sorted ? this.setState({ sorted: false, numbers: numbers.sort((a,b)=>b-a)}) : this.setState({ sorted: true, numbers: numbers.sort((a,b)=>a-b)})
  }

  render() {
    const max = this.state.numbers.length ? "0" + Math.max(...this.state.numbers) : 0;
    const min = this.state.numbers.length ? "0" + Math.min(...this.state.numbers) : 0;
    return (
      <div className="App">
        <div style={{display: this.state.displayToaster}} className="toaster">{this.state.toasterText}</div>
        <div className="controls">
          <form>
            <div className="form-div">
          <input className="number-input" onChange={this.handleInput} type="number" name="quantity" placeholder="Enter number of phone numbers" autoFocus/>
          <button className="generate-btn" onClick={this.handleGenerate} type="submit">Generate Numbers</button>
            </div>
          </form>
          <button className="sort-btn" onClick={this.sortNumbers}>Toggle Sort Numbers</button>
          <button className="delete-btn" style={{background: "#d50000"}} onClick={this.deleteNumbers}>Delete Stored Numbers</button>
        </div>
        <label>Total: {this.state.numbers.length}</label>
        <label>Max: {max}</label>
        <label>Min: {min}</label>
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
