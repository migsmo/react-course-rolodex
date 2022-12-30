import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { employees: users };
        })
      );
  }

  //Use function outside of render so that we don't have to
  //re render this function every time we re render the component
  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState({ searchField });
  };

  render() {
    //Destructuring is more readable
    const { employees, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredEmployees = employees.filter((employee) => {
      return employee.name.toLowerCase().includes(searchField);
    });

    return (
      <div className='App'>
        <input
          type='search'
          placeholder='Search employees'
          onChange={onSearchChange}
        />
        {filteredEmployees.map((employee) => {
          return (
            <div key={employee.id}>
              <h1>{employee.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
