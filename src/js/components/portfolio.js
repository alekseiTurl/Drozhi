export function portfolio() {
    const items = document.querySelectorAll('.portfolio__list-item');
    const btn = document.querySelector('.portfolio__btn');

    btn.addEventListener('click', function () {
        for (let item of items) {
            item.classList.remove("hidden")
        }
    });
        
    
   
}