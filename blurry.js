/**
 * Created by v5777 on 13/08/2015.
 */
class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, c.width, c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function definitions here


$(document).ready(function () {
    var img = new Image();
    img.src = "img/michaelbuble.jpg";
    //console.log(img.height);
    //console.log(img.width);
    // makeBlurry(img);

    makeBlurry(img);
});

function makeBlurry(img) {

    var pixels = ImageUtils.getPixels(img);
    console.log(pixels);

    var length = img.width;
    var height = img.height;
    var data = pixels.data;

    var picture = oneToTwoD(data, height, length);
    var finishedPic = oneToTwoD(data, height, length);

    for (var m = 0; m < length * 4; m++) {
        for (var n = 0; n < height; n++) {
            /*HERE*/
            finishedPic[n][m] = average(m, n, picture, length, height);
        }
    }

    // console.log(picture[0][1]);
    // console.log(data[1]);


    /* for (i = 0; i < length*height; i++); {
     if (i => length && i !> length*(height-1) && i % length != 0 && )
     }*/

    //console.log(length + " ");
    //console.log(height);

    var databis = twoToOne(finishedPic, height, length);
    for (var i=0; i<databis.length; i++){
        data[i] = databis[i];
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}


function oneToTwoD(anArray, height, width) {
    var picture = [];

    //make 2D array

    for (var y = 0; y < height; y++) {
        picture[y] = [];
        for (var x = 0; x < width * 4; x++) {
            picture[y][x] = anArray[y * width * 4 + x];
        }
    }
    return picture;
}

function average(m, n, picture, width, height) {
    var sum = 0;
    var numberOfPixels = 0;
    for (var i = m - 60; i < m + 61; i+=4) {
        //for (var j = n - 2; j < n + 3; j++) {
            if (i >= 0 && n >= 0 && i < width * 4 && n < height) {
                numberOfPixels++;
                sum += picture[n][i];
            }
        //}
    }

    var adjustment = 0;
    //console.log(sum/ numberOfPixels);
    if (numberOfPixels > 0) {
        adjustment = sum / numberOfPixels;
    }
    return adjustment;

}

function twoToOne(anArray, height, width) {
    var picture = [];

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width * 4; x++) {
            picture[y * width * 4 + x] = anArray[y][x]
        }
    }
    return picture;
}

/*
 function indexToI(x, length) {

 return x % length;

 }


 function indexToJ(x, height) {

 return [x / height];

 }

 function coordinatesToX(i, j, length) {

 return j * length + i;

 }

 function average(i, j, pixels) {

 var sum;
 var numberOfPixels = 9;
 if (i < 0) {


 }

 }*/


