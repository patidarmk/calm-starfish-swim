import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';
import TodoFilter from './TodoFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const { toast } = useToast();

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo]);
    toast({
      title: "Todo added",
      description: `"${text}" has been added to your list.`,
    });
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    if (todo) {
      toast({
        title: "Todo deleted",
        description: `"${todo.text}" has been removed.`,
        variant: "destructive",
      });
    }
  }

  const startEdit = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      setEditingId(id);
      setEditText(todo.text);
    }
  }

  const saveEdit = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      ));
      setEditingId(null);
      setEditText('');
      toast({
        title: "Todo updated",
        description: "Your changes have been saved.",
      });
    }
  }

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  }

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    setTodos(todos.filter(todo => !todo.completed));
    toast({
      title: "Completed todos cleared",
      description: `${completedCount} completed ${completedCount === 1 ? 'todo' : 'todos'} removed.`,
    });
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm onAdd={addTodo} />
          <TodoStats total={total} completed={completed} pending={pending} />
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {filter === 'all' ? 'No todos yet. Add one above!' : 
               filter === 'active' ? 'No active todos.' : 'No completed todos.'}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  isEditing={editingId === todo.id}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={startEdit}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                  editText={editText}
                  onEditTextChange={setEditText}
                />
              ))}
            </div>
          )}
          
          {completed > 0 && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCompleted}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Completed ({completed})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoList;