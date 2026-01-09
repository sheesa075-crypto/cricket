// Dummy data for testing without API
const dummyMatches = [
    {
        name: "India vs Australia - 3rd Test",
        matchType: "Test",
        t1: "India",
        t2: "Australia",
        status: "India won by 8 wickets",
        score: ["India: 296/10 & 187/2", "Australia: 224/10 & 256/10"]
    },
    {
        name: "Pakistan vs England - 2nd ODI",
        matchType: "ODI",
        t1: "Pakistan",
        t2: "England",
        status: "Live - England 156/4 (32.0)",
        score: ["Pakistan: 285/7 (50.0)", "England: 156/4 (32.0)"]
    },
    {
        name: "South Africa vs New Zealand - T20",
        matchType: "T20",
        t1: "South Africa",
        t2: "New Zealand",
        status: "Live - South Africa 89/3 (12.4)",
        score: ["New Zealand: 167/8 (20.0)", "South Africa: 89/3 (12.4)"]
    }
];

// Toggle between dummy data and real API
const USE_DUMMY_DATA = true;  // Set to false when you get real API key

// Your API configuration (for when you get the real API)
const apiKey = 'YOUR_API_KEY';  // Replace when you get actual key
const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

async function fetchLiveScores() {
    try {
        if (USE_DUMMY_DATA) {
            // Using dummy data for testing
            if (dummyMatches.length > 0) {
                const match = dummyMatches[0];  // Display first match
                
                document.getElementById('match-title').textContent = 
                    `${match.name} - ${match.matchType}`;
                
                document.getElementById('team1').textContent = 
                    `${match.t1} vs ${match.t2}`;
                
                document.getElementById('status').textContent = 
                    `Status: ${match.status}`;
                
                if (match.score) {
                    document.getElementById('score').innerHTML = 
                        match.score.join('<br>');
                }
            } else {
                document.getElementById('match-title').textContent = 
                    'No matches available.';
            }
        } else {
            // Real API call (activate when you have API key)
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
                const match = data.data[0];
                
                document.getElementById('match-title').textContent = 
                    `${match.name} - ${match.matchType}`;
                
                document.getElementById('team1').textContent = 
                    `${match.t1} vs ${match.t2}`;
                
                document.getElementById('status').textContent = 
                    `Status: ${match.status}`;
                
                if (match.score && match.score.length > 0) {
                    document.getElementById('score').innerHTML = 
                        match.score.join('<br>');
                }
            } else {
                document.getElementById('match-title').textContent = 
                    'No live matches found.';
            }
        }
    } catch (error) {
        console.error('Error fetching cricket data:', error);
        document.getElementById('match-title').textContent = 
            'Error loading scores. Please try again.';
    }
}

// Initial data fetch when page loads
fetchLiveScores();

// Auto-refresh every 30 seconds (useful when using real API)
setInterval(fetchLiveScores, 30000);