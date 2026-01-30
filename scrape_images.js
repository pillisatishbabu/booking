import https from 'https';
import fs from 'fs';

const movies = [
    "Kalki 2898 AD",
    "Salaar: Part 1 - Ceasefire",
    "RRR",
    "Pushpa 2: The Rule",
    "Devara: Part 1",
    "Hanu-Man",
    "Guntur Kaaram",
    "Tillu Square",
    "Game Changer",
    "Og",
    "Bhagavanth Kesari",
    "Hi Nanna",
    "Dasara",
    "Virupaksha",
    "Waltair Veerayya",
    "Veera Simha Reddy",
    "Baby",
    "Mad",
    "Miss Shetty Mr Polishetty",
    "Kushi"
];

const getPoster = (movie) => {
    return new Promise((resolve) => {
        const query = encodeURIComponent(movie + " poster");
        const options = {
            hostname: 'www.google.com',
            path: `/search?q=${query}&tbm=isch`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                // Regex for encrypted-tbn0
                const match = data.match(/src="(https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:[^"]+)"/);
                if (match && match[1]) {
                    // Ampersand unescaping
                    resolve({ title: movie, image: match[1].replace(/&amp;/g, '&') });
                } else {
                    resolve({ title: movie, image: null });
                }
            });
        }).on('error', (e) => {
            console.error(`Error fetching ${movie}: ${e.message}`);
            resolve({ title: movie, image: null });
        });
    });
};

const run = async () => {
    const results = [];
    console.log("Scraping started...");
    for (const movie of movies) {
        // Add delay to be nice
        await new Promise(r => setTimeout(r, 500));
        const res = await getPoster(movie);
        console.log(`Fetched: ${res.title} -> ${res.image ? 'Found' : 'Not Found'}`);
        results.push(res);
    }
    fs.writeFileSync('posters.json', JSON.stringify(results, null, 2));
    console.log("Done. Saved to posters.json");
};

run();
