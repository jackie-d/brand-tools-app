import { createStore } from 'redux'

const initialState = {
    todos: []
}

function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'addTodo': {
        return {
          ...state,
          todos: [
            ...state.todos,
            {
              title: action.todo.title,
              description: action.todo.description
            }
          ]
        }
      }
      case 'removeTodo': {
        let newTodos = [...state.todos];
        newTodos = newTodos.filter(todo => {
            if (todo.title !== action.todo.title) {
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