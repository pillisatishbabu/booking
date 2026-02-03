import { createSlice } from '@reduxjs/toolkit';

// Mock Data - Expanded Catalog    
const MOCK_ITEMS = [
    // --- Now Showing ---
    {
        id: 1,
        title: "Kalki 2898 AD",
        type: "movie",
        category: "now-showing",
        genre: "Sci-Fi/Action",
        image: "https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg",
        description: "A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.",
        duration: "3h 1m",
        rating: 4.8
    },
    {
        id: 2,
        title: "Salaar: Part 1 - Ceasefire",
        type: "movie",
        category: "now-showing",
        genre: "Action/Thriller",
        image: "https://www.ticketly.eu/Photos/Event/Event_35646.jpg",
        description: "A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.",
        duration: "2h 55m",
        rating: 4.7
    },
    {
        id: 3,
        title: "RRR",
        type: "movie",
        category: "now-showing",
        genre: "Action/Drama",
        image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2019/03/RRR-2022.jpeg",
        description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
        duration: "3h 2m",
        rating: 4.9
    },
    {
        id: 4,
        title: "Pushpa 2: The Rule",
        type: "movie",
        category: "now-showing",
        genre: "Action/Crime",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJr3X-J0iyhwqweZIgFNB4WvvU5xSNz_uRplyblX7zTfUsM4I7oMQ-ruzbmo&s",
        description: "Pushpa Raj raises his ranks in the smuggling syndicate of red sanders causing violence and bloodshed.",
        duration: "3h 0m",
        rating: 4.8
    },
    {
        id: 5,
        title: "Devara: Part 1",
        type: "movie",
        category: "now-showing",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsblU3ACi51kST6HuHQDrcjFO0JSPVoXreCavZrH9jgfN5N38Z_snhfozd_w&s",
        description: "An epic action saga set against coastal lands, which brief about the ripping and emotionally charged incidents in the periodic timeline.",
        duration: "2h 45m",
        rating: 4.6
    },
    {
        id: 6,
        title: "Hanu-Man",
        type: "movie",
        category: "now-showing",
        genre: "Superhero",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvUr-SGHEjZJLydXm0x3aqhw3XqIFbm7Si6nLpPJupHYloSASELdpoT6s1M0&s",
        description: "An imaginary place called Anjanadri where the protagonist gets the powers of Hanuman and fights for Anjanadri.",
        duration: "2h 38m",
        rating: 4.7
    },
    {
        id: 7,
        title: "Guntur Kaaram",
        type: "movie",
        category: "now-showing",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8rghB1T-Ux88CgC1zHK0cgaof_0w86njYM1KfXdrVPTqpBlfqJvQgI8Feg&s",
        description: "A story about a man who is the king of the underworld of Guntur city.",
        duration: "2h 39m",
        rating: 4.2
    },
    {
        id: 8,
        title: "Tillu Square",
        type: "movie",
        category: "now-showing",
        genre: "Comedy/Crime",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWNW_aX6l93ABtwweke37IzouidwVnPoeTeFn127qEOseU8FHRcTLsJl2lSWU&s",
        description: "Sequel to DJ Tillu. Tillu's life takes a new turn after a mysterious murder.",
        duration: "2h 5m",
        rating: 4.5
    },
    {
        id: 9,
        title: "Game Changer",
        type: "movie",
        category: "now-showing",
        genre: "Political Action",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTIBNLvF827e2NMcAlfg6dmPQhKt5HlSqUbcT6osMMv5nngMY2th5-XjOXL0&s",
        description: "A political action drama where an honest IAS officer fights against valid corruption in the political system.",
        duration: "2h 50m",
        rating: 4.6
    },
    {
        id: 10,
        title: "Og",
        type: "movie",
        category: "now-showing",
        genre: "Action/Gangster",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiehMY-UEDzYhFFA3R4xC0NKAzfWTu3BwtyJqfvJ04KnpxVuvH0YopeLfwi7A&s",
        description: "A ruthless gangster returns to Mumbai to finish his unfinished business.",
        duration: "2h 40m",
        rating: 4.7
    },
    {
        id: 11,
        title: "Bhagavanth Kesari",
        type: "movie",
        category: "now-showing",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYP20iCtNApZ9A8uteCrkfMYeAlYXB6H0KMudLPDh66b1QdKQijQNkfVdY_jw&s",
        description: "Nelakonda Bhagavanth Kesari is adamant about getting his daughter into the army to make her strong.",
        duration: "2h 35m",
        rating: 4.4
    },
    {
        id: 12,
        title: "Hi Nanna",
        type: "movie",
        category: "now-showing",
        genre: "Romance/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEctpUxrKPl1ngnWRqtZwtutl94D5OIhKDNhFt22GgBCIeRd-2zXad5MrYQ&s",
        description: "A single father lives with his 6-year-old daughter. Their life changes when a woman saves the daughter from an accident.",
        duration: "2h 35m",
        rating: 4.8
    },
    {
        id: 13,
        title: "Dasara",
        type: "movie",
        category: "now-showing",
        genre: "Action/Drama",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqMsKCrIBaOj9568iLHeQap7jFlvu0P_eW3onRoErM9AePh5Wmg8E91MO_w&s",
        description: "Dharani faces several hurdles after he stands up against the village headmen.",
        duration: "2h 36m",
        rating: 4.5
    },
    {
        id: 14,
        title: "Virupaksha",
        type: "movie",
        category: "now-showing",
        genre: "Horror/Thriller",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShDeqfrxFbBvNiwMFlhulOgwjsC26HRrpFuXUVxwOJxbemYWkkAWKPzZNRsos&s",
        description: "Mysterious deaths occur in a village due to an unknown person's occult practice.",
        duration: "2h 25m",
        rating: 4.6
    },
    {
        id: 15,
        title: "Waltair Veerayya",
        type: "movie",
        category: "now-showing",
        genre: "Action/Comedy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4unR1emuR-2ldaPtVonWkE4Y_zWgezqrrRKKZt4mEuuQn_Q9YA7uB5yXSwgM&s",
        description: "A fisherman who smuggles goods gets involved in a bigger plot.",
        duration: "2h 40m",
        rating: 4.3
    },
    {
        id: 16,
        title: "Animal",
        type: "movie",
        category: "now-showing",
        genre: "Action/Crime",
        image: "https://m.media-amazon.com/images/M/MV5BNGViM2M4NmUtMmNkNy00MTQ5LTk5MDYtNmNhODAzODkwOTJlXkEyXkFqcGdeQXVyMTY1NjAyNjU4._V1_.jpg",
        description: "A son's ardent love for his father. Often away on work, the father is unable to comprehend the intensity of his son's love.",
        duration: "3h 21m",
        rating: 4.6
    },
    {
        id: 17,
        title: "Leo",
        type: "movie",
        category: "now-showing",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BMmU1Y2Y3NjMtM2YwOS00YTE2LTg0Y2UtYzdmMWVlYmRmY2Y4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "A mild-mannered cafe owner becomes a local hero through an act of violence, which sets off consequences with a dangerous gang.",
        duration: "2h 44m",
        rating: 4.5
    },
    {
        id: 18,
        title: "Jawan",
        type: "movie",
        category: "now-showing",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BOWI5NmU3NTUtOTZiMS00YTRhLWIyNGUtZDliNjY3YzkyNjA1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
        duration: "2h 49m",
        rating: 4.7
    },
    {
        id: 19,
        title: "Pathaan",
        type: "movie",
        category: "now-showing",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BM2QzM2VjMTctYzY2Zi00ZDJhLWI0ZTAtNWI5N2I3Y2FlMmI5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his country.",
        duration: "2h 26m",
        rating: 4.4
    },
    {
        id: 20,
        title: "Tiger 3",
        type: "movie",
        category: "now-showing",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BMjIxNjA4MzYtMjA2NC00M2I0LWE0YjEtM2M5YmZjNWFhMzgxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "Following the events of Tiger Zinda Hai, War, and Pathaan, Tiger and Zoya are framed as traitors and go on a life-threatening mission to clear their names.",
        duration: "2h 33m",
        rating: 4.2
    },

    // --- Upcoming ---
    {
        id: 101,
        title: "Toxic: A Fairy Tale for Grown-ups",
        type: "movie",
        category: "upcoming",
        genre: "Action/Drama",
        image: "https://m.media-amazon.com/images/M/MV5BMDZiNzAwZTQtYWIwMC00ODA0LWJiOGMtZTgzZGYzYzMxMDNiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Yash stars in this high-octane action drama directed by Geetu Mohandas.",
        duration: "TBA",
        rating: 0,
        interestCount: "418K+"
    },
    {
        id: 102,
        title: "Spirit",
        type: "movie",
        category: "upcoming",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BNzMxMDdiYzAtNGM0Ni00ZWQxLWI0ZTUtMzdkMjBkMzExYWZmXkEyXkFqcGc@._V1_.jpg",
        description: "Prabhas stars in Sandeep Reddy Vanga's next massive project.",
        duration: "TBA",
        rating: 0,
        interestCount: "152K+"
    },
    {
        id: 103,
        title: "Varanasi",
        type: "movie",
        category: "upcoming",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BMjZmZGMyYjgtMGU2Mi00ZGE1LTkwYjEtYzdkYTA0ODI0MDI2XkEyXkFqcGc@._V1_.jpg",
        description: "The sequel to the high-octane action thriller War, starring Hrithik Roshan and NTR Jr.",
        duration: "TBA",
        rating: 0,
        interestCount: "89K+"
    },
    {
        id: 104,
        title: "Ramayana: Part 1",
        type: "movie",
        category: "upcoming",
        genre: "Epic/Mythology",
        image: "https://m.media-amazon.com/images/M/MV5BNDYwNjU5YmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "An epic mythological drama based on the ancient Indian epic Ramayana.",
        duration: "TBA",
        rating: 0,
        interestCount: "310K+"
    },
    {
        id: 105,
        title: "The Raja Saab",
        type: "movie",
        category: "upcoming",
        genre: "Horror/Comedy",
        image: "https://cdn.123telugu.com/content/wp-content/uploads/2025/11/The-Raja-Saab-5.webp",
        description: "A romantic horror comedy starring Prabhas in a unique avatar.",
        duration: "TBA",
        rating: 0
    },
    {
        id: 106,
        title: "Vishwambhara",
        type: "movie",
        category: "upcoming",
        genre: "Fantasy/Adventure",
        image: "https://m.media-amazon.com/images/M/MV5BNmRjYzY5YzktYzQxYy00ZjY2LTgwYmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "A high-budget fantasy adventure starring Chiranjeevi.",
        duration: "TBA",
        rating: 0
    },
    {
        id: 107,
        title: "Border 2",
        type: "movie",
        category: "upcoming",
        genre: "War/Drama",
        image: "https://m.media-amazon.com/images/M/MV5BNmRjYzY5YzktYzQxYy00ZjY2LTgwYmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "The sequel to the cult classic 1997 war film Border.",
        duration: "TBA",
        rating: 0
    },
    {
        id: 108,
        title: "Sky Force",
        type: "movie",
        category: "upcoming",
        genre: "Action/Thriller",
        image: "https://m.media-amazon.com/images/M/MV5BNmRjYzY5YzktYzQxYy00ZjY2LTgwYmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "Akshay Kumar stars in this action-packed aerial combat thriller.",
        duration: "TBA",
        rating: 0
    },
    {
        id: 109,
        title: "Singham Again",
        type: "movie",
        category: "upcoming",
        genre: "Action/Crime",
        image: "https://m.media-amazon.com/images/M/MV5BNmRjYzY5YzktYzQxYy00ZjY2LTgwYmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "The third installment of the Singham franchise and the fifth installment of Rohit Shetty's Cop Universe.",
        duration: "TBA",
        rating: 0
    },
    {
        id: 110,
        title: "Welcome To The Jungle",
        type: "movie",
        category: "upcoming",
        genre: "Comedy/Adventure",
        image: "https://m.media-amazon.com/images/M/MV5BNmRjYzY5YzktYzQxYy00ZjY2LTgwYmYtYjYxNy00YmY5LWIyYzYtZDljNjAwYjIyYjRkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        description: "The third installment of the Welcome film series, featuring an ensemble cast.",
        duration: "TBA",
        rating: 0
    }
];

