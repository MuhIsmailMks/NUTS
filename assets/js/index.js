 

// gsap scroll animation
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1024px)": function() {
            gsap.to(".hero_parallax", {
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero_parallax",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        },
        // Mobile
        "(max-width: 1023px)": function() {
            gsap.to(".hero_parallax", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero_parallax",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });
});
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
 