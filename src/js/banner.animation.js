'use strict';

var banner             = document.getElementById('banner'),
    W                  = banner.offsetWidth,
    H                  = banner.offsetHeight,
    dur                = 0.2,
    eio                = Power2.easeInOut,
    ei                 = Power2.easeIn,
    timeline,
    sideCar            = document.querySelector('.side-car'),
    sideCarWheels      = document.querySelectorAll('.side-car-rim'),
    sideCarBody        = document.querySelector('.side-car-body'),
    tailLight          = document.querySelector('.tail-light'),
    cta                = document.querySelector('.cta-cont'),
    ctaShine           = document.querySelector('.cta-shine'),
    arrowLeft          = document.querySelector('.arrow-left'),
    arrowRight         = document.querySelector('.arrow-right'),
    copyTxt1           = document.querySelector('.copy-txt1'),
    copyTxt2           = document.querySelector('.copy-txt2'),
    copyTxt3           = document.querySelector('.copy-txt3'),
    copyTxt4           = document.querySelector('.copy-txt4'),
    bgBlack            = document.querySelector('.bg-black'),
    orangeTiles        = document.querySelectorAll('.tile-orange'),
    redTiles           = document.querySelectorAll('.tile-red'),
    bannerBorder       = document.querySelector('.border'),
    logo               = document.querySelector('.mini-logo'),
    logoShine          = document.querySelector('.logo-shine'),
    frontCar           = document.querySelector('.front-car'),
    frontCarBody       = document.querySelector('.car-body'),
    redBody            = document.querySelector('.red-body'),
    orangeBody         = document.querySelector('.orange-body'),
    frontCarWheels     = document.querySelectorAll('.rotating-wheel'),
    frontCarFrontWheel = document.querySelectorAll('.front-wheel'),
    changeColorTxt     = document.querySelector('.change-color-txt'),
    colorSelectors     = document.querySelectorAll('.color-selector'),
    blueSelector       = document.querySelector('.blue-selector'),
    orangeSelector     = document.querySelector('.orange-selector'),
    redSelector        = document.querySelector('.red-selector'),
    blue               = '#07a2d4',
    orange             = '#dd8601',
    red                = '#93121b';

TweenMax.defaultEase = Power2.easeOut;

// setup initial element states
function cssInit() {
  TweenMax.set(sideCarWheels, { rotation: 220 });
  TweenMax.set(frontCarWheels, { rotation: 90 });
  TweenMax.set(colorSelectors, { xPercent: -50, yPercent: -50 });
  TweenMax.set(frontCarFrontWheel, { rotationY: 45, scale: 0.96 });
  TweenMax.set([redBody, orangeBody], { autoAlpha: 0 });
}
cssInit();


function sideCarTl() {
  var tl = new TimelineMax()

    .add('carIn')
    .set(sideCar, { autoAlpha: 1 }, 'carIn')
    .from(sideCar, 1, { x: -W, ease: Back.easeOut.config(0.5) }, 'carIn')
    .to(sideCarWheels, 1, { rotation: '+=500', ease: Back.easeOut.config(0.5) }, 'carIn')
    // car brake effect on front suspension
    .to(sideCarBody, 0.5, { rotation: 0.5, transformOrigin: '20% 50%', ease: eio, repeat: 1, yoyo: true }, 'carIn+=0.2')
    .staggerFrom([copyTxt2, copyTxt1], 0.7, { x: -W, autoAlpha: 0 }, 0.2, 'carIn+=0.2')

    .add('orangeBgTransition', '+=1')
    .to([copyTxt2, copyTxt1], 0.7, { autoAlpha: 0, ease: ei }, 'orangeBgTransition')
    .from([copyTxt3, copyTxt4], 0.7, { z: '-50%', autoAlpha: 0, ease: eio }, 'orangeBgTransition+=0.5')
    .staggerFrom(orangeTiles, 0.8, { z: '-100%', autoAlpha: 0, ease: eio }, 0.03, 'orangeBgTransition')

    .add('redBgTransition', '+=1')
    .staggerFrom(redTiles, 0.8, { z: '-100%', autoAlpha: 0, ease: eio }, 0.03, 'redBgTransition')
    
    .add('carOut', '+=1')
    .set(tailLight, { autoAlpha: 0 }, 'carOut')
    .to(sideCar, 1, { x: W, ease: Back.easeIn.config(0.35) }, 'carOut+=0.1')
    .to(sideCarWheels, 1, { rotation: '+=500', ease: Back.easeIn.config(0.35) }, 'carOut+=0.1')
    // fast acceleration effect on front suspension
    .to(sideCarBody, 1, { rotation: 0.7, transformOrigin: '20% 50%', ease: eio }, 'carOut')
    .staggerTo([copyTxt4, copyTxt3], 0.7, { x: W, autoAlpha: 0, ease: ei }, 0.1, 'carOut+=0.3');
  
  return tl;
}

