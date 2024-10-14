import { Test } from './types'

export const mockTest: Test = {
  id: 'test-1',
  title: 'Math Test',
  timeLimit: 15, // в минутах
  questions: [
    {
      id: 'q1',
      type: 'single',
      questionText: 'What is 2 + 2?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
    },
    {
      id: 'q2',
      type: 'multiple',
      questionText: 'Select prime numbers',
      options: ['2', '3', '4', '5'],
      correctAnswer: ['2', '3', '5'],
    },
    {
      id: 'q3',
      type: 'short',
      questionText: 'What is the square root of 16?',
    },
    {
      id: 'q4',
      type: 'long',
      questionText: 'Explain the theory of relativity.',
    },
  ],
}
