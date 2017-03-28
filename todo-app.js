

//Model
var todoModel = {
    todos: [],
    //function to add todos
    addTodo: function(todo) {
        this.todos.push({todoText: todo, complete: false});
    },
    deleteTodo: function(todo) {
        this.todos.splice(todo, 1);
    },
    toggleTodo: function(todo) {
        this.todos[todo].complete = !this.todos[todo].complete;
    }
    
}

//View
var todoShow = {

    displayTodos: function() {
        var parentContainer = document.querySelector("#parentContainer");

        while(parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.lastChild);
        }

        for(var i = 0; i < todoModel.todos.length; i++) {
            //create todo container div
            var todoContainerDiv = document.createElement("div");
            todoContainerDiv.className = "todoContainer";

            //create Input Container Div
             var inputContainerDiv = document.createElement("div");
             inputContainerDiv.className = "inputContainer";

             //create select tag
              var selectDiv = document.createElement("div");
              selectDiv.innerHTML = "<p onclick='handlers.toggleTodo(event)'>O</p>";
              selectDiv.className = "select";
              selectDiv.id = i; 

             //create input tag
             var inputTag = document.createElement("input");
             inputTag.setAttribute("value", todoModel.todos[i].todoText);
             if(todoModel.todos[i].complete) {
                 inputTag.className = "complete";
             }

             //create toggle tag
              var toggleDiv = document.createElement("div");
              toggleDiv.innerHTML = "<p onclick='handlers.deleteTodo(event)'>X</p>";
              toggleDiv.className = "toggle";
              toggleDiv.id = i; 

             //append inputContainer Div to Container Div
             inputContainerDiv.appendChild(inputTag);
             todoContainerDiv.appendChild(selectDiv);
             todoContainerDiv.appendChild(inputContainerDiv);
             todoContainerDiv.appendChild(toggleDiv);
             parentContainer.appendChild(todoContainerDiv);

        }
    }
}

//Controller
var handlers = {
    addTodo: function(e) {
        if(e.keyCode === 13) {
            var todotext = document.getElementById("addTodoTextInput");
            todoModel.addTodo(todotext.value);
            todotext.value = "";
            todoShow.displayTodos();
        }
    },

    deleteTodo: function(e) {
        todoModel.deleteTodo(e.currentTarget.parentNode.id);
        todoShow.displayTodos();
    },
 
    toggleTodo: function(e) {
         todoModel.toggleTodo(e.currentTarget.parentNode.id);
         todoShow.displayTodos();
    }
  
}

