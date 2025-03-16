import React from 'react';

const Result = ({ userAnswers, quizData }) => {
  const score = Object.keys(userAnswers).reduce((total, key) => {
    if (userAnswers[key] === quizData[key].answer) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div>
      <h2>Your Score: {score} / {quizData.length}</h2>
      <ul>
        {quizData.map((q, index) => (
          <li key={index}>
            {q.question} - Correct Answer: {q.answer}, Your Answer: {userAnswers[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;