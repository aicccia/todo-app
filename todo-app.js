
//Model

var editTarget;

var todoModel = {
    showMode: 1,
    todos: [],
    //function to add todos
    addTodo: function (todo) {
        this.todos.push({todoText: todo, complete: false});
    },
    deleteTodo: function (todo) {
        this.todos.splice(todo, 1);
    },
    toggleTodo: function (todo) {
        this.todos[todo].complete = !this.todos[todo].complete;
    },

    clearCompleteTodo: function () {
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].complete) {
                this.todos.splice(i, 1);
            }
        }
    },

    changeTodo: function (todo, newtext) {
        if(this.todos[todo].complete) {
            this.todos.splice(todo, 1, {todoText: newtext, complete: true});
        }
        else {
            this.todos.splice(todo, 1, {todoText: newtext, complete: false});
        }
    }

}

//View
var todoShow = {
    activeCount: 0,
    completeExist: false,
    displayTodos: function () {
        this.activeCount = 0;
        this.completeExist = false;
        var parentContainer = document.querySelector("#parentContainer");

        while (parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.lastChild);
        }
        //draw list of todos
        for (var i = 0; i < todoModel.todos.length; i++) {
            if ((todoModel.showMode == 1) ||
                ((todoModel.showMode == 2) && (todoModel.todos[i].complete == true)) ||
                ((todoModel.showMode == 3) && (todoModel.todos[i].complete == false))) {

                if (todoModel.todos[i].complete == false) {
                    this.activeCount++;
                }
                if (todoModel.todos[i].complete) {
                    this.completeExist = true;
                }

                //create todo container div
                var todoContainerDiv = document.createElement("div");
                todoContainerDiv.className = "todoContainer";

                //create Input Container Div
                var inputContainerDiv = document.createElement("div");
                inputContainerDiv.className = "inputContainer";
                inputContainerDiv.id = i;


                //create toggle tag
                var toggleDiv = document.createElement("div");
                toggleDiv.innerHTML = "<p onclick='handlers.toggleTodo(event)'>O</p>";
                if (todoModel.todos[i].complete) {
                    toggleDiv.className = "toggle toggle-complete";
                } else {
                    toggleDiv.className = "toggle toggle-uncomplete";
                }
                toggleDiv.id = i;

                //create input tag
                var inputTag = document.createElement("input");
                inputTag.setAttribute("value", todoModel.todos[i].todoText);
                inputTag.id = "input"+i;
                if (todoModel.todos[i].complete) {
                    inputTag.className = "todo-complete";
                }

                //create delete tag
                var deleteDiv = document.createElement("div");
                deleteDiv.innerHTML = "<p onclick='handlers.deleteTodo(event)'>X</p>";
                deleteDiv.className = "delete";
                deleteDiv.id = i;

                //append inputContainer Div to Container Div
                inputContainerDiv.appendChild(inputTag);
                todoContainerDiv.appendChild(toggleDiv);
                todoContainerDiv.appendChild(inputContainerDiv);
                todoContainerDiv.appendChild(deleteDiv);
                parentContainer.appendChild(todoContainerDiv);
            }
        }

        var inputContainerDivs = document.getElementsByClassName("inputContainer");

        for(var i = 0; i < inputContainerDivs.length; i++) {
            inputContainerDivs[i].addEventListener("click", function() {
                editTarget = this.id;
                document.getElementById("parentContainer").addEventListener("keypress", handlers.editTodo);
            });
        }

        this.createFooter();
    },

    createFooter: function () {
        //create footer div
        var footerDiv = document.createElement("div");
        footerDiv.className = "footer";

        var itemsLeftDiv = document.createElement("div");
        itemsLeftDiv.className = "itemsLeftDiv";
        itemsLeftDiv.innerHTML = "<p>" + this.activeCount + " items left</p>";

        var actionDiv = document.createElement("div");
        actionDiv.className = "actionDiv";
        actionDiv.innerHTML =
            "<button id='all' onclick='handlers.viewAll(event)'>All</button>" +
            "<button id='active' onclick='handlers.viewActive(event)'>Active</button>" +
            "<button id='completed' onclick='handlers.viewCompleted(event)'>Completed</button>";

        var clearCompletedDiv = document.createElement("div");
        clearCompletedDiv.className = "clearCompletedDiv";
        if (this.completeExist) {
            clearCompletedDiv.innerHTML = "<p onclick='handlers.clearCompleted()'>Clear Completed</p>";
        }

        footerDiv.appendChild(itemsLeftDiv);
        footerDiv.appendChild(actionDiv);
        footerDiv.appendChild(clearCompletedDiv);
        parentContainer.appendChild(footerDiv);

        this.addButtonBorder();
    },

    addButtonBorder: function () {
        if (todoModel.showMode == 1) {
            var all = document.getElementById("all");
            all.className = "selectedButtonBorder";
        }
        if (todoModel.showMode == 2) {
            var all = document.getElementById("completed");
            all.className = "selectedButtonBorder";
        }
        if (todoModel.showMode == 3) {
            var all = document.getElementById("active");
            all.className = "selectedButtonBorder";
        }
    }
}

//Controller
var handlers = {
    addTodo: function (e) {
        if (e.keyCode === 13) {
            var todotext = document.getElementById("addTodoTextInput");
            todoModel.addTodo(todotext.value);
            todotext.value = "";
            todoShow.displayTodos();
        }
    },

    editTodo: function (e) {
        if (e.keyCode === 13) {
            var todotext = document.getElementById("input"+editTarget);
            todoModel.changeTodo(editTarget, todotext.value);
            todotext.value = "";
            todoShow.displayTodos();
        }
    },

    deleteTodo: function (e) {
        todoModel.deleteTodo(e.currentTarget.parentNode.id);
        todoShow.displayTodos();
    },

    toggleTodo: function (e) {
        todoModel.toggleTodo(e.currentTarget.parentNode.id);
        todoShow.displayTodos();
    },

    viewAll: function () {
        todoModel.showMode = 1;
        todoShow.displayTodos();
    },

    viewCompleted: function () {
        todoModel.showMode = 2;
        todoShow.displayTodos();
    },

    viewActive: function () {
        todoModel.showMode = 3;
        todoShow.displayTodos();
    },

    clearCompleted: function () {
        todoModel.clearCompleteTodo();
        todoShow.displayTodos();
    }
}
