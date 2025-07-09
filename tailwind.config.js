/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "chat-bg-start": "#e3f2fd",
        "chat-bg-end": "#e8f5e8",
        "chat-blue-light": "#4facfe",
        "chat-blue-dark": "#00c9ff",
        "chat-gray-light": "#607d8b",
        "chat-gray-dark": "#546e7a",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "message-slide": "messageSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-connection": "pulseConnection 2s infinite",
      },
      keyframes: {
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(20px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        messageSlide: {
          from: {
            opacity: "0",
            transform: "translateY(10px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        pulseConnection: {
          "0%, 100%": {
            boxShadow: "0 0 0 4px rgba(76, 175, 80, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.1)",
          },
        },
      },
    },
  },
  plugins: [],
};
