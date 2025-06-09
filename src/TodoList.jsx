import TodoItem from './TodoItem';

function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul className="list-none p-0">
      {todos.length === 0 && (
        <li className="text-center text-gray-500">No tasks yet!</li>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;