import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    LocationSeen: [],
    SeenAnimals: []
  };
  componentDidMount() {
    fetch("https://localhost:5001/api/SeenAnimals")
      .then(resp => resp.json())
      .then(json => {
        console.log({ json });
        this.setState({
          SeenAnimals: json
        });
      });

    fetch("https://localhost:5001/api/SeenAnimals/FieldOfDreams")
      .then(resp => resp.json())
      .then(json => {
        console.log({ json });
        this.setState({
          LocationSeen: json
        });
      });
  }
  animalCount = () => {
    let count = 0;
    for (let i = 0; i < this.state.SeenAnimals.length; i++) {
      count = count + this.state.SeenAnimals[i].countOfTimesSeen;
    }
    return count;
  };
  newAnimalCount = () => {
    let count = 0;
    for (let i = 0; i < this.state.SeenAnimals.length; i++) {
      let animal = this.state.SeenAnimals[i].species;

      if (animal === "Lion" || animal === "Tiger" || animal === "Bear")
        count = count + this.state.SeenAnimals[i].countOfTimesSeen;
    }
    return count;
  };
  render() {
    return (
      <main className="main">
        <div className="all">
          <h1>All Animals</h1>
          {this.state.SeenAnimals.map(SeenAnimals => {
            return (
              <h2 key={SeenAnimals.id}>
                {SeenAnimals.species}
                ----
                {SeenAnimals.locationOfLastSeen}
                -----
                {SeenAnimals.countOfTimesSeen}
              </h2>
            );
          })}
        </div>
        <div className="field">
          <h1>Field Of Dreams animals =</h1>
          {this.state.LocationSeen.map(SeenAnimals => {
            return (
              <h2 key={SeenAnimals.id}>
                {SeenAnimals.species}
                ----
                {SeenAnimals.locationOfLastSeen}
                -----
                {SeenAnimals.countOfTimesSeen}
              </h2>
            );
          })}
        </div>

        <div className="nofield">
          <h1>NOT Field Of Dreams animals =</h1>
          {this.state.SeenAnimals.map(SeenAnimals => {
            if (SeenAnimals.locationOfLastSeen !== "FieldOfDreams") {
              return (
                <h2 key={SeenAnimals.id}>
                  {SeenAnimals.species}
                  ----
                  {SeenAnimals.locationOfLastSeen}
                  -----
                  {SeenAnimals.countOfTimesSeen}
                </h2>
              );
            }
          })}
        </div>
        <div className="totals">
          <h1>Total countOfTimesSeen</h1>
          <h2>{this.animalCount()}</h2>
        </div>
        <div className="total">
          <h2>Lion, Tigers and Bears,</h2>
          <h1>'O MY'</h1>
          <p>.....</p>
          <p>.....</p>
          <p>.....</p>
          <p>.....</p>

          <h1>{this.newAnimalCount()}</h1>
          <p>.....</p>
          <p>.....</p>
          <p>.....</p>
          <p>.....</p>
        </div>
      </main>
    );
  }
}

export default App;
