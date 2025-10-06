import React from 'react';

// React Fragments allow you to group multiple elements without adding extra DOM nodes
// Instead of wrapping elements in a div, you can use <React.Fragment> or <>...</>
// This is useful when you need to return multiple elements from a component
// but don't want to add unnecessary wrapper elements to the DOM tree
// Fragments help keep the DOM clean and improve performance

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type State = {
  users: User[];
  loading: boolean;
  error: string | null;
};

class UsersDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      error: null
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    // Fetch users from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ 
          users: data, 
          loading: false 
        });
        console.log("Fetched users:", data);
      })
      .catch(error => {
        this.setState({ 
          error: error.message, 
          loading: false 
        });
        console.error("Error fetching users:", error);
      });
  }

  render() {
    console.log("render");
    const { users, loading, error } = this.state;

    return (
      <React.Fragment>
        <h2>Users Demo - API Fetching & Fragments</h2>
        
        {loading && (
          <p>Loading users...</p>
        )}
        
        {error && (
          <p style={{ color: 'red' }}>Error: {error}</p>
        )}
        
        {!loading && !error && users.length > 0 && (
          <React.Fragment>
            <p>Total Users: {users.length}</p>
            <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Website</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.phone}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}
        
        {!loading && !error && users.length === 0 && (
          <p>No users found.</p>
        )}
      </React.Fragment>
    );
  }
}

export default UsersDemo;
