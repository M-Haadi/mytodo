import React, { useEffect, useState } from "react";
import Note from "./Note";
import InputContainer from "./InputContainer";
const App = () => {

  const [inputValue, setInputvalue] = useState("");
  const [listItems, setListItems] = useState([]);
  const [edit_add_state, setedit_add_state] = useState("addState");
  const [id, setId] = useState(null);

  const inputFieldChanged = (e) => {
    setInputvalue(e.target.value);

  };

  const getAllData = () => {
    fetch("http://localhost:3005/todos", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          setListItems(data);
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getDatabyId = async (id) => {
    await fetch(`http://localhost:3005/todos/${id}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setInputvalue(data.todoData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateData=async(newData)=>{

    try {
      await fetch(`http://localhost:3005/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.log("Error:", error);
    }

getAllData()

  }
  useEffect(() => {
    getAllData();
  }, []);

  async function createData(newData) {
    try {
      await fetch("http://localhost:3005/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.log("Error:", error);
    }

  }

  const addItem = async () => {
    if (edit_add_state == "editState") {
      let todoObj={todoData:inputValue}
          updateData(todoObj)
    } else if (edit_add_state == "addState") {
      let todoObj = { todoData: inputValue };
      createData(todoObj);
      setInputvalue("");
      getAllData()
    }
 
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

    fetch(`http://localhost:3005/todos/${index}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data deleted successfully");
        return;
      }
      throw new Error("Data deletion failed");
    })
    .catch((error) => console.error("Error:", error));
    getAllData()
  };
  const editItem = (index) => {
    setedit_add_state("editState");
    setId(index);
    getDatabyId(index);
    
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
                    text={items.todoData}
                    onDelete={deleteItem}
                    onEdit={editItem}
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
};
export default App;
