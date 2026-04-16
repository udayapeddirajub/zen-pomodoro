# 🍅 Zen Pomodoro: AI-Powered Focus

An aesthetic, glassmorphism-styled Pomodoro timer that leverages the power of AI (Google Gemini) to intelligently break down complex tasks into bite-sized 25-minute Pomodoro sprints.

## ✨ Features
- **AI Task Breakdown**: Experiencing overwhelming tasks? Describe your goal, and our integration with Gemini API will instantly break it down into actionable steps.
- **Glassmorphism UI**: Beautiful, dynamic background animations and sleek UI.
- **Privacy-First API handling**: Your Gemini API key is stored locally in your browser's `localStorage` and never touches an external server.

## 🚀 Getting Started

### Prerequisites
- You need a free **Gemini API Key**. Get one from [Google AI Studio](https://aistudio.google.com/).

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/zen-pomodoro.git
   ```
2. Navigate into the directory:
   ```bash
   cd zen-pomodoro
   ```
3. Open `index.html` in your browser or run a simple local server:
   ```bash
   python -m http.server 8000
   ```
4. Click the **Settings** gear icon in the app to input your Gemini API Key.
5. Enter a large task in the AI side panel and let it do the magic!

## 🛠️ Architecture
- Pure vanilla HTML/CSS/JS. No build steps required.
- Modularized Javascript (`js/api.js`, `js/timer.js`, `js/app.js`).
