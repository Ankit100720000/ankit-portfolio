import { useEffect, useState } from 'react'

export function useTypewriter(words, speed = 85, pause = 1400) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words?.length) {
      return undefined
    }

    const currentWord = words[wordIndex % words.length]

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.slice(0, displayText.length + 1)
          setDisplayText(nextText)

          if (nextText === currentWord) {
            setIsDeleting(true)
          }
        } else {
          const nextText = currentWord.slice(0, Math.max(displayText.length - 1, 0))
          setDisplayText(nextText)

          if (nextText.length === 0) {
            setIsDeleting(false)
            setWordIndex((value) => (value + 1) % words.length)
          }
        }
      },
      isDeleting
        ? speed / 2
        : displayText === currentWord
          ? pause
          : speed,
    )

    return () => window.clearTimeout(timeout)
  }, [displayText, isDeleting, pause, speed, wordIndex, words])

  return displayText
}
