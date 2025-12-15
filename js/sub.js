document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const floatingObj = document.getElementById('floatingObj');
    const innerObj = floatingObj.querySelector('.floating-obj-inner');
    const img = innerObj.querySelector('.obj-img');

    // Configuration
    const sensitivity = 0.05; // Movement multiplier (inverse)
    const rotationSensitivity = 0.08; // Rotation multiplier

    // Mouse Move Event
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate distance from center
        const deltaX = x - centerX;
        const deltaY = y - centerY;

        // Apply Parallax (Inverse movement)
        // Object moves opposite to mouse to create depth perception
        const transX = -deltaX * sensitivity;
        const transY = -deltaY * sensitivity;

        // Apply Rotation (3D feel)
        const rotateX = deltaY * rotationSensitivity * 0.1; // Tilt up/down
        const rotateY = -deltaX * rotationSensitivity * 0.1; // Rotate left/right
        const initialRotate = -5; // Base tilt from CSS

        // Update Transform
        // Move the wrapper
        floatingObj.style.transform = `translate(calc(-50% + ${transX}px), calc(-50% + ${transY}px)) perspective(1000px)`;

        // Rotate the inner
        innerObj.style.transform = `rotateZ(${initialRotate}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Navigation Click (SPA Logic)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section');
    const homeSection = document.getElementById('home');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;

            // Update Navigation State
            // (Optional: add active class to link)

            // Switch Sections
            sections.forEach(section => {
                if (section.id === targetId || (targetId === 'home' && section.id === 'home')) {
                    section.classList.remove('hidden');
                    section.classList.add('active');

                    // Specific animation for Home entrance?
                    if (section.id === 'home') {
                        innerObj.style.transform = `rotateZ(-5deg)`; // Reset rotation
                    }
                } else {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                }
            });
        });
    });

    // Navigation Feedback for Floating Object (Only works when Home is active)
    // We can keep the wiggle if clicking specific links, but now links actually go somewhere.
    // So maybe we remove the wiggle or only do it if we stay on home?
    // Let's remove the wiggle logic as it conflicts with page transition.

    // Initial Fade In
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
