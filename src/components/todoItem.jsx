import React, { useState } from 'react';
import { Pin, PinOff } from 'lucide-react';

const TodoItem = ({
  items,
  onTodoToggle,
  onTodoDelete,
  onTodoTextUpdate,
  onPinToggle,
}) => {
  const [showEditTodo, setShowEditTodo] = useState(false);

  function onTodoEdit(e) {
    e.preventDefault();
    const todoText = e.target['todo'].value;
    onTodoTextUpdate(items.id, todoText);
    setShowEditTodo(false);
  }

  const editTodoForm = (
    <li className="flex items-center justify-between bg-yellow-50 rounded-lg px-3 py-3 shadow">
      <form onSubmit={onTodoEdit}>
        <input
          type="text"
          className="flex-1  border-gray-300 focus:outline-none rounded px-2 py-2 mr-3"
          defaultValue={items.text}
          name="todo"
          autoFocus
        />
        <button className="bg-green-500 hover:bg-green-600  text-white rounded px-3 py-1 text-sm font-medium transition">
          Save
        </button>
      </form>

      <button
        onClick={() => setShowEditTodo(false)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded px-3 py-1 text-sm font-medium transition"
      >
        Cancel
      </button>
    </li>
  );

  const todoItemDiv = (
    <li className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow hover:scale-[1.02] transition-transform duration-200 ease-in-out">
      <label className="flex items-center gap-3 w-full cursor-pointer">
        <input
          type="checkbox"
          checked={items.completed}
          onChange={(e) => onTodoToggle(items.id, e.target.checked)}
          className="accent-sky-500 w-5 h-5 transition duration-200"
        />
        <span
          className={`flex-1 text-base md:text-lg ${
            items.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {items.text}
        </span>
      </label>

      <div className="flex items-center gap-2 ml-4 shrink-0">
        <button
          onClick={() => onPinToggle(items.id)}
          className="text-gray-500 hover:text-blue-600 mr-2 transition"
        >
          {items.pinned ? <Pin fill="currentColor" /> : <PinOff />}
        </button>
        <button
          onClick={() => setShowEditTodo(true)}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded px-3 py-1 text-sm font-medium transition"
        >
          Edit
        </button>
        <button
          onClick={() => onTodoDelete(items.id)}
          className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-medium transition"
        >
          Delete
        </button>
      </div>
    </li>
  );

  return <div>{showEditTodo ? editTodoForm : todoItemDiv}</div>;
};

export default TodoItem;
