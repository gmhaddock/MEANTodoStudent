app.controller("TodoCreateController", function($scope, $http){
  $scope.formData = {};

  $scope.createTodo = function(){
    $scope.formData.completed = false;
    $http.post("/api/todos" , $scope.formData)
          .then(function(response){
            $scope.formData = {};
          });
  };
});