function logoTl() {
  var tl = new TimelineMax()
    
    .add('logoIn')
    .staggerTo([bgBlack, bannerBorder], 0.7, { autoAlpha: 1, ease: eio }, 0.2, 'logoIn')
    .from(logo, 1.2, { bezier: { type: 'soft', values: [{ y: 200, z: -500 }, { y: 0, z: -1000 }, { y: -1000, z: -4000 }] }, autoAlpha: 0 }, 'logoIn+=0.5')

    .add('logoOut')
    .fromTo(logoShine, 1, { x: -190 }, { x: 190, ease: eio }, 'logoOut')
    .to(logo, 1, { z: 400, y: -75, autoAlpha: 0, ease: ei }, 'logoOut+=1');
  
  return tl;
}

function frontCarTl() {
  var tl = new TimelineMax()
    
    .add('carIn')
    .set(frontCar, { autoAlpha: 1 }, 'carIn')
    .from(frontCar, 1, { x: W, y: 10, scale: 0.7, ease: Back.easeOut.config(0.5) }, 'carIn')
    .to(frontCarWheels, 1, { rotation: '-=500', ease: Back.easeOut.config(0.5) }, 'carIn')
    .to(frontCarBody, 0.5, { rotation: -0.5, transformOrigin: '80% 50%', ease: eio, repeat: 1, yoyo: true }, 'carIn+=0.2')
    .to(frontCarFrontWheel, 1, { rotationY: '-=25', ease: eio }, 'carIn+=1')

    .add('colors')
    .to(changeColorTxt, 0.7, { autoAlpha: 1 }, 'colors')
    .staggerFrom(colorSelectors, 0.5, { scale: 0, autoAlpha: 0 }, 0.1, 'colors')
    .to(blueSelector, dur, { border: '2px solid #fff' }, 'colors')

    .add('cta')
    .to(cta, 1, { autoAlpha: 1 }, 'cta')
    .fromTo(ctaShine, 0.7, { x: '-100%' }, { x: '100%', ease: eio }, 'cta+=0.7');
  
  return tl;
}

function masterTl() {
  timeline = new TimelineMax()
    .add(sideCarTl())
    .add(logoTl())
    .add(frontCarTl());
  return timeline;
}

// fire animations
window.onload = function () {
  masterTl();
};

// animate each arrow on cta button hover
cta.onmouseenter = function () {
  var tlRight = new TimelineMax()
    .to(arrowRight, 0.2, { x: 10, ease: ei })
    .set(arrowRight, { x: -30 })
    .to(arrowRight, 0.4, { x: 0 });
  var tlLeft = new TimelineMax()
    .to(arrowLeft, 0.35, { x: 10, ease: ei })
    .set(arrowLeft, { x: -30 })
    .to(arrowLeft, 0.4, { x: 0 });
};

// set up event listeners for changing car and banner border colors, and add border arround active color on click
for (var i = 0; i < colorSelectors.length; i++) {

   colorSelectors[i].addEventListener('click', function () {

    TweenMax.set(colorSelectors, { clearProps: 'border' });
    TweenMax.set(this, { border: '2px solid #fff' });
      
    if (this === orangeSelector) {
      TweenMax.to(orangeBody, dur, { autoAlpha: 1, ease: eio });
      TweenMax.to(redBody, dur, { autoAlpha: 0, ease: eio });
      TweenMax.to(bannerBorder, dur, { borderColor: orange, ease: eio });
    } else if (this === redSelector) {
      TweenMax.to(redBody, dur, { autoAlpha: 1, ease: eio});
      TweenMax.to(bannerBorder, dur, { borderColor: red, ease: eio });
    } else {
      TweenMax.to([redBody, orangeBody], dur, { autoAlpha: 0, ease: eio });
      TweenMax.to(bannerBorder, dur, { borderColor: blue, ease: eio });
    }

  });

}