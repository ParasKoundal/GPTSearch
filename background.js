chrome.omnibox.onInputEntered.addListener((text) => {
    if (!text || text.trim() === "") {
        // If no text, just open ChatGPT without injection
        openChatGPT();
        return;
    }

    // Save the query with a timestamp
    const queryData = {
        text: text,
        timestamp: Date.now()
    };

    chrome.storage.local.set({ pendingQuery: queryData }, () => {
        openChatGPT();
    });
});

function openChatGPT() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { url: "https://chatgpt.com" });
        } else {
            // Fallback if no active tab found (rare)
            chrome.tabs.create({ url: "https://chatgpt.com" });
        }
    });
}
