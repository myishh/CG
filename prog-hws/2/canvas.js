var canvas = document.querySelector('canvas');



//canvas.width = window.innerWidth;		//set the width to the window width
//canvas.height = window.innerHeight;	// set the height to the window height

canvas.width = 800;
canvas.height = 600;

var c = canvas.getContext("2d");
var style = c.strokeStyle;
var lineWidth = c.lineWidth;
var lineJoin = c.lineJoin;

document.addEventListener("DOMContentLoaded", init, false);
window.onload = init;

function init(){
	// var gradient=c.createLinearGradient(0,0,canvas.width,0);
	// gradient.addColorStop("0","magenta");
	// gradient.addColorStop("0.5","blue");
	// gradient.addColorStop("1.0","red");

	// c.fillStyle=gradient;
	// window.alert("init() has been called!!!!");
	// showBanner();
	c.strokeStyle = document.getElementById("fill").elements.item(0).value
	c.lineWidth = document.getElementById("fill").elements.item(1).value;
}


function showBanner(){
	c.font="20px Georgia";
	c.fillText("Ipsalege Wheel Design",10,30);
}

function clearCanvas(){
	c.clearRect(0, 0, canvas.width, canvas.height);
}

function cir(x, y,radius,col){
	c.beginPath();
	c.strokeStyle = col;
	// c.lineWidth = 10;
	// c.strokeStyle = "rgba(222,50,0,0.5)";	//change color of pen
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.stroke();
	console.log(c);	
}


function openwin(){
	window.open('http://www.google.com','_blank','height=600,width=400,top=100,toolbar=no,left=0,menubar=no,scrollbars=no,status=no');
}

//get element value by name.value
function printf1(){
	// var a = myform.name.value;
	// window.alert(a);
	// draw(a);
	var x = myform.xValue.value;
	var y = myform.yValue.value;
	var r = myform.radiusValue.value;
	cir(x, y, r, style);

}

function printf2(){
	var x = document.getElementById("formX").value;
	var y = document.getElementById("formY").value;
	var r = document.getElementById("formR").value;
	cir(x,y,r,style);
}
/*
function draw(cnt){
		for(var i = 0; i < cnt; i++) {
			cir(50 + i*10, 50 + i * 10, 45);
		}
}

function set(){
	var x = document.getElementById("formX").value =parseInt(Math.random()*400);
	var y = document.getElementById("formY").value = parseInt(Math.random()*400);
	var r = document.getElementById("formR").value = parseInt(Math.random()*50);

}
*/

//this function is for changing fill color of the line
function changeFill(){	
	// for(var cnt = 0; cnt < document.getElementById("fill").elements.length; cnt++){
	// 	window.alert(document.getElementById("fill").elements.item(cnt).value);
	// }
	var x = document.getElementById("fill").elements.item(0).value;
	c.strokeStyle = x;
}

function changeLineWidth(){
	var x = document.getElementById("fill").elements.item(1).value;
	// window.alert("Line Width = " + x);
	c.lineWidth = x;
}



function drawCircle(r){
	// showBanner();
	x = canvas.width/2;
	y = canvas.height/2;
	radius = r;
	c.lineWidth = document.getElementById("fill").elements.item(1).value;
	c.strokeStyle = document.getElementById("fill").elements.item(0).value;
	// window.alert("Line Width = " + x);
	c.beginPath();
	// c.lineWidth = lineWidth;
	// c.lineWidth = 10;
	// c.strokeStyle = "rgba(222,50,0,0.5)";	//change color of pen
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.stroke();
}

function drawSmallCircle(r, xx, yy){
	x = xx;
	y = yy;
	radius = r;
	c.strokeStyle = document.getElementById("fill").elements.item(0).value;
	c.beginPath();
	// c.lineWidth = lineWidth;
	// c.lineWidth = 10;
	// c.strokeStyle = "rgba(222,50,0,0.5)";	//change color of pen
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.stroke();
}

