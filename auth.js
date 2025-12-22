// Authentication check - redirects to login if not authenticated
(function() {
    const STORAGE_KEY = 'sara_willis_wedding_auth';

    if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
        window.location.href = 'login.html';
    }
})();
