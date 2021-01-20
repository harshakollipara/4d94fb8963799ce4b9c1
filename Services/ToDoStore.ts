import ToDo from '../Commons/Model/ToDo';

export default class ToDoStore {
  private static todos: ToDo[] = [];

  static setToDos(todos: Array<ToDo>) {
    ToDoStore.todos = todos;
  }

  static getToDos(): Array<ToDo> {
    return ToDoStore.todos;
  }
}
