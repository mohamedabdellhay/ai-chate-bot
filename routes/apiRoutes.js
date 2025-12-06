const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

/**
 * GET /chat
 * Renders the chat interface
 */
router.get("/chat", (req, res) => {
  res.render("chat", {
    response: null,
    error: null,
  });
});

/**
 * POST /api/ask
 * Handles user prompt submission and calls the AI API (renders view)
 */
router.post("/api/ask", apiController.postPrompt);

/**
 * POST /api/ask-json
 * Handles user prompt submission and returns JSON response (for AJAX)
 */
router.post("/api/ask-json", apiController.postPromptJSON);

module.exports = router;
