export default class ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  name: string;
  phone: number;
  image: any;

  constructor(json: any) {
    this.userId = json.userId;
    this.id = json.id;
    this.title = json.title;
    this.completed = json.completed;
    this.name = json.name;
    this.phone = json.phone;
    this.image = json.image
  }
}