function drawPolygon(edges, radius){
	// showBanner();
	var numberOfSides = edges,
    size = radius,
    Xcenter = canvas.width/2,
    Ycenter = canvas.height/2;
	c.strokeStyle = document.getElementById("fill").elements.item(0).value;
	c.lineWidth = lineWidth;
 	c.lineWidth = document.getElementById("fill").elements.item(1).value;

	if (numberOfSides < 3){
		window.alert("A polygon must contain at least 3 edges! Please reinput");
	}

	c.beginPath();
	c.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          
 
	for (var i = 1; i <= numberOfSides;i += 1) {
    	c.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
	}
 
	c.stroke();
}

function drawEllipse(radius, score){
	// showBanner();
	var x = canvas.width/2;
	var y = canvas.height/2;
	var radiusX = radius;
	var radiusY = radius * (score/100);
	// var rotation = Math.PI/180 * 45;
	var rotation = Math.PI/180 * 0;
	var startAngle = 0;
	var endAngle = Math.PI * 2;
	var anticlockwise = false;

	c.beginPath();
	c.strokeStyle = document.getElementById("fill").elements.item(0).value;
	c.lineWidth = lineWidth;
	c.lineWidth = document.getElementById("fill").elements.item(1).value;
	c.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
	c.stroke();


}

function drawInner(radius){
	var small_radius = radius/2;
	drawCircle(radius);
	for(var i = 0; i < 6; i++){
		var small_x = canvas.width/2 + (radius*1.5)* Math.cos(i * 2 * Math.PI / 6);
		var small_y = canvas.height/2 + (radius*1.5)* Math.sin(i * 2 * Math.PI / 6);
		drawSmallCircle(small_radius, small_x, small_y);
	}
	drawCircle(radius * 2.1);
}


function drawWheel(){
	var e = document.getElementById("driver");
	// var index = e.selectedIndex;
	
	var radius = document.getElementById("p2").elements.item(0).value;
	var score = document.getElementById("p2").elements.item(1).value;
	// window.alert(e.options.length);
	// window.alert(e.options[index].value + " " + e.options[index].text);
	// window.alert(e.options[0].value + " " + e.options[0].text);
	// window.alert(e.options[1].value + " " + e.options[1].text);
	// window.alert(e.options[2].value + " " + e.options[2].text);

	// if(index == 0){
	// 	window.alert("option 0");
	// }

	// if(index == 1){
	// 	window.alert("option 1");
	// }

	// if(index == 2){
	// 	window.alert("option 2");
	// }


	if(score == 100){
		clearCanvas();

		drawCircle(radius);	
		drawCircle(radius*0.8);	
		drawInner(radius/6);

	} else if(score < 100 && score >79){
		clearCanvas();

		drawEllipse(radius, score);
		drawEllipse(radius*0.8, score);
		drawInner(radius/6);

	} else if(score >=4 && score <=79){
		clearCanvas();

		drawPolygon(score, radius);	
		drawPolygon(score, radius*0.8);	
		drawInner(radius/6);

	} else {
		window.alert("Drive score must lie in [4, 100]");
	}

	
}

function changeScore(){
	// window.alert("changeRaduisScore()");
	var e = document.getElementById("driver");
	var index = e.selectedIndex;


	// var score = document.getElementById("p2").elements.item(1).value;
	if(index == 0){
		// window.alert("index == 1");
		document.getElementById("p2").elements.item(1).value = 100;
	} else if(index == 1){
		document.getElementById("p2").elements.item(1).value = 80;
		// window.alert("index == 2");
	} else if(index == 2){
		document.getElementById("p2").elements.item(1).value = 8;
		// window.alert("index == 3");
	}
}

function changeLineJoin(){
	var e = document.getElementById("lineJoin");
	var index = e.selectedIndex;


	if(index == 0){
		// window.alert("Line join index == 1");
		c.lineJoin = "round";
	} else if(index == 1){
		// window.alert("Line join index == 2");
		c.lineJoin = "bevel";
	} else if(index == 2){
		// window.alert("Line join index == 3");
		c.lineJoin = "miter";
	}
}

///////////////////////////////////////////////////////////////////////////////////
////////////////////////Above Are Problem 2 code///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
////////////////////////Below Are Problem 1 code///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
function drawFractal(event){
    var primtive = inputPrimitive.value,
        i = iterations.value,
        r = ratio.value;

    c.strokeStyle = strokeStyleSelect.value;
    c.lineWidth = Math.ceil(Math.random()*4);
    c.lineWidth = document.getElementById("fill").elements.item(1).value;

    if(primtive == "line"){
        clear();
        if(r == 1)
        {
            lineFractal(c, 0, 200, 300, 400, r);
        }else{
            lineFractal(c, i, 200, 300, 400, r);
        }
    }
    if(primtive == "polyline"){
        clear();
        var x_p = 280, y_p = 150, len_edg = 200,
            xd = yd = Math.pow((200*200 - 100*100),0.5);
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,0,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,0,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,0,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,0,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);            
        }else{
            polylineFractal(c,i,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,i,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,i,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,i,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,i,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
        }
        c.restore();    
    }
    if(primtive == "polygon"){
        clear();
        var x_p = 280, y_p = 150, len_edg = 200,
            xd = yd = Math.pow((200*200 - 100*100),0.5);
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,0,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,0,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,0,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,0,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
            len_edg = Math.pow((2*(200*200)),0.5);
            polylineFractal(c,0,x_p,y_p,len_edg,r, 45); 
        }else{
            polylineFractal(c,i,x_p, y_p, len_edg, r, 120);
            polylineFractal(c,i,x_p-100, y_p+yd, len_edg, r, 30);
            polylineFractal(c,i,x_p-100+xd, y_p+yd+100, len_edg, r, -60);
            polylineFractal(c,i,x_p-100+xd+100, y_p+yd+100-yd, len_edg, r, 0);
            polylineFractal(c,i,x_p-100+xd+100+200, y_p+yd+100-yd, len_edg, r, 150);
            len_edg = Math.pow((2*(200*200)),0.5);
            polylineFractal(c,i,x_p,y_p,len_edg,r, 45);
        }
        c.restore(); 
    }
    if(primtive == "circle"){
        clear();
        if(i == 2 && r == 2)
        {
            r = 4;
            i = 1;
        }
        circleFractal(c, i, 400, 300, 200, r); 
    }
    if(primtive == "ellipse"){
        clear();
        ellipseFractal(c, 0, 400, 300, 250, 175, 1);
    }
    if(primtive == "rectangle"){
        clear();
        var x_p = 200, y_p = 200, width = 350, height = 200;
        c.save();
        if(r == 1)
        {
            polylineFractal(c,0,x_p, y_p, height, r, 90);
            polylineFractal(c,0,x_p, y_p+height, width, r, 0);
            polylineFractal(c,0,x_p+width, y_p+height, height, r, -90);
            polylineFractal(c,0,x_p+width, y_p, width, r, -180);
        }else{
            polylineFractal(c,i,x_p, y_p, height, r, 90);
            polylineFractal(c,i,x_p, y_p+height, width, r, 0);
            polylineFractal(c,i,x_p+width, y_p+height, height, r, -90);
            polylineFractal(c,i,x_p+width, y_p, width, r, -180);
        }
        c.restore(); 
    }
    c.stroke();
}

function drawFractal_old(){
	clearCanvas();
	var e = document.getElementById("primitive");
	var index = e.selectedIndex;
	// window.alert("index ="+ index);

	// var ratio = document.getElementById("prob1").elements.item(0).value;
	var ratio = document.getElementById("ratio").value;
	// window.alert("ratio ="+ ratio);
	// var iter = document.getElementById("prob1").elements.item(1).value;
	var iter = document.getElementById("iter").value;
	// window.alert("iter ="+ iter);

	// index == 0 (line) 
	if(index == 0){
		if(iter == 0){
			drawLine(300,150, 350, 400);
		} else {
			drawFractalLine(300,150, 350, 400, ratio, iter);
		}
	} else if(index == 1){	//index == 1 (circle)

	}
}

