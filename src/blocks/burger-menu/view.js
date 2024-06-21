document.addEventListener('DOMContentLoaded', function () {
    const burgers = document.querySelectorAll('.hamburger');
    for (const burger of burgers) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
        });
    }
});
