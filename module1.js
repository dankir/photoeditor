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
        return ctx.getImageData(0,0,c.width,c.height);
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


$(document).ready(function() {
        var img = new Image();
        img.src = "img/michaelbuble.jpg";
        makeFunky(img);

    var colorNames =
        [["red", "pink"],
        ["blue", "cyan"]];
    console.log(colorNames[0][0]);
    console.log(colorNames[0][1]);
    console.log(colorNames[1][0]);
    console.log(colorNames[1][1]);
});

function makeMoreBlue(img, adjustment) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+2] = data[i+2] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeMoreGreen(img, adjustment) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+1] = data[i+1] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeMoreRed(img, adjustment) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function brighten(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;


    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + adjustment;
        data[i+1] = data[i+1] + adjustment;
        data[i+2] = data[i+2] + adjustment;
    }


    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeInvert(img) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length;i += 4) {
        data[i] = 255 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeFunky(img) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+2] = data[i+2] + 200;
    }

    for (var i = 0; i < length/2; i += 2) {
        var temp = data[i];
        data[i] = data[length - i];
        data[length - i] = temp;
    }

    for (var i = 0; i < length; i += 9) {
        data[i] = data[i] + 60;
        data[i+1] = data[i+1] + 30;
        data[i+2] = data[i+2] + 50;
    }

    for (var i = 0; i < length;i += 9) {
        data[i] = 200 - data[i];
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}