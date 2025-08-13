$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Navbar background change on scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        
        if (scroll >= 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        // Back to top button
        if (scroll > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
        
        // Scroll animations
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    });
    
    // Back to top button click
    $('#backToTop').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // Contact form validation and submission
// Validação e envio do formulário de contato
$(document).ready(function() {

  // DDDs válidos (mesmo que antes)
  const validDDDs = [
    '11','12','13','14','15','16','17','18','19',
    '21','22','24','27','28',
    '31','32','33','34','35','37','38',
    '41','42','43','44','45','46',
    '47','48','49',
    '51','53','54','55',
    '61','62','63','64','65','66','67','68','69',
    '71','73','74','75','77','79',
    '81','82','83','84','85','86','87','88','89',
    '91','92','93','94','95','96','97','98','99'
  ];

  // Máscara para telefone: aceita fixo (10 dígitos) e celular (11 dígitos)
  $('#telefone').on('input', function() {
    let val = $(this).val().replace(/\D/g, ''); // só números

    if(val.length > 11) val = val.substring(0,11);

    if(val.length <= 2){
      val = '(' + val;
    } else if(val.length <= 6){
      val = '(' + val.substring(0,2) + ') ' + val.substring(2);
    } else if(val.length <= 10) { // fixo: (XX) XXXX-XXXX
      val = '(' + val.substring(0,2) + ') ' + val.substring(2,6) + '-' + val.substring(6);
    } else { // celular: (XX) XXXXX-XXXX
      val = '(' + val.substring(0,2) + ') ' + val.substring(2,7) + '-' + val.substring(7);
    }

    $(this).val(val);
  });


  setupFormValidation();

  function setupFormValidation() {
    const form = $('#contactForm');

    form.find('input, select, textarea').on('blur', function() {
      validateField($(this));
    });

    form.on('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
        submitForm();
      } else {
        // Se algo inválido, mostra mensagem de erro geral
        alert('Por favor, preencha corretamente todos os campos obrigatórios.');
      }
    });
  }

  function validateField(field) {
    const fieldName = field.attr('name');
    const fieldValue = field.val().trim();
    let isValid = true;
    let errorMessage = '';

    field.removeClass('is-invalid is-valid');
    field.siblings('.invalid-feedback').hide();

    switch (fieldName) {
      case 'nome':
        if (fieldValue.length < 2) {
          isValid = false;
          errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fieldValue)) {
          isValid = false;
          errorMessage = 'Nome deve conter apenas letras e espaços.';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
          isValid = false;
          errorMessage = 'Por favor, informe um e-mail válido.';
        }
        break;

      case 'telefone':
        const digits = fieldValue.replace(/\D/g, '');
        const ddd = digits.substring(0, 2);

        function hasRepetitivePattern(num) {
          if (/^(\d)\1+$/.test(num)) return true;
          for (let size = 2; size <= Math.floor(num.length / 2); size++) {
            const pattern = num.substring(0, size);
            const repeated = pattern.repeat(Math.ceil(num.length / size)).substring(0, num.length);
            if (repeated === num) return true;
          }
          return false;
        }

        // Aceita 10 (fixo) ou 11 (celular) dígitos
        if (
          (digits.length !== 10 && digits.length !== 11) ||
          !validDDDs.includes(ddd) ||
          hasRepetitivePattern(digits)
        ) {
          isValid = false;
          errorMessage = 'Número de telefone inválido.';
        }
        break;

      case 'segmento':
        if (!fieldValue) {
          isValid = false;
          errorMessage = 'Por favor, selecione um segmento.';
        }
        break;

      case 'mensagem':
        if (fieldValue.length < 10) {
          isValid = false;
          errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
        } else if (fieldValue.length > 1000) {
          isValid = false;
          errorMessage = 'Mensagem não pode exceder 1000 caracteres.';
        }
        break;
    }

    if (field.prop('required') && !fieldValue) {
      field.addClass('is-invalid');
      field.siblings('.invalid-feedback').text('Este campo é obrigatório.').show();
    } else if (!isValid) {
      field.addClass('is-invalid');
      field.siblings('.invalid-feedback').text(errorMessage).show();
    } else if (fieldValue) {
      field.addClass('is-valid');
    }

    return isValid;
  }

  function validateForm() {
    const form = $('#contactForm');
    let isFormValid = true;

    form.find('input[required], select[required], textarea[required]').each(function() {
      if (!validateField($(this))) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  function submitForm() {
  const form = $('#contactForm');
  
  // Limpa o formulário e classes de validação
  form[0].reset();
  form.find('.is-valid').removeClass('is-valid');

  // Cria o alerta de sucesso (Bootstrap)
  const successAlert = $(`
    <div class="alert alert-success alert-dismissible fade show" role="alert" style="margin-bottom: 20px;">
      <strong>✔️ Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);

  // Insere a mensagem no topo do formulário
  form.prepend(successAlert);

  // Após 5 segundos, desaparece automaticamente
  setTimeout(() => {
    successAlert.alert('close');
  }, 10000);
}


});

    
    // Mobile menu close on link click
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // Carousel auto-play control
    $('#heroCarousel').carousel({
        interval: 5000,
        pause: 'hover'
    });
    
    // Testimonials carousel auto-play
    $('#testimonialsCarousel').carousel({
        interval: 6000,
        pause: 'hover'
    });
    
    // Add fade-in class to elements for scroll animation
    $('.about-section, .segments-section .segment-card, .differentials-section .differential-card, .testimonials-section, .contact-section').addClass('fade-in');
    
    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.hero-section');
        var speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });
    
    // Counter animation for stats
    function animateCounters() {
        $('.stat-item h3').each(function() {
            var $this = $(this);
            var countTo = parseInt($this.text().replace(/\D/g, ''));
            
            if (countTo > 0) {
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        var suffix = $this.text().replace(/\d/g, '');
                        $this.text(Math.floor(this.countNum) + suffix);
                    },
                    complete: function() {
                        var suffix = $this.text().replace(/\d/g, '');
                        $this.text(countTo + suffix);
                    }
                });
            }
        });
    }
    
    // Trigger counter animation when about section is visible
    var aboutSection = $('.about-section');
    var hasAnimated = false;
    
    $(window).scroll(function() {
        if (!hasAnimated) {
            var aboutTop = aboutSection.offset().top;
            var aboutBottom = aboutTop + aboutSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (aboutBottom > viewportTop && aboutTop < viewportBottom) {
                animateCounters();
                hasAnimated = true;
            }
        }
    });
    
    // Hover effects for cards
    $('.segment-card, .differential-card').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
    // Loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
        
        // Trigger initial scroll check for animations
        $(window).trigger('scroll');
    });
    
    // Responsive navigation adjustments
    $(window).resize(function() {
        if ($(window).width() >= 992) {
            $('.navbar-collapse').removeClass('show');
        }
    });
    
    // Form field focus effects
    $('.form-control, .form-select').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        $(this).parent().removeClass('focused');
    });
    
    // Social media link tracking (for analytics)
    $('.social-link').on('click', function() {
        var platform = $(this).find('i').attr('class');
        console.log('Social media click:', platform);
        // Add analytics tracking here if needed
    });
    
    // Accessibility improvements
    // Add keyboard navigation support
    $('.carousel').on('keydown', function(e) {
        if (e.keyCode === 37) { // Left arrow
            $(this).carousel('prev');
        } else if (e.keyCode === 39) { // Right arrow
            $(this).carousel('next');
        }
    });
    
    // Focus management for modals and dropdowns
    $('.navbar-toggler').on('click', function() {
        setTimeout(function() {
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-nav .nav-link:first').focus();
            }
        }, 300);
    });
    

    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll events
    $(window).off('scroll').on('scroll', debounce(function() {
        var scroll = $(window).scrollTop();
        
        if (scroll >= 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
        
        if (scroll > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
        
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
        
        // Counter animation trigger
        if (!hasAnimated) {
            var aboutTop = aboutSection.offset().top;
            var aboutBottom = aboutTop + aboutSection.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (aboutBottom > viewportTop && aboutTop < viewportBottom) {
                animateCounters();
                hasAnimated = true;
            }
        }
    }, 10));
    
});

// Additional utility functions
window.schoolWebsite = {
    // Function to open WhatsApp with pre-filled message
    openWhatsApp: function(message) {
        var phone = '5511123456789'; // Replace with actual phone number
        var encodedMessage = encodeURIComponent(message || 'Olá! Gostaria de saber mais sobre o Colégio Excelência.');
        var url = 'https://wa.me/' + phone + '?text=' + encodedMessage;
        window.open(url, '_blank');
    },
    
    // Function to track events (for analytics)
    trackEvent: function(category, action, label) {
        console.log('Event tracked:', category, action, label);
        // Add Google Analytics or other tracking code here
    },
    
    // Function to show success/error messages
    showMessage: function(message, type) {
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var alertHtml = '<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                       message +
                       '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
                       '</div>';
        
        $('body').prepend(alertHtml);
        
        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').alert('close');
        }, 5000);
    }
};