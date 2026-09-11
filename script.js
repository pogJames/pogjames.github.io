import { animate, onScroll, splitText, stagger } from './vendor/anime.esm.min.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Select all target elements
const hidden_boxes = document.querySelectorAll('.hidden');

// Reveal each box once the bottom of its section reaches the bottom of the
// viewport, i.e. when the whole section has been scrolled into view.
hidden_boxes.forEach(hidden_box => {
    if (reducedMotion) {
        hidden_box.classList.remove('hidden');
        return;
    }
    const section = hidden_box.closest('.about-container') || hidden_box;

    const reveal = animate(hidden_box, {
        opacity: [0, 1],
        x: ['5vw', 0],
        duration: 1000,
        ease: 'out(3)',
        autoplay: false,
    });

    // Only play while it is still hidden, so crossing the threshold again on a
    // short scroll back down doesn't replay something already on screen.
    let armed = true;

    // Play it when the bottom of the section reaches the bottom of the viewport.
    onScroll({
        target: section,
        enter: 'bottom bottom',
        sync: false,
        onEnterForward: () => {
            if (!armed) return;
            armed = false;
            reveal.restart();
        },
    });

    // Re-arm once the paragraph itself is back below the fold — not the whole
    // section, or in portrait it would only re-arm after scrolling past the
    // image as well. Waiting until it is fully out of view keeps it from
    // snapping back to hidden while still on screen.
    onScroll({
        target: hidden_box,
        sync: false,
        onLeaveBackward: () => {
            armed = true;
            reveal.reset();
        },
    });
});

// Split the name into characters and loop each one out through the top
// and back in from below. addEffect re-runs the animation whenever the
// splitter re-splits (font load, resize, orientation change).
if (!reducedMotion) {
    splitText('.title.name', { words: false, chars: { class: 'char' } })
        .addEffect(({ chars }) => animate(chars, {
            y: [
                { to: '-110%', duration: 550, ease: 'in(2)' },
                // waits below, still invisible, before rising back into place
                { to: '110%', duration: 250 },
                { to: '0%', duration: 650, ease: 'out(3)' },
            ],
            opacity: [
                { to: 0, duration: 550, ease: 'in(2)' },
                { to: 0, duration: 250 },
                { to: 1, duration: 650, ease: 'out(2)' },
            ],
            delay: stagger(30),
            loop: true,
            loopDelay: 450,
        }));
}
