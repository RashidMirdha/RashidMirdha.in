// Sidebar toggle
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");

// Sidebar toggle button (for mobile)
menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("translate-x-full");
  sidebar.classList.toggle("translate-x-0");
});

// Ensure sidebar is hidden on large screens
function checkSidebarOnResize() {
  if (window.innerWidth >= 768) {
    sidebar.classList.add("translate-x-full");
    sidebar.classList.remove("translate-x-0");
  }
}

// Run when page loads
window.addEventListener("load", checkSidebarOnResize);

// Also run when resizing window
window.addEventListener("resize", checkSidebarOnResize);

// Navigate and glow underline
function navigate(button) {
  const targetId = button.getAttribute("data-target");
  const section = document.getElementById(targetId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }

  // Glow underline
  document.querySelectorAll(".glow-button").forEach((btn) => {
    const underline = btn.querySelector(".underline");
    underline.style.transform = btn === button ? "scaleX(1)" : "scaleX(0)";
  });
}

// Auto highlight nav button while scrolling
window.addEventListener("scroll", () => {
  const sections = ["home", "about", "skills", "contact"];
  let activeId = null;

  for (let id of sections) {
    const section = document.getElementById(id);
    const rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      activeId = id;
      break;
    }
  }

  if (activeId) {
    document.querySelectorAll(".glow-button").forEach((button) => {
      const target = button.getAttribute("data-target");
      const underline = button.querySelector(".underline");
      underline.style.transform =
        target === activeId ? "scaleX(1)" : "scaleX(0)";
    });
  }
});
// Initialize EmailJS with your credentials
(function () {
  emailjs.init({
    publicKey: "gAoFNdf3tKFi1BIKi", // Your User ID
    blockHeadless: true,
    limitRate: {
      id: "contactForm",
      throttle: 5000, // 5 seconds between submissions
    },
  });
})();
// Form Submission Handler
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Prepare form data
    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      phone_number: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    // Send email
    emailjs
      .send("service_ct5atbq", "template_6c7q1xr", formData)
      .then((response) => {
        document.getElementById("status").textContent =
          "Message sent successfully! 🎉";
        document.getElementById("contactForm").reset();
        setTimeout(() => {
          document.getElementById("status").textContent = "";
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        document.getElementById(
          "status"
        ).textContent = `Error ${error.status}: ${error.text}. Please try again.`;
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      });
  });
// here is the code for typing and delete charecters
const textElement = document.getElementById("typed-text");

const text = [
  " Passionate about coding.",
  " Believes in hard work.",
  " Loves designing perfection.",
];

let index = 0;
let sentenceIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 100;
let delayAfterPeriod = 1;
let delayBeforeNextSentence = 1;

function typeAndDelete() {
  if (isDeleting) {
    textElement.textContent = text[sentenceIndex].substring(0, index);
    index--;

    if (index === 0) {
      isDeleting = false;
      sentenceIndex++;
      if (sentenceIndex >= text.length) {
        sentenceIndex = 0; // Reset to first sentence for infinite loop
      }
      setTimeout(typeAndDelete, delayBeforeNextSentence); // Short pause before next sentence
    } else {
      setTimeout(typeAndDelete, deletingSpeed); // Keep deleting letter by letter
    }
  } else {
    textElement.textContent = text[sentenceIndex].substring(0, index);
    index++;

    if (index === text[sentenceIndex].length) {
      setTimeout(() => {
        isDeleting = true; // Start deleting after sentence is complete
        setTimeout(typeAndDelete, delayAfterPeriod); // Delay before starting deletion
      }, delayAfterPeriod);
    } else {
      setTimeout(typeAndDelete, typingSpeed); // Keep typing letter by letter
    }
  }
}

typeAndDelete();
