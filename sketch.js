const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,bone,ground;
var bone_con;
var bone_con_2;
var bone_con_3;
var rope3;

var bg_img;
var bone;
var dog1;

var button,button2,button3;
var dog;
var st,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('house.jpg');
  food = loadImage('bone.png');
  dog1 = loadImage('dog normal.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  st = loadAnimation("dog3.png")
  eat = loadAnimation("dog eat.webp");
  sad = loadAnimation("sad dog.png");
  
  st.playing = true
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  
  
  
  frameRate(80);
 var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
 if(isMobile){
  canW = displayWidth
  canH = displayHeight
  createCanvas(displayWidth+80, displayHeight)
 }
 else{
  canW = windowWidth
  canH = windowHeight
  createCanvas(windowWidth, windowHeight)
 }
  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //btn3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

   //btn4
   button4 = createImg('cut_btn.png');
   button4.position(180,60);
   button4.size(60,60);
   button4.mouseClicked(drop4);

   //btn5
   button5 = createImg('cut_btn.png');
   button5.position(20,180);
   button5.size(60,60);
   button5.mouseClicked(drop5);


  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  rope4 = new Rope(4,{x: 200, y:80})
  rope5 = new Rope(8, {x:50, y:200})
  ground = new Ground(200,690,600,20);
 
  dog = createSprite(170,620,100,100);
  dog.scale = 0.2;

  dog.addAnimation('blinking',st);
  dog.addAnimation('eating',eat);
  dog.addAnimation('crying',sad);
  dog.changeAnimation('blinking');
  
  bone = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,bone);

  bone_con = new Link(rope,bone);
  bone_con_2 = new Link(rope2,bone);
  bone_con_3 = new Link(rope3,bone);
  bone_con_4 = new Link(rope4, bone)
  bone_con_5 = new Link (rope5, bone) 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0, 0, displayWidth+80, displayHeight);

  push();
  imageMode(CENTER);
  if(bone!=null){
    image(food,bone.position.x,bone.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show()
  rope5.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(bone,dog)==true)
  {
    bone = null
    eating_sound.play();
  }

  if(bone!=null && bone.position.y>=650)
  {
    
    bk_song.stop();
    sad_sound.play();
    bone=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  bone_con.detach();
  bone_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  bone_con_2.detach();
  bone_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  bone_con_3.detach();
  bone_con_3 = null;
}

function drop4()
{
  cut_sound.play();
  rope4.break();
  bone_con_4.detach();
  bone_con_4 = null;
}

function drop5()
{
  cut_sound.play();
  rope5.break();
  bone_con_5.detach();
  bone_con_5 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,bone);
               bone = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


