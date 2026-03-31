const overlayGrid = document.querySelector('.overlay-grid');
const plansCurrent = document.querySelector('#plans-current');
const plansThumbs = document.querySelectorAll('.plans-thumb');
const footerItems = document.querySelectorAll('.footer-item');
const isMobileViewport = window.matchMedia('(max-width: 480px)').matches;

// Desktop scrolling behavior
if (overlayGrid && !isMobileViewport) {
    const autoScrollDelayMs = 900;
    const autoScrollDurationMs = 1900;
    const autoScrollViewportFactor = 0.98;

    overlayGrid.scrollLeft = 0;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateScrollLeft = (element, targetLeft, durationMs) => {
        const startLeft = element.scrollLeft;
        const distance = targetLeft - startLeft;
        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = easeOutCubic(progress);

            element.scrollLeft = startLeft + distance * easedProgress;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    window.setTimeout(() => {
        const maxScrollLeft = overlayGrid.scrollWidth - overlayGrid.clientWidth;
        const targetScrollLeft = Math.min(maxScrollLeft, window.innerWidth * autoScrollViewportFactor);

        animateScrollLeft(overlayGrid, targetScrollLeft, autoScrollDurationMs);
    }, autoScrollDelayMs);

    window.addEventListener('wheel', (event) => {
        const isUpperHalf = event.clientY <= window.innerHeight / 2;

        if (isUpperHalf) {
            event.preventDefault();
            overlayGrid.scrollLeft += event.deltaY + event.deltaX;
        }
    }, { passive: false });
}

// Mobile scroll animation with Scrollama
if (isMobileViewport) {
    const imgWrappers = document.querySelectorAll('.img-wrapper');
    const scroller = scrollama();

    function handleStepEnter(response) {
        imgWrappers.forEach((wrapper) => {
            wrapper.classList.remove('is-active');
        });
        response.element.classList.add('is-active');
    }

    function handleStepExit(response) {
        response.element.classList.remove('is-active');
    }

    scroller.setup({
        step: '.img-wrapper',
        offset: 0.5
    });

    scroller.onStepEnter(handleStepEnter);
    scroller.onStepExit(handleStepExit);

    window.addEventListener('resize', () => {
        scroller.resize();
    });
}

if (plansCurrent && plansThumbs.length) {
    plansThumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            plansCurrent.src = thumb.dataset.src || thumb.src;

            plansThumbs.forEach((item) => item.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

if (footerItems.length) {
    footerItems.forEach((item) => {
        const button = item.querySelector('.footer-btn');

        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const shouldOpen = !item.classList.contains('is-open');

            footerItems.forEach((otherItem) => {
                otherItem.classList.remove('is-open');
                const otherButton = otherItem.querySelector('.footer-btn');
                if (otherButton) {
                    otherButton.setAttribute('aria-expanded', 'false');
                }
            });

            if (shouldOpen) {
                item.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
}


