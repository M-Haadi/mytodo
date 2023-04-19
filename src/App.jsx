import React, { useState } from "react";
import Note from "./Note";
import InputContainer from "./InputContainer";
const App = () => {
  let ExistingItems = JSON.parse(localStorage.getItem("mynotes"));

  const [inputValue, setInputvalue] = useState("");
  const [listItems, setListItems] = useState(ExistingItems || []);
  const [edit_add_state, setedit_add_state]=useState('addState');
  const[id, setId]=useState(null);

  const inputFieldChanged = (e) => {
    setInputvalue(e.target.value);
    return(inputValue)
  };

  const addItem = () => {

    if(edit_add_state=='editState'){
      setListItems((oldItems) => {
        oldItems[id]=inputValue;
        localStorage.setItem(
          "mynotes",
          JSON.stringify([...oldItems])
        );
        setedit_add_state('addState');
        setInputvalue("");
        return [...oldItems];

      });

    }

    else if(edit_add_state=='addState'){    setListItems((oldItems) => {
      localStorage.setItem(
        "mynotes",
        JSON.stringify([...oldItems, inputValue])
      );
      return [...oldItems, inputValue];
    });
    setInputvalue(""); }

  };

  const addItemOnKeyUp = (e) => {
    if (e.key === "Enter") {
      setListItems((oldItems) => {
        localStorage.setItem(
          "mynotes",
          JSON.stringify([...oldItems, inputValue])
        );
        return [...oldItems, inputValue];
      });
      setInputvalue("");
    }
  };

  const deleteItem = (index) => {
    setListItems((oldItems) => {
      const newItems = oldItems.filter((item, i) => i !== index);
      localStorage.setItem("mynotes", JSON.stringify(newItems));
      return newItems;
    });
  };
    const editItem = (index) => {
        setedit_add_state('editState');
        setInputvalue(listItems[index]);
        setId(index);
  };

  return (
    <>
      <h1>React Todo List</h1>
      <div className="container">
        <div className="mainBox">
         <InputContainer
          ChangeInput={inputFieldChanged}
          keyUp={addItemOnKeyUp}
          value={inputValue}
          additem={addItem}
         />

          <div className="notes-container">
            {listItems.map((items, index) => {
              return (
                <>
                  <Note
                    key={index}
                    id={index}
                    text={items}
                    onDelete={
                      deleteItem
                     }
                    onEdit={
                      editItem
                    
                    }
                  />
                </>
              );
            })}

          </div>
        </div>
      </div>

      {/* <div className="footer">m_hadi © 2023</div> */}
    </>
  );
}
export default App;