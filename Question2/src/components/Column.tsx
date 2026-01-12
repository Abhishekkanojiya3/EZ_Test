import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import Card from './Card'
import '../styles/Column.css'

interface ColumnProps {
  id: string
  title: string
  cards: Array<{ id: string; title: string }>
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, columnId: string) => void
  onDragStart: (e: React.DragEvent, cardId: string) => void
  onDeleteCard: (cardId: string) => void
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  cards,
  onDragOver,
  onDrop,
  onDragStart,
  onDeleteCard
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const { addCard } = useBoard()

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(id, newCardTitle.trim())
      setNewCardTitle('')
      setIsAdding(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCard()
    } else if (e.key === 'Escape') {
      setNewCardTitle('')
      setIsAdding(false)
    }
  }

  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{cards.length}</span>
      </div>

      <div className="cards-container">
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            onDragStart={onDragStart}
            onDelete={onDeleteCard}
          />
        ))}
      </div>

      <div className="column-footer">
        {isAdding ? (
          <div className="add-card-form">
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onBlur={handleAddCard}
              onKeyDown={handleKeyDown}
              placeholder="Enter card title..."
              autoFocus
              className="add-card-input"
            />
          </div>
        ) : (
          <button
            className="add-card-btn"
            onClick={() => setIsAdding(true)}
          >
            + Add Card
          </button>
        )}
      </div>
    </div>
  )
}

export default Column
