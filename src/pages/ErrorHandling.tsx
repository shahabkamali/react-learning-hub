import React from 'react';

// Error Handling in React
// Error boundaries catch JavaScript errors anywhere in the component tree
// They display a fallback UI instead of crashing the entire app
// Use componentDidCatch and getDerivedStateFromError lifecycle methods

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by boundary:', error);
    console.log('Error info:', errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          border: '2px solid #dc3545', 
          borderRadius: '5px', 
          backgroundColor: '#f8d7da',
          color: '#721c24'
        }}>
          <h3>Something went wrong!</h3>
          <p>An error occurred in this component.</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Error Details</summary>
            <pre style={{ fontSize: '12px', marginTop: '10px' }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component that throws an error
class BuggyComponent extends React.Component<{ shouldThrow: boolean }, {}> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('This is a test error!');
    }
    return (
      <div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
        <p>This component is working fine!</p>
      </div>
    );
  }
}

// Component with async error
class AsyncErrorComponent extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  triggerAsyncError = () => {
    setTimeout(() => {
      // This won't be caught by error boundary
      throw new Error('Async error - not caught by error boundary!');
    }, 1000);
  };

  triggerAsyncErrorWithState = () => {
    setTimeout(() => {
      this.setState({ hasError: true });
    }, 1000);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
          <p>Async error handled with state!</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <p>Async Error Component</p>
        <button onClick={this.triggerAsyncError} style={{ marginRight: '10px', padding: '5px 10px' }}>
          Trigger Async Error (Not Caught)
        </button>
        <button onClick={this.triggerAsyncErrorWithState} style={{ padding: '5px 10px' }}>
          Trigger Async Error (Handled)
        </button>
      </div>
    );
  }
}

// Component with try-catch
class TryCatchComponent extends React.Component<{}, { result: string; error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { result: '', error: '' };
  }

  handleTryCatch = () => {
    try {
      // Simulate an error
      const obj: any = null;
      const result = obj.someProperty;
      this.setState({ result: `Result: ${result}`, error: '' });
    } catch (error) {
      this.setState({ 
        result: '', 
        error: `Caught error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  };

  handleNoError = () => {
    try {
      const obj = { someProperty: 'Hello World!' };
      const result = obj.someProperty;
      this.setState({ result: `Result: ${result}`, error: '' });
    } catch (error) {
      this.setState({ 
        result: '', 
        error: `Caught error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  };

  render() {
    const { result, error } = this.state;
    
    return (
      <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h4>Try-Catch Example</h4>
        <button onClick={this.handleTryCatch} style={{ marginRight: '10px', padding: '5px 10px' }}>
          Trigger Error
        </button>
        <button onClick={this.handleNoError} style={{ padding: '5px 10px' }}>
          No Error
        </button>
        {result && <p style={{ color: 'green' }}>{result}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}

type State = {
  showBuggyComponent: boolean;
  logs: string[];
};

class ErrorHandlingDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showBuggyComponent: false,
      logs: []
    };
  }

  // Helper function to add logs
  addLog = (message: string) => {
    this.setState(prevState => ({
      logs: [...prevState.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  toggleBuggyComponent = () => {
    this.setState(prevState => ({
      showBuggyComponent: !prevState.showBuggyComponent
    }));
    this.addLog(`Toggled buggy component: ${!this.state.showBuggyComponent}`);
  };

  clearLogs = () => {
    this.setState({ logs: [] });
  };

  render() {
    const { showBuggyComponent, logs } = this.state;

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2>Error Handling in React</h2>
        <p>This page demonstrates different ways to handle errors in React applications.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Left Column - Examples */}
          <div>
            <h3>Error Handling Examples</h3>
            
            {/* Error Boundary Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Error Boundary</h4>
              <p>Error boundaries catch JavaScript errors in component trees.</p>
              <button 
                onClick={this.toggleBuggyComponent}
                style={{ 
                  padding: '8px 15px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              >
                {showBuggyComponent ? 'Hide' : 'Show'} Buggy Component
              </button>
              
              <ErrorBoundary>
                <BuggyComponent shouldThrow={showBuggyComponent} />
              </ErrorBoundary>
            </div>

            {/* Try-Catch Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <TryCatchComponent />
            </div>

            {/* Async Error Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Async Error Handling</h4>
              <p>Error boundaries don't catch errors in async operations.</p>
              <ErrorBoundary>
                <AsyncErrorComponent />
              </ErrorBoundary>
            </div>

            {/* Custom Error Boundary */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Custom Error Boundary</h4>
              <ErrorBoundary 
                fallback={
                  <div style={{ 
                    padding: '15px', 
                    border: '2px solid #ffc107', 
                    borderRadius: '5px', 
                    backgroundColor: '#fff3cd',
                    color: '#856404'
                  }}>
                    <h4>Custom Error Fallback</h4>
                    <p>This is a custom error boundary fallback!</p>
                  </div>
                }
              >
                <BuggyComponent shouldThrow={showBuggyComponent} />
              </ErrorBoundary>
            </div>
          </div>

          {/* Right Column - Logs */}
          <div>
            <h3>Action Logs</h3>
            <div style={{ 
              height: '400px', 
              overflowY: 'auto', 
              border: '1px solid #ddd', 
              padding: '10px', 
              backgroundColor: '#f8f9fa',
              fontFamily: 'monospace',
              fontSize: '12px',
              marginBottom: '10px'
            }}>
              {logs.length === 0 ? (
                <p style={{ color: '#6c757d' }}>No actions logged yet. Try the examples!</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
            <button 
              onClick={this.clearLogs} 
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
          <h3>Key Points About Error Handling:</h3>
          <ul>
            <li><strong>Error Boundaries:</strong> Catch errors in component trees and display fallback UI</li>
            <li><strong>Lifecycle Methods:</strong> Use getDerivedStateFromError and componentDidCatch</li>
            <li><strong>Try-Catch:</strong> Handle errors in event handlers and other JavaScript code</li>
            <li><strong>Async Errors:</strong> Error boundaries don't catch errors in async operations</li>
            <li><strong>Fallback UI:</strong> Provide meaningful error messages to users</li>
            <li><strong>Error Logging:</strong> Log errors for debugging and monitoring</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <h3>Best Practices:</h3>
          <ul>
            <li>Place error boundaries strategically in your component tree</li>
            <li>Use try-catch for async operations and event handlers</li>
            <li>Provide user-friendly error messages</li>
            <li>Log errors for debugging purposes</li>
            <li>Test error scenarios during development</li>
            <li>Consider using error reporting services in production</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ErrorHandlingDemo;

