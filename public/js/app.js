var app =  angular.module("meanTodo", ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when("/home",{
    templateUrl: "html/home.html"
  })
  .when("/list", {
    templateUrl: "html/list.html",
    controller: "TodoListController"
  })
  .when("/create",{
    templateUrl: "html/create.html",
    controller: "TodoCreateController"
  })
  .otherwise({
    redirectTo: "/home"
  });
});
