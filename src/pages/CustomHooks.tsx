import React, { useState, useEffect, useCallback, useRef } from 'react';

// Custom Hooks - Reusable Hook Logic
// Custom hooks are JavaScript functions that start with "use" and can call other hooks
// They allow you to extract component logic into reusable functions
// Custom hooks can use useState, useEffect, and other hooks internally

type State = {
  logs: string[];
};

// 1. Custom Hook for Counter Logic
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
};

// 2. Custom Hook for Local Storage
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

// 3. Custom Hook for Window Size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// 4. Custom Hook for API Data Fetching
const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// 5. Custom Hook for Previous Value
const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};

// 6. Custom Hook for Toggle State
const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse };
};

// 7. Custom Hook for Debounced Value
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 8. Custom Hook for Form State
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, setValue, setError, reset };
};

const CustomHooksDemo: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // Helper function to add logs
  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Using custom hooks
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);
  
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const windowSize = useWindowSize();
  
  const { data: userData, loading, error, refetch } = useApi<any>('https://jsonplaceholder.typicode.com/users/1');
  
  const previousCount = usePrevious(counter1.count);
  
  const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const { values: formValues, errors: formErrors, setValue, setError, reset } = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Log when previous count changes
  useEffect(() => {
    if (previousCount !== undefined && previousCount !== counter1.count) {
      addLog(`Previous count: ${previousCount}, Current count: ${counter1.count}`);
    }
  }, [counter1.count, previousCount]);

  // Log when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      addLog(`Debounced search: ${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);

  const clearLogs = () => {
    setLogs([]);
  };

  const validateForm = () => {
    let hasErrors = false;
    
    if (!formValues.email) {
      setError('email', 'Email is required');
      hasErrors = true;
    }
    
    if (!formValues.password) {
      setError('password', 'Password is required');
      hasErrors = true;
    }
    
    if (formValues.password !== formValues.confirmPassword) {
      setError('confirmPassword', 'Passwords do not match');
      hasErrors = true;
    }
    
    if (!hasErrors) {
      addLog('Form validation passed!');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>Custom Hooks Demo</h2>
      <p>This page demonstrates various custom hooks and their usage patterns.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Left Column - Examples */}
        <div>
          <h3>Custom Hook Examples</h3>
          
          {/* Counter Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useCounter Hook</h4>
            <p>Counter 1: <strong>{counter1.count}</strong></p>
            <p>Counter 2: <strong>{counter2.count}</strong></p>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={counter1.increment} style={{ marginRight: '5px', padding: '5px 10px' }}>+1</button>
              <button onClick={counter1.decrement} style={{ marginRight: '5px', padding: '5px 10px' }}>-1</button>
              <button onClick={counter1.reset} style={{ padding: '5px 10px' }}>Reset</button>
            </div>
            <div>
              <button onClick={counter2.increment} style={{ marginRight: '5px', padding: '5px 10px' }}>+2</button>
              <button onClick={counter2.decrement} style={{ marginRight: '5px', padding: '5px 10px' }}>-2</button>
              <button onClick={counter2.reset} style={{ padding: '5px 10px' }}>Reset</button>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Reusable counter logic with multiple instances
            </p>
          </div>

          {/* Local Storage Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useLocalStorage Hook</h4>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              <p>Name: <strong>{name}</strong></p>
            </div>
            <div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{ padding: '5px' }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
              </select>
              <p>Theme: <strong>{theme}</strong></p>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Values persist in localStorage
            </p>
          </div>

          {/* Window Size Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useWindowSize Hook</h4>
            <p>Width: <strong>{windowSize.width}px</strong></p>
            <p>Height: <strong>{windowSize.height}px</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Try resizing your browser window
            </p>
          </div>

          {/* API Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useApi Hook</h4>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {userData && (
              <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
              </div>
            )}
            <button onClick={refetch} style={{ padding: '5px 10px', marginTop: '10px' }}>
              Refetch Data
            </button>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Automatic data fetching with loading states
            </p>
          </div>

          {/* Previous Value Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>usePrevious Hook</h4>
            <p>Current Count: <strong>{counter1.count}</strong></p>
            <p>Previous Count: <strong>{previousCount ?? 'N/A'}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Tracks previous value of counter
            </p>
          </div>

          {/* Toggle Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useToggle Hook</h4>
            <p>Visible: <strong>{isVisible ? 'Yes' : 'No'}</strong></p>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={toggle} style={{ marginRight: '5px', padding: '5px 10px' }}>Toggle</button>
              <button onClick={setTrue} style={{ marginRight: '5px', padding: '5px 10px' }}>Show</button>
              <button onClick={setFalse} style={{ padding: '5px 10px' }}>Hide</button>
            </div>
            {isVisible && (
              <div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '3px' }}>
                <p>This content is visible!</p>
              </div>
            )}
            <p style={{ fontSize: '12px', color: '#666' }}>
              Boolean state with helper methods
            </p>
          </div>

          {/* Debounce Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useDebounce Hook</h4>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search..."
              style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
            />
            <p>Search Term: <strong>{searchTerm}</strong></p>
            <p>Debounced: <strong>{debouncedSearchTerm}</strong></p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Debounced value updates after 500ms delay
            </p>
          </div>

          {/* Form Hook */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>useForm Hook</h4>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                value={formValues.email}
                onChange={(e) => setValue('email', e.target.value)}
                placeholder="Email"
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              {formErrors.email && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</p>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                value={formValues.password}
                onChange={(e) => setValue('password', e.target.value)}
                placeholder="Password"
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              {formErrors.password && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.password}</p>}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                value={formValues.confirmPassword}
                onChange={(e) => setValue('confirmPassword', e.target.value)}
                placeholder="Confirm Password"
                style={{ width: '100%', padding: '5px', marginBottom: '5px' }}
              />
              {formErrors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.confirmPassword}</p>}
            </div>
            <div>
              <button onClick={validateForm} style={{ marginRight: '5px', padding: '5px 10px' }}>Validate</button>
              <button onClick={reset} style={{ padding: '5px 10px' }}>Reset</button>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Form state management with validation
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

      {/* Key Points */}
      <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
        <h3>Key Points About Custom Hooks:</h3>
        <ul>
          <li><strong>Naming Convention:</strong> Always start with "use" (useCounter, useLocalStorage, etc.)</li>
          <li><strong>Reusability:</strong> Extract common logic into reusable functions</li>
          <li><strong>Composition:</strong> Custom hooks can use other hooks internally</li>
          <li><strong>State Management:</strong> Can manage their own state and side effects</li>
          <li><strong>Return Values:</strong> Can return any values (state, functions, objects)</li>
          <li><strong>Testing:</strong> Custom hooks can be tested independently</li>
          <li><strong>Separation of Concerns:</strong> Keep component logic separate from UI logic</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>Custom Hook Best Practices:</h3>
        <ul>
          <li><strong>Single Responsibility:</strong> Each hook should have one clear purpose</li>
          <li><strong>Descriptive Names:</strong> Use clear, descriptive names that explain what the hook does</li>
          <li><strong>Consistent API:</strong> Return consistent data structures and function signatures</li>
          <li><strong>Error Handling:</strong> Include proper error handling and edge cases</li>
          <li><strong>Documentation:</strong> Document parameters, return values, and usage examples</li>
          <li><strong>TypeScript:</strong> Use TypeScript for better type safety and IntelliSense</li>
          <li><strong>Testing:</strong> Write tests for your custom hooks</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomHooksDemo;

