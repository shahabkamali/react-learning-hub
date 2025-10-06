import React, { useState, useEffect } from 'react';

// useEffect Hook - Side Effects in Functional Components
// useEffect lets you perform side effects in functional components
// It combines componentDidMount, componentDidUpdate, and componentWillUnmount
// Runs after every render by default, but can be controlled with dependencies
// Use cleanup functions to prevent memory leaks

type State = {
  logs: string[];
};

const UseEffectDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Helper function to add logs
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 1. useEffect with no dependencies - runs after every render
  useEffect(() => {
    addLog('useEffect with no dependencies - runs after every render');
    document.title = `Count: ${count}`;
  });

  // 2. useEffect with empty dependency array - runs only once (like componentDidMount)
  useEffect(() => {
    addLog('useEffect with empty dependencies - runs only once (componentDidMount)');
    console.log('Component mounted');
    
    // Cleanup function (like componentWillUnmount)
    return () => {
      addLog('Cleanup function - runs on unmount');
      console.log('Component will unmount');
    };
  }, []);

  // 3. useEffect with dependencies - runs when dependencies change
  useEffect(() => {
    addLog(`useEffect with count dependency - count changed to: ${count}`);
  }, [count]);

  // 4. useEffect with multiple dependencies
  useEffect(() => {
    addLog(`useEffect with name dependency - name changed to: ${name}`);
  }, [name]);

  // 5. Window resize effect with cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      addLog(`Window resized to: ${window.innerWidth}px`);
    };

    addLog('Added window resize listener');
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      addLog('Removed window resize listener');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 6. Data fetching effect
  const fetchData = async () => {
    setLoading(true);
    addLog('Starting data fetch...');
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const result = await response.json();
      setData(result);
      addLog('Data fetched successfully');
    } catch (error) {
      addLog('Error fetching data');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on mount

  // 7. Timer effect with cleanup
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning) {
      addLog('Timer started');
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = prevTimer + 1;
          addLog(`Timer tick: ${newTimer}`);
          return newTimer;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        addLog('Timer stopped and cleaned up');
        clearInterval(intervalId);
      }
    };
  }, [isTimerRunning]);

  // 8. Effect with conditional logic
  useEffect(() => {
    if (count > 5) {
      addLog(`Count is greater than 5: ${count}`);
    }
  }, [count]);

  // 9. Effect that depends on multiple state values
  useEffect(() => {
    if (count > 0 && name) {
      addLog(`Both count (${count}) and name (${name}) have values`);
    }
  }, [count, name]);

  // 10. Effect with async function
  useEffect(() => {
    const asyncEffect = async () => {
      addLog('Async effect started');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addLog('Async effect completed');
    };

    asyncEffect();
  }, []);

  // Control functions
  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrementCount = () => {
    setCount(prevCount => prevCount - 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const toggleTimer = () => {
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>useEffect Hook Demo</h2>
      <p>This page demonstrates the useEffect hook for handling side effects in functional components.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left Column - Examples */}
        <div>
          <h3>useEffect Examples</h3>
          
          {/* Basic Counter */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Basic Counter (Title Effect)</h4>
            <p>Count: <strong>{count}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Check the browser tab title - it updates with the count!
            </p>
            <div>
              <button onClick={incrementCount} style={{ marginRight: '5px', padding: '5px 10px' }}>+</button>
              <button onClick={decrementCount} style={{ marginRight: '5px', padding: '5px 10px' }}>-</button>
              <button onClick={resetCount} style={{ padding: '5px 10px' }}>Reset</button>
            </div>
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Name Input</h4>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <p>Name: <strong>{name || 'No name entered'}</strong></p>
          </div>

          {/* Window Width */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Window Width Tracker</h4>
            <p>Current Window Width: <strong>{windowWidth}px</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Try resizing your browser window to see the effect!
            </p>
          </div>

          {/* Data Fetching */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Data Fetching</h4>
            {loading ? (
              <p>Loading...</p>
            ) : data ? (
              <div>
                <p><strong>Title:</strong> {data.title}</p>
                <p><strong>Body:</strong> {data.body.substring(0, 100)}...</p>
              </div>
            ) : (
              <p>No data loaded</p>
            )}
            <button onClick={fetchData} style={{ padding: '5px 10px', marginTop: '10px' }}>
              Refetch Data
            </button>
          </div>

          {/* Timer */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Timer with Cleanup</h4>
            <p>Timer: <strong>{timer} seconds</strong></p>
            <div>
              <button onClick={toggleTimer} style={{ marginRight: '5px', padding: '5px 10px' }}>
                {isTimerRunning ? 'Stop' : 'Start'} Timer
              </button>
              <button onClick={resetTimer} style={{ padding: '5px 10px' }}>
                Reset Timer
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Timer automatically cleans up when stopped
            </p>
          </div>

          {/* Conditional Effect */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Conditional Effect</h4>
            <p>Count: <strong>{count}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Effect only runs when count &gt; 5
            </p>
          </div>

          {/* Multiple Dependencies */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>Multiple Dependencies</h4>
            <p>Count: <strong>{count}</strong></p>
            <p>Name: <strong>{name || 'No name'}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Effect runs when either count or name changes
            </p>
          </div>
        </div>

        {/* Right Column - Logs */}
        <div>
          <h3>Effect Logs</h3>
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
              <p style={{ color: '#6c757d' }}>No effects logged yet. Interact with the examples!</p>
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

      {/* Key Points */}
      <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
        <h3>Key Points About useEffect:</h3>
        <ul>
          <li><strong>No Dependencies:</strong> useEffect(() =&gt; {}, []) - runs after every render</li>
          <li><strong>Empty Dependencies:</strong> useEffect(() =&gt; {}, []) - runs only once (componentDidMount)</li>
          <li><strong>With Dependencies:</strong> useEffect(() =&gt; {}, [dep1, dep2]) - runs when dependencies change</li>
          <li><strong>Cleanup Function:</strong> return () =&gt; {} - runs before next effect or unmount</li>
          <li><strong>Async Effects:</strong> Use async functions inside useEffect</li>
          <li><strong>Conditional Effects:</strong> Use conditions inside useEffect for conditional logic</li>
          <li><strong>Multiple Effects:</strong> Use multiple useEffect calls for different concerns</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>useEffect Best Practices:</h3>
        <ul>
          <li><strong>Separate Concerns:</strong> Use multiple useEffect calls for different effects</li>
          <li><strong>Cleanup:</strong> Always clean up subscriptions, timers, and event listeners</li>
          <li><strong>Dependencies:</strong> Include all values from component scope that are used inside the effect</li>
          <li><strong>Conditional Effects:</strong> Use conditions inside useEffect rather than conditional useEffect</li>
          <li><strong>Async Functions:</strong> Define async functions inside useEffect, not as the effect function</li>
          <li><strong>Performance:</strong> Use dependency arrays to control when effects run</li>
        </ul>
      </div>

      {/* Common Patterns */}
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>Common useEffect Patterns:</h3>
        <ul>
          <li><strong>Data Fetching:</strong> Fetch data on component mount</li>
          <li><strong>Event Listeners:</strong> Add/remove event listeners with cleanup</li>
          <li><strong>Timers:</strong> Set up intervals/timeouts with cleanup</li>
          <li><strong>Subscriptions:</strong> Subscribe to external data sources</li>
          <li><strong>Document Updates:</strong> Update document title, meta tags, etc.</li>
          <li><strong>API Calls:</strong> Make API calls based on state changes</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectDemo;

