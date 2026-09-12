import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const creatorId = "69e36c12-dd0f-4801-8e7b-023999bdff82";

const movies = [
    {
        title: "The Last Horizon",
        overview: "A stranded astronaut races against time to reconnect with Earth before a mysterious cosmic event.",
        release_year: 2024,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        runtime: 128,
        posterUrl: "https://example.com/posters/the-last-horizon.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Midnight Protocol",
        overview: "A cybersecurity analyst discovers a secret government program hidden inside a global network.",
        release_year: 2023,
        genres: ["Thriller", "Action"],
        runtime: 116,
        posterUrl: "https://example.com/posters/midnight-protocol.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Echoes of Summer",
        overview: "Two childhood friends reunite years later and confront the choices that changed their lives.",
        release_year: 2022,
        genres: ["Drama", "Romance"],
        runtime: 108,
        posterUrl: "https://example.com/posters/echoes-of-summer.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Shadow District",
        overview: "A detective investigates a series of disappearances connected to an abandoned neighborhood.",
        release_year: 2021,
        genres: ["Crime", "Mystery", "Thriller"],
        runtime: 124,
        posterUrl: "https://example.com/posters/shadow-district.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Code Zero",
        overview: "A brilliant programmer becomes the target of an international conspiracy after discovering a hidden algorithm.",
        release_year: 2025,
        genres: ["Action", "Thriller", "Technology"],
        runtime: 119,
        posterUrl: "https://example.com/posters/code-zero.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Beyond the Valley",
        overview: "A family travels across a remote mountain range searching for answers about their missing father.",
        release_year: 2020,
        genres: ["Adventure", "Drama"],
        runtime: 132,
        posterUrl: "https://example.com/posters/beyond-the-valley.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "The Forgotten Room",
        overview: "A young architect discovers a sealed room containing clues to a decades-old mystery.",
        release_year: 2019,
        genres: ["Mystery", "Horror", "Thriller"],
        runtime: 101,
        posterUrl: "https://example.com/posters/the-forgotten-room.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Neon Skies",
        overview: "In a futuristic city, a street racer becomes involved in a rebellion against an artificial intelligence regime.",
        release_year: 2026,
        genres: ["Sci-Fi", "Action"],
        runtime: 137,
        posterUrl: "https://example.com/posters/neon-skies.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Letters from Paris",
        overview: "A writer finds a collection of forgotten letters that reveals a long-lost love story.",
        release_year: 2018,
        genres: ["Romance", "Drama"],
        runtime: 112,
        posterUrl: "https://example.com/posters/letters-from-paris.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    },
    {
        title: "Final Countdown",
        overview: "A former military pilot has one night to prevent a catastrophic attack on a major city.",
        release_year: 2025,
        genres: ["Action", "Thriller"],
        runtime: 114,
        posterUrl: "https://example.com/posters/final-countdown.jpg",
        createdBy: "69e36c12-dd0f-4801-8e7b-023999bdff82"
    }
];

const main = async () => {
    console.log("in the main");
    for (const movie of movies ){
        await prisma.movie.create ({
            data: movie
        });
        console.log (`Created movie: ${movie.title}`);
        console.log("seeding completed");      
    };
    console.log("Seeding completed");
};
main().catch((err) => {
        console.error(err);
        process.exit(1);
    }).finally (async () => {
        await prisma.$disconnect();
    });
