import React, { useState, useEffect } from 'react';

// Rules of Hooks - Fundamental Guidelines for Using React Hooks
// There are two main rules that must be followed when using hooks:
// 1. Only call hooks at the top level - never inside loops, conditions, or nested functions
// 2. Only call hooks from React function components or custom hooks

type State = {
  logs: string[];
};

const HookRulesDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [showExamples, setShowExamples] = useState(true);

  // Helper function to add logs
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // CORRECT: Hooks called at the top level
  useEffect(() => {
    addLog('✅ CORRECT: useEffect called at top level');
  }, []);

  // CORRECT: Multiple hooks at top level
  useEffect(() => {
    addLog(`✅ CORRECT: useEffect with dependency - count: ${count}`);
  }, [count]);

  // CORRECT: Conditional logic inside hook
  useEffect(() => {
    if (count > 5) {
      addLog(`✅ CORRECT: Conditional logic INSIDE useEffect - count: ${count}`);
    }
  }, [count]);

  const clearLogs = () => {
    setLogs([]);
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // WRONG: This would violate the rules of hooks
  // if (count > 0) {
  //   const [wrongState, setWrongState] = useState(0); // ❌ WRONG!
  // }

  // WRONG: This would also violate the rules
  // for (let i = 0; i < count; i++) {
  //   const [wrongState, setWrongState] = useState(0); // ❌ WRONG!
  // }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>Rules of Hooks</h2>
      <p>This page explains the fundamental rules that must be followed when using React hooks.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left Column - Rules and Examples */}
        <div>
          <h3>The Two Rules of Hooks</h3>
          
          {/* Rule 1 */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #28a745', borderRadius: '5px', backgroundColor: '#d4edda' }}>
            <h4>Rule 1: Only Call Hooks at the Top Level</h4>
            <p><strong>Never call hooks inside:</strong></p>
            <ul>
              <li>Loops (for, while, forEach, map, etc.)</li>
              <li>Conditions (if, switch, ternary operators)</li>
              <li>Nested functions</li>
              <li>Event handlers</li>
              <li>Class components</li>
            </ul>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              ✅ <strong>CORRECT:</strong> Always call hooks at the top level of your function component
            </p>
          </div>

          {/* Rule 2 */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px', backgroundColor: '#e7f3ff' }}>
            <h4>Rule 2: Only Call Hooks from React Functions</h4>
            <p><strong>Only call hooks from:</strong></p>
            <ul>
              <li>React function components</li>
              <li>Custom hooks (functions that start with "use")</li>
            </ul>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              ✅ <strong>CORRECT:</strong> Call hooks from React components or custom hooks
            </p>
          </div>

          {/* Correct Examples */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #28a745', borderRadius: '5px' }}>
            <h4>✅ Correct Examples</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <h5>1. Hooks at Top Level</h5>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`function MyComponent() {
  // ✅ CORRECT: Hooks at top level
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  useEffect(() => {
    // Effect logic here
  }, []);
  
  return <div>...</div>;
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>2. Conditional Logic Inside Hook</h5>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`function MyComponent() {
  const [count, setCount] = useState(0);
  
  // ✅ CORRECT: Conditional logic inside hook
  useEffect(() => {
    if (count > 5) {
      console.log('Count is greater than 5');
    }
  }, [count]);
  
  return <div>...</div>;
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>3. Custom Hook</h5>
              <pre style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`// ✅ CORRECT: Custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}`}
              </pre>
            </div>
          </div>

          {/* Incorrect Examples */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #dc3545', borderRadius: '5px', backgroundColor: '#f8d7da' }}>
            <h4>❌ Incorrect Examples</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <h5>1. Hook Inside Condition</h5>
              <pre style={{ 
                backgroundColor: '#f5c6cb', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`function MyComponent() {
  const [count, setCount] = useState(0);
  
  // ❌ WRONG: Hook inside condition
  if (count > 0) {
    const [name, setName] = useState(''); // ERROR!
  }
  
  return <div>...</div>;
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>2. Hook Inside Loop</h5>
              <pre style={{ 
                backgroundColor: '#f5c6cb', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`function MyComponent() {
  const [items, setItems] = useState([]);
  
  // ❌ WRONG: Hook inside loop
  items.forEach(item => {
    const [state, setState] = useState(0); // ERROR!
  });
  
  return <div>...</div>;
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>3. Hook Inside Event Handler</h5>
              <pre style={{ 
                backgroundColor: '#f5c6cb', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`function MyComponent() {
  const handleClick = () => {
    // ❌ WRONG: Hook inside event handler
    const [state, setState] = useState(0); // ERROR!
  };
  
  return <button onClick={handleClick}>Click</button>;
}`}
              </pre>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5>4. Hook Inside Class Component</h5>
              <pre style={{ 
                backgroundColor: '#f5c6cb', 
                padding: '10px', 
                borderRadius: '3px', 
                fontSize: '12px',
                overflow: 'auto'
              }}>
{`class MyComponent extends React.Component {
  render() {
    // ❌ WRONG: Hook inside class component
    const [state, setState] = useState(0); // ERROR!
    
    return <div>...</div>;
  }
}`}
              </pre>
            </div>
          </div>

          {/* Interactive Examples */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Interactive Examples</h4>
            <p>These examples follow the rules of hooks correctly:</p>
            
            <div style={{ marginBottom: '10px' }}>
              <p>Count: <strong>{count}</strong></p>
              <button onClick={incrementCount} style={{ padding: '5px 10px', marginRight: '5px' }}>
                Increment
              </button>
              <button onClick={() => setCount(0)} style={{ padding: '5px 10px' }}>
                Reset
              </button>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '5px' }}
              />
              <p>Name: <strong>{name || 'No name entered'}</strong></p>
            </div>
            
            <p style={{ fontSize: '12px', color: '#666' }}>
              All hooks in this component are called at the top level and follow the rules correctly.
            </p>
          </div>
        </div>

        {/* Right Column - Logs */}
        <div>
          <h3>Hook Execution Logs</h3>
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
              <p style={{ color: '#6c757d' }}>No hook executions logged yet. Interact with the examples!</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  {log}
                </div>
              ))
            )}
          </div>
          <button 
            onClick={clearLogs}
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

      {/* Why These Rules Exist */}
      <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Why These Rules Exist</h3>
        <ul>
          <li><strong>Consistent Hook Order:</strong> React relies on the order of hook calls to maintain state between renders</li>
          <li><strong>State Preservation:</strong> Hooks must be called in the same order every time the component renders</li>
          <li><strong>Internal Optimization:</strong> React uses the call order to associate state with the correct hook</li>
          <li><strong>Predictable Behavior:</strong> Following these rules ensures hooks work consistently</li>
          <li><strong>Error Prevention:</strong> Violating these rules leads to bugs and unexpected behavior</li>
        </ul>
      </div>

      {/* Common Mistakes */}
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Common Mistakes to Avoid</h3>
        <ul>
          <li><strong>Conditional Hooks:</strong> Don't call hooks inside if statements or loops</li>
          <li><strong>Dynamic Hook Calls:</strong> Don't call hooks based on runtime conditions</li>
          <li><strong>Nested Hook Calls:</strong> Don't call hooks inside other functions</li>
          <li><strong>Class Component Hooks:</strong> Don't use hooks in class components</li>
          <li><strong>Event Handler Hooks:</strong> Don't call hooks inside event handlers</li>
          <li><strong>Async Hook Calls:</strong> Don't call hooks inside async functions</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px' }}>
        <h3>Best Practices</h3>
        <ul>
          <li><strong>Always Call Hooks at Top Level:</strong> Place all hook calls at the beginning of your component</li>
          <li><strong>Use ESLint Plugin:</strong> Install eslint-plugin-react-hooks to catch rule violations</li>
          <li><strong>Custom Hooks:</strong> Extract hook logic into custom hooks for reusability</li>
          <li><strong>Consistent Order:</strong> Always call hooks in the same order</li>
          <li><strong>Readable Code:</strong> Keep hook calls organized and easy to read</li>
          <li><strong>Test Your Components:</strong> Test components to ensure hooks work correctly</li>
        </ul>
      </div>
    </div>
  );
};

export default HookRulesDemo;

