import React from 'react'
import Card from '@/components/Card'

export default function Main() {
  const [flippedCards, setFlippedCards] = React.useState([])
  const [isFinished, setIsFinished]     = React.useState(false)
  const [cards, setCards]               = React.useState([])
  const numbers                         = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // const numbers                         = [0, 1, 2, 3, 4]

  const shuffleCards = cards => {
    const cardWithProps = cards.map((card) => {
      return {
        value: card,
        opened: false
      }
    })
    const clonedCards   = [...cardWithProps, ...cardWithProps]
  
    for ( let index = clonedCards.length - 1; index > 0; index-- ) {
      const randomIndex         = Math.floor(Math.random() * (index + 1))
      const originalValue       = clonedCards[index]
  
      clonedCards[index]        = clonedCards[randomIndex]
      clonedCards[randomIndex]  = originalValue

    }
  
    return clonedCards;
  }

  const restart = () => {
    setIsFinished(false)
    setCards(shuffleCards(numbers))
  }

  const flipCard = index => {
    if ( !cards[index].opened && !flippedCards.includes(index) && flippedCards.length < 2 ) {
      console.log('test')
      setFlippedCards([...flippedCards, index])
    }
  }

  const endCheck = () => {
    if ( cards.length > 0 && cards.filter((card) => !card.opened).length <= 0 ) {
      setIsFinished(true)
    }
  }

  React.useEffect(() => {
    setCards(shuffleCards(numbers))
  }, [])

  React.useEffect(() => {
    if ( flippedCards.length >= 2 ) {
      if ( cards[flippedCards[0]].value === cards[flippedCards[1]].value ) {
        setCards(cards.map((card) => {
          if ( card.value === cards[flippedCards[0]].value ) {
            return {
              ...card,
              opened: true
            }
          } else {
            return card
          }
        }))
      }
      setTimeout(() => {
        setFlippedCards([])
      }, 1000);
    }
  }, [flippedCards])

  React.useEffect(() => {
    endCheck()
  }, [cards])

  return (
    <div className='container flex flex-col gap-4 justify-center w-full h-screen items-center mx-auto'>
      <div className='text-center'>
        <h1 className='text-4xl'>Matching Number</h1>
        <h2>Kalbe Frontend Developer Coding Test</h2>
      </div>

      <div className='relative grid grid-cols-5 gap-3 w-full max-w-[600px] justify-center'>
        { cards.map((card, index) => (
          <Card key={index} onClick={() => flipCard(index)} flipped={flippedCards.includes(index)} opened={card.opened}>
            { card.value }
          </Card>
        )) }
        { (isFinished) && (
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            <div className='text-center bg-white text-neutral-700 px-8 py-4 flex flex-col gap-4 rounded'>
              <h5 className='text-xl'>Selamat, Anda berhasil menyelesaikan permainan!</h5>
              <div>
                <button onClick={() => restart()} className='py-4 px-8 bg-blue-500 text-white text-sm uppercase rounded'>Mulai Lagi</button>
              </div>
            </div>
          </div>
        ) }
      </div>

      <div className='text-sm opacity-70'>
        <b>Deo Aqli Rayyan</b> &copy; 2024. All Rights Reserved
      </div>
    </div>
  )
}