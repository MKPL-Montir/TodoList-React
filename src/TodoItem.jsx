function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li className="flex items-center gap-2 p-2 border-b border-gray-200 last:border-b-0">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
        className="h-5 w-5 text-blue-500"
      />
      <span
        className={`flex-1 ${todo.isCompleted ? 'line-through text-gray-500' : 'text-white-800'}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;