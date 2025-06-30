import React from 'react';
import useTodos from '../hooks/useTodo';
import TodoItem from '../components/TodoItem';

const App = () => {
  const {
    todo,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearAllTodo,
    sortAllTodo,
    isTodoSorted,
    onTodoTextUpdate,
    togglePin,
  } = useTodos();

  const totalTaskCount = todo.length;
  const completedTaskCount = todo.filter((t) => t.completed).length;
  const completionPercentage =
    totalTaskCount > 0 ? (completedTaskCount / totalTaskCount) * 100 : 0;

  function handleFormSubmit(e) {
    e.preventDefault();
    const todoText = e.target['todo'].value.trim();
    if (!todoText) return;
    addTodo(todoText);
    e.target.reset();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/90 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold bungee-regular mb-4 text-gray-800 text-center">
          Not just a normal - Todo
        </h1>
        {/* Completed task count */}
        <div className="flex items-center justify-between bungee-regular mb-2 px-3 py-2 bg-green-100 rounded-lg shadow-inner transition-all duration-300">
          {totalTaskCount === 0 ? (
            <span className="text-green-700  font-semibold text-sm md:text-base flex items-center gap-2">
              Small steps. Big progress.
            </span>
          ) : totalTaskCount === completedTaskCount ? (
            <span className="text-green-700 font-semibold text-sm md:text-base flex items-center gap-2">
              You crushed it—now relax!
            </span>
          ) : (
            <span className="text-green-700 font-medium text-sm md:text-base flex items-center gap-2">
              ✅ Completed: {completedTaskCount} / {totalTaskCount}
              <span className="text-xl animate-pulse">🎉</span>
            </span>
          )}
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-sky-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        {/* Delete All Button */}

        {totalTaskCount > 1 ? (
          <button
            onClick={clearAllTodo}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-medium transition mb-4"
          >
            Delete All
          </button>
        ) : (
          ' '
        )}

        {!isTodoSorted && (
          <button
            onClick={sortAllTodo}
            className="bg-red-500 cursor-pointer mx-5 hover:bg-red-600 text-white rounded px-3 py-1 text-sm font-medium transition mb-4"
          >
            Sort Todo
          </button>
        )}

        {/* Add Todo Form */}
        <form onSubmit={handleFormSubmit} className="flex space-x-2 mb-4">
          <input
            className="flex-1 border  border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            type="text"
            name="todo"
            placeholder="Enter the Task"
          />
          <button
            className="bg-sky-500 cursor-pointer hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition"
            type="submit"
          >
            Add
          </button>
        </form>
        {totalTaskCount !== 0 ? (
          <ul className="space-y-2">
            {[...todo]
              .sort((a, b) => {
                // pinned first
                if (a.pinned === b.pinned) return 0;
                return a.pinned ? -1 : 1;
              })
              .map((item) => (
                <TodoItem
                  key={item.id}
                  items={item}
                  onTodoToggle={toggleTodo}
                  onTodoDelete={deleteTodo}
                  onTodoTextUpdate={onTodoTextUpdate}
                  onPinToggle={togglePin}
                />
              ))}
          </ul>
        ) : (
          <ul>
            <li className="text-center font-bold ">
              Add something, nothing here...
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
