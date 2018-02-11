var image = null;
var originalImage=null;
var filterImage = null;
var canvas;


function loadImage() {
  canvas = document.getElementById("imgcanv");
  var fileinput = document.getElementById("imgfile"); 
  image = new SimpleImage(imgfile); 
  image.drawTo(canvas);
  
  originalImage = new SimpleImage(imgfile);
}

function doGray() {
  if(imageLoaded(originalImage)) {
    alert("Image Not Loaded");
  } else {
  filterImage = new SimpleImage(originalImage);
  
  for (var pixel of filterImage.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  filterImage.drawTo(canvas);
  }
}

function doRed()  {
  if(imageLoaded(originalImage)) {
    alert("Image Not Loaded");
  } else {
    filterImage = new SimpleImage(originalImage);
  for (var pixel of filterImage.values())  {
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
  if (avg <128){
    pixel.setRed(2*avg);
    pixel.setGreen(0);
    pixel.setBlue(0);
  } else {
     pixel.setRed(255);
     pixel.setGreen((2*avg)-255);
     pixel.setBlue((2*avg)-255); 
    }
  }
  filterImage.drawTo(canvas);
  }
}

function doReset() {
  image = new SimpleImage(originalImage);
  var canvas = document.getElementById("imgcanv");
  originalImage.drawTo(canvas);
}

function blurImage() {
  if(imageLoaded(originalImage)) {
    alert("No Image Loaded");
  } else {
    filterImage = new SimpleImage(originalImage);
    for(var pixel of filterImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var h = filterImage.getHeight() -1;
      var w = filterImage.getWidth() - 1;
      var randomPixel = Math.round(Math.random() * 10);
      var randomSwitch = Math.random();
      if(randomSwitch < 0.5) {
        if(x + randomPixel > w || y + randomPixel > h) {
          x = w - randomPixel;
          y = h - randomPixel;
          filterImage.setPixel(x, y, pixel);
        } else {
          x += randomPixel;
          y += randomPixel;
          filterImage.setPixel(x, y, pixel);
        }
      } else {
        filterImage.setPixel(x, y, pixel);
      }
    }
    
    
    filterImage.drawTo(canvas);
  }
}

function rainbowImage() {
  if (imageLoaded(originalImage)) {
    alert("No Image Loaded");
  } else {
    filterImage = new SimpleImage(originalImage);
    for(var pixel of filterImage.values()) {
        var y = pixel.getY();
        var h = originalImage.getHeight();
        var r = pixel.getRed();
        var g = pixel.getGreen();
        var b = pixel.getBlue();
        var avg = (r + g + b) / 3;
        if(y < h/7) {
            if(avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(2 * avg - 255);
                
            }
        }
        if (y > h/7 && y < h/7*2) {
            if(avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(1.2 * avg - 51);
                pixel.setBlue(2 * avg - 55);
            }
        }
        if (y > h/7*2 && y < h/7*3) {
            if(avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            }
        }
        if (y > h/7*3 && y < h/7*4) {
            if(avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(2*avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(255);
                pixel.setBlue(2 * avg - 255);
            }
        }
        if (y > h/7*4 && y < h/7*5) {
            if(avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(2 * avg - 255);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            }
        }
        if (y > h/7*5 && y < h/7*6) {
            if(avg < 128) {
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(1.2 * avg - 51);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(255);
            }
        }
        if (y > h/7*6) {
            if(avg < 128) {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            } else {
                pixel.setRed(0.4 * avg + 153);
                pixel.setGreen(2 * avg - 255);
                pixel.setBlue(0.4 * avg + 153);
            }
        }
    }
    filterImage.drawTo(canvas);
  }
}

function mirrorImage() {
  if(imageLoaded(originalImage)) {
    alert("Image not Loaded!");
  } else {
  filterImage = new SimpleImage(originalImage.getWidth(), originalImage.getHeight());
  for (var pixel of originalImage.values()) {
        var w = originalImage.getWidth()-1;
        var x = w-pixel.getX();
        var y = pixel.getY();
        filterImage.setPixel(x, y, pixel); 
    }
  filterImage.drawTo(canvas);
  }
}

function reflectButton() {
  if(imageLoaded(originalImage)) {
    alert("No Image Loaded");
  } else {
    filterImage = new SimpleImage(originalImage);
    for (var pixel of originalImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      var slider = document.getElementById("reflectSlider");
  sliderValue = slider.value;
      // var mid = originalImage.getWidth()/2;
      var mid = originalImage.getWidth() * sliderValue / 100;
      var w = originalImage.getWidth() - 1;
      if (x < mid) {
        x = w - x;
        filterImage.setPixel(x, y, pixel);
      } else {
        filterImage.setPixel(x, y, pixel);
      }
      x = w-pixel.getX();
      y = pixel.getY();
      filterImage.setPixel(x, y, pixel);
    }
    filterImage.drawTo(canvas);
  }
}

function negativeImage() {
  if(imageLoaded(originalImage)) {
    alert("Image not loaded");
  } else {
  filterImage = new SimpleImage(originalImage);
  
  for(var pixel of filterImage.values()) {
    pixel.setRed(255 - pixel.getRed());
    pixel.setGreen(255 - pixel.getGreen());
    pixel.setBlue(255 - pixel.getBlue());
  }
  filterImage.drawTo(canvas);
  }
}

function imageLoaded(image) {
  if (image == null || !image.complete) {
    return true;
  }
}

function clearAll() {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  originalImage = null;
}