/*
  main.js

  This script controls the responsive navigation. It finds the
  menu toggle button and the mobile navigation container and
  toggles the `open` class on the mobile navigation when the
  button is pressed. It also ensures the menu closes when a
  navigation link is tapped or when the viewport widens to
  desktop size.
*/

const menuBtn = document.querySelector("[data-menu]");
const mobileNav = document.getElementById("mobile-nav");

if (menuBtn && mobileNav) {
  // Toggle open/close state when the menu button is clicked
  menuBtn.addEventListener("click", () => {
    const nowOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
  });

  // Close the mobile nav when a link is clicked
  mobileNav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Watch for viewport changes to close the mobile nav when switching to desktop
  const mq = window.matchMedia("(min-width: 900px)");
  mq.addEventListener("change", (e) => {
    if (e.matches) {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// const menuBtn = document.querySelector("[data-menu]");
// const mobileNav = document.querySelector("#mobile-nav");

// if (menuBtn && mobileNav) {
//   // Toggle open/close
//   menuBtn.addEventListener("click", () => {
//     const nowOpen = mobileNav.classList.toggle("open");
//     menuBtn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
//   });

//   // Close on link tap
//   mobileNav.addEventListener("click", (e) => {
//     if (e.target.closest("a")) {
//       mobileNav.classList.remove("open");
//       menuBtn.setAttribute("aria-expanded", "false");
//     }
//   });

//   // Close when switching to desktop layout
//   const mq = window.matchMedia("(min-width: 900px)");
//   mq.addEventListener("change", (e) => {
//     if (e.matches) {
//       mobileNav.classList.remove("open");
//       menuBtn.setAttribute("aria-expanded", "false");
//     }
//   });
// }
