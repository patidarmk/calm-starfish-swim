import React from 'react';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          variant={currentFilter === value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilter;