var myApp = angular.module('flightsReports',[]);

myApp.controller('flightsController', ['$scope','$timeout', function($scope, $timeout) {
  $scope.flightsList = [
      {
          'id':'1',
          'sctm':'SC',
          'primoPilota':'Molinari',
          'secondoPilota':'Strata',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Fioriglio',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'12.32.30',
          'oraAtterraggioTrainatore':'12.38.30',
          'oraAtterraggioAliante':'13.45.30'
      },
      {
          'id':'2',
          'sctm':'SC',
          'primoPilota':'Rossi',
          'secondoPilota':'Bianchi',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Maglioni',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'13.40.30',
          'oraAtterraggioTrainatore':'12.48.30',
          'oraAtterraggioAliante':'14.45.30'
      },
      {
          'id':'3',
          'sctm':'SC',
          'primoPilota':'Castoldi',
          'secondoPilota':'Colombo',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Maglioni',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'',
          'oraAtterraggioTrainatore':'',
          'oraAtterraggioAliante':''
      },
      {
          'id':'4',
          'sctm':'SC',
          'primoPilota':'Castoldi',
          'secondoPilota':'Colombo',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Maglioni',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'13.40.30',
          'oraAtterraggioTrainatore':'',
          'oraAtterraggioAliante':''
      }
      /*{
          'id':'4',
          'sctm':'SC',
          'primoPilota':'Rossi',
          'secondoPilota':'Bianchi',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Maglioni',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'12.20',
          'oraAtterraggioTrainatore':'',
          'oraAtterraggioAliante':''
      },
      {
          'id':'5',
          'sctm':'SC',
          'primoPilota':'Rossi',
          'secondoPilota':'Bianchi',
          'marcheAliante':'I-LVIG',
          'pilotaTrainatore':'Maglioni',
          'marcheTrainatore':'I-AEFE',
          'quotaSgancio':'750',
          'oraDecollo':'12.20',
          'oraAtterraggioTrainatore':'',
          'oraAtterraggioAliante':''
      }*/
  ]

  $scope.activeFlightsCounters = [];

  var differenceBetweenDates = function(date){
    var hour = date.toString().split(".")[0];
    var minutes = date.toString().split(".")[1];
    var seconds = date.toString().split(".")[2];
    var startDate = new Date();
    startDate.setHours(hour, minutes, seconds);
    var endDate = new Date();

    var timeStart = startDate.getTime();
    var timeEnd = endDate.getTime();
    var hourDiff = timeEnd - timeStart; //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var counterDisplay = {};
    counterDisplay.hours = Math.floor(hDiff); 
    counterDisplay.minutes = Math.floor(minDiff);
    if(counterDisplay.minutes > 60) {
        counterDisplay.minutes = counterDisplay.minutes % 60;
    }
    counterDisplay.seconds = Math.floor(secDiff);
    if(counterDisplay.seconds > 60) {
        counterDisplay.seconds = counterDisplay.seconds % 60;
    }

    return counterDisplay;
    
  }

  var increaseFlightsCounters = function(){
      for(var i=0; i<$scope.activeFlightsCounters.length; i++) {
          if($scope.activeFlightsCounters[i].state == 'active') {
              var counterDisplay = differenceBetweenDates($scope.flightsList[i].oraDecollo);
              if(counterDisplay.hours < 10) {
                 counterDisplay.hours = '0'+counterDisplay.hours;
              }
              if(counterDisplay.minutes < 10) {
                 counterDisplay.minutes = '0'+counterDisplay.minutes;
              }
              if(counterDisplay.seconds < 10) {
                 counterDisplay.seconds = '0'+counterDisplay.seconds;
              }
              $scope.activeFlightsCounters[i].value = counterDisplay.hours+':'+counterDisplay.minutes+':'+counterDisplay.seconds;
          }
      }
      $timeout(function(){ 
         increaseFlightsCounters();
      }, 1000);
      
  }
  
  var activeFlightsCountersInitialize = function(){
        for(var i=0; i<$scope.flightsList.length; i++) {
            $scope.activeFlightsCounters[i] = {'state':'null', 'value':"00:00:00"};
            if($scope.flightsList[i].oraAtterraggioAliante == '' && $scope.flightsList[i].oraDecollo == '') {
                $scope.activeFlightsCounters[i].state = 'sleep';
            } else {
                if($scope.flightsList[i].oraAtterraggioAliante == '') {
                    $scope.activeFlightsCounters[i].state = 'active';
                }
            }
        }
        increaseFlightsCounters();
  }
  activeFlightsCountersInitialize();

  $scope.addNewFlight = function() {
      var newId = $scope.flightsList.length+1;
      var marcheAliante = '';
      var marcheTrainatore = '';
      if($scope.marcheAlianteInput == 'Altro') {
          marcheAliante = $scope.marcheAlianteAltroInput;
      } else {
          marcheAliante = $scope.marcheAlianteInput;
      }
      if($scope.marcheTrainatoreInput == 'Altro') {
          marcheTrainatore = $scope.marcheTrainatoreAltroInput;
      } else {
          marcheTrainatore = $scope.marcheTrainatoreInput;
      }
      var flight = {
        'id':newId,
        'sctm':$scope.sctmInput,
        'primoPilota':$scope.primoPilotaInput,
        'secondoPilota':$scope.secondoPilotaInput,
        'marcheAliante':marcheAliante,
        'pilotaTrainatore':$scope.pilotaTrainatoreInput,
        'marcheTrainatore':marcheTrainatore,
        'quotaSgancio':$scope.quotaSgancioInput,
        'oraDecollo':'',
        'oraAtterraggioTrainatore':'',
        'oraAtterraggioAliante':''
      }
      $scope.sctmInput = '';
      $scope.primoPilotaInput = '';
      $scope.secondoPilotaInput = '';
      $scope.marcheAlianteInput = '';
      $scope.marcheAlianteAltroInput = '';
      $scope.pilotaTrainatoreInput = '';
      $scope.marcheTrainatoreInput = '';
      $scope.quotaSgancioInput = '';

      $scope.flightsList.push(flight);
      activeFlightsCountersInitialize();

  }

  var getHourNow = function(){
    var time = new Date();
    var regularTime = '';
    regularTime = time.getHours()+'.'+time.getMinutes()+'.'+time.getSeconds();
    return regularTime;
  }

  $scope.startFlight = function(id){
    //AJAX per aggiornare la tabella
    $scope.flightsList[id].oraDecollo = getHourNow();
    activeFlightsCountersInitialize();
    // ----- //    
  }
  $scope.stopFirst = function(id){
    //AJAX per aggiornare la tabella
    $scope.flightsList[id].oraAtterraggioTrainatore = getHourNow();
    // ----- //    
  }

  $scope.stopSecond = function(id){
    //AJAX per aggiornare la tabella
    $scope.flightsList[id].oraAtterraggioAliante = getHourNow();
    activeFlightsCountersInitialize();
    // ----- //
  }
}]);