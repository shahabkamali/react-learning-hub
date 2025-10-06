import React from 'react';


type State = {
    count: number;
    todos: any[]; // or a more specific type
  };

  
class ListsDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
        count: 0,
        todos: []

     };
    console.log("constructor");
  }


  componentDidMount() {
    // fetch a test JSON when the component mounts
    setTimeout(() => {
        //fetc 
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => {
                this.setState({ todos: data, count: data.length });
                console.log("Fetched test JSON:", data);
            })
            .catch(error => {
                console.error("Error fetching test JSON:", error);
            });
    }, 2000);
    console.log("componentDidMount");
  }

  render() {
    console.log("render");
    return (
      <div>
        <h2>Class Component Life Cycles Demo</h2>
        <p>Todos: {this.state.todos.length}</p>
        {this.state.todos.length > 0 ? (
            <div>
                <p>Count: {this.state.count}</p>
                <ul>
                    {this.state.todos.map((todo) => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default ListsDemo;
