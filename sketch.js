//Create variables here
var Dog, HappyDogImg, DogImg, database;
var FoodS, FoodStock;
var hunger = hunger+1;

function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  FoodStock = database.ref('food');
  FoodStock.on("value", readStock);
  FoodS = 20;

  Dog = createSprite(250, 300, 50, 50);
  Dog.addImage(DogImg);
  Dog.scale = 0.2;

  defaultStock(FoodS);
}


function draw() {
background("green");

 

  if(keyWentDown(UP_ARROW))
  {
    //writeStock(FoodS);
    writeStock(FoodS)
    Dog.addImage(HappyDogImg)
    hunger = 0;
    frameCount = 0;
  }
  else if(frameCount % 80 === 0)
  {
    Dog.addImage(DogImg);
  }
  if(hunger > 20)
  {
    textSize(15);
    fill("white");
    text("Your Dog Is Hungry", 200, 400);
  }

  drawSprites();
  //add styles here

  textSize(15);
  fill("white");
  text("YOUR FOOD STOCK IS " + FoodS, 150, 150);
  text("PRESS THE UP ARROW TO FEED YOUR DOG", 100, 50);
}

function defaultStock(x)
{
  x = 20
  database.ref('/').update(
    {
      'food' : x
    }
  )
}

function readStock(data)
{
  FoodS = data.val();
}

function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x-1
  }

  database.ref('/').update(
    {
      'food' : x
    }
  )
}

