import React from 'react'
import './App.css'
import TestForm from './components/TestForm'
import { mockTest } from './mockTest'

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>School Testing System</h1>
      <TestForm test={mockTest} />
    </div>
  )
}

export default App
