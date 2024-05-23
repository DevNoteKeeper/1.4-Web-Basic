const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database('algorithm.db');

//create table
// const query=`
//     CREATE TABLE algorithmSite(
//         site_id INTEGER PRIMARY KEY,
//         name TEXT NOT NULL,
//         description TEXT NOT NULL,
//         homepage TEXT NOT NULL,
//         logo BLOB NOT NULL
//     );
// `
// db.exec(query);

// //db insert
const data =[
    {   
        name: "HackerRank",
        description: "This is one of the most popular coding practice website. This is a nice platform for everyone, especially beginners.",
        homepage:"https://www.hackerrank.com/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/hackerrank_logo.png')
    },
    {   
        name: "Codeforces",
        description: "Codeforces is one of the most used and well-known coding challenge and practice websites in the world, and it is sponsored by Telegram.",
        homepage:"https://codeforces.com/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/codeforces_logo.png')
    },
    {   
        name: "LeetCode",
        description: "If you are familiar with the FAANG (Facebook, Apple, Amazon, Netflix, Google) buzzword, then you should definitely know about this website!",
        homepage:"https://leetcode.com/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/leetcode_logo.png')
    },
    {   
        name: "Kaggle",
        description: "I was pretty confused before writing this section, as Kaggle is not a typical website for coding practice. This website is basically for Data Science, and it's one of the most popular websites out there for this.",
        homepage:"https://www.kaggle.com/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/kaggle_logo.png')
    },
    {   
        name: "CodinGame",
        description: "CodinGame is a challenge-based training platform for programmers where you can play with the hottest programming topics.",
        homepage:"https://www.codingame.com/start/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/codingame_logo.png')
    },
    {   
        name: "Baekjoon",
        description: "Baekjoon Online Judge. This is a place where you can solve programming problems and get graded online.",
        homepage:"https://www.acmicpc.net/",
        logo: path.join(__dirname, '../../static/images/algorithm_logo/baekjoon_logo.png')
    }
];

const insertData = db.prepare("INSERT INTO algorithmSite (name, description, homepage, logo) VALUES (?, ?, ?, ?)");

data.forEach(site => {
    try{
        const logoBuffer = fs.readFileSync(site.logo);
        insertData.run(site.name, site.description, site.homepage, logoBuffer);
    }catch(err){
        console.error(`Error inserting site ${site.name}: ${err.message}`);
    }
});

const query = 'SELECT * FROM algorithmSite';
const sites = db.prepare(query).all();
console.log(sites);

db.close();