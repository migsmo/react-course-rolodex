import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { employees: users };
        })
      );
  }

  render() {
    const filteredEmployees = this.state.employees.filter((employee) => {
      return employee.name.toLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        <input
          type="search"
          placeholder="Search employees"
          onChange={(event) => {
            const searchField = event.target.value.toLowerCase();
            this.setState({ searchField });
          }}
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
