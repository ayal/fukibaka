var app = angular.module('hanaxa', []);

loadpost = function(posti) {
  return $.get('post-' + posti + '.md?v=' + (new Date()).getTime());
}

loadposts = function(i){
  loadpost(i).then(function(x){
     $.ajax({
        "url":"https://api.github.com/markdown/raw",
        "type":"POST",
        "contentType":"text/plain",
        "data":x
      })
      .done(function(data){
        newpost(data);
        loadposts(++i);
      });
    
  }, function(){
    render();
  });
}

app.controller('posts', function($scope) {
  $scope.posts = [];
  newpost = function(t){
  $scope.posts.push({body: t});
  };
  render = function(){
    $scope.$apply();
  }
  loadposts(0);
});
