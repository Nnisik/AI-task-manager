# AI-task-manager
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)</br>
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

This is a full-stack to-do list application designed to enhance task management with AI-driven features. Built using HTML, CSS and JavaScript for frontend and Flask, SQLAlchemy, and Flask-RESTful on project's server side. It allows users to create, update, delete, and retrieve tasks.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Future Improvements](#future-improvements)
- [Known Issues](#known-issues)

## Features
- Clean and responsive design
- User-friendly layout
- Attractive auction item display
- Simple navigation
- Smart Task Categorization
- Priority Prediction
- Database Integration
- Intuitive User Interface

## Technologies Used
- HTML
- CSS
- JavaScript
- Python
- Flask

## Getting Started

To get a local copy of this project up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   https://github.com/Nnisik/AI-task-manager
2. **Navigate to the project directory:**
   ```bash
   cd AI-task-manager
3. **Navigate to server folder:**
   ```bash
   cd server
4. **Create a database instance:**
   ```bash
   python3 setup_db.py
5. **Run flask server** using following command
   ```bash
   python3 app.py
6. **Run index.html file** in local browser

### Currently work on
* integrate AI modules
  * smart task organizing using NPL
    * require testing
  * priority prediction based on task description
    * require testing
    * include machine learning
* do a UPDATE and DELETE requests
  
### Future Improvements
* client folder
  * rework index page layout
    * add group and priority displaying on task
    * restructure layout to add new buttons
  * sort buttons
    * sort by groups
    * sort by priority
* setup WebPack
* setup Docker
* testing
* Redis
* Microesrvices
* 

### Known Issues
* when creating tasks, its date value sets as 'null'
