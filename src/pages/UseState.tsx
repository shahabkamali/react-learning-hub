import React, { useState } from 'react';

// useState Hook - State Management in Functional Components
// useState is a React hook that lets you add state to functional components
// It returns an array with two elements: [currentState, setStateFunction]
// The setState function can accept a new value or a function that receives the previous state
// Unlike this.setState, useState doesn't merge state - it replaces it completely

type State = {
  logs: string[];
};

const UseStateDemo: React.FC = () => {
  // Basic useState examples
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState<string[]>([]);
  const [user, setUser] = useState({ name: '', email: '', age: 0 });
  const [logs, setLogs] = useState<string[]>([]);

  // Helper function to add logs
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Basic state updates
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
    addLog('Count incremented');
  };

  const decrementCount = () => {
    setCount(prevCount => prevCount - 1);
    addLog('Count decremented');
  };

  const resetCount = () => {
    setCount(0);
    addLog('Count reset');
  };

  // String state updates
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    addLog(`Name changed to: ${e.target.value}`);
  };

  // Boolean state updates
  const toggleVisibility = () => {
    setIsVisible(prevVisible => !prevVisible);
    addLog(`Visibility toggled to: ${!isVisible}`);
  };

  // Array state updates
  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems(prevItems => [...prevItems, newItem]);
    addLog(`Added item: ${newItem}`);
  };

  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
    addLog(`Removed item at index: ${index}`);
  };

  const clearItems = () => {
    setItems([]);
    addLog('Cleared all items');
  };

  // Object state updates
  const updateUser = (field: string, value: string | number) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
    addLog(`Updated user ${field} to: ${value}`);
  };

  const resetUser = () => {
    setUser({ name: '', email: '', age: 0 });
    addLog('User reset');
  };

  // Multiple state updates in one function
  const resetAll = () => {
    setCount(0);
    setName('');
    setIsVisible(true);
    setItems([]);
    setUser({ name: '', email: '', age: 0 });
    addLog('All state reset');
  };

  // Complex state update example
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false
        }
      ]);
      setNewTodo('');
      addLog(`Added todo: ${newTodo}`);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    addLog(`Toggled todo: ${id}`);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    addLog(`Deleted todo: ${id}`);
  };

  // Lazy initial state
  const [expensiveValue, setExpensiveValue] = useState(() => {
    console.log('Computing expensive initial value...');
    return Array.from({ length: 1000 }, (_, i) => i).reduce((sum, num) => sum + num, 0);
  });

  const recalculateExpensiveValue = () => {
    setExpensiveValue(prevValue => {
      console.log('Recalculating expensive value...');
      return Array.from({ length: 1000 }, (_, i) => i).reduce((sum, num) => sum + num, 0);
    });
    addLog('Recalculated expensive value');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>useState Hook Demo</h2>
      <p>This page demonstrates the useState hook for state management in functional components.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left Column - Examples */}
        <div>
          <h3>useState Examples</h3>
          
          {/* Basic Counter */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Basic Counter</h4>
            <p>Count: <strong>{count}</strong></p>
            <div>
              <button onClick={incrementCount} style={{ marginRight: '5px', padding: '5px 10px' }}>+</button>
              <button onClick={decrementCount} style={{ marginRight: '5px', padding: '5px 10px' }}>-</button>
              <button onClick={resetCount} style={{ padding: '5px 10px' }}>Reset</button>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: const [count, setCount] = useState(0)
            </p>
          </div>

          {/* String Input */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>String State</h4>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <p>Name: <strong>{name || 'No name entered'}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: const [name, setName] = useState('')
            </p>
          </div>

          {/* Boolean Toggle */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Boolean State</h4>
            <button onClick={toggleVisibility} style={{ padding: '5px 10px', marginBottom: '10px' }}>
              Toggle Visibility
            </button>
            {isVisible && (
              <div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '3px' }}>
                <p>This content is visible!</p>
              </div>
            )}
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: const [isVisible, setIsVisible] = useState(true)
            </p>
          </div>

          {/* Array State */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Array State</h4>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={addItem} style={{ marginRight: '5px', padding: '5px 10px' }}>Add Item</button>
              <button onClick={clearItems} style={{ padding: '5px 10px' }}>Clear All</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((item, index) => (
                <li key={index} style={{ 
                  padding: '5px', 
                  margin: '2px 0', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '3px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{item}</span>
                  <button 
                    onClick={() => removeItem(index)}
                    style={{ padding: '2px 5px', fontSize: '12px' }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: const [items, setItems] = useState([])
            </p>
          </div>

          {/* Object State */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Object State</h4>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) => updateUser('name', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => updateUser('email', e.target.value)}
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              <input
                type="number"
                placeholder="Age"
                value={user.age || ''}
                onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              <button onClick={resetUser} style={{ padding: '5px 10px' }}>Reset User</button>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '3px' }}>
              <p><strong>Name:</strong> {user.name || 'Not set'}</p>
              <p><strong>Email:</strong> {user.email || 'Not set'}</p>
              <p><strong>Age:</strong> {user.age || 'Not set'}</p>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: const [user, setUser] = useState({})
            </p>
          </div>

          {/* Todo List */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Todo List (Complex State)</h4>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                style={{ width: '70%', padding: '5px', marginRight: '5px' }}
              />
              <button onClick={addTodo} style={{ padding: '5px 10px' }}>Add</button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {todos.map(todo => (
                <li key={todo.id} style={{ 
                  padding: '5px', 
                  margin: '2px 0', 
                  backgroundColor: todo.completed ? '#d4edda' : '#f8f9fa', 
                  borderRadius: '3px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                  </span>
                  <div>
                    <button 
                      onClick={() => toggleTodo(todo.id)}
                      style={{ padding: '2px 5px', fontSize: '12px', marginRight: '5px' }}
                    >
                      {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      style={{ padding: '2px 5px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Complex state with array of objects
            </p>
          </div>

          {/* Lazy Initial State */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Lazy Initial State</h4>
            <p>Expensive Value: <strong>{expensiveValue}</strong></p>
            <button onClick={recalculateExpensiveValue} style={{ padding: '5px 10px' }}>
              Recalculate
            </button>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Uses: useState(() =&gt; expensiveComputation())
            </p>
          </div>

          {/* Reset All */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #dc3545', borderRadius: '5px' }}>
            <h4>Reset All State</h4>
            <button onClick={resetAll} style={{ 
              padding: '10px 20px', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px' 
            }}>
              Reset Everything
            </button>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Resets all useState values to their initial state
            </p>
          </div>
        </div>

        {/* Right Column - Logs */}
        <div>
          <h3>Action Logs</h3>
          <div style={{ 
            height: '600px', 
            overflowY: 'auto', 
            border: '1px solid #ddd', 
            padding: '10px', 
            backgroundColor: '#f8f9fa',
            fontFamily: 'monospace',
            fontSize: '12px',
            marginBottom: '10px'
          }}>
            {logs.length === 0 ? (
              <p style={{ color: '#6c757d' }}>No actions logged yet. Interact with the examples!</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
          <button 
            onClick={() => setLogs([])}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#6c757d', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            Clear Logs
          </button>
        </div>
      </div>

      {/* Key Points */}
      <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
        <h3>Key Points About useState:</h3>
        <ul>
          <li><strong>Array Destructuring:</strong> const [state, setState] = useState(initialValue)</li>
          <li><strong>State Replacement:</strong> Unlike setState, useState replaces the entire state</li>
          <li><strong>Functional Updates:</strong> setState(prevState =&gt; newState) for state-dependent updates</li>
          <li><strong>Lazy Initial State:</strong> useState(() =&gt; expensiveComputation()) for expensive initial values</li>
          <li><strong>Object Updates:</strong> Use spread operator to update object state</li>
          <li><strong>Array Updates:</strong> Use spread operator or filter/map for array state</li>
          <li><strong>Multiple State:</strong> Use multiple useState calls for different pieces of state</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>useState Best Practices:</h3>
        <ul>
          <li><strong>Split State:</strong> Use separate useState for unrelated state pieces</li>
          <li><strong>Functional Updates:</strong> Use function form when new state depends on previous state</li>
          <li><strong>Lazy Initialization:</strong> Use function form for expensive initial computations</li>
          <li><strong>Object State:</strong> Always spread previous state when updating objects</li>
          <li><strong>Array State:</strong> Use immutable methods (map, filter, spread) for array updates</li>
          <li><strong>TypeScript:</strong> Provide type annotations for better type safety</li>
        </ul>
      </div>
    </div>
  );
};

export default UseStateDemo;
