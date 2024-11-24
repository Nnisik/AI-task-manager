# AI-task-manager
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)</br>
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

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
3. ...

### Currently work on
* client folder
  * setup WebPack
* server folder
  * API for data manipulation
  * changes to data storage
    * move to PostgreSQL from SQLite for data storage
    * modify task fields
      * remove "completed" field 
      * change the way info in "data_created" is stored
      * add grouping option
      * add status field

### Future Improvements
* integrate AI model, suggesting tasks
* setup Docker
* error handling
* testing

### Known Issues
* implement form validation for creating new task: currently allows to add empty task
