/* ===> For all sections  <=== */
/* Differentiation for media query between two different devices with the same resolution */
$(document).ready(function () {
  if (
    window.screen.width >= 1920 &&
    (navigator.userAgent.includes("SmartTV") ||
      navigator.userAgent.includes("Tizen") || // TVs Samsung
      navigator.userAgent.includes("WebOS")) // TVs LG
  ) {
    $("body").addClass("is-tv");
  } else {
    $("body").addClass("is-laptop");
  }
});

/* Custom Scroll Bar*/
let progress = document.getElementById("progressBar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};

/* Flashing Title*/
let alertShow = false;
setInterval(() => {
  document.title = alertShow ? "C O N T I" : "Higienizações Têxteis";

  alertShow = !alertShow;
}, 1000);

/* ===> Navbar - Home  <=== */
/* Maximize and Minimize Navigation Bar */
$(document).ready(function () {
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(`.navbar`).addClass("navbar_min");
      $(`.logo_img__nav`).addClass("logo_img__nav_min");
      $(`.anchor__nav`).addClass("anchor__nav_scroll");
    } else {
      $(`.navbar`).removeClass("navbar_min");
      $(`.logo_img__nav`).removeClass("logo_img__nav_min");
      $(`.anchor__nav`).removeClass("anchor__nav_scroll");
    }
  });
});

/* Menu - Mobile*/
/* Mobile Menu Activation */
$(document).ready(function () {
  $(".btn_menu__nav").click(function () {
    $(".menu__nav").toggleClass("active");
    $(".btn_menu__nav").toggleClass("btn_menu__nav_disable");
  });
});

/* ===>  Section - Home  <=== */
/* Animation - Multitext */
var typingEffect = new Typed(".multitext_h1__home", {
  strings: [
    "- C O N T I - Higienizações Têxteis",
    "Atendimento Empresarial e Residêncial",
  ],
  loop: true,
  typeSpeed: 70,
  backSpeed: 20,
  backDelay: 1000,
});

/* ===>  Section - About  <=== */
/*Vanilla tilt - parameters for the project*/
VanillaTilt.init(document.querySelectorAll(".card__about"), {
  max: 25,
  speed: 600,
  glare: true,
  "max-glare": 0.5,
});

/* ===>  Section - Services  <=== */
/*Swiper Touch Slider - parameters for the project*/
var swiper = new Swiper(".container_slider__services", {
  pagination: ".swiper-pagination",
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  init: true,

  coverflow: {
    rotate: 20,
    stretch: 0,
    depth: 300,
    modifier: 0,
    slideShadows: true,
  },
  loop: true,
});

/* ===>  Section - Testimonial  <=== */
/*Swiper Infinite Loop - parameters for the project*/
var swiper = new Swiper(".testimonial", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/* ===>  Section Contact  <=== */
/*Form submission with FormSubmit*/
$(document).ready(function () {
  class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = $(settings.form);
      this.formButton = $(settings.button);
      if (this.form.length > 0) {
        this.url = this.form.attr("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
      this.form.html(this.settings.success);
    }

    displayError() {
      this.form.html(this.settings.error);
    }

    getFormObject() {
      const formObject = {};
      this.form.find("[name]").each(function () {
        formObject[$(this).attr("name")] = $(this).val();
      });
      return formObject;
    }

    // Disable the button to prevent repeated submissions
    onSubmission(event) {
      event.preventDefault();
      this.formButton.prop("disabled", true);
      this.formButton.text("Enviando Formulário ... ");
    }

    async sendForm(event) {
      try {
        if (this.validateForm()) {
          this.onSubmission(event);

          await $.ajax({
            url: this.url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(this.getFormObject()),
          });

          this.displaySuccess();
        }
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }

    // Validate the form before submission
    validateForm() {
      const requiredFields = this.form.find("[required]");
      let isValid = true;

      requiredFields.each(function () {
        const fieldValue = $(this).val().trim();

        if (fieldValue === "") {
          // Set the input field as invalid and add shake animation
          $(this).addClass("invalid-input shake");
          isValid = false;

          // Remove the shake animation after 0.5 seconds
          const inputElement = $(this);
          setTimeout(function () {
            inputElement.removeClass("shake");
          }, 500);
        } else {
          // Remove the invalid style if the field is now valid
          $(this).removeClass("invalid-input");
        }
      });

      if (!isValid) {
        console.error("Please fill in all required fields.");
      }

      return isValid;
    }

    init() {
      if (this.form.length > 0) {
        this.formButton.on("click", this.sendForm);
      }
      return this;
    }
  }

  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success:
      "<h1 title='mensagem enviada com sucesso' class='success-msg_form__contact'>Mensagem enviada com sucesso!!<div class='success-msg_form__contact' id='success-imgbox_container__contact'><img title='imagem mascote dando positivo'src='./src/images/contact/mascot _thumbs_up.png' alt='mascote da empresa'></div></h1>",
    error:
      "<h1 title='Não foi possível enviar sua mensagem 'class='error-msg_form__contact'>Não foi possível enviar sua mensagem<h2 title='Por favor, verifique os campos preenchidos e tente novamente.'class='h2_error-msg_form__contact'>Por favor, verifique os campos preenchidos e tente novamente.</h2><div class='error-msg_form__contact' id='error-imgbox_container__contact'><img title='imagem mascote triste'src='./src/images/contact/mascot_unhappy .png' alt='mascote da empresa'></div></h1>",
  });

  formSubmit.init();
});
