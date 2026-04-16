class GeminiAPI {
    constructor() {
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    }

    static getApiKey() {
        return localStorage.getItem('gemini_api_key') || '';
    }

    static setApiKey(key) {
        localStorage.setItem('gemini_api_key', key);
    }

    async generateTaskBreakdown(goal) {
        const apiKey = GeminiAPI.getApiKey();
        if (!apiKey) {
            throw new Error('API Key missing');
        }

        const prompt = `You are an expert productivity coach. Break down the following goal into 3 to 5 highly actionable steps. Each step should be completable in a single 25-minute Pomodoro session. Output ONLY a valid JSON array of strings representing the tasks. No markdown formatting or extra text. Goal: ${goal}`;

        try {
            const response = await fetch(`${this.baseUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`${response.status} ${errorText}`);
            }

            const data = await response.json();
            const textContent = data.candidates[0].content.parts[0].text;
            
            // Clean up backticks if model hallucinates them
            const cleanText = textContent.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanText);
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }
}
window.GeminiAPI = GeminiAPI;
