import React from 'react';

// Stateless Components (Functional Components)
// Stateless components are simple functions that take props and return JSX
// They don't have internal state, lifecycle methods, or this keyword
// They are easier to test, understand, and optimize
// Use them when you don't need state or lifecycle methods

type State = {
  selectedExample: string;
  logs: string[];
};

// Simple Stateless Component
const SimpleStatelessComponent = (props: { name: string; age: number }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px', margin: '5px' }}>
      <h4>Simple Stateless Component</h4>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        This is a pure function that takes props and returns JSX
      </p>
    </div>
  );
};

// Stateless Component with Conditional Rendering
const ConditionalStatelessComponent = (props: { isLoggedIn: boolean; username?: string }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '5px', margin: '5px' }}>
      <h4>Conditional Rendering</h4>
      {props.isLoggedIn ? (
        <p>Welcome back, {props.username}!</p>
      ) : (
        <p>Please log in to continue</p>
      )}
      <p style={{ fontSize: '12px', color: '#666' }}>
        Uses conditional rendering based on props
      </p>
    </div>
  );
};

// Stateless Component with Event Handlers
const InteractiveStatelessComponent = (props: { 
  onClick: () => void; 
  buttonText: string;
  count: number;
}) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', margin: '5px' }}>
      <h4>Interactive Stateless Component</h4>
      <p>Count: {props.count}</p>
      <button 
        onClick={props.onClick}
        style={{ 
          padding: '5px 10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px' 
        }}
      >
        {props.buttonText}
      </button>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Receives event handlers as props from parent
      </p>
    </div>
  );
};

// Stateless Component with Children
const ContainerStatelessComponent = (props: { 
  title: string; 
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{ 
      padding: '15px', 
      border: '2px solid #6c757d', 
      borderRadius: '5px', 
      margin: '5px',
      ...props.style
    }}>
      <h4>{props.title}</h4>
      {props.children}
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        This component renders its children
      </p>
    </div>
  );
};

// Stateless Component with Default Props
const DefaultPropsComponent = (props: { 
  message?: string; 
  type?: 'info' | 'warning' | 'error';
}) => {
  const { message = 'Default message', type = 'info' } = props;
  
  const getStyle = () => {
    switch (type) {
      case 'warning':
        return { backgroundColor: '#fff3cd', borderColor: '#ffc107' };
      case 'error':
        return { backgroundColor: '#f8d7da', borderColor: '#dc3545' };
      default:
        return { backgroundColor: '#d1ecf1', borderColor: '#17a2b8' };
    }
  };

  return (
    <div style={{ 
      padding: '10px', 
      border: '2px solid',
      borderRadius: '5px', 
      margin: '5px',
      ...getStyle()
    }}>
      <h4>Default Props Component</h4>
      <p>{message}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Type: {type} (uses default props)
      </p>
    </div>
  );
};

// Stateless Component with Array Mapping
const ListStatelessComponent = (props: { 
  items: string[]; 
  onItemClick: (item: string) => void;
}) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', margin: '5px' }}>
      <h4>List Component</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {props.items.map((item, index) => (
          <li 
            key={index}
            onClick={() => props.onItemClick(item)}
            style={{ 
              padding: '5px', 
              margin: '2px 0', 
              backgroundColor: '#e9ecef', 
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Maps over array and renders list items
      </p>
    </div>
  );
};

// Stateful Component for Comparison
class StatefulComponent extends React.Component<{}, { count: number; message: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
      message: 'This is a stateful component'
    };
  }

  incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div style={{ padding: '10px', backgroundColor: '#f8d7da', borderRadius: '5px', margin: '5px' }}>
        <h4>Stateful Component</h4>
        <p>{this.state.message}</p>
        <p>Count: {this.state.count}</p>
        <button 
          onClick={this.incrementCount}
          style={{ 
            padding: '5px 10px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px' 
          }}
        >
          Increment
        </button>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Has internal state and lifecycle methods
        </p>
      </div>
    );
  }
}

class StatelessDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedExample: 'simple',
      logs: []
    };
  }

  // Helper function to add logs
  addLog = (message: string) => {
    this.setState(prevState => ({
      logs: [...prevState.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // Event handlers for stateless components
  handleButtonClick = () => {
    this.addLog('Button clicked in stateless component');
  };

  handleItemClick = (item: string) => {
    this.addLog(`List item clicked: ${item}`);
  };

  // Sample data
  sampleItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  render() {
    const { selectedExample, logs } = this.state;

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h2>Stateless Components (Functional Components)</h2>
        <p>This page demonstrates stateless components and compares them with stateful components.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Left Column - Examples */}
          <div>
            <h3>Stateless Component Examples</h3>
            
            {/* Simple Stateless Component */}
            <SimpleStatelessComponent name="John Doe" age={30} />

            {/* Conditional Rendering */}
            <ConditionalStatelessComponent isLoggedIn={true} username="Alice" />

            {/* Interactive Component */}
            <InteractiveStatelessComponent 
              onClick={this.handleButtonClick}
              buttonText="Click Me"
              count={5}
            />

            {/* Container Component */}
            <ContainerStatelessComponent 
              title="Container Component"
              style={{ backgroundColor: '#e9ecef' }}
            >
              <p>This content is passed as children to the stateless component.</p>
            </ContainerStatelessComponent>

            {/* Default Props Component */}
            <DefaultPropsComponent />
            <DefaultPropsComponent message="Custom message" type="warning" />
            <DefaultPropsComponent message="Error message" type="error" />

            {/* List Component */}
            <ListStatelessComponent 
              items={this.sampleItems}
              onItemClick={this.handleItemClick}
            />

            {/* Stateful Component for Comparison */}
            <h3>Stateful Component (for comparison)</h3>
            <StatefulComponent />
          </div>

          {/* Right Column - Logs */}
          <div>
            <h3>Action Logs</h3>
            <div style={{ 
              height: '500px', 
              overflowY: 'auto', 
              border: '1px solid #ddd', 
              padding: '10px', 
              backgroundColor: '#f8f9fa',
              fontFamily: 'monospace',
              fontSize: '12px',
              marginBottom: '10px'
            }}>
              {logs.length === 0 ? (
                <p style={{ color: '#6c757d' }}>No actions logged yet. Interact with the components!</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
            <button 
              onClick={() => this.setState({ logs: [] })}
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
          <h3>Key Points About Stateless Components:</h3>
          <ul>
            <li><strong>Pure Functions:</strong> Take props and return JSX, no side effects</li>
            <li><strong>No State:</strong> Don't have internal state or this.state</li>
            <li><strong>No Lifecycle:</strong> Don't have componentDidMount, componentWillUnmount, etc.</li>
            <li><strong>Easier Testing:</strong> Simple functions are easier to test</li>
            <li><strong>Better Performance:</strong> React can optimize them more easily</li>
            <li><strong>Props Only:</strong> All data comes from props</li>
            <li><strong>Event Handlers:</strong> Receive functions as props from parent</li>
          </ul>
        </div>

        {/* When to Use */}
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <h3>When to Use Stateless Components:</h3>
          <ul>
            <li><strong>Presentational Components:</strong> Just display data from props</li>
            <li><strong>Reusable UI Elements:</strong> Buttons, inputs, cards, etc.</li>
            <li><strong>Simple Components:</strong> No complex logic or state needed</li>
            <li><strong>Performance Critical:</strong> When you need maximum optimization</li>
            <li><strong>Testing:</strong> When you want easy unit testing</li>
          </ul>
        </div>

        {/* Benefits */}
        <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <h3>Benefits of Stateless Components:</h3>
          <ul>
            <li><strong>Simplicity:</strong> Easier to understand and maintain</li>
            <li><strong>Predictability:</strong> Same props always produce same output</li>
            <li><strong>Reusability:</strong> Can be easily reused in different contexts</li>
            <li><strong>Performance:</strong> React can optimize them better</li>
            <li><strong>Testing:</strong> Pure functions are easier to test</li>
            <li><strong>Debugging:</strong> Fewer moving parts to debug</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StatelessDemo;

