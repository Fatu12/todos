import './App.css';
import React, {useState} from 'react'

function App() {
  /*
  BEFORE YOU DO ANYTHING THINK WHAT CAN CHANGE AND WHAT CAN'T ,
  what can change can put in to STATE
  Below array destructure syntax is equivalent to:
  const newTodoStateArr = useState("")
  const newTodo = newTodoStateArr[0];
  const setNewTodo = newTodoStateArr[1];
  useState alway return array of two element

  
  */
//? THIS IS FOR INPUT LIST AND USESTATE ALWAY RETURN TWO ELEMENT OF ARRAY
//? WHEN IT OBJECT IT NEED TO BE MATCH WITH THE KEY BUT WHEN  IT ARRAY CAN NAME HOWEVER WE WANT

  const [newTodo, setNewTodo] = useState("");
  // delete or add ARRAY, setting to empty is better because if you try to map using map, it would break, 
  // but id you set to null it will break

  const [todos, setTodos] = useState([]);
  
   const handleNewTodoSubmit = (e)=>{
    e.preventDefault();
    // handling to not allow the user to submit an empty
    if(newTodo.length === 0){
      return
    }
    const todoItem = {
      text: newTodo,
      complete: false
    };
  
    // storing the new values ,setTodos and pass in a brand new array containing all current todos plus 1 more
    
    // ! in react we don't push to array, because it seen the current and the new array as one, so  it doesn't going to update the 
    //! page

    setTodos([...todos, todoItem]);
    // ! if we change the state it doesn't change the what is inside the inputs box 
    // ! do clear what in the inputs box as well we need to do values in our form
    // after we submit  our form
    setNewTodo("");
  };
  // we deleting index since it unique, we using the index we pass to our map
  const handleTodoDelete= (delIdx) =>{
    // ? filter give as new array, that 0 item removed or not 
    const filteredTodos = todos.filter((todo,i)=>{
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  };
  const handleTodoComplete = (idx)=>{
    const updateTodos = todos.map((todo,i)=>{
      if(idx === i){
        todo.complete = !todo.complete;
        // To avoid mutating the todo directly, do this :
        // const updateTodos = {...todo, complete: !todo.complete}
        // return updateTodos
      }
      return todo
    });
    setTodos(updateTodos);

  }
  return (
    <div style={{textAlign : 'center'}}>
      {/* WHAT EVER WE HAVE FORM we need to have event on it */}
      <form onSubmit={(event)=>{handleNewTodoSubmit(event);}}>
        {/* we need to keep track of the input since it get change, so we need to update newTodo */}
        <input onChange = {(event) => {
          setNewTodo(event.target.value);
        }} type="text" value={newTodo} />
        <div>
          <button>Add</button>
        </div>

      </form>
      <hr />
    
      {/* let display all of this todos , in order to this we need to convert our array to jsx*/}
      {/* this mapping one to one  */}
      {/* ['todo1', 'todo2'] 
      {
        // this going to render
        [<div>todo1</div>,
        <div>todo2</div>
        ]
      } */}
      {/* the first parameter give us the current item, get iterate to and the second one give us
      the index of */}
      {
        //! this rerending the page that's why we seeing the item add to it
        // the index is a unique, but todo might not be because someone can add the something twice 
        // ! .map alway give us new array of the same length, the item transform bises on whatever you return 
        // ! transform to new form 
        todos.map((todo,i) =>{
          const todoClasses = ["bold","italic"];
          if(todo.todoClasses){
            todoClasses.push("line-through");
          }
          return(<div key={i}>
            <input onChange={(event)=>{
              handleTodoComplete(i)

            }} checked={todo.complete} type="checkbox" />
            <span className= {todoClasses.join(" ")}>{todo.text}</span>
            {/* now we going to handle the delete button */}
            <button style={{marginLeft : '10px'}} onClick={(event) => {
              handleTodoDelete(i);
            }} >Delete</button>
          </div>)
        })
      }

    </div>
  );
}

export default App;
