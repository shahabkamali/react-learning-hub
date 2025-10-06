import React from 'react';

// PureComponent - Performance Optimization
// PureComponent automatically implements shouldComponentUpdate with shallow comparison
// It only re-renders when props or state actually change
// Regular Component re-renders on every parent update, even if props/state are the same
// Use PureComponent when you want to prevent unnecessary re-renders

type State = {
  regularCounter: number;
  pureCounter: number;
  renderCount: {
    regular: number;
    pure: number;
  };
  logs: string[];
};

// Regular Component - re-renders on every parent update
class RegularCounter extends React.Component<{ count: number; onRender: () => void }, {}> {
  render() {
    this.props.onRender(); // Track render count
    console.log('RegularCounter rendered');
    return (
      <div style={{ padding: '10px', border: '2px solid #dc3545', borderRadius: '5px', margin: '5px' }}>
        <h4>Regular Component</h4>
        <p>Count: {this.props.count}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Re-renders on every parent update
        </p>
      </div>
    );
  }
}

// PureComponent - only re-renders when props actually change
class PureCounter extends React.PureComponent<{ count: number; onRender: () => void }, {}> {
  render() {
    this.props.onRender(); // Track render count
    console.log('PureCounter rendered');
    return (
      <div style={{ padding: '10px', border: '2px solid #28a745', borderRadius: '5px', margin: '5px' }}>
        <h4>PureComponent</h4>
        <p>Count: {this.props.count}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Only re-renders when props change
        </p>
      </div>
    );
  }
}

class PureComponentDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      regularCounter: 0,
      pureCounter: 0,
      renderCount: {
        regular: 0,
        pure: 0
      },
      logs: []
    };
  }

  // Helper function to add logs
  addLog = (message: string) => {
    this.setState(prevState => ({
      logs: [...prevState.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // Increment regular counter
  incrementRegular = () => {
    this.setState(prevState => ({
      regularCounter: prevState.regularCounter + 1
    }));
    this.addLog('Incremented regular counter');
  };

  // Increment pure counter
  incrementPure = () => {
    this.setState(prevState => ({
      pureCounter: prevState.pureCounter + 1
    }));
    this.addLog('Incremented pure counter');
  };

  // Force parent re-render without changing props
  forceParentRerender = () => {
    this.setState(prevState => ({
      logs: [...prevState.logs, `${new Date().toLocaleTimeString()}: Forced parent re-render`]
    }));
    this.addLog('Parent component re-rendered (props unchanged)');
  };

  // Track render count for regular component
  trackRegularRender = () => {
    this.setState(prevState => ({
      renderCount: {
        ...prevState.renderCount,
        regular: prevState.renderCount.regular + 1
      }
    }));
  };

  // Track render count for pure component
  trackPureRender = () => {
    this.setState(prevState => ({
      renderCount: {
        ...prevState.renderCount,
        pure: prevState.renderCount.pure + 1
      }
    }));
  };

  // Reset everything
  reset = () => {
    this.setState({
      regularCounter: 0,
      pureCounter: 0,
      renderCount: {
        regular: 0,
        pure: 0
      },
      logs: []
    });
  };

  render() {
    const { regularCounter, pureCounter, renderCount, logs } = this.state;

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2>PureComponent vs Regular Component</h2>
        <p>This demo shows the performance difference between Regular Component and PureComponent.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Left Column - Components */}
          <div>
            <h3>Component Comparison</h3>
            
            {/* Render Count Display */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
              <h4>Render Count</h4>
              <p><strong>Regular Component:</strong> {renderCount.regular} renders</p>
              <p><strong>PureComponent:</strong> {renderCount.pure} renders</p>
            </div>

            {/* Regular Component */}
            <RegularCounter 
              count={regularCounter} 
              onRender={this.trackRegularRender}
            />

            {/* PureComponent */}
            <PureCounter 
              count={pureCounter} 
              onRender={this.trackPureRender}
            />

            {/* Controls */}
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Controls</h4>
              <div style={{ marginBottom: '10px' }}>
                <button 
                  onClick={this.incrementRegular} 
                  style={{ 
                    marginRight: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Increment Regular
                </button>
                <button 
                  onClick={this.incrementPure} 
                  style={{ 
                    marginRight: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Increment Pure
                </button>
              </div>
              <div>
                <button 
                  onClick={this.forceParentRerender} 
                  style={{ 
                    marginRight: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#ffc107', 
                    color: 'black', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Force Parent Re-render
                </button>
                <button 
                  onClick={this.reset} 
                  style={{ 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px' 
                  }}
                >
                  Reset All
                </button>
              </div>
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
                <p style={{ color: '#6c757d' }}>No actions logged yet. Try the controls!</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
          <h3>Key Points About PureComponent:</h3>
          <ul>
            <li><strong>Automatic Optimization:</strong> Implements shouldComponentUpdate with shallow comparison</li>
            <li><strong>Performance:</strong> Prevents unnecessary re-renders when props/state haven't changed</li>
            <li><strong>Shallow Comparison:</strong> Compares props and state at the top level only</li>
            <li><strong>When to Use:</strong> When you have simple props/state that don't change often</li>
            <li><strong>When NOT to Use:</strong> When props/state contain complex objects or arrays</li>
            <li><strong>Trade-off:</strong> Slight overhead for comparison vs potential performance gain</li>
          </ul>
        </div>

        {/* Experiment Instructions */}
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <h4>Try This Experiment:</h4>
          <ol>
            <li>Click "Force Parent Re-render" multiple times</li>
            <li>Notice how Regular Component re-renders every time</li>
            <li>Notice how PureComponent doesn't re-render (props unchanged)</li>
            <li>Click "Increment Regular" or "Increment Pure" to see both re-render</li>
            <li>Check the render counts to see the difference!</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default PureComponentDemo;
