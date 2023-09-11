const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    // Stash the event
    window.deferredPrompt = event;

    // Set class 'hidden' to false (show)
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check for event
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) return;

    // Prompt for install
    promptEvent.prompt();

    window.deferredPrompt = null;

    // Set class 'hidden' to true (hide)
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App successfully installed!')
    window.deferredPrompt = null;
});
