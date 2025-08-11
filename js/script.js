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
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        var nome = $('#nome').val().trim();
        var email = $('#email').val().trim();
        var telefone = $('#telefone').val().trim();
        var segmento = $('#segmento').val();
        var mensagem = $('#mensagem').val().trim();
        
        // Basic validation
        var isValid = true;
        var errorMessage = '';
        
        if (!nome) {
            isValid = false;
            errorMessage += 'Nome é obrigatório.\n';
        }
        
        if (!email) {
            isValid = false;
            errorMessage += 'E-mail é obrigatório.\n';
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += 'E-mail inválido.\n';
        }
        
        if (!telefone) {
            isValid = false;
            errorMessage += 'Telefone é obrigatório.\n';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Show loading state
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.text();
        submitBtn.text('Enviando...').prop('disabled', true);
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(function() {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            $('#contactForm')[0].reset();
            submitBtn.text(originalText).prop('disabled', false);
        }, 2000);
    });
    
    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone number formatting
    $('#telefone').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        var formattedValue = '';
        
        if (value.length > 0) {
            if (value.length <= 2) {
                formattedValue = '(' + value;
            } else if (value.length <= 6) {
                formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            } else if (value.length <= 10) {
                formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2, 6) + '-' + value.substring(6);
            } else {
                formattedValue = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
            }
        }
        
        $(this).val(formattedValue);
    });
    
    // Newsletter subscription
    $('.newsletter .btn').on('click', function() {
        var email = $(this).siblings('input[type="email"]').val().trim();
        
        if (!email) {
            alert('Por favor, insira seu e-mail.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Show loading state
        var btn = $(this);
        var originalHtml = btn.html();
        btn.html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled', true);
        
        // Simulate subscription (replace with actual handling)
        setTimeout(function() {
            alert('Obrigado por se inscrever em nossa newsletter!');
            btn.siblings('input[type="email"]').val('');
            btn.html(originalHtml).prop('disabled', false);
        }, 1500);
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
    
    // Preload images for better performance
    function preloadImages() {
        var images = [
            'assets/carousel_matriculas.png',
            'assets/segmentos_educacao_infantil.png',
            'assets/segmentos_ensino_fundamental.png',
            'assets/segmentos_ensino_medio.png',
            'assets/diferenciais_acolhimento.png',
            'assets/diferenciais_programas_ensino.png',
            'assets/diferenciais_extracurriculares.png',
            'assets/depoimentos_pais_felizes.png'
        ];
        
        images.forEach(function(src) {
            var img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Error handling for missing images
    $('img').on('error', function() {
        $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+');
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