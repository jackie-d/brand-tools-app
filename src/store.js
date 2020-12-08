import { createStore } from 'redux'

import {v4 as uuidv4} from 'uuid';

const initialState = {
    todos: []
}

function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'addTodo': {

        const newId = uuidv4();

        return {
          ...state,
          todos: [
            ...state.todos,
            {
              id: newId,
              title: action.todo.title,
              description: action.todo.description
            }
          ]
        }
      }
      case 'removeTodo': {
        let newTodos = [...state.todos];
        newTodos = newTodos.filter(todo => {
            if (todo.id !== action.todo.id) {
                return true;
            }
            return false;
        });
        return {
          ...state,
          todos: newTodos
        }
      }
      default:
        return state
    }
  }

const store = createStore(appReducer)

export default store;