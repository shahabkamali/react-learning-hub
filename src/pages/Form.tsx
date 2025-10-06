import React from 'react';

// Form handling in React involves managing form state and handling user input
// This component demonstrates controlled components, form validation, and state updates
// We use this.state to track form data and update it with this.setState()

type FormData = {
  name: string;
  email: string;
  age: string;
  message: string;
};

type State = {
  formData: FormData;
  errors: Partial<FormData>;
  isSubmitted: boolean;
  submittedData: FormData | null;
};

class FormDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        age: '',
        message: ''
      },
      errors: {},
      isSubmitted: false,
      submittedData: null
    };
    console.log("constructor - Form initialized");
  }

  // Handle input changes and update state
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      // Clear error when user starts typing
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
    console.log(`Input changed - ${name}: ${value}`);
  };

  // Validate form data
  validateForm = (): boolean => {
    const { formData } = this.state;
    const errors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.age.trim()) {
      errors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      errors.age = 'Age must be a number between 1 and 120';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");

    if (this.validateForm()) {
      // Simulate form submission
      this.setState({
        isSubmitted: true,
        submittedData: { ...this.state.formData }
      });
      
      console.log("Form data submitted:", this.state.formData);
      
      // Reset form after successful submission
      setTimeout(() => {
        this.setState({
          formData: {
            name: '',
            email: '',
            age: '',
            message: ''
          },
          isSubmitted: false,
          submittedData: null
        });
        console.log("Form reset");
      }, 3000);
    } else {
      console.log("Form validation failed");
    }
  };

  // Reset form
  handleReset = () => {
    this.setState({
      formData: {
        name: '',
        email: '',
        age: '',
        message: ''
      },
      errors: {},
      isSubmitted: false,
      submittedData: null
    });
    console.log("Form reset manually");
  };

  render() {
    const { formData, errors, isSubmitted, submittedData } = this.state;

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Test Form - State Management Demo</h2>
        <p>This form demonstrates controlled components and state management in React.</p>

        {isSubmitted && submittedData && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            border: '1px solid #c3e6cb', 
            color: '#155724', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <h3>Form Submitted Successfully!</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Age:</strong> {submittedData.age}</p>
            <p><strong>Message:</strong> {submittedData.message}</p>
            <p><em>Form will reset in 3 seconds...</em></p>
          </div>
        )}

        <form onSubmit={this.handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.name ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter your name"
            />
            {errors.name && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.name}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.email ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter your email"
            />
            {errors.email && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.email}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="age" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={this.handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.age ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px'
              }}
              placeholder="Enter your age"
              min="1"
              max="120"
            />
            {errors.age && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.age}</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={this.handleInputChange}
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                border: errors.message ? '2px solid #dc3545' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                resize: 'vertical'
              }}
              placeholder="Enter your message"
            />
            {errors.message && <span style={{ color: '#dc3545', fontSize: '14px' }}>{errors.message}</span>}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Submit Form
            </button>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Reset Form
            </button>
          </div>
        </form>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          <h4>Current Form State:</h4>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default FormDemo;



