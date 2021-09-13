import React, { Component } from 'react';
import {  toast } from 'react-toastify';

class AddTodo extends Component {

    state = {
        title: '',
    }

    handleOnChangeTitle = (event) => {
        this.setState({
            title: event.target.value,
        })
    }

    handleClickAddTodo = () => {

        if (!this.state.title) {
            toast.error('missing title')
            return;
        }

        let todo = {
            id: Math.floor(Math.random() * 1000),
            title: this.state.title,
        }

        this.props.addNewTodo(todo);
        this.setState({
            title: ''
        })
    }
    render() {

        let { title } = this.state;

        return (
            <div className="add-todo">
                <input type="text" value={title}
                    onChange={(event) => this.handleOnChangeTitle(event)}
                />
                <button
                    onClick={() => this.handleClickAddTodo()}
                    className="add" type="button">Add</button>
            </div>
        );
    }
}

export default AddTodo;