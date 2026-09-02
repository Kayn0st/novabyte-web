document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var planSelect = document.getElementById('plan');
  var servicioSelect = document.getElementById('servicio');
  if (planSelect && servicioSelect) {
    var allServices = [
      { value: 'Soporte técnico', label: 'Soporte técnico' },
      { value: 'Computadores', label: 'Computadores' },
      { value: 'Redes', label: 'Redes' },
      { value: 'Microsoft 365', label: 'Microsoft 365' },
      { value: 'Impresión', label: 'Impresión' },
      { value: 'Respaldo y seguridad', label: 'Respaldo y seguridad' },
      { value: 'Otro', label: 'Otro' }
    ];
    var planServices = {
      todos: allServices.map(function (s) { return s.value; }),
      essential: ['Soporte técnico', 'Computadores', 'Otro'],
      business: ['Soporte técnico', 'Computadores', 'Redes', 'Microsoft 365', 'Otro'],
      enterprise: allServices.map(function (s) { return s.value; })
    };

    function renderServiceOptions() {
      var allowed = planServices[planSelect.value] || planServices.todos;
      var current = servicioSelect.value;
      servicioSelect.innerHTML = '';
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Selecciona una opción';
      servicioSelect.appendChild(placeholder);
      allServices.forEach(function (s) {
        if (allowed.indexOf(s.value) !== -1) {
          var opt = document.createElement('option');
          opt.value = s.value;
          opt.textContent = s.label;
          servicioSelect.appendChild(opt);
        }
      });
      if (allowed.indexOf(current) !== -1) {
        servicioSelect.value = current;
      }
    }

    planSelect.addEventListener('change', renderServiceOptions);
    renderServiceOptions();
  }

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      status.textContent = 'Gracias, recibimos tu mensaje. Te contactaremos a la brevedad.';
      status.style.color = '#1E3ABA';
      status.classList.add('show');
      form.reset();
    });
  }
});
