import {inject} from 'aurelia-framework';
import {ToDos} from '../resources/data/todos';
import {Router} from 'aurelia-router';

@inject(Router, ToDos, AuthService)
export class Wall {
  constructor(router, auth, todos) {
  this.router = router;
  this.todos = todos;  
  this.auth = auth;
  this.message = 'List';
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.showList = true;
  this.priorities = ['Low', 'Medium', 'High', 'Critical'];
  
  
  }

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}

createTodo(){	
  this.todoObj = {
    todo: "",
    description: "",
    dateDue: new Date(),
     userId: this.user._id,
    priority: this.priorities[0]
  }
  this.showList = false;		
}

async saveTodo(){
  if(this.todoObj){		
    let response = await this.todos.save(this.todoObj);
    if(response.error){
      alert("There was an error creating the ToDo");
    } else {
      //Could provide feeback									
    }
    this.showList = true;
  }
}


}