const THEATRES_BY_CITY = {
    'Hyderabad': [
        { id: 'h1', name: 'PVR: RK Cineplex, Banjara Hills', rating: 4.5, features: ['M-Ticket', 'Food & Beverage'] },
        { id: 'h2', name: 'AAA Cinemas: Ameerpet', rating: 4.8, features: ['M-Ticket', 'Luxurious Seating'] },
        { id: 'h3', name: 'Prasads Multiplex: NTR Garden', rating: 4.7, features: ['IMAX', 'Large Screen'] },
        { id: 'h4', name: 'AMB Cinemas: Gachibowli', rating: 4.9, features: ['Premium', 'M-Ticket'] }
    ],
    'Mumbai': [
        { id: 'm1', name: 'PVR: Juhu Cinema, Mumbai', rating: 4.6, features: ['M-Ticket', 'Food & Beverage'] },
        { id: 'm2', name: 'Inox: Insignia at Atria Mall', rating: 4.9, features: ['Luxurious', 'M-Ticket'] },
        { id: 'm3', name: 'Carnival: Imax Wadala', rating: 4.4, features: ['IMAX', 'Food Court'] }
    ],
    'Bengaluru': [
        { id: 'b1', name: 'PVR: Director\'s Cut, Forum Rex Walk', rating: 4.9, features: ['Premium', 'M-Ticket'] },
        { id: 'b2', name: 'Inox: Mantri Square, Malleshwaram', rating: 4.3, features: ['M-Ticket', 'Food & Beverage'] },
        { id: 'b3', name: 'Cinepolis: Meenakshi Mall', rating: 4.5, features: ['M-Ticket', 'Food & Beverage'] }
    ],
    'Delhi': [
        { id: 'd1', name: 'PVR: Priya, Vasant Vihar', rating: 4.7, features: ['M-Ticket', 'Premium Cinema'] },
        { id: 'd2', name: 'Delite Cinema: Asaf Ali Road', rating: 4.2, features: ['Large Screen', 'Single Screen'] }
    ]
};

const initialState = {
    items: MOCK_ITEMS,
    theatres: THEATRES_BY_CITY,
    selectedItem: null,
    searchQuery: '',
    location: 'Hyderabad',
    loading: false,
    error: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = MOCK_ITEMS.find(m => m.id === parseInt(action.payload)) || null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        }
    }
});

export const { setItems, setSelectedItem, setSearchQuery, setLocation } = movieSlice.actions;
export default movieSlice.reducer;
