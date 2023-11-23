
import React, { Component } from 'react';
import Task from "./Task"
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default class ToDoListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: ''
    };
  }
  

  handleInputChange = (event) => {
    this.setState({ currentTask: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      tasks: [...prevState.tasks, this.state.currentTask],
      currentTask: ''
    }));
  };

  handleDelete = (taskToDelete) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task !== taskToDelete)
    }));
  };

  render() {
    const {currentTask} = this.state;
    return (
      <div className="container mt-5 p-3 border">
        <div className="row justify-content-center">
          <div className="col-auto">
          <h2 className='row justify-content-center'>To-Do List</h2>
            <form className="input-group mb-4" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="form-control "
                placeholder="Add a new task"
               value={currentTask}
                onChange={this.handleInputChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" disabled={!currentTask} type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <ul className="list-group">
              {this.state.tasks.map((task, index) => (
                <Task key={index} content={task} onDelete={this.handleDelete} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  

    ;
  }
