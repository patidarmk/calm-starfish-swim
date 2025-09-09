import React from 'react';
import { Trash2, Edit, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onCancel: () => void;
  editText: string;
  onEditTextChange: (text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancel,
  editText,
  onEditTextChange,
}) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 border rounded-lg">
        <input
          type="text"
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSave(id, editText);
            } else if (e.key === 'Escape') {
              onCancel();
            }
          }}
        />
        <Button size="sm" onClick={() => onSave(id, editText)}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
      />
      <span className={cn(
        "flex-1",
        completed && "line-through text-gray-500"
      )}>
        {text}
      </span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onEdit(id)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onDelete(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default TodoItem;