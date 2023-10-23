import './App.css';
import { useState } from 'react';

function App() {
  // usestates
  const [todos,setTodoes]=useState([]);
  const [category, setCategory]=useState('All');
  const [todoText, setTodoText]=useState('');
  const [idCounter, setIdCounter]=useState(0);

// variable for placeholder text
  const placeholderText=`Add a new task inside ${category} category`

// function to add a todo item to the list
  const addTodo = (text) => {
    const todoCategory = category === 'All' ? 'Uncategorized' : category;
    setTodoes([...todos, { id: idCounter, text, category: todoCategory }]);
    setIdCounter(idCounter + 1);
  }

// function for competed todos
  const completeTodoes=(id)=>{
    const updatedTodos=todos.map((i)=>{
      if(i.id===id){
        return{...i,completed: !i.completed}
      }
      return i
    })
    setTodoes(updatedTodos)

  }

// function for delete todos
  const deleteTodos=(id)=>{
      let updatedTodos=todos.filter((i)=> i.id !==id);
      setTodoes(updatedTodos)
  }

  // function to filter todoes based on the category
  const filteredTodoes=todos.filter((todo)=>{
    return category==='All' || todo.category===category;
  })

  return (
    <div className="App">
      <div className="container">

        <div className="mainContent">

          <div className="buttonContainer">

            {/* category buttons */}
            <button onClick={()=> setCategory('All')} className={category==='All' ? 'selectedCategory' :'notSelected'}>All</button>
            <button onClick={()=> setCategory('Groceries')}  className={category==='Groceries' ? 'selectedCategory' :'notSelected'}>Groceries</button>
            <button onClick={()=> setCategory('College')}  className={category==='College' ? 'selectedCategory' :'notSelected'}>College</button>
            <button onClick={()=> setCategory('Payments')}  className={category==='Payments' ? 'selectedCategory' :'notSelected'}>Payments</button>
          </div>

            {/* input */}
          <div className="inputAndTodolist">
            <h1 className='title'>{category} Tasks</h1>
           
              <input className='input' type="text"
               value={todoText}
               placeholder={placeholderText}
               onChange={(e)=>setTodoText(e.target.value)}
               onKeyPress={(e)=>{
                if(e.key==='Enter'){
                  addTodo(todoText);
                  setTodoText('')
                }
               }} />

              {/* todo list */}
          <ul>
          {filteredTodoes.map((i)=>(

            <li key={i.id}>

            <button
              className={`compleateTodo ${i.completed ? 'completed' : 'notCompleted'}`}
              onClick={() => completeTodoes(i.id)}></button>
          
              <p style={{ textDecoration: i.completed ? 'line-through' : 'none' }}>{i.text}</p>
           
              <span>{i.category}</span>

               <img
              className='deleteImg'
              src="/delete.svg"
              alt=""
              onClick={() => deleteTodos(i.id)}/>

          </li>
          ))}
         </ul>
          </div>

        </div>


      </div>
     
    </div>
  );
}

export default App;
