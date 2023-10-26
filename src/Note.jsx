import React from 'react'
export const Note = (props) => {

  const deleteItem=()=>{
  
      fetch("http://localhost:3005/todos", {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.length > 0) {
            
              props.onDelete(data[props.id].id);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    
   
  }

  const editNote=()=>{

    fetch("http://localhost:3005/todos", {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.length > 0) {
            
              props.onEdit(data[props.id].id);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

   


  }
  return (
    


<div className="note">

<button
  onClick={deleteItem}
>
  Delete
</button>

<li key={props.id}>{props.text}</li>
<button
  onClick={editNote}
>
  Edit
</button>
</div>
    
  )
}
export default Note;
