import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import '../styles/Card.css'

interface CardProps {
  id: string
  title: string
  onDragStart: (e: React.DragEvent, cardId: string) => void
  onDelete: (cardId: string) => void
}

const Card: React.FC<CardProps> = ({ id, title, onDragStart, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(title)
  const { updateCardTitle } = useBoard()

  const handleSaveEdit = () => {
    if (editText.trim()) {
      updateCardTitle(id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      setEditText(title)
      setIsEditing(false)
    }
  }

  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, id)}
    >
      {isEditing ? (
        <div className="card-edit">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            className="card-edit-input"
          />
        </div>
      ) : (
        <div className="card-content">
          <p className="card-title" onClick={() => setIsEditing(true)}>
            {title}
          </p>
          <button
            className="card-delete-btn"
            onClick={() => onDelete(id)}
            title="Delete card"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}

export default Card
