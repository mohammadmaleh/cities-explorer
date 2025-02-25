# CityGuesserComponent Documentation

A component provides an interactive city guessing game to test the user's geography knowledge.

## Features

- **Clues Display:**  
  Shows clues including continent, population, founded year, and landmark details.

- **Interactive Options:**  
  Displays multiple choice options. After selecting an answer, the correct option is highlighted in green (if correct) or red (if incorrect).

- **Current Streak:**  
  Tracks and displays the current streak of correct answers.

## How It Works

- **Initial Question Loading:**  
  On initialization, the component requests a new city guessing question from the `CitiesStore`.

- **Conditional Rendering:**

  - If the question is loading, the `LoadingComponent` is displayed.
  - If an error occurs, the `ErrorFeedbackComponent` is rendered.
  - Otherwise, the clues and answer options are shown.

- **Answer Handling:**  
  When a user selects an option, the component:
  - Checks if the answer is correct.
  - Increments the streak if correct or resets it if incorrect.
  - Displays the correct answer for 1 second before loading a new question.
