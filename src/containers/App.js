import React, { Component } from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
//import {robots} from "./robots";
import './App.css';

/*
const state = {
    robots: robots,
    searchfield: ''
}
*/

//const App = () => {
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
        console.log("1");
    }

    componentDidMount() {
        //this.setState({ robots: robots});
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}));
        console.log("2");
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value})
        /*const filterRoboots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })*/
        //console.log(filterRoboots);
    }

    render() {
        const { robots, searchfield } = this.state;
        const filterRoboots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        console.log("3");
        //if (this.state.robots.length === 0) {
        if (!robots.length) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filterRoboots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }

}

export default App;