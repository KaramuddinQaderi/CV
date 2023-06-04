let toggle = document.querySelector(".toggle");
let topbar = document.querySelector(".topbar");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  toggle.classList.toggle("active");
  topbar.classList.toggle("active");
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Light

function toggleMenu() {
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");
  navigation.classList.remove('active');
  main.classList.remove('active');
}

////////////////////////////////////////////////
$(document).ready(function () {
    startClock([['09:53', '10:30', 'Meeting 1'], ['14:30', '15:30', 'Meeting 2'], ['15:53', '16:30', 'Meeting 3']], false);
  });
var canvas = document.getElementById("iasClockCanvas");
ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
minutes_flag=false;
meetingArr=[];
function drawLines(ctx,radius){
	ctx.beginPath();
	ctx.strokeStyle="#eee";
	ctx.lineWidth=1;
	ctx.arc(0,0,radius+4,0,2*Math.PI);
	ctx.arc(0,0,radius-2,0,2*Math.PI);
	ctx.stroke();
}

function drawClock() {
  drawFace(ctx, radius);
  if(minutes_flag){
  drawMins(ctx,radius);
  }
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
alarm();
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.shadowBlur=0;
  ctx.shadowOffsetX= 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = '#CCC';
  ctx.arc(0, 0, radius*0.95, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#000';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}
function drawMins(ctx,radius){
	var i=3;
	for(i=0;i<60;i++){
		if(i%5!=0){
			ctx.beginPath();
			ctx.shadowBlur=0;
			ctx.shadowOffsetX= 0;
			ctx.shadowOffsetY = 0;
			ctx.lineWidth = 5;
			ctx.lineCap="square";
			ctx.arc(0,0,radius*0.87,i*(0.5/15)*Math.PI,i*(0.5/15)*Math.PI);
			ctx.stroke();
		}
	}
}
function drawTime(ctx, radius){
    ctx.beginPath();
	var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    ctx.shadowBlur=0;
	ctx.shadowOffsetX= 0;
    ctx.shadowOffsetY = 0;
	//hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
	ctx.strokeStyle="#333";
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
	ctx.shadowBlur=0;
	ctx.shadowOffsetX= 0;
    ctx.shadowOffsetY = 0;
	ctx.strokeStyle="#333";
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function meetingArea(ctx,radius){
	ctx.lineWidth = radius*0.07;
	ctx.lineCap="square";
	for(i=0;i<meetingArr.length;i++){
		ctx.beginPath();
		ctx.lineWidth=4;
		start_arr=meetingArr[i][0].split(':');
		s_hr=parseInt(start_arr[0]);
		s_min=parseInt(start_arr[1]);
		
		end_arr=meetingArr[i][1].split(':');
		e_hr=parseInt(end_arr[0]);
		e_min=parseInt(end_arr[1]);
		if(e_hr==12 && e_min==0){
			loop=false;
		}
		else{
			loop=true;
		}
		
		if(s_hr<12 && e_hr>=12 && loop){
			grd=ctx.createLinearGradient(0,0,10,0);
			grd.addColorStop(0,"#c36a3e");
			grd.addColorStop(1,"#4b2a63");
			ctx.strokeStyle=grd;
			ctx.arc(0,0,radius+4,getStartingAngle(s_hr,s_min),getEndingAngle(e_hr,e_min));
		}else if(s_hr>12 && e_hr<12){
			grd=ctx.createLinearGradient(0,0,10,0);
			grd.addColorStop(0,"#4b2a63");
			grd.addColorStop(1,"#c36a3e");
			ctx.strokeStyle=grd;
			ctx.arc(0,0,radius-1.8,getStartingAngle(s_hr,s_min),getEndingAngle(e_hr,e_min));
		}else if(s_hr>11){
			ctx.strokeStyle="#4b2a63";
			ctx.arc(0,0,radius+4,getStartingAngle(s_hr,s_min),getEndingAngle(e_hr,e_min));
		}else{
			ctx.strokeStyle="#c36a3e";
			ctx.arc(0,0,radius-1.8,getStartingAngle(s_hr,s_min),getEndingAngle(e_hr,e_min));
		}
		ctx.stroke();
	}
}
function getStartingAngle(hr,min){
	if((hr-3)<0){hr=hr+12;}
	return ((hr-3)*5*(0.5/15)*Math.PI)+(min*(0.5/15)*Math.PI/12);
}
function getEndingAngle(hr,min){
	if((hr-3)<0){hr=hr+12;}
	return ((hr-3)*5*(0.5/15)*Math.PI)+(min*(0.5/15)*Math.PI/12);
}
var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

function listAll(){
	var table="<table>";
	if(meetingArr.length==0){
		table+="<tr><th>No meetings planned yet</th></tr>";
	}else{
		table+="<tr><th>Sr.</th><th>Start</th><th>End</th><th>Message</th><th></th></tr>";
	}
	for(i=0;i<meetingArr.length;i++){
		table+="<tr><td></td><td>"+meetingArr[i][0]+"</td><td>"+meetingArr[i][1]+"</td><td>"+meetingArr[i][2]+"</td><td><div class='delete-icon' onclick='delRow(this,\""+i+"\")'>x</div></td></tr>";
	}
	table+="</table>";
	$('body').prepend("<div class='shadow-box'></div><div class='listAll'><div class='closePopup' onclick='hideList();'>X</div>"+table+"</div>");
}

function removeMeetingForm(){
	$('.shadow-box').remove();
	$('.c_form').remove();
}
function hideList(){
	$('.shadow-box').remove();
	$('.listAll').remove();
}
function startClock(meetingArr1,show_minutes){
  $('.shadow-element').css('width',$(canvas).attr('width'));
  $('.shadow-element').css('height',$(canvas).attr('height'));
  minutes_flag=show_minutes;
  meetingArr=meetingArr1;
  setInterval(drawClock, 1000);
  drawLines(ctx,radius);
  meetingArea(ctx,radius);
}
