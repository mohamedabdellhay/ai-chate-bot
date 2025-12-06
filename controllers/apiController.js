const axios = require("axios");

/**
 * Controller function to handle AI prompt submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.postPrompt = async (req, res) => {
  try {
    // Extract prompt text from request body
    const { promptText } = req.body;

    // Validate input
    if (!promptText || promptText.trim() === "") {
      return res.render("chat", {
        error: "Please enter a prompt",
        response: null,
      });
    }

    // Get API endpoint from environment variables
    const apiEndpoint = process.env.N8N_API_ENDPOINT;

    if (!apiEndpoint) {
      return res.render("chat", {
        error:
          "API endpoint not configured. Please set N8N_API_ENDPOINT in .env file",
        response: null,
      });
    }

    // Make POST request to external AI API
    const apiResponse = await axios.post(
      apiEndpoint,
      {
        prompt: promptText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.N8N_API_KEY,
        },
        timeout: 30000, // 30 second timeout
      }
    );

    // Extract AI response from API response
    // Adjust this based on your actual API response structure
    const aiResponse =
      apiResponse.data.response || apiResponse.data.text || apiResponse.data;

    // Render the view with the AI response
    res.render("chat", {
      response: aiResponse,
      error: null,
      userPrompt: promptText,
    });
  } catch (error) {
    console.error("Error calling AI API:", error.message);

    // Handle different types of errors
    let errorMessage = "Failed to get response from AI. Please try again.";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout. The AI is taking too long to respond.";
    } else if (error.response) {
      errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "No response from AI API. Please check your connection.";
    }

    res.render("chat", {
      error: errorMessage,
      response: null,
    });
  }
};

/**
 * Controller function to handle AI prompt submission with JSON response
 * Used for AJAX requests (no page refresh)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.postPromptJSON = async (req, res) => {
  try {
    // Extract prompt text from request body
    const { promptText } = req.body;

    // Validate input
    if (!promptText || promptText.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Please enter a prompt",
      });
    }

    // Get API endpoint from environment variables
    const apiEndpoint = process.env.N8N_API_ENDPOINT;

    if (!apiEndpoint) {
      return res.status(500).json({
        success: false,
        error:
          "API endpoint not configured. Please set N8N_API_ENDPOINT in .env file",
      });
    }

    // Make POST request to external AI API
    const apiResponse = await axios.post(
      apiEndpoint,
      {
        prompt: promptText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.N8N_API_KEY,
        },
        timeout: 30000, // 30 second timeout
      }
    );

    // Extract AI response from API response
    // Adjust this based on your actual API response structure
    const aiResponse =
      apiResponse.data.response || apiResponse.data.text || apiResponse.data;

    // Return JSON response
    res.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Error calling AI API:", error.message);

    // Handle different types of errors
    let errorMessage = "Failed to get response from AI. Please try again.";

    if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout. The AI is taking too long to respond.";
    } else if (error.response) {
      errorMessage = `API Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "No response from AI API. Please check your connection.";
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};
