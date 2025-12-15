    // Fade-in animation on scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // 3D effect on cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        // ✅ 클릭 시 페이지 이동 (기존 효과 유지)
        card.addEventListener('click', () => {
          const link = card.getAttribute('data-link');
          if (link) {
            window.open(link, '_blank'); // 새 탭으로 열기
          }
        });

        // 클릭 가능한 커서 표시
        card.style.cursor = 'pointer';
      });
    });
    // --- Neon Cursor Follow ---
    const cursor = document.querySelector('.cursor');
    const trail = document.querySelector('.cursor-trail');

    document.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;

      trail.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`;

      // 클릭 시 작게 튀기기 효과
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 80);
    });