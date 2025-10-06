import React from 'react';

// Component Unmounting and Cleanup
// componentWillUnmount is called right before a component is removed from the DOM
// Use it to clean up timers, cancel network requests, remove event listeners
// This prevents memory leaks and unwanted side effects

type State = {
  showTimerComponent: boolean;
  showIntervalComponent: boolean;
  showEventListenerComponent: boolean;
  logs: string[];
};

// Component with timer cleanup
class TimerComponent extends React.Component<{}, { count: number }> {
  private timerId: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('TimerComponent mounted');
    this.startTimer();
  }

  componentWillUnmount() {
    console.log('TimerComponent will unmount - cleaning up timer');
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  startTimer = () => {
    this.timerId = setTimeout(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }));
      this.startTimer(); // Restart timer
    }, 1000);
  };

  render() {
    return (
      <div style={{ padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px', margin: '5px' }}>
        <h4>Timer Component</h4>
        <p>Count: {this.state.count}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Updates every second. Timer will be cleaned up on unmount.
        </p>
      </div>
    );
  }
}

// Component with interval cleanup
class IntervalComponent extends React.Component<{}, { time: string }> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString() };
  }

  componentDidMount() {
    console.log('IntervalComponent mounted');
    this.startInterval();
  }

  componentWillUnmount() {
    console.log('IntervalComponent will unmount - cleaning up interval');
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startInterval = () => {
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  };

  render() {
    return (
      <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', margin: '5px' }}>
        <h4>Interval Component</h4>
        <p>Current Time: {this.state.time}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Updates every second. Interval will be cleaned up on unmount.
        </p>
      </div>
    );
  }
}

// Component with event listener cleanup
class EventListenerComponent extends React.Component<{}, { clickCount: number; keyPressCount: number }> {
  private handleClick: (() => void) | null = null;
  private handleKeyPress: ((event: KeyboardEvent) => void) | null = null;

  constructor(props: any) {
    super(props);
    this.state = { clickCount: 0, keyPressCount: 0 };
  }

  componentDidMount() {
    console.log('EventListenerComponent mounted');
    this.addEventListeners();
  }

  componentWillUnmount() {
    console.log('EventListenerComponent will unmount - removing event listeners');
    this.removeEventListeners();
  }

  addEventListeners = () => {
    this.handleClick = () => {
      this.setState(prevState => ({ clickCount: prevState.clickCount + 1 }));
    };

    this.handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.setState(prevState => ({ keyPressCount: prevState.keyPressCount + 1 }));
      }
    };

    document.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleKeyPress);
  };

  removeEventListeners = () => {
    if (this.handleClick) {
      document.removeEventListener('click', this.handleClick);
      this.handleClick = null;
    }
    if (this.handleKeyPress) {
      document.removeEventListener('keydown', this.handleKeyPress);
      this.handleKeyPress = null;
    }
  };

  render() {
    const { clickCount, keyPressCount } = this.state;
    
    return (
      <div style={{ padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '5px', margin: '5px' }}>
        <h4>Event Listener Component</h4>
        <p>Document Clicks: {clickCount}</p>
        <p>Enter Key Presses: {keyPressCount}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          Listens to document clicks and Enter key. Event listeners will be removed on unmount.
        </p>
      </div>
    );
  }
}

// Component without cleanup (demonstrates memory leak)
class LeakyComponent extends React.Component<{}, { count: number }> {
  private timerId: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('LeakyComponent mounted - NO cleanup implemented');
    this.timerId = setTimeout(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }));
      if (this.timerId) {
        this.timerId = setTimeout(() => {
          this.setState(prevState => ({ count: prevState.count + 1 }));
        }, 1000);
      }
    }, 1000);
  }

  // NO componentWillUnmount - this will cause memory leaks!

  render() {
    return (
      <div style={{ padding: '10px', backgroundColor: '#f8d7da', borderRadius: '5px', margin: '5px' }}>
        <h4>Leaky Component (No Cleanup)</h4>
        <p>Count: {this.state.count}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          ⚠️ This component doesn't clean up its timer - causes memory leaks!
        </p>
      </div>
    );
  }
}

class UnmountingDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showTimerComponent: false,
      showIntervalComponent: false,
      showEventListenerComponent: false,
      logs: []
    };
  }

  // Helper function to add logs
  addLog = (message: string) => {
    this.setState(prevState => ({
      logs: [...prevState.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  toggleTimerComponent = () => {
    this.setState(prevState => ({
      showTimerComponent: !prevState.showTimerComponent
    }));
    this.addLog(`Timer component ${!this.state.showTimerComponent ? 'mounted' : 'unmounted'}`);
  };

  toggleIntervalComponent = () => {
    this.setState(prevState => ({
      showIntervalComponent: !prevState.showIntervalComponent
    }));
    this.addLog(`Interval component ${!this.state.showIntervalComponent ? 'mounted' : 'unmounted'}`);
  };

  toggleEventListenerComponent = () => {
    this.setState(prevState => ({
      showEventListenerComponent: !prevState.showEventListenerComponent
    }));
    this.addLog(`Event listener component ${!this.state.showEventListenerComponent ? 'mounted' : 'unmounted'}`);
  };

  clearLogs = () => {
    this.setState({ logs: [] });
  };

  render() {
    const { showTimerComponent, showIntervalComponent, showEventListenerComponent, logs } = this.state;

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2>Component Unmounting and Cleanup</h2>
        <p>This page demonstrates proper cleanup in componentWillUnmount to prevent memory leaks.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Left Column - Examples */}
          <div>
            <h3>Cleanup Examples</h3>
            
            {/* Timer Component */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Timer Cleanup</h4>
              <button 
                onClick={this.toggleTimerComponent}
                style={{ 
                  padding: '8px 15px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              >
                {showTimerComponent ? 'Unmount' : 'Mount'} Timer Component
              </button>
              
              {showTimerComponent && <TimerComponent />}
            </div>

            {/* Interval Component */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Interval Cleanup</h4>
              <button 
                onClick={this.toggleIntervalComponent}
                style={{ 
                  padding: '8px 15px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              >
                {showIntervalComponent ? 'Unmount' : 'Mount'} Interval Component
              </button>
              
              {showIntervalComponent && <IntervalComponent />}
            </div>

            {/* Event Listener Component */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Event Listener Cleanup</h4>
              <button 
                onClick={this.toggleEventListenerComponent}
                style={{ 
                  padding: '8px 15px', 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              >
                {showEventListenerComponent ? 'Unmount' : 'Mount'} Event Listener Component
              </button>
              
              {showEventListenerComponent && <EventListenerComponent />}
            </div>

            {/* Leaky Component Warning */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #dc3545', borderRadius: '5px', backgroundColor: '#f8d7da' }}>
              <h4>⚠️ Memory Leak Example</h4>
              <p>This component doesn't implement componentWillUnmount:</p>
              <LeakyComponent />
              <p style={{ fontSize: '12px', color: '#721c24', marginTop: '10px' }}>
                <strong>Warning:</strong> Always clean up timers, intervals, and event listeners!
              </p>
            </div>
          </div>

          {/* Right Column - Logs */}
          <div>
            <h3>Console Logs</h3>
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
                <p style={{ color: '#6c757d' }}>No actions logged yet. Mount/unmount components!</p>
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
          <h3>Key Points About Component Unmounting:</h3>
          <ul>
            <li><strong>componentWillUnmount:</strong> Called right before component is removed from DOM</li>
            <li><strong>Cleanup Timers:</strong> Always clear setTimeout and setInterval</li>
            <li><strong>Remove Event Listeners:</strong> Prevent memory leaks from event handlers</li>
            <li><strong>Cancel Requests:</strong> Abort ongoing network requests</li>
            <li><strong>Memory Leaks:</strong> Unclean components can cause performance issues</li>
            <li><strong>Best Practice:</strong> Always implement cleanup for side effects</li>
          </ul>
        </div>

        {/* What to Clean Up */}
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
          <h3>What to Clean Up in componentWillUnmount:</h3>
          <ul>
            <li><strong>Timers:</strong> clearTimeout(), clearInterval()</li>
            <li><strong>Event Listeners:</strong> removeEventListener()</li>
            <li><strong>Network Requests:</strong> AbortController.abort()</li>
            <li><strong>Subscriptions:</strong> Unsubscribe from observables</li>
            <li><strong>WebSocket Connections:</strong> Close connections</li>
            <li><strong>Third-party Libraries:</strong> Clean up any initialized resources</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UnmountingDemo;

