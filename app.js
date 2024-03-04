const tabLinks = document.getElementsByClassName("tab-link");
const tabContents = document.getElementsByClassName("tab-contents");
const sections = document.querySelectorAll(".section");
const navbar = document.getElementById("nav");
const myName = document.getElementById("name");

const letters = "QWERTYPOIUASDFLKJHGZXCVMNB";
let interval;
window.addEventListener("load", (e) => {
  let iteration = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    myName.innerText = myName.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return myName.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= myName.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1;
  }, 50);
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;

  if (scrollTop > lastScrollTop) {
    navbar.style.top = "-70px";
  } else {
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

Array.from(tabLinks).forEach((tab) => {
  tab.addEventListener("click", () => {
    Array.from(tabLinks).forEach((link) => {
      link.classList.remove("active-link");
    });
    tab.classList.add("active-link");
    openContent(tab.id);
  });
});
function openContent(id) {
  Array.from(tabContents).forEach((tab) =>
    tab.classList.remove("tab-contents-active")
  );
  let activeContent = Array.from(tabContents).find((tab) =>
    tab.id.includes(id)
  );
  activeContent.classList.add("tab-contents-active");
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section-hidden");
    observer.unobserve(entry.target);
  },
  {
    root: null,
  }
);

sections.forEach((section) => {
  observer.observe(section);
  section.classList.add("section-hidden");
});
