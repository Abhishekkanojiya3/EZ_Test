import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Card {
  id: string
  title: string
  columnId: string
}

export interface Column {
  id: string
  title: string
}

export interface BoardState {
  columns: Column[]
  cards: Card[]
}

interface BoardContextType {
  state: BoardState
  addCard: (columnId: string, title: string) => void
  deleteCard: (cardId: string) => void
  updateCardTitle: (cardId: string, title: string) => void
  moveCard: (cardId: string, toColumnId: string, toIndex?: number) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BoardState>({
    columns: [
      { id: 'todo', title: 'Todo' },
      { id: 'in-progress', title: 'In Progress' },
      { id: 'done', title: 'Done' }
    ],
    cards: [
      { id: '1', title: 'Design homepage', columnId: 'todo' },
      { id: '2', title: 'Setup database', columnId: 'todo' },
      { id: '3', title: 'Implement auth', columnId: 'in-progress' },
      { id: '4', title: 'Create API endpoints', columnId: 'in-progress' },
      { id: '5', title: 'Write tests', columnId: 'done' }
    ]
  })

  const addCard = (columnId: string, title: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      title,
      columnId
    }
    setState(prev => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }))
  }

  const deleteCard = (cardId: string) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== cardId)
    }))
  }

  const updateCardTitle = (cardId: string, title: string) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId ? { ...card, title } : card
      )
    }))
  }

  const moveCard = (cardId: string, toColumnId: string, toIndex?: number) => {
    setState(prev => {
      const cards = [...prev.cards]
      const cardIndex = cards.findIndex(c => c.id === cardId)
      if (cardIndex === -1) return prev

      cards[cardIndex] = { ...cards[cardIndex], columnId: toColumnId }
      return { ...prev, cards }
    })
  }

  return (
    <BoardContext.Provider value={{ state, addCard, deleteCard, updateCardTitle, moveCard }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider')
  }
  return context
}
