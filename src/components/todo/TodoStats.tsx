import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, completed, pending }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{completed}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{pending}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoStats;