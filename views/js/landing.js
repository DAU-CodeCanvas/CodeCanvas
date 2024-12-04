let slideIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    showSlides();
});

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    console.log(slides);
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change slide every 3 seconds
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}

window.addEventListener('scroll', function() {
    const circleMenu = document.querySelector('.circle-menu');
    const scrollPosition = window.scrollY;
    circleMenu.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

function toggleSubMenu() {
    const submenu = document.getElementById('submenu');
    if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "flex";
    } else {
        submenu.style.display = "none";
    }
}

document.getElementById('plus-button').addEventListener('click', function() {
    const circlesContainer = document.getElementById('circles-container');
    const circles = Array.from(circlesContainer.querySelectorAll('.circle')).reverse();

    // 원들이 이미 표시된 경우 함수를 종료하여 중복 실행 방지
    if (circlesContainer.style.display === 'block') {
        return; // 이미 원이 표시되었다면 추가 동작을 중지
    }

    // 원들을 순차적으로 표시 (역순)
    circles.forEach((circle, index) => {
        circle.style.opacity = 0; // 초기에는 완전히 투명하게 설정
        circle.style.display = 'block'; // 원을 블록으로 설정하여 보이게 함
        setTimeout(() => {
            circle.style.opacity = 1; // 트랜지션을 통해 점진적으로 투명도를 1로 변경
        }, 500 * index); // 각 원이 1초 간격으로 나타나도록 설정
    });

    // 원들의 컨테이너를 보이게 설정
    circlesContainer.style.display = 'block';
});