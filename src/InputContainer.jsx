import React from 'react'

const InputContainer = (props) => {
    const inputFieldChanged=(e)=>{
        props.ChangeInput(e)
    }
    const addItemOnKeyUp=()=>{
        props.keyUp(props.value)
    }
    const addItem=()=>{
        props.additem();
    }

  return (
    <div className="inputContainer">
    <input
      type="text"
      placeholder="Add a new note..."
      onChange={inputFieldChanged}
      onKeyUp={addItemOnKeyUp}
      value={props.value}
    />
    <button className="addBtn" onClick={addItem}>
      +
    </button>
  </div>
  )
}

export default InputContainer;