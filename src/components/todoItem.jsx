import React from 'react';

const TodoItem = ({ items, onTodoToggle, onTodoDelete }) => {
  return (
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
        {/* <button
          onClick={() => onTodoEdit(items.id)}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded px-3 py-1 text-sm font-medium transition"
        >
          Edit
        </button> */}
        <button
          onClick={() => onTodoDelete(items.id)}
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-medium transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
