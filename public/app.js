// introduction div animations

let introductionHeader = gsap.from(".introduction", {opacity: 0});
introductionHeader = gsap.to(".introduction", {opacity: 1, duration: 3, ease: "expo.out"});

let quickLoad = gsap.from(".quick-load", {opacity: 0});
quickLoad = gsap.to(".quick-load", {opacity: 1, duration: 3, ease: "expo.out"});

// weather app div animation

let mainFrame = gsap.from("#main-frame", {opacity: 0, x: -100, y: -100});
mainFrame = gsap.to("#main-frame", {opacity: 1, x: 0, y: 0, duration: 1});

let infoHeader = gsap.from(".info-header", {opacity: 0});
infoHeader = gsap.to(".info-header", {opacity: 1, duration: 2, ease: "expo.out"});

let infoBody = gsap.from(".info-body", {opacity: 0, x: -50});
infoBody = gsap.to(".info-body", {opacity: 1, x: 0, duration: 1});

let futureForecast = gsap.from(".future-forecast-container", {opacity: 0, x: -50});
futureForecast = gsap.to(".future-forecast-container", {opacity: 1, x: 0, duration: 1});