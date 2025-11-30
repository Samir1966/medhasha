const https = require('https');

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
    console.error("Error: OPENROUTER_API_KEY is not set.");
    process.exit(1);
}

console.log(`Testing with API Key: ${apiKey.substring(0, 5)}...`);

const data = JSON.stringify({
    model: "meta-llama/llama-3.2-3b-instruct:free",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, are you working?" }
    ],
    temperature: 0.7,
    max_tokens: 500
});

const options = {
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'HTTP-Referer': 'https://brainhope.app',
        'X-Title': 'BrainHope NeuroBuddy'
    }
};

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body}`);
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

req.write(data);
req.end();
