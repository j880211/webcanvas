var canvas = document.getElementById('art');
var ctx = canvas.getContext('2d');
var cPushArray = new Array();
var cStep = -1;
var ctx;
var colors = ['red', 'lightpink', 'sandybrown', 'yellow', 'lime', 'mediumseagreen', 'lightskyblue', 'dodgerblue', 'purple', 'black','white','orange','gray','blue'];
var currenttool=1;
var nowcolor="black";
var canvasPic = new Image();
var drawing=false;
var flag=0;
ctx.font = "30px sans-serif";
function init()
{
  cStep = -1;
  cPushArray = new Array();
  canvasPic = new Image();
  ctx.fillStyle="white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  cPush();
  flag=0;
}


function getMousePos(canvas, evt) 
{
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


var mousedown_Pos;
canvas.addEventListener('mousedown', 
  function(evt) 
  {
    var mousePos = getMousePos(canvas, evt);
      mousedown_Pos=getMousePos(canvas, evt);
      //console.log(drawing);
    if(drawing==true&&flag<1)
    {
    
      var input = document.createElement("input");
      flag++;
      input.style.position="absolute";
      input.style.top=`${evt.y}px`;
      input.style.left=`${evt.x}px`;
      var get = document.getElementById("outer");
      get.appendChild(input);
      ctx.fillStyle = nowcolor;
      var fs=document.getElementById("fontsize");
      var ff=document.getElementById("fonttype");
      var rec = canvas.getBoundingClientRect();
      var x_position = evt.offsetX;
      var y_position = evt.offsetY;

      ctx.font = `${fs.value}px ${ff.options[ff.selectedIndex].value}`;
      //console.log(ctx.font);
      input.addEventListener('keydown',(event)=>{
        if(event.keyCode==13)
        {
          //drawing=false;
          console.log(drawing);
          ctx.beginPath();
          console.log(input.value);
          ctx.fillText(input.value,evt.pageX-rec.left,evt.pageY-rec.top);
          //console.log(ctx.fillText);
          ctx.stroke();
          cPush();
          input.remove();
          flag=0;
        }
    });
      
    }
    else
    {
      ctx.beginPath();
      ctx.moveTo(mousePos.x, mousePos.y);
      evt.preventDefault();
      canvas.addEventListener('mousemove', mouseMove, false);
    }
  }
);


var nowfont="serif";
var nowfontsize=15;
function myFunction() {
  var x = document.getElementById('myText').value;
  ctx.fillText(x, 400,500);
}

canvas.addEventListener('mouseup',
 function() 
 {
    cPush();
    canvas.removeEventListener('mousemove', mouseMove, false);
 }, false);

function mouseMove(evt) 
{
  var mousePos = getMousePos(canvas, evt);
  console.log(currenttool);
  switch (currenttool) 
  { 
    case 1: 
      ctx.strokeStyle = nowcolor;
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    break; 
    case 2: 
      ctx.strokeStyle=colors[10]; 
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    break; 
    case 3: 
      var width;
      var height;
      ctx.strokeStyle = nowcolor;
      canvasPic.src = cPushArray[cStep];
      console.log(cStep);
      canvasPic.onload = function(){ 
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvasPic, 0, 0); }
      //

      width= mousedown_Pos.x - mousePos.x ;
      height= mousedown_Pos.y -mousePos.y ;

      ctx.beginPath();
      ctx.rect(mousePos.x, mousePos.y, width, height);
      setTimeout(()=>{ctx.stroke()},5);
      ctx.closePath();
    break;
    case 4:
      ctx.strokeStyle = nowcolor;
      canvasPic.src = cPushArray[cStep];
      console.log(cStep);
      canvasPic.onload = function(){ 
      ctx.drawImage(canvasPic, 0, 0); }
    
      ctx.beginPath();
      ctx.moveTo(mousedown_Pos.x, mousedown_Pos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.lineTo(2*(mousePos.x-mousedown_Pos.x), mousePos.y);
      ctx.closePath();

      setTimeout(()=>{ctx.stroke()},5);
      
    break;
    case 5:
      ctx.strokeStyle = nowcolor;
      canvasPic.src = cPushArray[cStep];
      console.log(cStep);
      canvasPic.onload = function(){ 
      ctx.drawImage(canvasPic, 0, 0); }
    
      ctx.beginPath();
      ctx.arc(mousedown_Pos.x,mousedown_Pos.y,mousePos.x-mousedown_Pos.x,0,360,false);
      ctx.closePath();

      setTimeout(()=>{ctx.stroke()},5);
    
  break;
      
    default:  
  }
}

//reset
document.getElementById('reset').addEventListener('click', 
  function() 
  {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
  }, false);

//changetool
function changetool(i)
{
  switch(i)
  {
    case 1:
      currenttool=1;
      canvas.style.cursor = "url('brush.png'),default";
      drawing=false;
      break;
    case 2:
      currenttool=2;
      canvas.style.cursor = "url('eraser.png'),default";
      drawing=false;
      break;
    case 3:
      currenttool=3;
      canvas.style.cursor = "crosshair";
      drawing=false;
      break;
    case 4:
    currenttool=4;
    canvas.style.cursor = "crosshair";
    drawing=false;
    break;
    case 5:
    currenttool=5;
    canvas.style.cursor = "crosshair";
    drawing=false;
    break;
    case 6:
    currenttool=6;
    canvas.style.cursor = "text"
    drawing=true;
    default:
      break;
  }

}


function listener(i) 
{
  nowcolor = colors[i];
  console.log(ctx.strokeStyle, colors[i],nowcolor);
}

function fontSizes(i) 
{
    ctx.lineWidth = i;
    console.log(ctx.lineWidth);
}

//linefont
function square()
{
  ctx.lineCap = "square";
}

function round()
{
  ctx.lineCap = "round";
}

//push
function cPush() 
{
  cStep++;
  if (cStep < cPushArray.length) { cPushArray.length = cStep; }
  cPushArray.push(document.getElementById('art').toDataURL());
}

//undo
function cUndo() 
{
  if (cStep > 0) 
  {
    cStep--;
    canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

//redo
function cRedo() 
{
  if (cStep < cPushArray.length-1) 
  {
    cStep++;
    var canvasPic = new Image();
    canvasPic.src = cPushArray[cStep];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
  }
}

//upload
function handleImage(e)
{
  var reader = new FileReader();
  reader.onload = function(event)
  {
    var img = new Image();
    img.src = event.target.result;
    img.onload = function()
    {
        // canvas.width = img.width;
        // canvas.height = img.height;
        ctx.drawImage(img,0,0);
        cPush();
    }
    
  }
  reader.readAsDataURL(e.target.files[0]);
   
}

//download
function download()
{
    image = canvas.toDataURL();
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
}

function changefontsize(i)
{
   nowfontsize=i;
   changefont();
}
function changefonttype(i)
{
    nowfont=i;
    changefont();
}
function changefont()
{
  ctx.font = nowfontsize+'px'+" "+nowfont;
  console.log(ctx.font);
}



