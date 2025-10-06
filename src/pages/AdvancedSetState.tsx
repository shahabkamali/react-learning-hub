import React from 'react';

// Advanced setState with Callback Functions
// React's setState is asynchronous and may be batched for performance
// Use callback function: this.setState((prevState, props) => newState)
// This ensures you're working with the most up-to-date state values

type State = {
  counter: number;
  message: string;
};

class AdvancedSetStateDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
      message: 'Click buttons to see setState behavior'
    };
  }

  // WRONG WAY: Using stale state
  wrongWay = () => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 });
    // Only increments by 1, not 3!
    this.setState({ message: 'Wrong way: Only incremented by 1 due to stale state' });
  };

  // CORRECT WAY: Using callback function
  correctWay = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
    // Correctly increments by 3!
    this.setState({ message: 'Correct way: Incremented by 3 using callback function' });
  };

  // Reset counter
  reset = () => {
    this.setState({ counter: 0, message: 'Counter reset' });
  };

  render() {
    const { counter, message } = this.state;

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Advanced setState Demo</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h3>Counter: {counter}</h3>
          <p>{message}</p>
          
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={this.wrongWay} 
              style={{ 
                marginRight: '10px', 
                padding: '8px 15px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px' 
              }}
            >
              Wrong Way (+3)
            </button>
            
            <button 
              onClick={this.correctWay} 
              style={{ 
                marginRight: '10px', 
                padding: '8px 15px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px' 
              }}
            >
              Correct Way (+3)
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
              Reset
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
          <h4>Key Points:</h4>
          <ul>
            <li><strong>setState is asynchronous</strong> - React batches updates for performance</li>
            <li><strong>Stale state problem</strong> - this.state may not have the latest value</li>
            <li><strong>Use callback function</strong> - (prevState) =&gt; newState ensures current state</li>
            <li><strong>Multiple calls</strong> - Each callback gets the updated state from previous call</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AdvancedSetStateDemo;