function drawFractal_New(pri, ratio, iter){

}


function drawFractalLine(xx1,yy1,xx2,yy2,ratio,iter){
	iter--;
	//xx1, yy1, xx2, yy2 stand for the original two points
	var x1 = xx1, y1 = yy1, x2 = xx2, y2 = yy2;

	//store the vertical bisector coordinate
	var v_x = [];
	var v_x = [];

	//such points in the vertical bisector
	var new_x = [];
	var new_y = [];

	//such points in the orginal line
	var old_x = [];
	var old_y = [];

	//vertical bisector slope
	var vertical_slope =  (x1-x2)/(y2-y1);
	var vertical_b = (y1+y2)/2 - (x1+x2 )*(x1-x2)/(2*y2-2*y1);	//

	
	//store the vertical bisector coordinate
	for(var i = 0; i < ratio; i++){
		v_x[i] = (1 + 2 * i) * (x1 + x2) / (2 * ratio);
		v_x[i] = (1 + 2 * i) * (y1 + y2) / (2 * ratio);
		// window.alert("x[i]="+v_x[i] + " y[i]=" + v_x[i]);
	}

	//prepare for drawing, update the old_x. old_y;
	for(var i = 0; i <= ratio; i++){
		old_x[i] = x1 + (x2 - x1)*i / ratio;
		old_y[i] = y1 + (y2 - y1)*i / ratio;
	} 

	//generate random x for the vertical bisector
	for(var i = 0; i < ratio; i++){
		new_x[i] = v_x[i]*(Math.random()/6+1); 
		// new_x[i] = v_x[i] * (Math.random() + 1); 
		// new_x[i] = new_x[i] * Math.pow((-1), i);
		new_y[i] = new_x[i] * vertical_slope + (old_y[i+1]+old_y[i])/2 - 
		(old_x[i]-old_x[i+1])*(old_x[i]+old_x[i+1])/(2*old_y[i+1]-2*old_y[i]);
		// window.alert("old_x["+i+"]=" + old_x[i] + " old_y[" + i + "]=" + old_y[i]);
		// window.alert("new_x["+i+"]=" + new_x[i] + " new_y[" + i + "]=" + new_y[i]);
		// window.alert("vertical_b = " + vertical_b);
		// window.alert("vertical_slope = " + vertical_slope);
	}



	// drawLine(x1,y1,x2,y2);

	// window.alert("x1 = " + x1);

	if(iter > 0){
		for(var i = 0; i < ratio; i++){
			drawFractalLine(old_x[i],old_y[i], new_x[i], new_y[i],ratio,iter);
			drawFractalLine(new_x[i], new_y[i], old_x[i+1],old_y[i+1],ratio,iter);
		}
	}

	if(iter == 0 && ratio == 1){
		drawLine(x1,y1,x2,y2);
	} else {
		
		for(var i = 0; i < ratio; i++){
			drawLine(old_x[i],old_y[i], new_x[i], new_y[i]);
			drawLine(new_x[i], new_y[i], old_x[i+1],old_y[i+1]);
		}
	}

}

function drawLine(xx1,yy1,xx2,yy2){
	var x1 = xx1, y1 = yy1, x2 = xx2, y2 = yy2;

	c.beginPath();
	c.moveTo(x1,y1);
	c.lineTo(x2,y2);
	c.stroke();
}

function p1_drawCircle(xx, yy, r, antiClock){
	// x = canvas.width/2;
	// y = canvas.height*2/3;
	var x = xx;
	var y = yy;
	// radius = 200;
	var radius = r;
	var direction = antiClock;
	// c.lineWidth = document.getElementById("fill").elements.item(1).value;
	// c.strokeStyle = document.getElementById("fill").elements.item(0).value;
	// window.alert("Line Width = " + x);
	c.beginPath();
	// c.lineWidth = lineWidth;
	// c.lineWidth = 10;
	// c.strokeStyle = "rgba(222,50,0,0.5)";	//change color of pen
	c.arc(x, y, radius, 0, Math.PI, direction);
	c.stroke();
}

