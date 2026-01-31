(function () {
    // Lock screen: require password "QUESTDROP130" for early access
    var lockScreen = document.getElementById('lockScreen');
    var lockForm = document.getElementById('lockForm');
    var lockPassword = document.getElementById('lockPassword');
    var lockError = document.getElementById('lockError');
    var EARLY_ACCESS_PASSWORD = 'QUESTDROP130';

    if (lockForm && lockPassword && lockError) {
        lockForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var value = (lockPassword.value || '').trim();
            if (value === EARLY_ACCESS_PASSWORD) {
                lockError.hidden = true;
                lockPassword.value = '';
                if (lockScreen) lockScreen.hidden = true;
            } else {
                lockError.hidden = false;
                lockPassword.value = '';
                lockPassword.focus();
            }
        });
    }

    var joinBtn = document.getElementById('joinProgramBtn');
    var modal = document.getElementById('modal');
    var modalBackdrop = document.getElementById('modalBackdrop');
    var modalClose = document.getElementById('modalClose');

    function openModal() {
        modal.hidden = false;
        modalClose.focus();
    }

    function closeModal() {
        modal.hidden = true;
        if (joinBtn) joinBtn.focus();
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', openModal);
    }
    var navJoin = document.getElementById('navJoinProgram');
    if (navJoin) {
        navJoin.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    }

    // Status modal (green)
    var statusBtn = document.getElementById('statusBtn');
    var statusModal = document.getElementById('statusModal');
    var statusBackdrop = document.getElementById('statusBackdrop');
    var statusClose = document.getElementById('statusClose');
    function openStatusModal() {
        if (statusModal) statusModal.hidden = false;
        if (statusClose) statusClose.focus();
    }
    function closeStatusModal() {
        if (statusModal) statusModal.hidden = true;
        if (statusBtn) statusBtn.focus();
    }
    if (statusBtn) statusBtn.addEventListener('click', openStatusModal);
    if (statusClose) statusClose.addEventListener('click', closeStatusModal);
    if (statusBackdrop) statusBackdrop.addEventListener('click', closeStatusModal);

    // Description modal (What We Offer / How It Works)
    var descriptionModal = document.getElementById('descriptionModal');
    var descriptionBackdrop = document.getElementById('descriptionBackdrop');
    var descriptionClose = document.getElementById('descriptionClose');
    var whatWeOffer = document.getElementById('whatWeOffer');
    var howItWorks = document.getElementById('howItWorks');
    function openDescriptionModal(e, title) {
        if (e) e.preventDefault();
        var titleEl = document.getElementById('descriptionTitle');
        if (titleEl) titleEl.textContent = title;
        if (descriptionModal) descriptionModal.hidden = false;
        if (descriptionClose) descriptionClose.focus();
    }
    function closeDescriptionModal() {
        if (descriptionModal) descriptionModal.hidden = true;
    }
    if (whatWeOffer) whatWeOffer.addEventListener('click', function (e) { openDescriptionModal(e, 'What We Offer'); });
    if (howItWorks) howItWorks.addEventListener('click', function (e) { openDescriptionModal(e, 'How It Works'); });
    var getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) getStartedBtn.addEventListener('click', function (e) { openDescriptionModal(e, 'Get Started'); });
    if (descriptionClose) descriptionClose.addEventListener('click', closeDescriptionModal);
    if (descriptionBackdrop) descriptionBackdrop.addEventListener('click', closeDescriptionModal);

    // Connections Database: prompt password, always deny
    var connectionsDb = document.getElementById('connectionsDatabase');
    if (connectionsDb) {
        connectionsDb.addEventListener('click', function (e) {
            e.preventDefault();
            window.prompt('Enter password');
            alert('Password denied.');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (modal && !modal.hidden) closeModal();
        else if (statusModal && !statusModal.hidden) closeStatusModal();
        else if (descriptionModal && !descriptionModal.hidden) closeDescriptionModal();
    });

    // Dropdowns (skip Apply Now: data-dropdown-disabled)
    var dropdowns = document.querySelectorAll('[data-dropdown]');
    dropdowns.forEach(function (wrapper) {
        if (wrapper.hasAttribute('data-dropdown-disabled')) return;
        var trigger = wrapper.querySelector('.nav-btn, .btn');
        var menu = wrapper.querySelector('.dropdown-menu');
        if (!trigger || !menu) return;

        function open() {
            menu.hidden = false;
            trigger.setAttribute('aria-expanded', 'true');
        }

        function close() {
            menu.hidden = true;
            trigger.setAttribute('aria-expanded', 'false');
        }

        function toggle() {
            var isOpen = !menu.hidden;
            if (isOpen) close(); else open();
        }

        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            toggle();
        });

        wrapper.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function () {
            close();
        });
    });
})();
