// ======= NAVBAR INTERACTIVE ====== //
(function (...myArgs) {
  const navToggle = document.querySelector(myArgs[0]),
    navMenu = document.getElementById(myArgs[1]),
    navItems = document.querySelectorAll(myArgs[2]),
    navLinks = document.querySelectorAll(myArgs[3]),
    btnTop = document.getElementById(myArgs[4])

  navToggle.addEventListener('click', () => {
    const naviconToggle = navToggle.children[0];

    navItems.forEach((item, i) => {
      if (!navMenu.classList.contains('show-menu')) {
        item.style.animation = `linksFadeIn .25s ease-in-out forwards ${(i+1) / 7}s`;
      } else if (navMenu.classList.contains('show-menu')) {
        setTimeout(() => {
          item.style.animation = ``;
        }, 250)
      }
    });
    navMenu.classList.toggle('show-menu');
    naviconToggle.classList.toggle("fa-times");
  });

  navLinks.forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault();
    const startPos = window.scrollY,
      targetPos = document.querySelector(link.hash).offsetTop
      distance = targetPos - startPos,
      duration = 2000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeOutCubic(progress, startPos, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    };

    if (navMenu.classList.contains('show-menu')) {
      navToggle.click();
    };
  }));

  btnTop.addEventListener('click', () => {
    const startPos = window.scrollY,
      targetPos = 0,
      distance = targetPos - startPos,
      duration = 2000;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeOutCubic(progress, startPos, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    };
  });


  window.addEventListener('scroll', () => {
    let heightSectionHome = document.getElementById('home').offsetHeight;
    let fromTop = window.scrollY;

    navLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      let fix = 50;
      if (link.classList.contains('navbar__link')) {
        if ((section.offsetTop - fix) <= fromTop && (section.offsetTop - fix) + section.offsetHeight > fromTop) {
          link.classList.add('active-link')
        } else {
          link.classList.remove('active-link')
        };
      };
    });

    if (fromTop > heightSectionHome) {
      btnTop.classList.add('btn-appear')
    } else {
      btnTop.classList.remove('btn-appear')
    }
  });

  function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

})('.navbar__toggle', 'navbar__menu', '.navbar__item', '.navbar__header a', 'btn-to-top');

(function selectItem(...myArgs) {
  const filterContainer = document.querySelector(myArgs[0]);
  const galleryContainer = document.querySelector(myArgs[1]);

  const filterImages = (event) => {
    document.querySelectorAll('.filter-element').forEach((element) => {
      element.classList.remove('filter-active');
    });
    event.target.classList.add('filter-active');

    document.querySelectorAll('.gallery-image').forEach((element) => {
      element.classList.remove('running-animation')
      void element.offsetWidth;
      element.classList.add('running-animation')
      if (
        (event.target.id !== element.dataset.category) &
        (event.target.id !== 'all')
      ) {
        element.classList.add('hide-image');
      } else {
        element.classList.remove('hide-image');
      }
    });
  };

  categories.forEach((element) => {
    const domElement = document.createElement('span');
    domElement.innerText = element.name;
    domElement.classList.add('filter-element');
    if (element.filter === 'all') {
      domElement.classList.add('filter-active');
    }
    domElement.id = element.filter;
    domElement.addEventListener('click', filterImages);
    filterContainer.appendChild(domElement);
  });

  images.forEach((element) => {
    const domElement = document.createElement('img');
    domElement.src = `img/${element.url}`;
    domElement.alt = element.title;
    domElement.dataset.category = element.category;
    domElement.classList.add('gallery-image');
    galleryContainer.appendChild(domElement);
  });
})('.works__filter-container','.works__gallery-container');


// INTERSECTION OBSERVER //
(function intersec(...myArgs){
  const imgs = document.querySelectorAll(myArgs[0]),
  elements = document.querySelectorAll(myArgs[1]);
  const home = Array.from(document.querySelector(myArgs[2]).children);

  window.addEventListener('load', ()=>{
    home.forEach((el,i)=> {
      el.style.animation = `anim1 ${(i+1)/4 + 1}s forwards ease-out`
    })
  });

  window.addEventListener('mousemove', (e)=>{
    document.querySelectorAll('.home__object').forEach(object=> {
      const speed = object.getAttribute('data-speed');
      const x = (window.innerWidth - e.pageX*speed)/100;
      const y = (window.innerHeight - e.pageY*speed)/100;

      object.style.transform = `translateX(${x}px) translateY(${y}px)`
    });
  });

  let imgOptions = {};
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.src.replace('-10', '');
      observer.unobserve(img);
    });
  }, imgOptions);

  imgs.forEach(img => {
    observer.observe(img)
  });

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0) {
        entry.target.style.animation = `anim1 1s ${entry.target.dataset.delay} forwards ease-out`;
      } else {
        entry.target.style.animation = 'none';
      }
    })

  });

  elements.forEach(element => {
    observer.observe(element)
  });

})('.works__gallery-container img','.anim', '.home__container')


// MEDIA QUERY MENGGUNAKAN JAVASCRIPT
// function doCheck(query) {
//   if (query.matches) {
//   } else {}
  // const query = window.matchMedia('(max-width: 767px)')
  // query.addEventListener('change', doCheck);
  // doCheck(query);