// p1_drawCircle(canvas.width/2, canvas.height*2/3, 200, true);
// p1_drawCircle(canvas.width/2, canvas.height*2/3 - 174, 200/2, true);

//定义2d绘图对象，定义角度制到弧度制的转换
// var c = document.getElementById('myCanvas').getContext('2d'),
deg = Math.PI / 180;
 //在画布的上下文c中，以左下角的点(x,y)和边长len，绘制一个n级别的科赫雪花分形
 //n越大 雪花就越复杂
 /*
translate()方法只是简单地将坐标原点进行上、下、左、右移动。
rotate()方法会将坐标轴根据指定角度里进行顺时针旋转。
scale()方法实现对x轴或由y轴上的距离进行延长和缩短。传递负值会实现 

 */
function snowflake(c, n, x, y, len) {
	//保存当前变换
    c.save();
            //变换原点(x,y)为起始点(0,0)
            c.translate(x, y);
            //从新的原点开始一条新的子路径
            c.moveTo(0, 0);
            //绘制雪花的第一条边
            leg(n);
            //现在沿着逆时针方向旋转120°
            c.rotate(-120 * deg);
            //绘制第二条边
            leg(n);
            //再次旋转
            c.rotate(-120 * deg);
            //绘制最后一条边
            leg(n);
            //闭合子路径
            c.closePath();
            //恢复初始的变换
            c.restore();

            //绘制n级别的科赫雪花的一条边
            //此函数在画完一条边的时候就会离开当前点
            //然后通过坐标系变换将当前点又转换成(0,0)
            //这意味着画完一条边之后可以简单地调用rotate()进行旋转
function leg(n) {
                //保存当前坐标系变换
                c.save();
                if (n == 0) {
                    //不需要递归的情况下，就绘制一条水平线段
                    c.lineTo(len, 0);
                }
                else {
                    //递归情况下，绘制4条子边类似“M”的尖角
                    //子边长度为原始边长的三分之一
                    c.scale(1 / 3, 1 / 3);
                    //递归第一条子边
                    leg(n - 1);
                    //顺时针旋转60°
                    c.rotate(60 * deg);
                    //第二条子边
                    leg(n - 1);
                    //逆时针旋转120°
                    c.rotate(-120 * deg);
                    //第三条子边
                    leg(n - 1);
                    //通过旋转回到初始状态
                    c.rotate(60 * deg);
                    //最后一条边
                    leg(n - 1);
                }
                //恢复坐标系变换
                c.restore();
                //但是通过转换使得边的结束点为(0,0)
                c.translate(len, 0);
            }
        }

        //0级别的雪花就是一个三角形，1级别的雪花就是一个六角形，以此类推
        // snowflake(c, 0, 5,   215, 125);
        // snowflake(c, 1, 145, 315, 250);
        // snowflake(c, 2, 285, 115, 125);
        // snowflake(c, 3, 425, 115, 125);
        // snowflake(c, 5, 565, 115, 125);
        //勾勒当前复杂的路径
        c.stroke();

///////////////////////////

