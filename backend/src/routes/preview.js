import express from 'express';
import { syntaxHighlight } from '../utils/syntaxHighlight.js';

const router = express.Router();

// ✅ Allow preview pages to fetch from same server
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const previewHTML = (apiUrl, title) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Quick Preview — ${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0f1117;
      color: #e2e8f0;
      min-height: 100vh;
      padding: 40px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 32px;
    }
    .badge {
      background: #3b82f6;
      color: white;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 1px;
    }
    h1 { font-size: 20px; font-weight: 600; color: #f8fafc; }
    .url-bar {
      background: #1e2130;
      border: 1px solid #2d3148;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 13px;
      color: #94a3b8;
      margin-bottom: 24px;
      word-break: break-all;
    }
    .url-bar span { color: #60a5fa; }
    .status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      font-size: 13px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #94a3b8;
    }
    .status-dot.success { background: #22c55e; }
    .status-dot.error   { background: #ef4444; }
    .status-dot.loading {
      background: #f59e0b;
      animation: pulse 1s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    pre {
      background: #1e2130;
      border: 1px solid #2d3148;
      border-radius: 10px;
      padding: 24px;
      font-size: 13px;
      line-height: 1.7;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .key  { color: #93c5fd; }
    .str  { color: #86efac; }
    .num  { color: #fca5a5; }
    .bool { color: #c4b5fd; }
    .null { color: #94a3b8; }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #475569;
      text-align: center;
    }
    .footer a { color: #3b82f6; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <span class="badge">GET</span>
    <h1>Quick Preview — ${title}</h1>
  </div>
  <div class="url-bar">Fetching: <span>${apiUrl}</span></div>
  <div class="status-bar">
    <div class="status-dot loading" id="dot"></div>
    <span id="status-text">Fetching data...</span>
  </div>
  <pre id="output">Loading...</pre>
  <div class="footer">
    Powered by your News API &nbsp;|&nbsp;
    <a href="http://localhost:5000/api-docs" target="_blank">Open Full Swagger UI →</a>
  </div>
  <script>
    ${syntaxHighlight.toString()}

    async function fetchData() {
      const dot        = document.getElementById('dot');
      const statusText = document.getElementById('status-text');
      const output     = document.getElementById('output');
      try {
        const res  = await fetch('${apiUrl}');
        const data = await res.json();
        dot.className          = 'status-dot ' + (res.ok ? 'success' : 'error');
        statusText.textContent = 'Status ' + res.status + (res.ok ? ' — OK ✅' : ' — Error ❌');
        output.innerHTML       = syntaxHighlight(data);
      } catch (err) {
        dot.className          = 'status-dot error';
        statusText.textContent = 'Failed to fetch ❌';
        output.textContent     = 'Error: ' + err.message;
      }
    }

    fetchData();
  </script>
</body>
</html>
`;

// 🔹 Preview headlines
router.get('/headlines', (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  const apiUrl = `http://localhost:5000/api/headlines${query ? '?' + query : ''}`;
  res.send(previewHTML(apiUrl, 'GET /api/headlines'));
});

// 🔹 Preview article by ID
router.get('/articles/:id', (req, res) => {
  const apiUrl = `http://localhost:5000/api/articles/${req.params.id}`;
  res.send(previewHTML(apiUrl, `GET /api/articles/${req.params.id}`));
});

export default router;
