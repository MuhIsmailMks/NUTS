// locomotive init
document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
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

    // Izinkan hanya angka dan titik desimal
    value = value.replace(/[^0-9.]/g, '');

    // Jika titik berada di awal, tambahkan 0 di depannya
    if (value.startsWith('.')) {
        value = '0' + value;
    }

    // Jika lebih dari satu titik desimal, hapus yang ekstra
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
 

    // Batasi hanya satu digit setelah titik desimal
    if (parts.length > 1 && parts[1].length > 1) {
        parts[1] = parts[1].charAt(0); // Hanya ambil digit pertama setelah titik desimal
        value = parts.join('.');
    }

      // Batasi nol di awal menjadi maksimal dua
      if (value.startsWith('0')) {
        // Jika titik desimal diikuti oleh lebih dari dua nol
        value = value.replace(/^0+/, '0');
    }


    if (/^0[1-9]$/.test(value)) {
        value = '0.' + value.charAt(1);
    }
    

    // Jika ada titik di akhir, biarkan pengguna mengedit lebih lanjut
    if (value.endsWith('.')) {
        input.value = value;
        return;
    }

    // Mencegah input "0.0" atau "00.0"
    if (value === '0.0') {
        value = '0.1';
    }

    // Konversi ke angka dan batasi maksimum
    const numericValue = parseFloat(value);
    if (numericValue > 200) {
        value = '200';
    }

    input.value = value;
}

input.addEventListener('input', validateAndAdjust);
