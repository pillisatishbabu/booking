import { createSlice } from '@reduxjs/toolkit';

// Mock Data
const MOCK_MOVIES = [
    {
        id: 1,
        title: "Kalki 2898 AD",
        genre: "Sci-Fi/Action",
        image: "https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg",
        description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
        duration: "3h 1m",
        rating: 4.8
    },
    {
        id: 2,
        title: "Salaar: Part 1 - Ceasefire",
        genre: "Action/Thriller",
        image: "https://www.ticketly.eu/Photos/Event/Event_35646.jpg",
        description: "A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.",
        duration: "2h 55m",
        rating: 4.7
    },
    {
        id: 3,
        title: "RRR",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQD_x6ohrNtiC4TdfAi-38OrItMJBgy6B09P4PhRuKjSUuBSKhiYLLrEn8sg&s",
        description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
        duration: "3h 2m",
        rating: 4.9
    },
    {
        id: 4,
        title: "Pushpa 2: The Rule",
        genre: "Action/Crime",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJr3X-J0iyhwqweZIgFNB4WvvU5xSNz_uRplyblX7zTfUsM4I7oMQ-ruzbmo&s",
        description: "Pushpa Raj raises his ranks in the smuggling syndicate of red sanders causing violence and bloodshed.",
        duration: "3h 0m",
        rating: 4.8
    },
    {
        id: 5,
        title: "Devara: Part 1",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsblU3ACi51kST6HuHQDrcjFO0JSPVoXreCavZrH9jgfN5N38Z_snhfozd_w&s",
        description: "An epic action saga set against coastal lands, which brief about the ripping and emotionally charged incidents in the periodic timeline.",
        duration: "2h 45m",
        rating: 4.6
    },
    {
        id: 6,
        title: "Hanu-Man",
        genre: "Superhero",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvUr-SGHEjZJLydXm0x3aqhw3XqIFbm7Si6nLpPJupHYloSASELdpoT6s1M0&s",
        description: "An imaginary place called Anjanadri where the protagonist gets the powers of Hanuman and fights for Anjanadri.",
        duration: "2h 38m",
        rating: 4.7
    },
    {
        id: 7,
        title: "Guntur Kaaram",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8rghB1T-Ux88CgC1zHK0cgaof_0w86njYM1KfXdrVPTqpBlfqJvQgI8Feg&s",
        description: "A story about a man who is the king of the underworld of Guntur city.",
        duration: "2h 39m",
        rating: 4.2
    },
    {
        id: 8,
        title: "Tillu Square",
        genre: "Comedy/Crime",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNW_aX6l93ABtwweke37IzouidwVnPoeTeFn127qEOseU8FHRcTLsJl2lSWU&s",
        description: "Sequel to DJ Tillu. Tillu's life takes a new turn after a mysterious murder.",
        duration: "2h 5m",
        rating: 4.5
    },
    {
        id: 9,
        title: "Game Changer",
        genre: "Political Action",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTIBNLvF827e2NMcAlfg6dmPQhKt5HlSqUbcT6osMMv5nngMY2th5-XjOXL0&s",
        description: "A political action drama where an honest IAS officer fights against valid corruption in the political system.",
        duration: "2h 50m",
        rating: 4.6
    },
    {
        id: 10,
        title: "Og",
        genre: "Action/Gangster",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiehMY-UEDzYhFFA3R4xC0NKAzfWTu3BwtyJqfvJ04KnpxVuvH0YopeLfwi7A&s",
        description: "A ruthless gangster returns to Mumbai to finish his unfinished business.",
        duration: "2h 40m",
        rating: 4.7
    },
    {
        id: 11,
        title: "Bhagavanth Kesari",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYP20iCtNApZ9A8uteCrkfMYeAlYXB6H0KMudLPDh66b1QdKQijQNkfVdY_jw&s",
        description: "Nelakonda Bhagavanth Kesari is adamant about getting his daughter into the army to make her strong.",
        duration: "2h 35m",
        rating: 4.4
    },
    {
        id: 12,
        title: "Hi Nanna",
        genre: "Romance/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEctpUxrKPl1ngnWRqtZwtutl94D5OIhKDNhFt22GgBCIeRd-2zXad5MrYQ&s",
        description: "A single father lives with his 6-year-old daughter. Their life changes when a woman saves the daughter from an accident.",
        duration: "2h 35m",
        rating: 4.8
    },
    {
        id: 13,
        title: "Dasara",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqMsKCrIBaOj9568iLHeQap7jFlvu0P_eW3onRoErM9AePh5Wmg8E91MO_w&s",
        description: "Dharani faces several hurdles after he stands up against the village headmen.",
        duration: "2h 36m",
        rating: 4.5
    },
    {
        id: 14,
        title: "Virupaksha",
        genre: "Horror/Thriller",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDeqfrxFbBvNiwMFlhulOgwjsC26HRrpFuXUVxwOJxbemYWkkAWKPzZNRsos&s",
        description: "Mysterious deaths occur in a village due to an unknown person's occult practice.",
        duration: "2h 25m",
        rating: 4.6
    },
    {
        id: 15,
        title: "Waltair Veerayya",
        genre: "Action/Comedy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4unR1emuR-2ldaPtVonWkE4Y_zWgezqrrRKKZt4mEuuQn_Q9YA7uB5yXSwgM&s",
        description: "A fisherman who smuggles goods gets involved in a bigger plot.",
        duration: "2h 40m",
        rating: 4.3
    },
    {
        id: 16,
        title: "Veera Simha Reddy",
        genre: "Action",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Veera_Simha_Reddy_poster.jpg/250px-Veera_Simha_Reddy_poster.jpg",
        description: "A son returns to his village to avenge his father's death.",
        duration: "2h 50m",
        rating: 4.1
    },
    {
        id: 17,
        title: "Baby",
        genre: "Romance/Drama",
        image: "https://m.media-amazon.com/images/M/MV5BYmRlNmYxMzUtY2E1Mi00ZWVjLWE0NTYtNTQ3NmJhM2I1YWJmXkEyXkFqcGc@._V1_.jpg",
        description: "A triangular love story between high school sweethearts and a new college friend.",
        duration: "2h 55m",
        rating: 4.4
    },
    {
        id: 18,
        title: "Mad",
        genre: "Comedy/Youth",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbLVHneuOK5BZD9HTOD03czGgiWhX30TLbo56byvayuM4kgeZDuQvuaZeWQ&s",
        description: "The riotous journey of three friends in an engineering college.",
        duration: "2h 10m",
        rating: 4.5
    },
    {
        id: 19,
        title: "Miss Shetty Mr Polishetty",
        genre: "Romance/Comedy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLz2flDiyOxtXpA9kt80pP-RjLkOY7qsNyRDtPhSxHhz-VEt8Lrg6agEEx-MI&s",
        description: "A chef and a stand-up comedian fall in love in London.",
        duration: "2h 30m",
        rating: 4.6
    },
    {
        id: 20,
        title: "Kushi",
        genre: "Romance",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs5x0W4GfXScXwq7Sm3ID6s2ccTubA-eJpajMLuJqJWP9UnCs3AgHT2LGdSMc&s",
        description: "A young man from a Brahmin family falls in love with a Christian girl.",
        duration: "2h 45m",
        rating: 4.2
    }
];

const initialState = {
    movies: MOCK_MOVIES,
    selectedMovie: null,
    loading: false,
    error: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = MOCK_MOVIES.find(m => m.id === parseInt(action.payload)) || null;
        }
    }
});

export const { setMovies, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
