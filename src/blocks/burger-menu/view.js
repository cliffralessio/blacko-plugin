document.addEventListener('DOMContentLoaded', function () {
    const burgers = document.querySelectorAll('.hamburger');
    for (const burger of burgers) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            const labelOpen = burger.querySelector('.hamburger-label-open');
            const labelClose = burger.querySelector('.hamburger-label-close');
            if (burger.classList.contains('is-active')) {
                labelOpen.classList.add('label-hidden');
                labelClose.classList.remove('label-hidden');
            } else {
                labelOpen.classList.remove('label-hidden');
                labelClose.classList.add('label-hidden');
            }
        });

    }
});
