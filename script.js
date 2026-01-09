const apiKey = 'YOUR_API_KEY';  // Get from cricapi.com
const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

async function fetchLiveScores() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const match = data.data[0];  // Assuming first match; you can loop for multiple
            document.getElementById('match-title').textContent = `${match.name} - ${match.matchType}`;
            document.getElementById('team1').textContent = `${match.t1} vs ${match.t2}`;
            document.getElementById('status').textContent = `Status: ${match.status}`;
            // For detailed scores, parse match.score if available
            // Example: document.getElementById('score').innerHTML = match.score.join('<br>');
        } else {
            document.getElementById('match-title').textContent = 'No live matches found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('match-title').textContent = 'Error loading scores.';
    }
}

// Fetch data every 30 seconds for "live" updates
fetchLiveScores();
setInterval(fetchLiveScores, 30000);