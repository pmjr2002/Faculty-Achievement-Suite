'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging) {
    this.courses = seedData.courses;
    this.papers = seedData.papers;
    this.users = seedData.users;
    this.enableLogging = enableLogging;
    this.context = new Context('fsjstd-restapi.db', enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context
      .retrieveValue(`
        SELECT EXISTS (
          SELECT 1 
          FROM sqlite_master 
          WHERE type = 'table' AND name = ?
        );
      `, tableName);
  }

  createUser(user) {
    return this.context
      .execute(`
        INSERT INTO Users
          (firstName, lastName, emailAddress, password, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.password);
  }

  createCourse(course) {
    return this.context
      .execute(`
        INSERT INTO Courses
          (userId, title, description, estimatedTime, materialsNeeded, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      course.userId,
      course.title,
      course.description,
      course.estimatedTime,
      course.materialsNeeded);
  }

  createPaper(paper) {
    return this.context
      .execute(`
        INSERT INTO Papers
          (userId, title, description, authors, conference, date, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      paper.userId,
      paper.title,
      paper.description,
      paper.authors,
      paper.conference,
      paper.date);
  }

  createPatent(patent) {
    return this.context
      .execute(`
        INSERT INTO Patents
          (userId, title, description, inventors, country, date, patentNumber, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      paper.userId,
      paper.title,
      paper.description,
      paper.inventors,
      paper.country,
      paper.date,
      paper.patentNumber);
  }

  async hashUserPasswords(users) {
    const usersWithHashedPasswords = [];

    for (const user of users) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      usersWithHashedPasswords.push({ ...user, password: hashedPassword });
    }

    return usersWithHashedPasswords;
  }

  async createUsers(users) {
    for (const user of users) {
      await this.createUser(user);
    }
  }

  async createCourses(courses) {
    for (const course of courses) {
      await this.createCourse(course);
    }
  }

  async createPapers(papers) {
    for (const paper of papers) {
      await this.createPaper(paper);
    }
  }

  async createPatents(patents) {
    for (const patent of patents) {
      await this.createPaper(patent);
    }
  }

  async init() {
    const userTableExists = await this.tableExists('Users');

    if (userTableExists) {
      this.log('Dropping the Users table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Users;
      `);
    }

    this.log('Creating the Users table...');

    await this.context.execute(`
      CREATE TABLE Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firstName VARCHAR(255) NOT NULL DEFAULT '', 
        lastName VARCHAR(255) NOT NULL DEFAULT '', 
        emailAddress VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
        password VARCHAR(255) NOT NULL DEFAULT '', 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL
      );
    `);

    this.log('Hashing the user passwords...');

    const users = await this.hashUserPasswords(this.users);

    this.log('Creating the user records...');

    await this.createUsers(users);

    const courseTableExists = await this.tableExists('Courses');

    if (courseTableExists) {
      this.log('Dropping the Courses table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Courses;
      `);
    }

    this.log('Creating the Courses table...');

    await this.context.execute(`
      CREATE TABLE Courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        estimatedTime VARCHAR(255), 
        materialsNeeded VARCHAR(255), 
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the course records...');

    await this.createCourses(this.courses);
    
    //kxjehn

    const paperTableExists = await this.tableExists('Papers');

    if (paperTableExists) {
      this.log('Dropping the Papers table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Papers;
      `);
    }

    this.log('Creating the Papers table...');

    await this.context.execute(`
      CREATE TABLE Papers (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        authors VARCHAR(255), 
        conference VARCHAR(255),
        date DATETIME,
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the paper records...');

    await this.createPapers(this.papers);


    const patentTableExists = await this.tableExists('Patents');

    if (patentTableExists) {
      this.log('Dropping the Patents table...');

      await this.context.execute(`
        DROP TABLE IF EXISTS Patents;
      `);
    }

    this.log('Creating the Patents table...');

    await this.context.execute(`
      CREATE TABLE Patents (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255) NOT NULL DEFAULT '', 
        description TEXT NOT NULL DEFAULT '', 
        inventors VARCHAR(255), 
        country VARCHAR(255),
        date DATETIME,
        patentNumber VARCHAR(255),
        createdAt DATETIME NOT NULL, 
        updatedAt DATETIME NOT NULL, 
        userId INTEGER NOT NULL DEFAULT -1 
          REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.log('Creating the patent records...');

    await this.createPatents(this.patents);


    this.log('Database successfully initialized!');
  }
}

module.exports = Database;
