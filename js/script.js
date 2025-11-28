const coursesData = [
  {
    category: "Marketing",
    title: "The Ultimate Google Ads Training Course",
    price: "$100",
    author: "by Jerome Bell",
    image: "/assets/images/marketing.png",
    categoryColor: "#03CEA4",
  },
  {
    category: "Management",
    title: "Product Management Fundamentals",
    price: "$480",
    author: "by Marvin McKinney",
    image: "/assets/images/management.png",
    categoryColor: "#5A87FC",
  },
  {
    category: "HR & Recruiting",
    title: "HR Management and Analytics",
    price: "$200",
    author: "by Leslie Alexander Li",
    image: "/assets/images/recruiter.png",
    categoryColor: "#F89828",
  },
  {
    category: "Marketing",
    title: "Brand Management & PR Communications",
    price: "$530",
    author: "by Kristin Watson",
    image: "/assets/images/marketing-brand.png",
    categoryColor: "#03CEA4",
  },
  {
    category: "Design",
    title: "Graphic Design Basic",
    price: "$500",
    author: "by Guy Hawkins",
    image: "/assets/images/graphic-design.png",
    categoryColor: "#F52F6E",
  },
  {
    category: "Management",
    title: "Business Development Management",
    price: "$400",
    author: "by Dianne Russell",
    image: "/assets/images/business-dev.png",
    categoryColor: "#5A87FC",
  },
  {
    category: "Development",
    title: "Highload Software Architecture",
    price: "$600",
    author: "by Brooklyn Simmons",
    image: "/assets/images/soft-architecture.png",
    categoryColor: "#7772F1",
  },
  {
    category: "HR & Recruiting",
    title: "Human Resources – Selection and Recruitment",
    price: "$150",
    author: "by Kathryn Murphy",
    image: "/assets/images/human-resource.png",
    categoryColor: "#F89828",
  },
  {
    category: "Design",
    title: "User Experience. Human-centered Design",
    price: "$240",
    author: "by Cody Fisher",
    image: "/assets/images/user-experience.png",
    categoryColor: "#F52F6E",
  },
];

const coursesGrid = document.getElementById("courses-grid");
const searchInput = document.querySelector(".courses__search-input");
const filterButtons = document.querySelectorAll(".courses__filter-btn");

let currentCategory = "all";
let currentSearchTerm = "";

function getCategoryCounts() {
  const counts = {
    all: coursesData.length,
    Marketing: 0,
    Management: 0,
    "HR & Recruiting": 0,
    Design: 0,
    Development: 0,
  };

  coursesData.forEach((course) => {
    if (counts.hasOwnProperty(course.category)) {
      counts[course.category]++;
    }
  });

  return counts;
}

function updateBadges() {
  const counts = getCategoryCounts();
  const buttons = document.querySelectorAll(".courses__filter-btn");

  buttons.forEach((button) => {
    const category = button.getAttribute("data-category");
    const count = counts[category] || 0;
    button.setAttribute("data-count", count);
  });
}

function initCourses() {
  updateBadges();
  renderCourses(coursesData);
}

function renderCourses(courses) {
  coursesGrid.innerHTML = "";

  if (courses.length === 0) {
    coursesGrid.innerHTML =
      '<div class="courses__no-results">No courses found matching your criteria</div>';
    return;
  }

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";

    courseCard.innerHTML = `
            <div class="course-card__header">
                <img src="${course.image}" alt="${course.title}" class="course-card__image">
            </div>
            <div class="course-card__body">
                <span class="course-card__category" style="background-color: ${course.categoryColor}; color: #ffffff;">
                    ${course.category}
                </span>
                <h3 class="course-card__title">${course.title}</h3>
                <div class="course-card__info">
                    <div class="course-card__price">${course.price}</div>
                    <div class="course-card__separator">|</div>
                    <div class="course-card__author">${course.author}</div>
                </div>
            </div>
        `;

    coursesGrid.appendChild(courseCard);
  });
}

function filterCourses() {
  return coursesData.filter((course) => {
    const categoryMatch =
      currentCategory === "all" || course.category === currentCategory;

    const searchMatch = course.title
      .toLowerCase()
      .includes(currentSearchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });
}

function updateCourses() {
  const filteredCourses = filterCourses();
  renderCourses(filteredCourses);
}

searchInput.addEventListener("input", function () {
  currentSearchTerm = this.value;
  updateCourses();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Удаляем активный класс у всех кнопок
    filterButtons.forEach((btn) =>
      btn.classList.remove("courses__filter-btn--active")
    );

    this.classList.add("courses__filter-btn--active");

    currentCategory = this.getAttribute("data-category");

    updateCourses();
  });
});

document.addEventListener("DOMContentLoaded", initCourses);
