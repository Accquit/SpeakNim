import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import ProgressBar from '../components/ProgressBar';

interface Question {
  id: number;
  type: 'multiple-choice' | 'fill-in-blank' | 'matching';
  question: string;
  options?: string[];
  matches?: { left: string; right: string }[];
  correctAnswer: string | string[];
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is the correct romanization for ㄱ?',
    options: ['g/k', 'n', 'd/t', 'r/l'],
    correctAnswer: 'g/k',
  },
  {
    id: 2,
    type: 'fill-in-blank',
    question: 'The Korean letter ㅏ is pronounced as "_"',
    correctAnswer: 'a',
  },
  {
    id: 3,
    type: 'matching',
    question: 'Match the Korean letters with their sounds',
    matches: [
      { left: 'ㄴ', right: 'n' },
      { left: 'ㅁ', right: 'm' },
      { left: 'ㄹ', right: 'r/l' },
    ],
    correctAnswer: ['n', 'm', 'r/l'],
  },
  {
    id: 4,
    type: 'multiple-choice',
    question:
      'Which of the following Hangul characters represents the sound /n/?',
    options: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
    correctAnswer: 'ㄴ',
  },
  {
    id: 5,
    type: 'fill-in-blank',
    question:
      'The romanization of ㄷ can be either "_" or "t" at the end of a syllable.',
    correctAnswer: 'd',
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: 'What is the IPA symbol for the vowel ㅗ?',
    options: ['[a]', '[o]', '[u]', '[i]'],
    correctAnswer: '[o]',
  },
  {
    id: 7,
    type: 'fill-in-blank',
    question: 'The Hangul character for the sound /m/ is "_".',
    correctAnswer: 'ㅁ',
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: 'Which of these is a vowel?',
    options: ['ㅂ', 'ㅈ', 'ㅏ', 'ㅅ'],
    correctAnswer: 'ㅏ',
  },
  {
    id: 9,
    type: 'fill-in-blank',
    question: 'The double consonant ㅆ is romanized as "_".',
    correctAnswer: 'ss',
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: 'What is the correct romanization for ㅋ?',
    options: ['g/k', 'k', 'kh', 'kk'],
    correctAnswer: 'k',
  },
  {
    id: 11,
    type: 'fill-in-blank',
    question:
      'The aspirated consonant ㅊ is pronounced with a strong "_" sound.',
    correctAnswer: 'h',
  },
  {
    id: 12,
    type: 'multiple-choice',
    question:
      'Which Hangul character represents the final consonant sound /ŋ/?',
    options: ['ㅇ', 'ㄴ', 'ㅁ', 'ㄹ'],
    correctAnswer: 'ㅇ',
  },
  {
    id: 13,
    type: 'fill-in-blank',
    question: 'The vowel ㅜ is romanized as "_".',
    correctAnswer: 'u',
  },
  {
    id: 14,
    type: 'multiple-choice',
    question: 'What is the correct romanization for ㅃ?',
    options: ['b/p', 'p', 'pp', 'bp'],
    correctAnswer: 'pp',
  },
  {
    id: 15,
    type: 'fill-in-blank',
    question: 'The Hangul character for the vowel /i/ is "_".',
    correctAnswer: 'ㅣ',
  },
];

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    const question = questions[currentQuestion];
    let correct = false;

    if (Array.isArray(question.correctAnswer)) {
      correct = answer === question.correctAnswer.join(',');
    } else {
      correct = question.correctAnswer === answer;
    }

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setAnswer('');
    setShowFeedback(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Practice Quiz</h2>
            <span className="text-lg font-medium text-indigo-600">
              Score: {score}/{questions.length}
            </span>
          </div>

          <ProgressBar value={currentQuestion + 1} max={questions.length} />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <p className="text-xl text-gray-700 mb-6">
            {questions[currentQuestion].question}
          </p>

          {questions[currentQuestion].type === 'multiple-choice' && (
            <div className="space-y-4">
              {questions[currentQuestion].options?.map((option) => (
                <button
                  key={option}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    answer === option
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                  onClick={() => setAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {questions[currentQuestion].type === 'fill-in-blank' && (
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
            />
          )}

          {questions[currentQuestion].type === 'matching' && (
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].matches?.map((match, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 h-20 flex items-center justify-center text-3xl font-bold bg-indigo-100 rounded-lg">
                    {match.left}
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter matching sound"
                    onChange={(e) => {
                      const answers = answer.split(',');
                      answers[index] = e.target.value;
                      setAnswer(answers.join(','));
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again!'}
          </motion.div>
        )}

        <div className="flex justify-end space-x-4">
          {!showFeedback ? (
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={handleAnswer}
            >
              Check Answer
            </button>
          ) : (
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;
