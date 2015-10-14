app.controller("TodoListController", function($scope,$http){
    $scope.todos = [];

    var getTodos = function(){
      $http.get("/api/todos")
            .then(function(response){
              $scope.todos = response.data;
            });
    };

    getTodos();

    $scope.deleteTodo = function(id){
      var url = "/api/todos/"+id;

      $http.delete(url)
          .then(function(response){
            getTodos();
          });
    };


});
