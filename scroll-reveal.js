const revealElements = document.querySelectorAll(
    'body header, body nav, body main > *, body footer, body main > * > *, body main > * > * > *'
);
const pageRevealElements = [...revealElements].filter(
    (element) => !element.closest('.horizon-gallery')
);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    pageRevealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index * 40, 240)}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    pageRevealElements.forEach((element) => revealObserver.observe(element));
} else {
    pageRevealElements.forEach((element) => element.classList.add('scroll-revealed'));
}
