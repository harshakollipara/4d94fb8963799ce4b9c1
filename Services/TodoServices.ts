import ToDo from '../Commons/Model/ToDo';
import GetToDosRequest from './GetToDosRequest';
import ToDoStore from './ToDoStore';

export default class TodoServices {
  getToDos(): Array<ToDo> {
    return ToDoStore.getToDos();
  }

  async fetchRemoteToDos() {
    const request = new GetToDosRequest();
    await request
      .getToDos()
      .then(data => {
        let toDos = [];
        for (let index = 0; index < data.length; index++) {
          const toDo = new ToDo(data[index]);
          toDos.push(toDo);
        }
        ToDoStore.setToDos(toDos);
        return;
      })
      .catch(error => {
        console.log(`ServiceClass err => ${JSON.stringify(error)}`);
        return error;
      });
  }
}
