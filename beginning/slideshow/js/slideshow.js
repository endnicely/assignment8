/*eslint-env browser*/

// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
var createSlideshow = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var timer, speed = 2000, play = true, nodes, img, stopSlideShow, displayNextImage, setPlayText;
    
    nodes = { image: null, caption: null };
    img = { cache: [], counter: 0 };
    
    stopSlideShow = function () {
        window.alert(timer);
        clearInterval(timer);
    };
    displayNextImage = function () {
        var imgCacheLength = img.cache.length - 1;
        if (img.counter === imgCacheLength) {
            img.counter = 0;
        } else {
            img.counter += 1;
        }
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    };
    setPlayText = function (btn) {
        if (play) {
            btn.value = "Resume";
        } else {
            btn.value = "Pause";
        }
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        getSpeed: function () {
            return speed;
        },
        setSpeed: function (promptSpeed) {
            speed = promptSpeed;
            return this;
        },
        loadImages: function (slides) {
            var image, i;
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            window.alert(speed);
            timer = setInterval(displayNextImage, speed);
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        }
    };
};

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};


   // CREATE THE SLIDESHOW OBJECT
var slideshow = createSlideshow();
 
window.addEventListener("load", function () {
    "use strict";
 
    var slides = [
        {href: "images/backpack.jpg", title: "He backpacks in the Sierras often"},
        {href: "images/boat.jpg", title: "He loves his boat"},
        {href: "images/camaro.jpg", title: "He loves his Camaro more"},
        {href: "images/punk.jpg", title: "He used to be in a punk band and toured with No Doubt and Sublime"},
        {href: "images/race.jpg", title: "He's active and loves obstacle coarse racing"}
    ];
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE THE SLIDESHOW
    //$("play_pause").onclick = slideshow.createToggleHandler();
     $("play_pause").addEventListener("click", slideshow.createToggleHandler());
    //$("speed").onclick =prompt("The current speed is " + slideshow.getSpeed() + ". Please enter the spped you want", "2000");
    
    $("speed").addEventListener("click", function(){
         var promptSpeed = parseInt(prompt("The current speed is " + slideshow.getSpeed() + "  milliseconds. Please enter the image rotation speed"), 10);

         while(promptSpeed < 0 || !promptSpeed || isNaN(promptSpeed) || !promptSpeed) {
             promptSpeed = parseInt(prompt("Please provide a positive integer for rotation speed"), 10);
         }
         slideshow.setSpeed(promptSpeed).startSlideShow();
        
    });
   
});

