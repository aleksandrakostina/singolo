const MENU = document.getElementById('menu');
const headerHeight = document.querySelector("header").offsetHeight;
const BUTTON = document.getElementById("btn");
const CLOSE_BUTTON = document.getElementById("close-btn");

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('.nav__link').forEach(el => el.classList.remove('nav__link_active'));
    event.target.classList.add('nav__link_active');
    
})

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction(){
  let section = document.querySelectorAll('section');
  for (i = 0; i < section.length; i++) {
    let topsection = section[i].offsetTop - headerHeight,
        bottomsection = section[i].offsetTop + section[i].offsetHeight,
        wscroll = window.scrollY,
        currentid = section[i].getAttribute('id');
    if(topsection < wscroll && bottomsection > wscroll){
      for(j = 0; j < MENU.querySelectorAll('.nav__link').length; j++){
        if(MENU.querySelectorAll('.nav__link')[j].getAttribute('data-scroll') == currentid){
          MENU.querySelectorAll('.nav__link')[j].classList.add('nav__link_active');
        }
        else 
        MENU.querySelectorAll('.nav__link')[j].classList.remove('nav__link_active');
      }
    }
  }
}

MENU.querySelectorAll('.nav__link').forEach(el => el.addEventListener('click', (event) => {
  let blockID = el.getAttribute('data-scroll'),
      blockOffset = document.querySelector('#' + blockID).offsetTop;
  if(blockID == 'home'){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  else {
    window.scrollTo({
      top: blockOffset - headerHeight/2,
      left: 0,
      behavior: 'smooth'
    });
  }
}));

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
   showDivs(slideIndex += n);  
}

function showDivs(n) {
  let slides = document.getElementsByClassName("slides");

  if(slideIndex == 2 || slideIndex == 0){
    document.getElementById("home").classList.add('slider_blue');
    document.getElementById("screen_h").style.display = "none";
    document.getElementById('layout_h').style = "z-index: -6";
    document.getElementById("screen_v").style.display = "none";
    document.getElementById('layout_v').style = "z-index: -6";
  }
  else
  {
    document.getElementById('layout_h').style = "z-index: 3";
    document.getElementById('layout_v').style = "z-index: 3";
    document.getElementById("home").classList.remove('slider_blue');
  }

  if (n > slides.length) {
      slideIndex = 1
    }
  if (n < 1) {
      slideIndex = slides.length
    }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'; 
  }
  slides[slideIndex-1].style.display = 'block'; 
}


document.getElementById('layout_v').onclick = screenV;

function screenV() {
  let x = document.getElementById("screen_v");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
  else
    x.style.display = "none";
}

document.getElementById('layout_h').onclick = screenH;

function screenH() {
  let x = document.getElementById("screen_h");
  if (window.getComputedStyle(x).display === "none") {
    x.style.display = "block";
  }
  else
    x.style.display = "none";
}

var btnContainer = document.getElementById("tag");
btnContainer.addEventListener("click", (event) => {
  btnContainer.querySelectorAll('span').forEach(el => el.classList.remove('tag__item_active'));
  event.target.classList.add('tag__item_active')
});

var portfolio = document.getElementById('portfolio-img');
var nodelist = portfolio.querySelectorAll('img');
var arr = Array.prototype.slice.call(nodelist);

document.getElementById('tag').onclick = sorted; 

function sorted(){
  let sortedListElements = arr.sort(function(){ return Math.random() - 0.5});
  nodelist.innerHTML = '';
  for(i = 0; i < sortedListElements.length; i++){
    portfolio.append(sortedListElements[i]);
  }
}

var portfolio_img = document.getElementById('portfolio-img');
var img = portfolio_img.querySelectorAll('img');
for (i = 0; i < img.length; i++) {
img[i].addEventListener('click', (event) => {
  portfolio_img.querySelectorAll('img').forEach(el => 
      el.classList.remove('portfolio__img__item_active'));
   event.target.classList.add('portfolio__img__item_active');
})};


BUTTON.addEventListener('click', (e) => {
  if (document.forms["form"].email.checkValidity() && document.forms["form"].name.checkValidity()) {
    let subject = document.getElementById('subject').value.toString();
    let describe = document.getElementById('textarea').value.toString();
    if(subject == 0){
      subject = 'Without subject';
    }
    else {
      subject = 'Subject: ' + subject;
    }
    if(describe == 0){
      describe = 'Without description ';
    }
    else {
      describe = 'Description: ' + describe;
    }
    document.getElementById('result').innerText = "The letter was sent \n" + subject + "\n" + describe;
    document.getElementById('message-block').style.display = "block";
    document.getElementById('message').style.display = "flex";
    document.body.style.overflow = 'hidden'; 
  }
});

CLOSE_BUTTON.addEventListener('click', () => {
  document.getElementById('message-block').style.display = "none";
  document.getElementById('message').style.display = "none";
  document.body.style.overflow = 'visible';
  document.getElementById('result').innerText = '';
  document.getElementById('textarea').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
});