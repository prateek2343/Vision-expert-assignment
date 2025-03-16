// import React, { useState } from "react";
// import SentenceBox from "./components/SentenceBox";
// import AnswerBox from "./components/AnswerBox";
// import Results from "./components/Results";
// import Card from '@/components/ui/Card';
// import Icon from "@/components/ui/Icon";
// import { getSentence, getAnswers } from "./components/TextConverted";

// const textList = [
//   "The <brown> fox <jumped> over the <dog>",
//   "The <quick> brown fox <jumps> over the <lazy> dog",
//   "In the <morning>, the <sun> rises <above> the <mountains>",
//   "She <bought> a <new> car <yesterday>",
//   "The <elephant> is the <largest> land animal <on> Earth",
//   "A <group> of <birds> is called a <flock>",
//   "I <traveled> to <France> during the <summer>",
//   "The <stars> shine <brightly> in the <night> sky",
//   "He <likes> to <read> books <on> history",
//   "They <played> <football> in the <afternoon>."
// ];

// export default function Quiz() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showResults, setShowResults] = useState(false);
//   const [questions, setQuestions] = useState(
//     textList.map(text => ({
//       sentence: getSentence(text),
//       answers: getAnswers(text)
//     }))
//   );

//   const onDrop = (e, dropId) => {
//     const text = e.dataTransfer.getData("text/plain");
//     const sentence = questions[currentQuestion].sentence.map(word => {
//       if (word.id === dropId) {
//         return { ...word, placed: true, displayed: text };
//       }
//       return word;
//     });

//     const updatedQuestions = [...questions];
//     updatedQuestions[currentQuestion].sentence = sentence;
//     setQuestions(updatedQuestions);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const gotoPage = (pageIndex) => {
//     setCurrentQuestion(pageIndex);
//   };

//   return (
//     <Card>
//       <h2 className="header text-center mb-3">Quiz</h2>
//       {!showResults ? (
//         <>
//           <SentenceBox
//             marked={false}
//             onDrop={onDrop}
//             sentence={questions[currentQuestion].sentence}
//           />
//           <AnswerBox answers={questions[currentQuestion].answers} />
//           <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//             <ul className="flex items-center space-x-3 rtl:space-x-reverse">
//               <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   className={`${currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
//                   onClick={prevQuestion}
//                   disabled={currentQuestion === 0}
//                 >
//                   <Icon icon="heroicons-outline:chevron-left" />
//                 </button>
//               </li>
//               {questions.map((_, pageIdx) => (
//                 <li key={pageIdx}>
//                   <button
//                     className={`text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150 ${pageIdx === currentQuestion
//                         ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
//                         : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
//                       }`}
//                     onClick={() => gotoPage(pageIdx)}
//                   >
//                     {pageIdx + 1}
//                   </button>
//                 </li>
//               ))}
//               <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                 <button
//                   className={`${currentQuestion === questions.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//                   onClick={nextQuestion}
//                   disabled={currentQuestion === questions.length - 1}
//                 >
//                    <Icon icon="heroicons-outline:chevron-right" />
//                 </button>
//               </li>
//             </ul>
//             <div className="flex items-center space-x-3 rtl:space-x-reverse">
//               <span className="flex space-x-2 rtl:space-x-reverse items-center">
//                 <span>
//                 </span>
//               </span>
//               <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
//                 Page {currentQuestion + 1} of {questions.length}
//               </span>
//             </div>
//           </div>
//         </>
//       ) : (
//         <Results data={questions} />
//       )}
//     </Card>
//   );
// }




import React, { useState } from "react";
import SentenceBox from "./components/SentenceBox";
import AnswerBox from "./components/AnswerBox";
import Results from "./components/Results";
import Card from '@/components/ui/Card';
import Icon from "@/components/ui/Icon";
import { getSentence, getAnswers } from "./components/TextConverted";

const textList = [
  "The <brown> fox <jumped> over the <dog>",
  "The <quick> brown fox <jumps> over the <lazy> dog",
  "In the <morning>, the <sun> rises <above> the <mountains>",
  "She <bought> a <new> car <yesterday>",
  "The <elephant> is the <largest> land animal <on> Earth",
  "A <group> of <birds> is called a <flock>",
  "I <traveled> to <France> during the <summer>",
  "The <stars> shine <brightly> in the <night> sky",
  "He <likes> to <read> books <on> history",
  "They <played> <football> in the <afternoon>."
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState(
    textList.map(text => ({
      sentence: getSentence(text),
      answers: getAnswers(text)
    }))
  );
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const onDrop = (e, dropId) => {
    const text = e.dataTransfer.getData("text/plain");
    const sentence = questions[currentQuestion].sentence.map(word => {
      if (word.id === dropId) {
        return { ...word, placed: true, displayed: text };
      }
      return word;
    });

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].sentence = sentence;
    setQuestions(updatedQuestions);
  };

  const checkCorrectAnswers = () => {
    let totalCorrect = 0;
    questions.forEach(question => {
      question.sentence.forEach(word => {
        if (word.type === "answer" && word.displayed === word.text) {
          totalCorrect++;
        }
      });
    });
    setCorrectAnswersCount(totalCorrect);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setQuestions(
      textList.map(text => ({
        sentence: getSentence(text),
        answers: getAnswers(text)
      }))
    );
    setCorrectAnswersCount(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      checkCorrectAnswers(); // Trigger final submit and score calculation
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const gotoPage = (pageIndex) => {
    setCurrentQuestion(pageIndex);
  };

  return (
    <Card>
      <h2 className="header text-center mb-3">Quiz</h2>
      {!showResults ? (
        <>
          <SentenceBox
            marked={false}
            onDrop={onDrop}
            sentence={questions[currentQuestion].sentence}
          />
          <AnswerBox answers={questions[currentQuestion].answers} />
          {currentQuestion === questions.length - 1 && (
            <div className="flex justify-center mt-4">
              <button onClick={checkCorrectAnswers} className="btn btn-primary">Submit</button>
            </div>
          )}
          <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
            <ul className="flex items-center space-x-3 rtl:space-x-reverse">
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={`${currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <Icon icon="heroicons-outline:chevron-left" />
                </button>
              </li>
              {questions.map((_, pageIdx) => (
                <li key={pageIdx}>
                  <button
                    className={`text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150 ${pageIdx === currentQuestion
                      ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                      }`}
                    onClick={() => gotoPage(pageIdx)}
                  >
                    {pageIdx + 1}
                  </button>
                </li>
              ))}
              <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={`${currentQuestion === questions.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  <Icon icon="heroicons-outline:chevron-right" />
                </button>
              </li>
            </ul>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Page {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Results data={questions} />
          <h3 className="text-center">You got {correctAnswersCount} correct!</h3>
          <div className="flex justify-center mt-4">
            <button onClick={resetQuiz} className="btn btn-secondary">Reset Quiz</button>
          </div>
        </div>
      )}
    </Card>
  );
}
