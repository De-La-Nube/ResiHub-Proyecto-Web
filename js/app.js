// JS: Navegación de Pestañas SPA 
function showSection(sectionId, event) {
    if(event) event.preventDefault(); 

    // Ocultar todas las secciones
    document.querySelectorAll('.app-section').forEach(el => {
        el.classList.remove('active');
    });
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar color en el menú
    document.querySelectorAll('.navbar-nav .nav-link').forEach(el => {
        el.classList.remove('active-section');
    });
    
    // Seleccionar el enlace activo
    const menuLinks = document.querySelectorAll(`.navbar-nav .nav-link[onclick*="${sectionId}"]`);
    if(menuLinks.length > 0) {
        menuLinks[0].classList.add('active-section');
    }

    // Cerrar menú móvil si está abierto
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// JS: Modo Oscuro Persistente
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateDarkModeButton(savedTheme);
});

function toggleDarkMode() {
    const htmlTag = document.documentElement;
    const currentTheme = htmlTag.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlTag.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeButton(newTheme);
}

function updateDarkModeButton(theme) {
    const btn = document.getElementById('darkModeBtn');
    const navText = document.getElementById('navBrandText');
    if(!btn || !navText) return;

    if(theme === 'dark') {
        btn.innerHTML = '<i class="bi bi-sun-fill text-warning me-2"></i> Claro';
        navText.classList.replace('text-dark', 'text-white');
        document.querySelector('.navbar').classList.replace('bg-white', 'bg-dark');
        document.querySelector('.navbar').classList.add('navbar-dark');
    } else {
        btn.innerHTML = '<i class="bi bi-moon-fill me-2"></i> Oscuro';
        navText.classList.replace('text-white', 'text-dark');
        document.querySelector('.navbar').classList.replace('bg-dark', 'bg-white');
        document.querySelector('.navbar').classList.remove('navbar-dark');
    }
}

// JS: Efecto visual de botón al descargar
function descargarJS(btn) {
    const originalText = btn.innerHTML;
    const originalClasses = btn.className;
    
    btn.innerHTML = '<i class="bi bi-check2-circle me-2"></i>¡Descargado!';
    btn.className = 'btn btn-success fw-bold btn-sm py-2 mt-auto text-white ' + (originalClasses.includes('w-100') ? 'w-100' : 'w-75');
    
    if(originalClasses.includes('btn-lg')) {
        btn.className = 'btn btn-success btn-lg px-5 fw-bold rounded-pill text-white shadow';
    }
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.className = originalClasses;
    }, 2000);
}

// JS: Simulación de Inicio de Sesión
function loginJS() {
    // 1. Ocultar el modal de login
    const loginModalElement = document.getElementById('loginModal');
    const loginModalInstance = bootstrap.Modal.getInstance(loginModalElement);
    if(loginModalInstance) {
        loginModalInstance.hide();
    }

    // 2. Ocultar botón "Entrar" y mostrar "Mi Panel" y "Salir"
    document.getElementById('navLoginBtn').classList.add('d-none');
    document.getElementById('navPanelBtn').classList.remove('d-none');
    document.getElementById('navLogoutBtn').classList.remove('d-none');

    // 3. Redirigir automáticamente al Dashboard
    showSection('dashboard', null);
}

// JS: Simulación de Cerrar Sesión
function logoutJS(event) {
    if(event) event.preventDefault();

    // 1. Ocultar botones de usuario y mostrar el de "Entrar"
    document.getElementById('navLoginBtn').classList.remove('d-none');
    document.getElementById('navPanelBtn').classList.add('d-none');
    document.getElementById('navLogoutBtn').classList.add('d-none');

    // 2. Redirigir al inicio
    showSection('inicio', null);
}
