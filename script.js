// Select all target elements
const hidden_boxes = document.querySelectorAll('.hidden');

// Create one IntersectionObserver for all boxes
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.1 });

// Observe each box
hidden_boxes.forEach(hidden_box => observer.observe(hidden_box));

// Add button to switch light/dark mode
const toggledark = document.getElementById("toggle-dark");
const body = document.body;

toggledark.addEventListener("click", () => {
    body.classList.toggle("dark");
});