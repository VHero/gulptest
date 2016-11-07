kimama
// A菜单控制器
  .controller('A', function($scope,$http,$filter, JMM) {
    $scope.A3=JMM.getA3info();
    $scope.A2=JMM.getA2info();
    $scope.A1=JMM.getA1info();
    $scope.A4=JMM.getA4info();
//  $scope.Games = KiKnowledge.getAllGames();
//  $scope.games = KiKnowledge.getAllGames();
//  $scope.chTab = function(tab){
//    $scope.selectedTab = tab;
//  };

  })

  .controller('B', function($scope,$http, $filter,JMM) {
      $scope.age=1;
    $scope.B1=JMM.getB1info();
    $scope.clickage=function(num){
      $scope.age=num;
    }
		

  })

  .controller('SharesDetailCtrl', function($scope, $stateParams, JMM) {
    $scope.chat = JMM.get($stateParams.chatId);
  })

  .controller('ScoresCtrl', function($scope) {
    $scope.selectedTab = 'tab1';
    $scope.chTab = function(tab){
      $scope.selectedTab = tab;
    };
    $scope.settings = {
      enableFriends: true
    };
  });
