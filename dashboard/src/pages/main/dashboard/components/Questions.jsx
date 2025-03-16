import React, { useState } from 'react';

const Question = ({ questionData, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswerSubmit(selectedOption);
    }
  };

  return (
    <div>
      <p>{questionData.question}</p>
      <div>
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            style={{ margin: '5px', padding: '10px', backgroundColor: selectedOption === option ? 'lightgreen' : 'white' }}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Question;