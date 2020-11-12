/* eslint-disable arrow-parens */
window.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line strict
  "use strict";

  const btnServiceBlock = document.querySelector("[href='#service-block']"),
    serviceBlock = document.querySelector("#service-block");

  function countTimer(deadline) {
    //? deadline = то время до которого наша функция будет отсчитывать
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      //?чтобы посчитать разницу нужно получить миллисекунды, лучше всего использовать getTime
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000, //?так получаются секунды
        seconds = Math.floor(timeRemaining % 60), //?так получаются секунды
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      //?hours = Math.floor(timeRemaining / 60 / 60 /) % 24;
      //?day = Math.floor(timeRemaining /60 /60 /24)
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }
    // eslint-disable-next-line prefer-const
    // let idInterval;
    updateClock();
    let stopTime;
    function updateClock() {
      const timer = getTimeRemaining();

      function getZero(element) {
        if (String(element).length === 1) {
          element = "0" + element;
        }
        return element;
      }
      timerHours.textContent = getZero(timer.hours);
      timerMinutes.textContent = getZero(timer.minutes);
      timerSeconds.textContent = getZero(timer.seconds);

      if (timer.timeRemaining < 0) {
        // clearInterval(idInterval);
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        window.cancelAnimationFrame(stopTime);
      }
    }
    function step() {
      setTimeout(() => {
        stopTime = requestAnimationFrame(step);
        updateClock();
      }, 1000);
    }
    updateClock();
    step();
    // idInterval = setInterval(updateClock, 1000);
  }
  countTimer("31 december 2020");

  //!TODO: COORDINATOR

  function getCoords(elem) {
    console.log(elem);
    const box = elem.getBoundingClientRect(),
      body = document.body,
      docEl = document.documentElement,
      scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
      clientTop = docEl.clientTop || body.clientTop || 0,
      top = box.top + scrollTop - clientTop;
    return top;
  }

  function pageScrooling(obj) {
    function animation() {
      const myReq = requestAnimationFrame(animation);
      window.scrollBy(0, 70);
      if (window.scrollY > obj || window.scrollY > 4300) {
        window.cancelAnimationFrame(myReq);
      }
    }
    animation();
    // const timer = setInterval(() => {
    //   window.scrollBy(0, 30);
    //   if (window.scrollY > obj || window.scrollY > 5000) {
    //     clearInterval(timer);
    //   }
    // }, 2);
  }

  //TODO: PAGE-SCROLLING
  btnServiceBlock.addEventListener("click", (event) => {
    event.preventDefault();
    pageScrooling(getCoords(serviceBlock));
  });
  //TODO: MENU
  const toggleMenu = () => {
    const menu = document.querySelector("menu"),
      handlerMenu = () => {
        menu.classList.toggle("active-menu");
      };

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target.closest("li>a")) {
        event.preventDefault();
        handlerMenu();
        // console.dir(' target.href;: ',  target.href);
        const $hooker = document.querySelector(
          `${target.href.match(/\#\D+/g)}`
        );
        console.log($hooker);
        pageScrooling(getCoords($hooker));
      }
      if (
        target.closest(".menu") ||
        target.closest(".close-btn") ||
        (!target.closest(".active-menu") &&
          menu.classList.contains("active-menu"))
      ) {
        handlerMenu();
      }
    });
  };
  toggleMenu();
  //TODO: POPUP
  const togglePopup = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupContent = document.querySelector(".popup-content");

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        window.addEventListener("resize", () => {
          if (window.innerWidth < `975`) {
            popupContent.style.left = window.innerWidth / 25 + "%";
          }
          if (window.innerWidth > `975`) {
            popupContent.style.left = `38%`;
          }
        });
        if (window.innerWidth > 768) {
          popup.style.display = "block";
          popupContent.style.left = "-10%";
          let x = -10;
          // const timer = setInterval(() => {
          //   x += 1;
          //   popupContent.style.left = `${x}%`;

          //   if (popupContent.style.left === "38%") {
          //     clearInterval(timer);
          //   }
          // }, 1);
          const timer = () => {
            const animation = requestAnimationFrame(timer);
            x += 8;
            popupContent.style.left = `${x}%`;

            if (popupContent.style.left === "38%") {
              cancelAnimationFrame(animation);
            }
          };
          timer();
        } else {
          popup.style.display = "block";
        }
      });
    });
    const closeAnimation = () => {
      if (window.innerWidth > 768) {
        let x = 38;
        // const timer = setInterval(() => {
        //   x -= 1;
        //   popupContent.style.left = `${x}%`;

        //   if (popupContent.style.left === "-50%") {
        //     clearInterval(timer);
        //     popup.style.display = "none";
        //   }
        // }, 1);

        const timer = () => {
          const animation = requestAnimationFrame(timer);
          x -= 8;
          popupContent.style.left = `${x}%`;

          if (popupContent.style.left === "-50%") {
            cancelAnimationFrame(animation);
            popup.style.display = "none";
          }
        };
        timer();
      } else {
        popup.style.display = "none";
      }
    };

    popup.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        closeAnimation();
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          closeAnimation();
        }
      }
    });
  };
  togglePopup();

  //TODO: TABS
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tabContent[i].classList.add("d-none");
          tab[i].classList.remove("active");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab"); //!передаём СЕЛЕКТОР!!! всегда возвращает NULL если не нашел соответствующий селект
      //!поднимается только к родителю всегда <-- вверх!

      if (target) {
        //!если не найдёт, то вернёт null === false
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //TODO: SLIDER
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      slider = document.querySelector(".portfolio-content"),
      portfolioDots = document.querySelector(".portfolio-dots");

    for (let i = 0; i < slide.length; i++) {
      const dot = document.createElement("li");
      if (i === 0) {
        dot.classList.add("dot-active");
      }
      dot.classList.add("dot");
      portfolioDots.append(dot);
    }
    const dot = document.querySelectorAll(".dot");

    let currentSlide = 0,
      interval = 0;

    const prevSlide = (element, index, strClass) => {
      element[index].classList.remove(strClass);
    };
    const nextSlide = (element, index, strClass) => {
      element[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, "portfolio-item-active");
        prevSlide(dot, currentSlide, "dot-active");
        currentSlide++;
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
      },
      startSlide = (time = 2000) => {
        interval = setInterval(autoPlaySlide, time);
      },
      stopSlide = () => {
        clearInterval(interval);
      };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;

      //!very important
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");

      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((element, index) => {
          if (element === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });

    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide(1500);
      }
    });
    //!mouseover mouseout mouseleave mouseenter
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide(1500);
      }
    });

    startSlide(1500);
  };
  slider();

  //TODO: Our Team
  const ourTeam = () => {
    const command = document.getElementById("command");

    // command.addEventListener("mouseover", (event) => {
    //   const target = event.target;

    //   if (!target.matches(".command__photo")) {
    //     return;
    //   }

    //   target.src = target.dataset.img;
    // });

    // command.addEventListener("mouseout", (event) => {
    //   const target = event.target;

    //   if (!target.matches(".command__photo")) {
    //     return;
    //   }

    //   target.src = target.dataset.img.replace(/a(?=\.jpg)/g, "");
    // });

    //!деструктуризация
    const toggleImg = (event) => {
      const target = event.target;
      if (!target.matches("img")) {
        return;
      }

      // [target.dataset.img, target.src] = [target.src, target.dataset.img];
      let a = target.src,
        b = target.dataset.img;

      target.dataset.img = a;
      target.src = b;
    };

    command.addEventListener("mouseover", toggleImg);
    command.addEventListener("mouseout", toggleImg);
  };
  ourTeam();

  //TODO: calcBlock
  //TODO: Cost_Calculating
  const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
      calcType = document.querySelector(".calc-type"),
      calcSquare = document.querySelector(".calc-square"),
      calcDay = document.querySelector(".calc-day"),
      calcCount = document.querySelector(".calc-count"),
      totalValue = document.getElementById("total");

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1,
        animeCount = 0;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      //!Animation---------------------------------------------------
      const priceAnime = () => {
        const animation = requestAnimationFrame(priceAnime);
        animeCount += 100;
        totalValue.textContent = animeCount;
        // console.log(animeCount, total);
        if (animeCount >= total) {
          cancelAnimationFrame(animation);
        }
      };
      //!Animation---------------------------------------------------

      if (!typeValue || !squareValue || squareValue.value === "") {
        totalValue.textContent = 0;
      }
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
        priceAnime();
      }
      // totalValue.textContent = total;
    };

    calcBlock.addEventListener("input", (event) => {
      const target = event.target;
      if (
        target.matches(".calc-square") ||
        target.matches(".calc-day") ||
        target.matches(".calc-count")
      ) {
        target.value = target.value.replace(/\D/g, "");
      }

      if (calcSquare.value === "") {
        totalValue.textContent = 0;
      }
    });

    calcBlock.addEventListener("change", (event) => {
      const target = event.target;

      if (
        target.matches(".calc-type") ||
        target.matches(".calc-square") ||
        target.matches(".calc-day") ||
        target.matches(".calc-count")
      ) {
        countSum();
      }
    });
  };
  calc(100);

  //send-ajax-form

  const sendForm = () => {
    maskPhone(".form-phone", "+7(___)___-__-__");
    document.addEventListener('click', (event) => {
      const target = event.target;
    });
    const errorMessage = "Что-то пошло не так...",
      loadMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с вами свяжемся!";

    const form1 = document.getElementById("form1"),
      form2 = document.getElementById("form2"),
      form3 = document.getElementById("form3");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem";
    statusMessage.style.color = "#19b5fe";

    document.addEventListener("submit", (event) => {
      let target = event.target;
      event.preventDefault();
      if (!target.matches("#form1, #form2, #form3")) {
        return;
      }
      let formTransformator;
      if (target === form1) {
        formTransformator = form1;
      }
      if (target === form2) {
        formTransformator = form2;
      }
      if (target === form3) {
        formTransformator = form3;
      }
      // target = form1 ? formTransformator = form1 : target = form2 ? formTransformator = form2 : formTransformator = form3;

      event.preventDefault();
      formTransformator.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(formTransformator);

      let body = {};
      // for (let value of formData.entries()){
      //   body[value[0]] = value[1];
      // }

      formData.forEach((value, key) => {
        body[key] = value;
      });

      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
          document.querySelectorAll(".form-name").forEach((elem)=> {
            elem.value = "";
          });
          document.querySelectorAll(".form-phone").forEach((elem)=> {
            elem.value = "";
          });
          document.querySelectorAll(".form-email").forEach((elem)=> {
            elem.value = "";
          });
          document.querySelector(".mess").value = "";
        },
        (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        }
      );
    });

    const postData = (body, success, error) => {
      //!Дальше уже будем писать сам запрос к серверу
      //!мы создаем объект экземпляра класса XML HTTP REQUEST
      const request = new XMLHttpRequest();

      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          success();
        } else {
          error(request.status);
        }
      });

      request.open("POST", "./server.php");
      request.setRequestHeader(
        "Content-Type",
        /*"multipart/form-data"*/ "application/json"
      );

      // request.send(formData);
      request.send(JSON.stringify(body));
    };
  };
  sendForm();
});
