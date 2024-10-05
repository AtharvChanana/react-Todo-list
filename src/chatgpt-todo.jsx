import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const todolist = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Add new todo
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  // Delete a todo
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Enable edit mode
  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  // Save edited todo
  const handleSaveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editText.trim();
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  // Toggle completed status
  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Handle dragging
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border border-gray-300 p-2 rounded w-full mr-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* DragDropContext is the wrapper for drag-and-drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-todos">
          {(provided) => (
            <ul
              className="space-y-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between p-2 border border-gray-200 rounded ${
                        todo.completed ? 'bg-green-100 line-through' : ''
                      } ${snapshot.isDragging ? 'bg-blue-100 shadow-lg' : ''}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleComplete(index)}
                          className="mr-2"
                        />
                        {editIndex === index ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border border-gray-300 p-1 rounded w-full"
                          />
                        ) : (
                          <span>{todo.text}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {editIndex === index ? (
                          <button
                            onClick={() => handleSaveEdit(index)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditTodo(index)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default todolist;