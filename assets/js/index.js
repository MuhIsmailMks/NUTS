 
AOS.init({
    once: true
  });


  // script.js
document.addEventListener('scroll', function() {
    const hero_parallax = document.querySelector('.hero_parallax')
    const navBar = document.querySelector('.navbar')
    const all_parallax = document.querySelectorAll('.all_parallax')
    const scrollY = window.scrollY;

    hero_parallax.style.transform = `translateY(${scrollY * 0.5}px)`;
    // all_parallax.forEach(all => {
    //     all.style.transform = `translateY(${scrollY * -0.5}px)`;
    // })
});


// gsap scroll animation
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1024px)": function() {
         

            // map image
            gsap.to(".nutzMap_image", {
                yPercent: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: ".nutzMap_image",
                    start: "top-=200px top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // left  
            gsap.to(".parallax_left", {
                xPercent: 14,  
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax_left", 
                    start: "top bottom",    
                    end: "bottom top",    
                    scrub: 1                    
                }
            });

            // right  
            gsap.to(".parallax_right", {
                xPercent: -14,  
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax_right", 
                    start: "top bottom",    
                    end: "bottom top",    
                    scrub: 1                    
                }
            });

        },

        // Mobile
        "(max-width: 1023px)": function() {
           
            gsap.to(".nutzMap_image", {
                yPercent: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: ".nutzMap_image",
                    start: "top-=200px top",
                    end: "bottom top",
                    scrub: 1
                }
            });


             // left  
             gsap.to(".parallax_left", {
                xPercent: 5,  
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax_left", 
                    start: "top bottom",    
                    end: "bottom top",    
                    scrub: 1                    
                }
            });

            // right  
            gsap.to(".parallax_right", {
                xPercent: -5,  
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax_right", 
                    start: "top bottom",    
                    end: "bottom top",    
                    scrub: 1                    
                }
            });
        }
    });
});

// enter pop up
const popUp = document.querySelector('.pop-up')
const enterBtns = document.querySelectorAll('.enter')

enterBtns.forEach(enter => {
    enter.addEventListener('click', () => {
        popUp.classList.add('hidden') 
      })
})



// nav handler
const menu_btn = document.querySelector('nav .menu');
const links = document.querySelector('nav .links');

menu_btn.addEventListener('click', () => {
    menu_btn.classList.toggle('active')
    links.classList.toggle('active') 
}) 
 
links.addEventListener('click', (e) => { 
  if (e.target.tagName === 'A') { 
    menu_btn.classList.remove('active')
    links.classList.remove('active') 
  } 
})


// copy address 
const btnsCopy = document.querySelectorAll('.copy_btns');  
const btn = document.querySelector('.copy_btn');  
const text = document.querySelector('.contract_address');  

 
const contractText = text.innerText;
let timeout;

btnsCopy.forEach(copyBtn => {
    const btn = copyBtn.querySelector('.copy_btn');  
    const text = copyBtn.querySelector('.contract_address');  

    
    const contractText = text.innerText;
    let timeout;

    btn.addEventListener('click', function () { 
        navigator.clipboard.writeText(text.innerText).then(function() { 
            text.innerText = 'Copied';
     
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                text.innerText = contractText;
            },1000);
        }).catch(function(err) {
            console.error('not copied in keyboard ', err);
        });
    });
})
 

// token image click
const news_images = document.querySelectorAll('.news_image');
const popUp_container = document.querySelector('.popUp_container');
const image_popUp_container = document.querySelector('.popUp_container .image_popUp');


news_images.forEach(news_image => {
   news_image.addEventListener('click', () => {
    const img = news_image.querySelector('img').src;
    console.log(img);

    image_popUp_container.src = img

    popUp_container.classList.add('flex')
    popUp_container.classList.remove('hidden')
   })
})

popUp_container.addEventListener('click', () =>{
    popUp_container.classList.remove('flex')
    popUp_container.classList.add('hidden')
})

// writing text
let elements = document.querySelector('.writingAnimated');

let typed = new Typed(elements, {
    strings: [elements.dataset.typedStrings],
    typeSpeed: 30,
    backSpeed: 45,
    cursorChar: '...', 
    smartBackspace: false,
    loop: true
}); 
 


// input sol
document.getElementById('numberInput').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.]/g, '');
});

document.querySelector('.hero__btn').addEventListener('click', function() {
    document.getElementById('numberInput').focus();
});


const input = document.getElementById('numberInput');
const suffixText = document.getElementById('suffixText');

function adjustInputWidth() {
    const context = document.createElement('canvas').getContext('2d');
    context.font = getComputedStyle(input).font;
    const text = input.value || input.placeholder || " ";
    const width = context.measureText(text).width;

    input.style.width = `${width + 10}px`; // 4px padding
}

input.addEventListener('input', adjustInputWidth); 
adjustInputWidth();
 

function validateAndAdjust() {
    let value = input.value; 
    value = value.replace(/[^0-9.]/g, '');
 
    if (value.startsWith('.')) {
        value = '0' + value;
    }
 
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
 
 
    if (parts.length > 1 && parts[1].length > 1) {
        parts[1] = parts[1].charAt(0);  
        value = parts.join('.');
    }
 
      if (value.startsWith('0')) { 
        value = value.replace(/^0+/, '0');
    }


    if (/^0[1-9]$/.test(value)) {
        value = '0.' + value.charAt(1);
    }
    
 
    if (value.endsWith('.')) {
        input.value = value;
        return;
    } 
    if (value === '0.0') {
        value = '0.1';
    }
 
    const numericValue = parseFloat(value);
    if (numericValue > 200) {
        value = '200';
    }

    input.value = value;
}

input.addEventListener('input', validateAndAdjust);
 


// particle js
document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.particle-section .particles-js');
  
    // Konfigurasi untuk Particle.js
    var particleConfig = {
      "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 1500 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "star", "stroke": { "width": 0, "color": "#000000" } },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 5, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "repulse" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
          "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
          "repulse": { "distance": 200, "duration": 0.4 },
          "push": { "particles_nb": 4 },
          "remove": { "particles_nb": 2 }
        }
      },
      "retina_detect": true
    };
  
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          var particlesElement = entry.target;
          if (!particlesElement.classList.contains('initialized')) {
            particlesElement.classList.add('initialized');
            particlesJS(particlesElement.id, particleConfig);
          }
        }
      });
    }, { threshold: [0.1] });
  
    sections.forEach((section, index) => {
      section.id = `particles-js-${index}`;
      observer.observe(section);
    });
  });
  



  let tl = gsap.timeline();
