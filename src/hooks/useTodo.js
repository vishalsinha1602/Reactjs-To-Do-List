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
        pinned: false,
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

  const isTodoSorted = todo.every((todo, index, arr) => {
    return index == 0 || compareFunction(arr[index - 1], todo) <= 0;
  });

  function onTodoTextUpdate(id, todoText) {
    const trimmed = todoText.trim();
    if (trimmed === '') {
      // Do nothing or optionally alert
      return;
    }

    const newTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, text: trimmed };
      }
      return item;
    });
    setTodo(newTodo);
  }

  function togglePin(id) {
    const newTodo = todo.map((item) =>
      item.id === id ? { ...item, pinned: !item.pinned } : item
    );
    setTodo(newTodo);
  }

  return {
    todo,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearAllTodo,
    sortAllTodo,
    isTodoSorted,
    onTodoTextUpdate,
    togglePin,
  };
}
