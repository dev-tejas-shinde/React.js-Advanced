
import React, { Component } from 'react';
  
 export default class Task extends Component {
    render() {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {this.props.content}
              <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(this.props.content)}>
                Delete
              </button>
            </li>
          );
        }
  }
  