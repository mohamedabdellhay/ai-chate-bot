# AI API Client - Express.js MVC Application

A Node.js application using Express.js and the MVC pattern to consume an external AI API (n8n webhook).

## 📋 Features

- **MVC Architecture**: Clean separation of concerns with Model-View-Controller pattern
- **AI Integration**: Connects to external n8n AI API via HTTP POST requests
- **Beautiful UI**: Modern, responsive chat interface with gradient design
- **Error Handling**: Comprehensive error handling for API failures and timeouts
- **Environment Configuration**: Secure API endpoint configuration via environment variables

## 🚀 Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd /home/mohamedabdellhay/work/iti/ai/ai-2
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and replace the placeholder with your actual n8n webhook URL:

   ```
   N8N_API_ENDPOINT=https://your-actual-n8n-instance.com/webhook/chat-api
   ```

## 🎯 Usage

### Start the server:

**Production mode**:

```bash
npm start
```

**Development mode** (with auto-reload):

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Access the application:

Open your browser and navigate to:

```
http://localhost:3000/chat
```

## 📁 Project Structure

```
ai-2/
├── app.js                 # Main application entry point
├── package.json           # Project dependencies
├── .env                   # Environment variables (not in git)
├── .env.example          # Template for environment variables
├── controllers/
│   └── apiController.js  # Controller for AI API interaction
├── routes/
│   └── apiRoutes.js      # Route definitions
└── views/
    └── chat.ejs          # EJS template for chat interface
```

## 🔌 API Endpoints

### Routes

- **GET `/chat`**: Renders the chat interface
- **POST `/api/ask`**: Submits a prompt to the AI API

### Request Format

The application sends POST requests to your n8n API with the following JSON structure:

```json
{
  "prompt": "Your user's prompt text here"
}
```

### Expected Response

The application expects the n8n API to return a JSON response. It will attempt to extract the AI response from:

- `response.data.response`
- `response.data.text`
- `response.data` (entire response object)

You may need to adjust the response parsing in `controllers/apiController.js` based on your actual API response structure.

## 🛠️ Configuration

### Environment Variables

| Variable           | Description          | Example                                          |
| ------------------ | -------------------- | ------------------------------------------------ |
| `PORT`             | Server port          | `3000`                                           |
| `N8N_API_ENDPOINT` | Your n8n webhook URL | `https://your-n8n-instance.com/webhook/chat-api` |

### Timeout Settings

The default API timeout is set to 30 seconds. You can modify this in `controllers/apiController.js`:

```javascript
timeout: 30000; // 30 seconds
```

## 🎨 Customization

### Styling

The UI styles are embedded in `views/chat.ejs`. You can customize:

- Colors and gradients
- Font styles
- Layout and spacing
- Animations

### Response Parsing

If your n8n API returns a different response structure, update the parsing logic in `controllers/apiController.js`:

```javascript
const aiResponse =
  apiResponse.data.response || apiResponse.data.text || apiResponse.data;
```

## 🐛 Troubleshooting

### Common Issues

1. **"API endpoint not configured" error**:

   - Make sure you've created a `.env` file
   - Verify `N8N_API_ENDPOINT` is set correctly

2. **Connection timeout**:

   - Check your n8n webhook URL is accessible
   - Verify your network connection
   - Consider increasing the timeout value

3. **Port already in use**:
   - Change the `PORT` in your `.env` file
   - Or stop the process using port 3000

## 📝 License

ISC

## 👨‍💻 Development

Built with:

- [Express.js](https://expressjs.com/) - Web framework
- [Axios](https://axios-http.com/) - HTTP client
- [EJS](https://ejs.co/) - Template engine
- [dotenv](https://github.com/motdotla/dotenv) - Environment configuration
