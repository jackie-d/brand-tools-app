import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const selectTodos = state => state.todos

const Redux = () => {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  const [text, setText] = useState();
  const [description, setDescription] = useState();

  const setTodoText = (e) => {
    setText(e.target.value);
  }

  const setTodoDescription = (e) => {
    setDescription(e.target.value);
  }

  const addTask = () => {
    dispatch({ type: 'addTodo', todo: {title: text, description: description} });
    setText('')
    setDescription('')
  }

  const deleteTodo = (title) => {
    dispatch({ type: 'removeTodo', todo: {title} });
  }

  return <div>
        <p>
            <input class="form-control" value={text} onChange={(e) => setTodoText(e)} />
            <input class="form-control" value={description} onChange={(e) => setTodoDescription(e)} />
            <button class="btn btn-primary" onClick={() => addTask()}>Add</button>
        </p>
        <ul className="todo-list">
            {todos.map((todo, index) => (
                <li>
                    {todo.title} - {todo.description} <button class="btn btn-secondary btn-small" onClick={() => deleteTodo(todo.title)}>X</button>
                </li>
            ))}
        </ul>
    </div>
}

export default Redux;