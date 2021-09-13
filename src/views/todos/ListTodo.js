import React, { Component } from 'react';
import AddTodo from './AddTodo';
import './ListTodo.scss'
import { toast } from 'react-toastify';

class ListTodo extends Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing Homework' },
            { id: 'todo2', title: 'making video' },
            { id: 'todo3', title: 'coding' },
            { id: 'todo4', title: 'fixing bugs' }
        ],
        editTodo: {

        }
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })

        toast.success("succsses!");
    }

    handleDeleteTodo = (todo) => {
        let currentTodo = this.state.listTodos;
        // kiểm tra trng map 
        currentTodo = currentTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodo,
        })
        toast.success("Delete Succeed!")
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        //save
        if (isEmptyObj === false && editTodo.id === todo.id) {

            let listTodosCopy = this.state.listTodos;
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            listTodosCopy[objIndex].title = editTodo.title;

            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })

            return;
        }

        //edit
        this.setState({
            editTodo: todo
        })

    }

    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy,
        })
    }

    render() {
        let { listTodos, editTodo } = this.state;
        // check obj todo bằng rỗng
        let isEmptyObj = Object.keys(editTodo).length === 0;
        console.log(isEmptyObj);
        return (
            <div className="container">
                <div className="list-todo-container">
                    <h1>To Do List</h1>
                    <AddTodo addNewTodo={this.addNewTodo} />

                    <div className="list-todo-content">
                        {listTodos && listTodos.length > 0 &&
                            listTodos.map((item, index) => {
                                return (
                                    <div key={item.id} className="todo-child">

                                        {isEmptyObj === true ?
                                            <span> {index + 1} - {item.title} </span>
                                            :
                                            <>
                                                {editTodo.id === item.id ?
                                                    <span>
                                                        {index + 1} - <input
                                                            onChange={(event) => this.handleOnChangeEditTodo(event)}
                                                            value={editTodo.title} />
                                                    </span>
                                                    :
                                                    <span>
                                                        {index + 1} - {item.title}
                                                    </span>
                                                }
                                            </>
                                        }
                                        <div className="button">
                                            <button
                                                onClick={() => this.handleEditTodo(item)}
                                                className="edit">
                                                {isEmptyObj === false && editTodo.id === item.id ?
                                                    'save' : 'edit'}
                                            </button>
                                            <button
                                                onClick={() => this.handleDeleteTodo(item)}
                                                className="delete">Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodo;