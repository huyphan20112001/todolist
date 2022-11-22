export const todoList = {
  todo: [
    {
      id: 1,
      name: "Go to school",
      completed: false,
    },
    {
      id: 2,
      name: "Go to a party",
      completed: false,
    },
  ],
  filter: "All",
  filters: {
    All: () => true,
    Active: (todo) => !todo.completed,
    Completed: (todo) => todo.completed,
  },
};
