import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

function TripCheck() {
  const { userid } = useParams();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/retrieve/checklist/${userid}`
      );
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/store/checklist`,
        {
          checklist: inputValue,
          userID: userid,
          status: false // Set initial status as false
        }
      );
      await fetchTodos();
      console.log(response.data);
      setInputValue("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/checklist/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/update/checklist/${id}`, {
        status: !status // Toggle the status
      });
      await fetchTodos(); // Fetch updated todos from the database
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="checklist_container">
      <h1>Trip Checklist</h1>
      <div className="container">
        <h3>Create checklist</h3>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button type="submit">
            Add <FaPlusCircle />
          </button>
        </form>
        <div className="checklist">
          <h2>My Checklist</h2>
          {todos.map((todo) => (
            <div className="list" key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => handleToggleStatus(todo._id, todo.status)}
                />
              <div id="text">
                <p style={{ textDecoration: todo.status ? "line-through" : "none" }}>{todo.checklist}</p>
                <div className="items">
                  <button onClick={() => handleDeleteTodo(todo._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripCheck;
