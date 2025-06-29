import { useState } from 'react';

export default function useTodos() {
  const [todo, setTodo] = useState([]);

  function addTodo(text) {
    const newTodo = [
      ...todo,
      {
        text,
        id: crypto.randomUUID(),
        completed: false,
      },
    ];

    setTodo(newTodo);
  }

  function toggleTodo(id, checked) {
    const newTodo = todo.map((item) =>
      item.id === id ? { ...item, completed: checked } : item
    );
    setTodo(newTodo);
  }

  function deleteTodo(id) {
    const newTodo = todo.filter((item) => item.id !== id);

    setTodo(newTodo);
  }
  function clearAllTodo() {
    setTodo([]);
  }

  const compareFunction = (a, b) => a.text.localeCompare(b.text);
  function sortAllTodo() {
    const newTodo = [...todo];
    newTodo.sort(compareFunction);
    setTodo(newTodo);
  }

  return {
    todo,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearAllTodo,
    sortAllTodo,
  };
}
