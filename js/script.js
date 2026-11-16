/* =============================================================
   Gabriela Simonelli — Advocacia e Consultoria Jurídica
   JavaScript (Vanilla)

   01. Configuração
   02. WhatsApp
   03. Header (sticky + estado ao rolar)
   04. Menu mobile
   05. Scrollspy
   06. Animações de entrada (Intersection Observer)
   07. FAQ (accordion acessível)
   08. Formulário de contato
   09. Botão flutuante do WhatsApp
   10. Modal de Política de Privacidade
   11. Ano do rodapé
============================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     01. CONFIGURAÇÃO
     Altere apenas os valores abaixo para publicar o site.
  ----------------------------------------------------------- */

  // Número do WhatsApp em formato internacional, apenas dígitos.
  // 55 = Brasil, 43 = DDD.
  var WHATSAPP_NUMBER = '5543998606421';

  // E-mail de contato, usado no aviso exibido após o envio do formulário.
  var EMAIL_CONTATO = 'gsimonelli.adv@gmail.com';

  // Mensagens pré-preenchidas por tipo de CTA (atributo data-wa no HTML).
  var WHATSAPP_MESSAGES = {
    consulta:    'Olá, gostaria de agendar uma consulta jurídica e saber mais sobre o atendimento.',
    demanda:     'Olá, gostaria de conversar sobre uma demanda jurídica e entender as possibilidades de orientação.',
    contratos:   'Olá, gostaria de conversar sobre a elaboração ou revisão de um contrato.',
    familia:     'Olá, gostaria de conversar sobre uma questão de Direito de Família ou das Sucessões.',
    consumidor:  'Olá, gostaria de conversar sobre uma questão de Direito do Consumidor.',
    civel:       'Olá, gostaria de conversar sobre uma questão cível ou empresarial.',
    tributario:  'Olá, gostaria de conversar sobre uma questão tributária.',
    formulario:  'Olá, gostaria de falar sobre uma demanda jurídica. Segue um resumo:'
  };

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     02. WHATSAPP
  ----------------------------------------------------------- */

  function buildWhatsAppUrl(key, extraText) {
    var number = String(WHATSAPP_NUMBER).replace(/\D/g, '');
    var message = WHATSAPP_MESSAGES[key] || WHATSAPP_MESSAGES.consulta;

    if (extraText) message += '\n\n' + extraText;

    // Sem número configurado, retorna o link genérico com a mensagem.
    var base = number ? 'https://wa.me/' + number : 'https://wa.me/';
    return base + '?text=' + encodeURIComponent(message);
  }

  function initWhatsAppLinks() {
    var links = document.querySelectorAll('[data-wa]');

    Array.prototype.forEach.call(links, function (link) {
      link.setAttribute('href', buildWhatsAppUrl(link.getAttribute('data-wa')));
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* -----------------------------------------------------------
     03. HEADER
  ----------------------------------------------------------- */

  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* -----------------------------------------------------------
     04. MENU MOBILE
  ----------------------------------------------------------- */

  function initMobileMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
    var overlay = document.getElementById('navOverlay');
    if (!toggle || !nav) return;

    function openMenu() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu de navegação');
      document.body.classList.add('is-locked');

      if (overlay) {
        overlay.hidden = false;
        window.requestAnimationFrame(function () { overlay.classList.add('is-visible'); });
      }
    }

    function closeMenu() {
      if (!nav.classList.contains('is-open')) return;

      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      document.body.classList.remove('is-locked');

      if (overlay) {
        overlay.classList.remove('is-visible');
        window.setTimeout(function () { overlay.hidden = true; }, 350);
      }
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    // Fecha ao clicar em qualquer link ou CTA do menu.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    // Restaura o estado ao voltar para desktop (breakpoint da navegação: 1100px).
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) closeMenu();
    });
  }

  /* -----------------------------------------------------------
     05. SCROLLSPY
  ----------------------------------------------------------- */

  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) {
        map[id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove('is-active'); });
        var active = map[entry.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* -----------------------------------------------------------
     06. ANIMAÇÕES DE ENTRADA
  ----------------------------------------------------------- */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // Sem suporte ou com movimento reduzido: exibe tudo imediatamente.
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(items, function (item) {
      var delay = item.getAttribute('data-delay');
      if (delay) item.style.setProperty('--reveal-delay', delay);
      observer.observe(item);
    });
  }

  /* -----------------------------------------------------------
     07. FAQ
  ----------------------------------------------------------- */

  function initFaq() {
    var buttons = document.querySelectorAll('.faq-item__question');
    if (!buttons.length) return;

    function close(button) {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel || button.getAttribute('aria-expanded') !== 'true') return;

      button.setAttribute('aria-expanded', 'false');

      if (prefersReducedMotion) {
        panel.style.height = '';
        panel.hidden = true;
        return;
      }

      panel.style.height = panel.scrollHeight + 'px';
      window.requestAnimationFrame(function () {
        panel.style.height = '0px';
      });

      window.setTimeout(function () {
        if (button.getAttribute('aria-expanded') === 'false') {
          panel.hidden = true;
          panel.style.height = '';
        }
      }, 420);
    }

    function open(button) {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;

      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;

      if (prefersReducedMotion) {
        panel.style.height = 'auto';
        return;
      }

      panel.style.height = '0px';
      window.requestAnimationFrame(function () {
        panel.style.height = panel.scrollHeight + 'px';
      });

      window.setTimeout(function () {
        if (button.getAttribute('aria-expanded') === 'true') panel.style.height = 'auto';
      }, 420);
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function () {
        var isOpen = button.getAttribute('aria-expanded') === 'true';

        // Comportamento accordion: mantém apenas um item aberto.
        Array.prototype.forEach.call(buttons, function (other) {
          if (other !== button) close(other);
        });

        if (isOpen) close(button);
        else open(button);
      });
    });
  }

  /* -----------------------------------------------------------
     08. FORMULÁRIO DE CONTATO
  ----------------------------------------------------------- */

  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var status = document.getElementById('formStatus');

    var rules = {
      nome: function (value) {
        if (!value) return 'Informe seu nome.';
        if (value.length < 3) return 'Informe seu nome completo.';
        return '';
      },
      email: function (value) {
        if (!value) return 'Informe seu e-mail.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Informe um e-mail válido.';
        return '';
      },
      telefone: function (value) {
        var digits = value.replace(/\D/g, '');
        if (!digits) return 'Informe seu telefone.';
        if (digits.length < 10 || digits.length > 11) return 'Informe um telefone com DDD.';
        return '';
      },
      assunto: function (value) {
        if (!value) return 'Selecione um assunto.';
        return '';
      },
      mensagem: function (value) {
        if (!value) return 'Escreva sua mensagem.';
        if (value.length < 20) return 'Descreva a demanda com um pouco mais de detalhe.';
        return '';
      }
    };

    function fieldError(field, message) {
      var errorEl = document.getElementById('erro-' + field.name);
      if (errorEl) errorEl.textContent = message;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      return !message;
    }

    function validateField(field) {
      var rule = rules[field.name];
      if (!rule) return true;
      return fieldError(field, rule(field.value.trim()));
    }

    // Máscara simples de telefone brasileiro.
    var phone = form.querySelector('#telefone');
    if (phone) {
      phone.addEventListener('input', function () {
        var digits = phone.value.replace(/\D/g, '').slice(0, 11);
        var formatted = digits;

        if (digits.length > 6) {
          formatted = digits.length > 10
            ? '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7)
            : '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
        } else if (digits.length > 2) {
          formatted = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
        } else if (digits.length > 0) {
          formatted = '(' + digits;
        }

        phone.value = formatted;
      });
    }

    // Valida ao sair do campo e limpa o erro enquanto o usuário corrige.
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (status) {
          status.classList.add('is-visible');
          status.textContent = 'Verifique os campos destacados antes de enviar.';
        }
        firstInvalid.focus();
        return;
      }

      // Não há backend: o envio precisa ser integrado a um serviço de e-mail
      // ou endpoint próprio (ex.: Formspree, Netlify Forms, API própria).
      var resumo =
        'Nome: ' + form.nome.value.trim() + '\n' +
        'E-mail: ' + form.email.value.trim() + '\n' +
        'Telefone: ' + form.telefone.value.trim() + '\n' +
        'Assunto: ' + form.assunto.value + '\n\n' +
        form.mensagem.value.trim();

      if (status) {
        status.classList.add('is-visible');

        // Montado com createElement em vez de innerHTML: o que a pessoa
        // digitou entra como texto e como parâmetro de URL, nunca como
        // marcação. Assim nenhuma edição futura deste trecho transforma o
        // conteúdo do formulário em HTML executável.
        status.textContent = 'Os dados foram validados com sucesso. Este site não possui ' +
          'servidor de envio: a integração do formulário deve ser configurada ' +
          'posteriormente. Enquanto isso, você pode ';

        var linkWhats = document.createElement('a');
        linkWhats.href = buildWhatsAppUrl('formulario', resumo);
        linkWhats.target = '_blank';
        linkWhats.rel = 'noopener noreferrer';
        linkWhats.textContent = 'enviar a mensagem pelo WhatsApp';

        var linkMail = document.createElement('a');
        linkMail.href = 'mailto:' + EMAIL_CONTATO;
        linkMail.textContent = EMAIL_CONTATO;

        status.appendChild(linkWhats);
        status.appendChild(document.createTextNode(' ou escrever para '));
        status.appendChild(linkMail);
        status.appendChild(document.createTextNode('.'));
      }

      // Os dados do formulário não são registrados em lugar nenhum: o que a
      // pessoa escreve pode ser informação sensível sobre um caso jurídico, e
      // o console do navegador fica acessível a extensões instaladas.
    });
  }

  /* -----------------------------------------------------------
     09. BOTÃO FLUTUANTE DO WHATSAPP
  ----------------------------------------------------------- */

  function initFloatingButton() {
    var button = document.querySelector('.wa-float');
    if (!button) return;

    var ticking = false;

    function update() {
      button.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* -----------------------------------------------------------
     10. MODAL DE POLÍTICA DE PRIVACIDADE
  ----------------------------------------------------------- */

  function initPrivacyModal() {
    var link = document.getElementById('privacyLink');
    var modal = document.getElementById('privacyModal');
    if (!link || !modal) return;

    var lastFocused = null;

    function openModal(event) {
      event.preventDefault();
      lastFocused = document.activeElement;

      modal.hidden = false;
      document.body.classList.add('is-locked');
      window.requestAnimationFrame(function () { modal.classList.add('is-open'); });

      var closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('is-locked');

      window.setTimeout(function () { modal.hidden = true; }, 320);
      if (lastFocused) lastFocused.focus();
    }

    link.addEventListener('click', openModal);

    Array.prototype.forEach.call(modal.querySelectorAll('[data-close-modal]'), function (el) {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) closeModal();
    });

    // Mantém o foco dentro do diálogo enquanto ele estiver aberto.
    modal.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;

      var focusables = modal.querySelectorAll('button, a[href], input, textarea, select');
      if (!focusables.length) return;

      var first = focusables[0];
      var last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     11. ANO DO RODAPÉ
  ----------------------------------------------------------- */

  function initYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------
     INICIALIZAÇÃO
  ----------------------------------------------------------- */

  function init() {
    initWhatsAppLinks();
    initHeader();
    initMobileMenu();
    initScrollSpy();
    initReveal();
    initFaq();
    initContactForm();
    initFloatingButton();
    initPrivacyModal();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
