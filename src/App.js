
import { useReducer , useState } from 'react';
import './App.css';


const reducer = (state,action) => {

  switch(action.type){
    case "add-todo":
      return {
        todos : [...state.todos,{text:action.text,completed:false}]
      }
      case "toggle-todo":
        return {
          todos : state.todos.map((todo,index) => index === action.index ? {...todo,completed:!todo.completed}:todo)
        }
        case "delete-todo":
        return {
          todos : state.todos.filter((todo,index) => index !== action.index)
        }
      default : 
      return state;
  }
}

function App() {

  const [{todos,todocount} , dispatch] = useReducer(reducer,{
    todos : [],
    todocount : 0
  });

  const [text, settext] = useState("");


  return (
    <div className="App">
     
    <form onSubmit={e => {
      e.preventDefault();
      dispatch({type:'add-todo',text})
      settext("");
    }}>
      <input type="text" value={text} onChange={e => settext(e.target.value)} />
    </form>

    {todos.map((todo,index) => (
      <div key={index}
      style={{textDecoration:todo.completed ? "line-through" : ""}}
      >{todo.text}
      <button  onClick={() => dispatch({type : 'toggle-todo',index})}>TOGGLE</button>
      <button onClick={() => dispatch({type : 'delete-todo',index})}>DLT</button>
      </div>
    ))}
    </div>
  );
}

export default App;
