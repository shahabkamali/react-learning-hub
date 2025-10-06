import React from 'react';

// React Refs - Direct DOM Access
// Refs provide a way to access DOM elements directly
// Use React.createRef() to create a ref, then attach it to a DOM element
// Access the DOM element via ref.current
// Useful for: focus management, text selection, media playback, animations

type State = {
  inputValue: string;
  selectedText: string;
  logMessages: string[];
};

class RefsDemo extends React.Component<any, State> {
  // Create refs for different DOM elements
  private inputRef = React.createRef<HTMLInputElement>();
  private textareaRef = React.createRef<HTMLTextAreaElement>();
  private divRef = React.createRef<HTMLDivElement>();
  private buttonRef = React.createRef<HTMLButtonElement>();

  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      selectedText: '',
      logMessages: []
    };
  }

  // Helper function to add log messages
  addLog = (message: string) => {
    this.setState(prevState => ({
      logMessages: [...prevState.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // Focus on input field
  focusInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
      this.addLog('Focused on input field');
    }
  };

  // Select all text in input
  selectInputText = () => {
    if (this.inputRef.current) {
      this.inputRef.current.select();
      this.addLog('Selected all text in input');
    }
  };

  // Clear input value
  clearInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
      this.setState({ inputValue: '' });
      this.addLog('Cleared input value');
    }
  };

  // Focus on textarea
  focusTextarea = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
      this.addLog('Focused on textarea');
    }
  };

  // Get selected text from textarea
  getSelectedText = () => {
    if (this.textareaRef.current) {
      const start = this.textareaRef.current.selectionStart;
      const end = this.textareaRef.current.selectionEnd;
      const selectedText = this.textareaRef.current.value.substring(start, end);
      this.setState({ selectedText });
      this.addLog(`Selected text: "${selectedText}"`);
    }
  };

  // Change div background color
  changeDivColor = () => {
    if (this.divRef.current) {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.divRef.current.style.backgroundColor = randomColor;
      this.addLog(`Changed div color to ${randomColor}`);
    }
  };

  // Reset div color
  resetDivColor = () => {
    if (this.divRef.current) {
      this.divRef.current.style.backgroundColor = '#f8f9fa';
      this.addLog('Reset div color');
    }
  };

  // Simulate button click programmatically
  simulateButtonClick = () => {
    if (this.buttonRef.current) {
      this.buttonRef.current.click();
      this.addLog('Simulated button click');
    }
  };

  // Handle input change
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  // Handle button click
  handleButtonClick = () => {
    this.addLog('Button was clicked!');
  };

  // Clear logs
  clearLogs = () => {
    this.setState({ logMessages: [] });
  };

  render() {
    const { inputValue, selectedText, logMessages } = this.state;

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h2>React Refs - DOM Access Demo</h2>
        <p>This page demonstrates how to use refs to access DOM elements directly.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Left Column - Examples */}
          <div>
            <h3>Interactive Examples</h3>
            
            {/* Input Field Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Input Field Control</h4>
              <input
                ref={this.inputRef}
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                placeholder="Type something here..."
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div>
                <button onClick={this.focusInput} style={{ marginRight: '5px', padding: '5px 10px' }}>Focus</button>
                <button onClick={this.selectInputText} style={{ marginRight: '5px', padding: '5px 10px' }}>Select All</button>
                <button onClick={this.clearInput} style={{ padding: '5px 10px' }}>Clear</button>
              </div>
            </div>

            {/* Textarea Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Textarea Selection</h4>
              <textarea
                ref={this.textareaRef}
                rows={3}
                defaultValue="Select some text in this textarea and click 'Get Selected Text'"
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <div>
                <button onClick={this.focusTextarea} style={{ marginRight: '5px', padding: '5px 10px' }}>Focus</button>
                <button onClick={this.getSelectedText} style={{ padding: '5px 10px' }}>Get Selected Text</button>
              </div>
              {selectedText && <p>Selected: "{selectedText}"</p>}
            </div>

            {/* Div Styling Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Div Styling</h4>
              <div
                ref={this.divRef}
                style={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: '#f8f9fa',
                  border: '2px dashed #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                  borderRadius: '4px'
                }}
              >
                Click buttons to change my color!
              </div>
              <div>
                <button onClick={this.changeDivColor} style={{ marginRight: '5px', padding: '5px 10px' }}>Random Color</button>
                <button onClick={this.resetDivColor} style={{ padding: '5px 10px' }}>Reset</button>
              </div>
            </div>

            {/* Button Simulation Example */}
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Button Simulation</h4>
              <button
                ref={this.buttonRef}
                onClick={this.handleButtonClick}
                style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}
              >
                Click Me
              </button>
              <button onClick={this.simulateButtonClick} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                Simulate Click
              </button>
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
              {logMessages.length === 0 ? (
                <p style={{ color: '#6c757d' }}>No actions logged yet. Try the examples!</p>
              ) : (
                logMessages.map((log, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
            <button onClick={this.clearLogs} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              Clear Logs
            </button>
          </div>
        </div>

        {/* Key Points */}
        <div style={{ backgroundColor: '#e7f3ff', padding: '15px', borderRadius: '5px' }}>
          <h3>Key Points About Refs:</h3>
          <ul>
            <li><strong>Direct DOM Access:</strong> Refs let you access DOM elements directly</li>
            <li><strong>Create Refs:</strong> Use React.createRef() to create a ref</li>
            <li><strong>Attach to Elements:</strong> Add ref prop to JSX elements</li>
            <li><strong>Access DOM:</strong> Use ref.current to access the DOM element</li>
            <li><strong>Use Cases:</strong> Focus management, text selection, styling, animations</li>
            <li><strong>Avoid Overuse:</strong> Use sparingly, prefer React's declarative approach</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RefsDemo;