function new_snowflake(c, n, x, y, len) {
	//保存当前变换
    c.save();
            //变换原点(x,y)为起始点(0,0)
            c.translate(x, y);
            //从新的原点开始一条新的子路径
            c.moveTo(0, 0);
            //绘制雪花的第一条边
            new_leg(n);
            //现在沿着逆时针方向旋转120°
            c.rotate(-120 * deg);
            //绘制第二条边
            new_leg(n);
            //再次旋转
            c.rotate(-120 * deg);
            //绘制最后一条边
            new_leg(n);
            //闭合子路径
            c.closePath();
            //恢复初始的变换
            c.restore();

            //绘制n级别的科赫雪花的一条边
            //此函数在画完一条边的时候就会离开当前点
            //然后通过坐标系变换将当前点又转换成(0,0)
            //这意味着画完一条边之后可以简单地调用rotate()进行旋转
function new_leg(n) {
                //保存当前坐标系变换
                c.save();
                if (n == 0) {
                    //不需要递归的情况下，就绘制一条水平线段
                    // c.lineTo(len, 0);
                    c.arc(x, y, len, 0, Math.PI /3, false);
                }
                else {
                    //递归情况下，绘制4条子边类似“M”的尖角
                    //子边长度为原始边长的三分之一
                    c.scale(1 / 5, 1 / 5);
                    //递归第一条子边
                    new_leg(n - 1);
                    //顺时针旋转60°
                    c.rotate(60 * deg);
                    //第二条子边
                    new_leg(n - 1);
                    //逆时针旋转120°
                    c.rotate(-120 * deg);
                    //第三条子边
                    new_leg(n - 1);
                    //通过旋转回到初始状态
                    c.rotate(60 * deg);
                    //最后一条边
                    new_leg(n - 1);
                }
                //恢复坐标系变换
                c.restore();
                //但是通过转换使得边的结束点为(0,0)
                c.translate(len, 0);
            }
        }

        //0级别的雪花就是一个三角形，1级别的雪花就是一个六角形，以此类推
        // new_snowflake(c, 0, 145,   215, 12);
        // new_snowflake(c, 1, 145, 315, 250);
        // new_snowflake(c, 2, 285, 115, 125);
        // new_snowflake(c, 3, 425, 115, 125);
        // new_snowflake(c, 5, 565, 115, 125);
        //勾勒当前复杂的路径
        c.stroke();

////////////////////////////////////////////////////////////////////////////
////////////////////////// New Code for Problem 1 //////////////////////////
////////////////////////////////////////////////////////////////////////////

function lineFractal(c, n, x, y, len, r) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    leg(n);
    c.restore();
    function leg(n) {
        var j, k, angle;
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        }
        else {
            c.scale(1/r, 1/r);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(0 * deg);
            leg(n - 1);
            c.rotate(120 * deg);
            leg(n - 1);
            if(r > 2){
                angle = 240;
                for(k = 6 ; k <= 2*r ;){
                    c.rotate(0 * deg);
                    leg(n - 1);
                    j = k/2;
                    if (j % 2 == 1){
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 240;
                    }
                    else{
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 120;
                    }
                    k = k + 2;
                }
            }
        }
        c.restore();
        c.translate(len, 0);
    }
}

