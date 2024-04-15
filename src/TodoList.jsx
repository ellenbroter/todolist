import React, { useReducer, useState } from 'react';
import styles from './TodoList.module.css';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    case 'RESET_TODOS':
      return [];
    default:
      return state;
  }
};

const TodoComponent = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      dispatch({ type: 'ADD_TODO', text: inputValue });
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (index) => {
    dispatch({ type: 'TOGGLE_TODO', index });
  };

  const handleResetTodos = () => {
    dispatch({ type: 'RESET_TODOS' });
  };

  return (
    <div>
		<h3>Todo List</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleAddTodo}>Add</button>
      
      <ul className={styles.todolist}>
        {todos.map((todo, index) => (
          <li key={index}>
            <div className={styles.checkbox} onClick={() => handleToggleTodo(index)}>
              {todo.completed ? '☑' : '☐'}
            </div>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
		<button onClick={handleResetTodos}>Reset</button>
    </div>
  );
};

export default TodoComponent;