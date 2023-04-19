export function setAnchor() {
  const anchors = document.querySelectorAll(".scroll-to"); 
  const menu = document.querySelector(".header__menu");// Класс Меню
  const burgerBtn = document.querySelector(".burger-btn");// Класс кнопки Бургера
  const closeBtn = document.querySelector(".burger-close-btn");
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      menu.classList.remove("burger-active");
      burgerBtn.classList.remove("visually-hidden");
      closeBtn.classList.add("visually-hidden");
      const blockID = anchor.getAttribute("href");

      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
          block: "start",
        offset: 500,
      });
    });
  }
}