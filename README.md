# Soamya Recommends

Soamya Recommends is an honest, premium-designed Apple product advisor site. It features an interactive UI and an AI-powered recommendation engine to help you find the exact MacBook, iPhone, iPad, or Apple Watch you need without marketing fluff.

## Features
- **GSAP Animations:** Butter-smooth scroll animations on the hero section.
- **Glassmorphic UI:** Premium frosted glass aesthetics.
- **Filter Engine:** A rich product database you can filter by category, budget, and priority.
- **AI Advisor:** A real-time AI assistant powered by Groq and Meta's Llama-3.3-70b model.

## Setup Instructions

This project is a static frontend. To run it locally:

1. Clone the repository.
2. Serve the directory using any static file server (e.g. `npx http-server` or VS Code Live Server).
3. **IMPORTANT: Adding your API Keys**
   To make the AI features work, you need to provide your own Groq API keys. 
   - Get a free key at [console.groq.com](https://console.groq.com)
   - Open `js/chat.js` and `js/recommender.js`.
   - Locate the `GROQ_KEYS` array at the top of the files.
   - Replace the `"YOUR_GROQ_API_KEY_1"` string with your actual key.
   *(Note: Because this is a frontend-only project, the API keys must be injected directly into the JS for local testing. **Never commit your real keys to a public repository!**)*

## Project Structure
- `index.html`: The main landing page with scroll animations.
- `recommender.html`: The interactive filter engine and AI advisor tool.
- `css/index.css`: The main stylesheet handling the design system.
- `js/main.js`: Scroll GSAP animations and UI interactions.
- `js/recommender.js`: The product database, filtering logic, and AI fetch requests.
- `js/chat.js`: The standalone AI chat bubble logic.

## Security
A `.gitignore` file has been added to prevent `.env` files or other sensitive data from being pushed to GitHub. Make sure your local `.env` is safe.
