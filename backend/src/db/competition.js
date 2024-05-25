const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database('competition.db');

//create table
// const query=`
// CREATE TABLE Competition (
//     competition_id TEXT PRIMARY KEY,
//     title TEXT,
//     startDate TEXT,
//     endDate TEXT,
//     hompage TEXT,
//     poster BLOB,
//     context TEXT,
//     tags TEXT -- SQLite does not have an array type, so you may need to handle this differently
// );

// CREATE TABLE ContactPerson (
//     competition_id TEXT,
//     company TEXT,
//     name TEXT,
//     email TEXT,
//     FOREIGN KEY (competition_id) REFERENCES Competition (competition_id)
// );

// CREATE TABLE RecruitBoard (
//     post_id TEXT PRIMARY KEY,
//     competition_id TEXT,
//     title TEXT,
//     password TEXT,
//     context TEXT,
//     registerDate TEXT,
//     FOREIGN KEY (competition_id) REFERENCES Competition (competition_id)
// );

// CREATE TABLE Comment (
//     comment_id TEXT PRIMARY KEY,
//     post_id TEXT,
//     name TEXT,
//     registerDate TEXT,
//     comment TEXT,
//     FOREIGN KEY (post_id) REFERENCES RecruitBoard (post_id)
// );
// `

// db.exec(query);
const query = `DELETE FROM ContactPerson;`
const sites = db.prepare(query);
console.log(sites);

db.close();