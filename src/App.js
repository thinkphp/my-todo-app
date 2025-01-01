import { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, Edit2, X, Check } from 'lucide-react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          <PlusCircle />
          <span>Add</span>
        </button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <button 
                  onClick={() => saveEdit(todo.id)}
                  className="save-button"
                >
                  <Check size={20} />
                </button>
                <button 
                  onClick={cancelEditing}
                  className="cancel-button"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="toggle-button"
                >
                  {todo.completed ? 
                    <CheckCircle size={20} /> : 
                    <Circle size={20} />
                  }
                </button>
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="edit-button"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
