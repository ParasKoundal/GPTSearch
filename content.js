// Check for a pending query when the page loads
chrome.storage.local.get(["pendingQuery"], (result) => {
    if (result.pendingQuery) {
        const data = result.pendingQuery;

        // Handle legacy string format (just in case) or new object format
        const queryText = typeof data === 'string' ? data : data.text;
        const timestamp = data.timestamp || 0;
        const now = Date.now();

        // Check if the query is fresh (less than 60 seconds old)
        // This prevents old queries from being injected if the user visits ChatGPT later
        if (now - timestamp < 60000) {
            injectAndSubmit(queryText);
        } else {
            // Clean up old query
            chrome.storage.local.remove("pendingQuery");
        }
    }
});

function injectAndSubmit(text) {
    console.log("GPT Search: Attempting to inject query:", text);

    // Wait for the input element to be available
    const checkForInput = setInterval(() => {
        // Try to find the element by ID (standard) or other common selectors if ID changes
        const inputEl = document.querySelector("#prompt-textarea");

        if (inputEl) {
            console.log("GPT Search: Input element found", inputEl.tagName);
            clearInterval(checkForInput);

            // Focus the element
            inputEl.focus();

            // Determine how to set value based on element type
            if (inputEl.tagName === 'TEXTAREA') {
                try {
                    // React 16+ hack for textareas
                    const nativeTextareaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
                    nativeTextareaValueSetter.call(inputEl, text);
                } catch (e) {
                    console.warn("GPT Search: Failed to use native setter, falling back to direct assignment", e);
                    inputEl.value = text;
                }
            } else {
                // Handle contenteditable div (fallback or if ChatGPT changes UI)
                console.log("GPT Search: Element is not a textarea, treating as contenteditable");
                inputEl.textContent = text;
                // For contenteditable, we might need to trigger 'input' on the element
                inputEl.innerHTML = `<p>${text}</p>`; // Sometimes they expect P tags
            }

            // Dispatch input events
            inputEl.dispatchEvent(new Event('input', { bubbles: true }));
            inputEl.dispatchEvent(new Event('change', { bubbles: true }));

            console.log("GPT Search: Text injected and event dispatched");

            // Clear the storage ONLY after successful injection
            chrome.storage.local.remove("pendingQuery");

            // Small delay to ensure state update before clicking send
            setTimeout(() => {
                const sendButton = document.querySelector('[data-testid="send-button"]');
                if (sendButton) {
                    console.log("GPT Search: Clicking send button");
                    sendButton.click();
                } else {
                    console.log("GPT Search: Send button not found, trying Enter key");
                    inputEl.dispatchEvent(new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true
                    }));
                }
            }, 500);
        }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
        clearInterval(checkForInput);
        console.log("GPT Search: Timed out waiting for input element");
    }, 10000);
}
