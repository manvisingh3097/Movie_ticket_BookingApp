// import React, { useState, useEffect } from "react";
// import axios from 'axios'

// function App() {
//   const [count, setCount] = useState(5);
//   const [theme, setTheme] = useState("blue");

//   function decrementCount() {
//     setCount((prevCount) => prevCount - 1);
//     setTheme('pink')
//   }

//   function incrementCount() {
//     setCount((prevCount) => prevCount + 1);
//     setTheme('red')
//   }

//   return (
//     <>
//       <button onClick={decrementCount}> - </button>
//       <span> {count} </span>
//       <span> {theme} </span>
//       <button onClick={incrementCount}> + </button>
//     </>
//   );
// }

// export default App;

// export default function App() {
//   const [resourceType, setResourceType] = useState("posts");
//   const [items , setItems] = useState([])



//   useEffect(() => {
//     console.log("resource changed");

//     return() => {
//         console.log("return from resource changed");
//     }
//   }, [resourceType]);

//   return (
//     <>
//       <div>
//         <button onClick={() => setResourceType("posts")}>posts</button>
//         <button onClick={() => setResourceType("users")}>users</button>
//         <button onClick={() => setResourceType("comments")}>comments</button>
//       </div>
//       <h1>{resourceType}</h1>
//       </>
//   );
// }

// const Axiostutorial =() => {

//     const [userdata , setdata] = useState([])


//     useEffect(() => {
//       axios.get("https://jsonplaceholder.typicode.com/users")
//       .then((response)=>{
//         console.log(response)
//         setdata(response.data)
//       })
  
//     }, []);
  
//     return (
//       <>
        
//         <div>Axiostutorial
//             {userdata.map((data)=> {
//                 return(
//                     <div>{data.name}</div>
//                 )
//             })}
//         </div>
       
        
//         </>
//     );
//   }
  
//   export default Axiostutorial; 

import { ChangeEvent,useState } from 'react';

export default function App() {
  const [inputText, setInputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={inputText} />

      {/* 👇 Use the input value from state */}
      <p>Your input: {inputText}</p>
    </div>
  );
}