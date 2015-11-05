/**
 * Created by kells4 on 2/11/2015.
 */
app.controller('CrackerAdminCtrl',['$scope','$http',function($scope,$http){

    $scope.airports = [
        {'code':'AKL','name':'Auckland'},{'code':'CHC','name':'Christchurch'},{'code':'DUD','name':'Dunedin'},{'code':'GIS','name':'Gisborne'},
        {'code':'HKK','name':'Hokitika'},{'code':'HLZ','name':'Hamilton'},{'code':'IVC','name':'Invercargill'},{'code':'KKE','name':'Kerikeri'},
        {'code':'NPE','name':'Napier/Hastings'},{'code':'NPL','name':'New Plymouth'},{'code':'NSN','name':'Nelson'},{'code':'PMR','name':'Palmerston North'},
        {'code':'ROT','name':'Rotorua'},{'code':'TIU','name':'Timaru'},{'code':'TRG','name':'Tauranga'},{'code':'TUO','name':'Taupo'},{'code':'WAG','name':'Whanganui'},
        {'code':'WLG','name':'Wellington'},{'code':'WRE','name':'Whangarei'},{'code':'ZQN','name':'Queenstown'}
    ];

    $scope.jokes = [
        {title:'Yo Mamma So Bald',description:"Yo mama's so bald, that when she put on a sweater, folk thought she was a roll on deoderant!"},
        {title:'Yo Mamma So Fat',description:"Yo mama's so bald, that when she jumped for joy, she got stuck!"},
        {title:'Yo Mamma So Fat2',description:"Yo momma so fat she sued xbox 360 for guessing her weight!"},
        {title:'Yo Mamma So Dumb',description:"Yo mama so dumb when you stand next to her you hear the ocean!"}
    ];

    $scope.hours = [
        '08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07'
    ];

    $scope.minutes = [
        '05','10','15','20','25','30','35','40','45','50','55'
    ];

    $scope.sessions = [];
    $scope.session = {

    };

    $scope.currentSession = {
        sessionid : '16874',
        destination : {'code':'AKL','name':'Auckland'},
        origin1 : {'code':'CHC','name':'Christchurch'},
        origin2 : {'code':'DUD','name':'Dunedin'},
        origin1votes : '4309',
        origin2votes : '6506',
        joke1 : {title:'Yo Mamma So Fat',description:"Yo mama's so bald, that when she jumped for joy, she got stuck!"},
        joke2 : {title:'Yo Mamma So Dumb',description:"Yo mama so dumb when you stand next to her you hear the ocean!"},
        startTime : 'Mon 9 Nov 0900',
        endTime : 'Mon 9 Nov 1100',
        startMessage : 'start message',
        nextVotingMessage : 'next message'
    };

    // these var will be updated by update
    $scope.sessiondata = [];
    $scope.sessionlabels = [];
    $scope.series = [];

    $scope.seriesLabels = ['test 1','test 2'];
    $scope.seriesData = [
        [6506],
        [4309]
    ];
    $scope.sessionUpdate = false;

    //$scope.$watch(function(o,n){
    //    // update
    //    $scope.sessiondata = [$scope.currentSession.origin1votes, $scope.currentSession.origin2votes];
    //    $scope.sessionlabels = [$scope.currentSession.origin1.name, $scope.currentSession.origin2.name];
    //    $scope.series = [$scope.currentSession.origin1.code, $scope.currentSession.origin2.code];
    //
    //});

    $scope.setGraphData = function(session){
            $scope.sessiondata = [session.origin1votes, session.origin2votes];
            $scope.sessionlabels = [session.origin1.name, session.origin2.name];
            $scope.series = [session.origin1.code, session.origin2.code];
    };

    $scope.setGraphData($scope.currentSession);

    $scope.setCurrentSession = function(){

    };

    $scope.addSession = function(session){
        session.sessionid = Math.floor(Math.random()*90000) + 10000;
        session.origin1votes = '0';
        session.origin2votes = '0';

        if(!$scope.sessionUpdate){
            $scope.sessions.push(session);
            $http({
                url: "http://localhost/api/addSession?time=" + new Date().getTime(),
                method: "POST",
                data: session,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(res) {
                return res.data;
            });
        }

        $scope.sessionUpdate = false;

        // set dashboard data


        // clear
        $scope.session = {};
    };

    $scope.setSession = function(session){
        $scope.session = session;
        $scope.currentSession = session;
        $scope.setGraphData(session);
        $scope.sessionUpdate = true;
    };

    $scope.getSessions = function(){
        $http.get('http://localhost/api/getAllSessions').then(function(res){

        });
    };

    $scope.removeSession = function(ind){
        $scope.sessions.pop(ind);
    };




}]);