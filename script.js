const MENU = document.getElementById('menu');
const headerHeight = document.querySelector('header').offsetHeight;
const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');

/*----------NAVIGATION----------*/
document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', (event) => {
  document.querySelectorAll('.nav__link').forEach(el => el.classList.remove('nav__link_active'));
  event.target.classList.add('nav__link_active'); 
}));

document.addEventListener('scroll', onscroll);

var  sections = document.querySelectorAll('section');

function onscroll(){
  sections.forEach(section => {
    let topsection = section.offsetTop - headerHeight,
        bottomsection = section.offsetTop + section.offsetHeight,
        wscroll = window.scrollY,
        currentid = section.getAttribute('id');
    if(topsection < wscroll && bottomsection > wscroll){
      MENU.querySelectorAll('.nav__link').forEach(link => {
        if(link.getAttribute('data-scroll') == currentid) {
          link.classList.add('nav__link_active');
        }
        else
          link.classList.remove('nav__link_active');
      })
    }
  })
};
  

MENU.querySelectorAll('.nav__link').forEach(el => el.addEventListener('click', event => {
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

const BURGER = document.querySelector('.burger-block');
const HEADER_INNER = document.querySelector('.header__inner');

BURGER.addEventListener('click', event => {  
  if(BURGER.classList.contains('burger_active')) {
    BURGER.classList.remove('burger_active');
    MENU.classList.remove('nav_active');
    document.querySelector('.opacity').style.display = 'none';
    HEADER_INNER.classList.remove('header__inner_active'); 
    document.querySelector('.logo').classList.remove('logo_left');
  }
  else {
    BURGER.classList.add('burger_active');
    MENU.classList.add('nav_active');
    document.querySelector('.opacity').style.display = 'block';
    HEADER_INNER.classList.add('header__inner_active');
    document.querySelector('.logo').classList.add('logo_left');
    document.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', (event) => {
      BURGER.classList.remove('burger_active');
      MENU.classList.remove('nav_active');
      document.querySelector('.opacity').style.display = 'none';
      HEADER_INNER.classList.remove('header__inner_active'); 
      document.querySelector('.logo').classList.remove('logo_left');
    }));
  }
})

/*----------SLIDER----------*/
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;
const SLIDER_SECTION = document.getElementById('home');

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
     this.classList.remove('slider__item_active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('slider__item_next', direction);
  if (currentItem > 0) {
    SLIDER_SECTION.classList.add('slider_blue');
  } 
  else {
    SLIDER_SECTION.classList.remove('slider_blue');
  }
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('slider__item_next', direction);
    this.classList.add('slider__item_active');
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.slider-btn_prev').addEventListener('click', function() {
  if(isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.slider-btn_next').addEventListener('click', function() {
  if(isEnabled) {
    nextItem(currentItem);
  }
});

const swipedetect = (el) => {
  let surface = el;
  let startX =  0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;
  
  let threshold = 150;
  let resraint = 100;
  let allowedTime = 500;

  surface.addEventListener('mouesdown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('mouesup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    
    if(elapsedTime <= allowedTime) {
      if(Math.abs(distX) > threshold && Math.abs(distY) <= resraint) {
        if(distX > 0) {
          if(isEnabled) {
            previousItem(currentItem);
          }
        }
        else {
          if(isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });

  surface.addEventListener('touchstart', function(e) {
    if(e.target.classList.contains('slider-btn')) {
      if(e.target.classList.contains('slider-btn_prev')) {
        if(isEnabled) {
          previousItem(currentItem);
        }
      }
      else if(e.target.classList.contains('slider-btn_next')) {
        if(isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
  });

  surface.addEventListener('touchend', function(e) {
    e.preventDefault();
  });

  surface.addEventListener('touchend', function(e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    
    if(elapsedTime <= allowedTime) {
      if(Math.abs(distX) > threshold && Math.abs(distY) <= resraint) {
        if(distX > 0) {
          if(isEnabled) {
            previousItem(currentItem);
          }
        }
        else {
          if(isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
  });
}

let el = document.querySelector('.slider');
swipedetect(el);

/*----------SCREENS----------*/
var phone = document.querySelectorAll('.phone');

phone.forEach(el => el.querySelectorAll('.layout').forEach(f => f.addEventListener('click', event => {
  let screen = el.querySelector('.screen');
   screen.classList.toggle('display');
})));

phone.forEach(el => el.querySelectorAll('.layout').forEach(f => f.addEventListener('touchstart', event => {
  let screen = el.querySelector('.screen');
   screen.classList.toggle('display');
})));

/*----------TAGS----------*/
var tag = document.querySelector('.tag');

tag.addEventListener('click', event => {
  if(!event.target.classList.contains('tag__item_active')){
    tag.querySelectorAll('span').forEach(el => el.classList.remove('tag__item_active'));
  
    event.target.classList.add('tag__item_active');
    
    mixImages();
  }
});

/*----------PORTFOLIO----------*/
function mixImages() {
  let portfolio = document.querySelector('.portfolio__img');
  let nodelist = portfolio.querySelectorAll('.portfolio__img__item');
  let sortedListElements = Array.prototype.slice.call(nodelist).sort(function(){ return Math.random() - 0.5});
  
  nodelist.innerHTML = '';
  for(i = 0; i < sortedListElements.length; i++) {
    portfolio.append(sortedListElements[i]);
  }
  nodelist.forEach(pic => pic.classList.remove('portfolio__img__item_active'));
}

/*----------BORDER IMAGES----------*/
var img = document.querySelectorAll('.portfolio__img__item');

img.forEach(el => el.addEventListener('click', event => {  
  if ( event.target.classList.contains('portfolio__img__item_active') ) {
    event.target.classList.remove('portfolio__img__item_active');
  }
  else {
    img.forEach(pic => pic.classList.remove('portfolio__img__item_active'));
    event.target.classList.add('portfolio__img__item_active');
  }
}));

/*----------MODAL WINDOW----------*/
BUTTON.addEventListener('click', event => {
  if (document.forms['form'].email.checkValidity() && document.forms['form'].name.checkValidity()) {
    event.preventDefault();
    
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
    document.querySelector('.result').innerText = 'The letter was sent \n' + subject + '\n' + describe;
    document.querySelector('.message-block').style.display = 'block';
    document.querySelector('.message').style.display = 'block';
    document.body.style.overflow = 'hidden'; 
    document.getElementById('header').style.display= 'none';
  }
});

CLOSE_BUTTON.addEventListener('click', () => {
  document.querySelector('.message-block').style.display = 'none';
  document.querySelector('.message').style.display = 'none';
  document.body.style.overflow = 'visible';
  document.getElementById('header').style.display= 'block';
  document.querySelector('.result').innerText = '';
  document.getElementById('textarea').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
});