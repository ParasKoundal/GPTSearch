# GPT Search Extension

A lightweight Chrome extension that allows you to search/prompt ChatGPT directly from your browser's address bar (Omnibox).

![Logo](GPTSearch.png)

## Features
- **Instant Access**: Type `gpt` in your address bar, press Tab/Space, and start typing your prompt.
- **Auto-Injection**: Your prompt is automatically typed into ChatGPT and sent.
- **Smart Handling**: Works even if you need to log in first (remembers your prompt for 60 seconds).
- **Same Tab**: Opens in your current tab if it's empty, or updates the current tab, keeping your browser tidy.

## Installation

> [!NOTE]
> This extension will be available on the Chrome Web Store soon! For now, you can install it manually.

1.  **Download/Clone** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder containing this extension (the folder with `manifest.json`).

## How to Use

1.  Click on your browser's address bar (or press `Cmd+L` / `Ctrl+L`).
2.  Type `gpt` and press **Space** or **Tab**.
3.  You will see the "GPT Search" tag appear.
4.  Type your question or prompt (e.g., "Write a python script to scrape a website").
5.  Press **Enter**.
6.  The extension will navigate to ChatGPT and automatically submit your prompt!

## Troubleshooting
- **Not injecting?** Ensure you are logged into ChatGPT. If you hit a login screen, log in, and the extension should try to inject your prompt once the chat interface loads (within 60 seconds).

