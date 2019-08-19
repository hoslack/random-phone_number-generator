import React, {Component} from 'react';
import uuid from 'uuid';
import ArrowDownwardSharpIcon from '@material-ui/icons/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@material-ui/icons/ArrowUpwardSharp';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      numbers: [],
      sorted: false,
      quantity: null,
      toasterText: null,
      displayToaster: 'none',
      sortText: 'Sort'
    };
    this.handleGenerate = this.handleGenerate.bind(this);
    this.sortNumbers = this.sortNumbers.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteNumbers = this.deleteNumbers.bind(this);
  }
  componentDidMount() {
    this.setState({numbers: JSON.parse(localStorage.getItem('numbers'))});
  }

  handleInput(e){
    e.preventDefault();
    this.setState({quantity: e.target.value})
  }

  deleteNumbers(e){
    e.preventDefault();
    localStorage.removeItem('numbers');
    this.setState({numbers: []});
    this.setState({toasterText: 'Numbers deleted successfully', displayToaster: 'block', sortText: 'Sort', sorted: false,});
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
    if (sorted===false || sorted==='desc'){
      this.setState({ sorted: 'asc', sortText:'Descending', numbers: numbers.sort((a,b)=>a-b)})
    }else {
      this.setState({ sorted: 'desc', sortText:'Ascending', numbers: numbers.sort((a,b)=>b-a)})
    }
  }

  render() {
    const length = this.state.numbers ? this.state.numbers.length : 0;
    const max = this.state.numbers && this.state.numbers.length ? "0" + Math.max(...this.state.numbers) : 0;
    const min = this.state.numbers && this.state.numbers.length ? "0" + Math.min(...this.state.numbers) : 0;
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
          <button className="delete-btn" style={{background: "#d50000"}} onClick={this.deleteNumbers}>Delete Stored Numbers</button>
        </div>
        <label>Total: {length}</label>
        <label>Max: {max}</label>
        <label>Min: {min}</label>
        {(length!==0) &&(<button className="sort-btn" onClick={this.sortNumbers}>
          <p style={{margin: '0 10px 0 10px', fontSize: '2em'}}>{this.state.sortText}</p>
          {(this.state.sorted==='asc' || this.state.sorted===false)&&<ArrowDownwardSharpIcon style={{background: "red"}}/>}
          {(this.state.sorted==='desc' || this.state.sorted===false)&&<ArrowUpwardSharpIcon style={{background: "red"}}/>}
        </button>)}
        <div className="number-list-div">
          {
            this.state.numbers && this.state.numbers.map((number, index)=>{
              return <h4 key={uuid()} className="number">{index+1 +". "+number}</h4>
            })
          }
          </div>
      </div>
    );
  }
}

export default App;
