
var app=angular.module('TimerApp',[]);
app.controller('kurisuMainCtrl',function($scope,$interval){
    $scope.jgLength=5;
    $scope.stLength=25;
    $scope.timeLeft=$scope.stLength;
    $scope.fillHeight='0%';
    $scope.sessionName='时长';
    $scope.currentTotal;

    var runTimer=false;
    var secs=60*$scope.timeLeft;
    $scope.originalTime=$scope.stLength;

    function secondsToHms(sec){
        sec=Number(sec);
        var h=Math.floor(sec/3600);
        var m=Math.floor((sec%3600)/60);
        var s=Math.floor((sec%3600)%60);
        return(
            (h>0?h+":"+(m<10?'0':''):'')+m+':'+(s<10?'0':'')+s
        );
    }
    //调整默认时长
    $scope.stChange=function(time){
        if(!runTimer){
            if($scope.sessionName ==='时长'){
                $scope.stLength+=time;
                if($scope.stLength<1){
                    $scope.stLength=1;
                }
                $scope.timeLeft=$scope.stLength;
                $scope.originalTime=$scope.stLength;
                secs=60*$scope.stLength;
            }
        }
    }
    //调整默认间隔
    $scope.jgChange=function(time){
        if(!runTimer){
            $scope.jgLength += time;
            if($scope.jgLength<1){
                $scope.jgLength=1;
            }
            if($scope.sessionName==='间隔'){
                $scope.timeLeft=$scope.jgLength;
                $scope.originalTime=$scope.jgLength;
                secs=60*$scope.jgLength;
            }
        }
    }
    $scope.toggleTimer=function(){
        if(!runTimer){
            if($scope.currentName==="时长"){
                $scope.currentLength=$scope.stLength;
            }else{
                $scope.currentLength=$scope.jgLength;
            }

            updateTimer();
            runTimer=$interval(updateTimer,1000);//循环定时器；
        }else{
            $interval.cancel(runTimer);
            runTimer=false;
        }
    }
    function updateTimer(){
        secs-=1;
        if(secs<0){
            //计数完成
            //播放音乐】
            var wav="http://music.163.com/#/m/song?id=28949412&userid=102587383";
            var audio=new Audio(wav);
            audio.play();

            //状态切换
            $scope.fillColor='#333333';
            if($scope.sessionName==='间隔！'){
                $scope.sessionName='时长';
                $scope.currentLength=$scope.stLength;
                $scope.timeLeft=60*$scope.stLength;
                secs=60*$scope.stLength;
            }else{
                $scope.sessionName='间隔!';
                $scope.currentLength=$scope.jgLength;
                $scope.timeLeft=60*$scope.jgLength;
                $scope.originalTime=$scope.jgLength;
                secs=60*$scope.jgLength;
            }
        }else{
            if($scope.sessionName==='间隔！'){
                $scope.fillColor='#ee4444';
            }else{
                $scope.fillColor='#99cc00';
            }
            $scope.timeLeft=secondsToHms(secs);

            var denom=60*$scope.originalTime;
            var perc=Math.abs((secs/denom)*100-100);
            $scope.fillHeight=perc+'%';
        }
    }

    //重置
    $scope.reseter=function(){
        if(runTimer){
            $interval.cancel(runTimer);
            runTimer=false;

        }
        $scope.timeLeft=25;
        $scope.currentName='时长';
        $scope.sessionLength=25;
        $scope.breakLength=5;
        $scope.fillHeight=0+'%';
    }
});