function polylineFractal(c, n, x, y, len, r, an) {
    c.save();
    c.translate(x, y);
    c.moveTo(0, 0);
    c.rotate(an * deg);
    leg(n);
    c.restore();
    function leg(n) {
        var j, k, angle;
        c.save();
        if (n == 0) {
            c.lineTo(len, 0);
        }
        else {
            c.scale(1/r, 1/r);
            c.rotate(60 * deg);
            leg(n - 1);
            c.rotate(-120 * deg);
            leg(n - 1);
            c.rotate(0 * deg);
            leg(n - 1);
            c.rotate(120 * deg);
            leg(n - 1);
            if(r > 2){
                angle = 240;
                for(k = 6 ; k <= 2*r ;){
                    c.rotate(0 * deg);
                    leg(n - 1);
                    j = k/2;
                    if (j % 2 == 1){
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 240;
                    }
                    else{
                        c.rotate(angle * deg);
                        leg(n - 1);
                        angle = angle + 120;
                    }
                    k = k + 2;
                }
            }
        }
        c.restore();
        c.translate(len, 0);
    }
}
function circleFractal(c, n, x, y, len, r)
{
    var a_deg = 180/r,
        len_cos = len*Math.cos(a_deg*deg),
        len_sin = len*Math.sin(a_deg*deg);
    if(r == 1 || n == 0)
    {
        c.beginPath();
        c.arc(x,y,len,0*deg,360*deg,false);
        c.stroke();
        c.restore();
    }else{
        a_deg = 180/(r*n);
        if(r % 2 == 1){
            c.beginPath();
            c.arc(x-len-len_cos,y-len_sin,len,0*deg,a_deg*deg,false);
            c.stroke();
            c.beginPath();
            c.arc(x,y,len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);    
            c.stroke();
            if(r >= 3){
                for(var i = 2; i < r; )
                {
                    if(r == 3){
                        c.beginPath();
                        c.arc(x+len+len_cos,y-len_sin,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        i = i+1;
                    }
                    if(r == 5){
                        c.beginPath();
                        c.arc(x,y-2*len*Math.cos((a_deg/2)*deg),len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,(180+3*a_deg)*deg,(180+4*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x+len+len_cos,y-len_sin,len,4*a_deg*deg,5*a_deg*deg,false);
                        c.stroke();
                        i = i+3;
                    }
                }
            }
            c.beginPath();
            c.arc(x,y,len,0*deg,a_deg*deg,false); 
            c.stroke();
            if(r >= 3){
                for(i = i+1; i < 2*r; )
                {
                    if(r == 3){
                        c.beginPath();  
                        c.arc(x,y+2*len_sin,len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        i = i+2;
                    }
                    if(r == 5){
                        var l = 2*len*Math.cos((a_deg/2)*deg);
                        c.beginPath();
                        c.arc(x+l*Math.cos(54*deg),y+l*Math.sin(54*deg),len,(180+a_deg)*deg,(180+2*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,2*a_deg*deg,3*a_deg*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x-l*Math.cos(54*deg),y+l*Math.sin(54*deg),len,(180+3*a_deg)*deg,(180+4*a_deg)*deg,false);
                        c.stroke();
                        c.beginPath();
                        c.arc(x,y,len,4*a_deg*deg,5*a_deg*deg,false);
                        c.stroke();
                        i = i+4;
                    }
                }
            }
            c.restore();        
        }
        if(r % 2 == 0){
            if(r == 2 && n == 1){
                for(var i = 0, j = 1; i < 2*n*r ;){
                    var chSign = Math.pow((-1),j);
                    c.beginPath();
                    c.arc(x+chSign*len+chSign*len_cos,y+chSign*len_sin,
                    len,(i*(360/(2*r)))*deg,((i+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    i = i + 2;
                    j = j + 1;
                }
                for(var k = 1; k < 2*r*n ;){
                    c.beginPath();
                    c.arc(x,y,len,(k*(360/(2*r)))*deg,((k+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    k = k + 2;
                }
            }
            if(r == 4 && n == 1){
                for(var i = 0, j = 1; i < 2*n*r ;){
                    var chSign = Math.pow((-1),j);
                    var eg = 2*len*Math.cos((a_deg/2)*deg);
                    c.beginPath();
                    c.arc(x+chSign*eg*Math.cos((a_deg/2)*deg),y+chSign*eg*Math.sin((a_deg/2)*deg),
                        len,(i*a_deg)*deg,((i+1)*a_deg)*deg,false);
                    c.stroke();
                    c.beginPath();
                    c.arc(x+Math.pow((-1),j-1)*eg*Math.sin((a_deg/2)*deg),y+chSign*eg*Math.cos((a_deg/2)*deg),
                        len,((i+2)*a_deg)*deg,((i+3)*a_deg)*deg,false);
                    c.stroke();
                    i = i + 4;
                    j = j + 1;
                }
                for(var k = 1; k < 2*r*n ;){
                    c.beginPath();
                    c.arc(x,y,len,(k*(360/(2*r)))*deg,((k+1)*(360/(2*r)))*deg,false);
                    c.stroke();
                    k = k + 2;
                }
            }
        }
    }
}
function ellipseFractal(c, n, x, y, r1, r2, r)
{
    if(r1 > r2){
        rX = r1;
        rY = r2;
    }else{
        rX = r2;
        rY = r1;
    }
    ratioX = rX / rX;
    ratioY = rY / rX;
    c.save(); 
    c.scale(ratioX,ratioY);
    c.beginPath();
    c.arc(x/ratioX,y/ratioY,rX,rY,0,Math.PI*2,false);
    c.stroke();
    c.closePath();
    c.restore();
}
function eraseAll(event) {
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();
}

function clear(){
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();
}

