import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import Column from './Column'
import '../styles/KanbanBoard.css'

const KanbanBoard: React.FC = () => {
  const { state, moveCard, deleteCard } = useBoard()
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCardId(cardId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    if (draggedCardId) {
      moveCard(draggedCardId, columnId)
      setDraggedCardId(null)
    }
  }

  const handleDeleteCard = (cardId: string) => {
    deleteCard(cardId)
  }

  return (
    <div className="kanban-board-wrapper">
      <div className="kanban-header">
        <h1>Kanban Board</h1>
      </div>
      <div className="kanban-board">
        {state.columns.map(column => {
          const columnCards = state.cards.filter(card => card.columnId === column.id)
          return (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={columnCards}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDeleteCard={handleDeleteCard}
            />
          )
        })}
      </div>
    </div>
  )
}

export default KanbanBoard
