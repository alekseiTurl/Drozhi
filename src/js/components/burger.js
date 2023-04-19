export function burger() {
    const menu = document.querySelector(".header__menu");// Класс Меню
    const burgerBtn = document.querySelector(".burger-btn");// Класс кнопки Бургера
    const closeBtn = document.querySelector(".burger-close-btn");

document.addEventListener("click", (e) => {
  const click = e.composedPath().includes(burgerBtn);
  const clickOn = e.composedPath().includes(menu);
  if (!click && !clickOn) {
      menu.classList.remove("burger-active");
      burgerBtn.classList.remove("visually-hidden");
      closeBtn.classList.add("visually-hidden");
  }
});
  burgerBtn.addEventListener("click", function () {
      menu.classList.add("burger-active");
      burgerBtn.classList.add("visually-hidden");
      closeBtn.classList.remove("visually-hidden");
  });
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    menu.classList.remove("burger-active");
  }
});
  closeBtn.addEventListener("click", function () {
      menu.classList.remove("burger-active");
      burgerBtn.classList.remove("visually-hidden");
      closeBtn.classList.add("visually-hidden");
  });
}