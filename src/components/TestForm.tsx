import React, { useState, useEffect, useCallback } from 'react'
import { Formik, Field, Form } from 'formik'
import { Button } from '@material-ui/core'
import { Test, Question } from '../types'
import { useTimer } from '../hooks/useTimer'

// Компонент для рендера каждого вопроса в зависимости от его типа
const QuestionStep = ({ question }: { question: Question }) => {
  return (
    <div>
      <h3>{question.questionText}</h3>
      {question.type === 'single' && (
        <div>
          {question.options?.map((option, index) => (
            <label key={index}>
              <Field type='radio' name='answer' value={option} />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === 'multiple' && (
        <div>
          {question.options?.map((option, index) => (
            <label key={index}>
              <Field type='checkbox' name='answers' value={option} />
              {option}
            </label>
          ))}
        </div>
      )}
      {question.type === 'short' && (
        <Field type='text' name='answer' placeholder='Your answer' />
      )}
      {question.type === 'long' && (
        <Field as='textarea' name='answer' placeholder='Your detailed answer' />
      )}
    </div>
  )
}

// Функции для сохранения и загрузки прогресса
const saveProgress = (currentStep: number, answers: any) => {
  localStorage.setItem('testProgress', JSON.stringify({ currentStep, answers }))
}

const loadProgress = () => {
  const savedProgress = localStorage.getItem('testProgress')
  return savedProgress ? JSON.parse(savedProgress) : null
}

type Props = {
  test: Test
}

const TestForm: React.FC<Props> = ({ test }) => {
  // Загрузка прогресса или инициализация с нуля
  const savedProgress = loadProgress()
  const [currentStep, setCurrentStep] = useState(
    savedProgress?.currentStep || 0
  )
  const [answers, setAnswers] = useState(savedProgress?.answers || {})

  // Получение текущего вопроса
  const currentQuestion = test.questions[currentStep]

  // Таймер, отсчитывающий время в секундах
  const timeRemaining = useTimer(test.timeLimit * 60) // перевод минут в секунды

  // Обработка истечения времени
  useEffect(() => {
    if (timeRemaining === 0) {
      alert('Time is up!')
      // Действия при завершении времени
      handleSubmit(answers)
    }
  }, [timeRemaining])

  const nextStep = () => {
    setCurrentStep((prev: number) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev: number) => prev - 1)
  }

  const handleSubmit = (values: any) => {
    // Сохранение текущих ответов в стейт
    const updatedAnswers = { ...answers, [currentStep]: values }
    setAnswers(updatedAnswers)

    // Сохранение прогресса в localStorage
    saveProgress(currentStep, updatedAnswers)

    if (currentStep < test.questions.length - 1) {
      nextStep()
    } else {
      // Завершение теста
      alert('Test finished!')
      console.log('Final answers:', updatedAnswers)
      localStorage.removeItem('testProgress') // Очистка прогресса после завершения
    }
  }

  return (
    <div>
      <h2>
        Time remaining: {Math.floor(timeRemaining / 60)}:
        {('0' + (timeRemaining % 60)).slice(-2)}
      </h2>
      <Formik
        initialValues={answers[currentStep] || { answer: '', answers: [] }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <QuestionStep question={currentQuestion} />
            <div>
              {currentStep > 0 && <Button onClick={prevStep}>Back</Button>}
              <Button type='submit'>
                {currentStep < test.questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TestForm
