import React from 'react'

export const Note = (props) => {

  const deleteItem=()=>{
    props.onDelete(props.id);
  }

  const editNote=()=>{
    props.onEdit(props.id);
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
