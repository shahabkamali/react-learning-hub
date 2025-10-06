import React from 'react';

type State = {
    count: number;
    todos: any[]; // or a more specific type
  };

  
class LifeCycleDemo extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { 
        count: 0,
        todos: []

     };
    console.log("constructor");
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

export default LifeCycleDemo;
