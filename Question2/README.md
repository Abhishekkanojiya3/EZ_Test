# Kanban Board Component

A fully functional Kanban board application built with React and TypeScript, featuring drag-and-drop card management across multiple columns.

## Features

✅ **Three Default Columns**: Todo, In Progress, and Done
✅ **Add/Delete Cards**: Easily create new cards or remove existing ones
✅ **Drag & Drop**: Move cards between columns with native HTML5 drag-and-drop
✅ **Inline Editing**: Click on any card title to edit it directly
✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile screens
✅ **Clean Architecture**: Reusable components with proper separation of concerns
✅ **State Management**: Context API for global board state management

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx      # Main board component
│   ├── Column.tsx           # Column component with add card functionality
│   └── Card.tsx             # Individual card component with edit capability
├── context/
│   └── BoardContext.tsx     # State management using React Context
├── styles/
│   ├── KanbanBoard.css      # Board layout styles
│   ├── Column.css           # Column styles
│   ├── Card.css             # Card styles
│   └── index.css            # Global styles
├── main.tsx                 # App entry point
└── index.css                # Root styles
```

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Usage

### Adding Cards
- Click the "+ Add Card" button at the bottom of any column
- Enter the card title and press Enter or click outside to save

### Moving Cards
- Click and drag any card to move it to another column
- Drop it in the desired column

### Editing Card Titles
- Click on any card title to enter edit mode
- Press Enter to save or Escape to cancel
- The card must have at least one character

### Deleting Cards
- Click the "×" button on the top-right of any card to delete it

