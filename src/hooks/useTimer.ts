import { useState, useEffect } from 'react'

export const useTimer = (initialTime: number) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    if (timeRemaining === 0) {
      clearInterval(timer)
    }

    return () => clearInterval(timer)
  }, [timeRemaining])

  return timeRemaining
}
