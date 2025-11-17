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
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");
const theme = localStorage.getItem("pref-theme") || 'dark';

if (theme === "light") {
    body.classList.toggle("dark");
    moon.style.display = "none";
    sun.style.display = "inline";
    localStorage.setItem("pref-theme", "light");
}

toggledark.addEventListener("click", () => {
    // Toggle dark mode
    body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    moon.style.display = isDark ? "inline" : "none";
    sun.style.display = isDark ? "none" : "inline";
    localStorage.setItem("pref-theme", isDark ? "dark" : "light");
});