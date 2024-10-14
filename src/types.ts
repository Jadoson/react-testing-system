export type Question = {
  id: string
  type: 'single' | 'multiple' | 'short' | 'long'
  questionText: string
  options?: string[] // только для "single" и "multiple"
  correctAnswer?: string | string[] // корректные ответы
}

export type Test = {
  id: string
  title: string
  timeLimit: number // время в минутах
  questions: Question[]
}
