import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { sendTicketData } from '../utils/api';
import { TicketResponse } from './TicketResponse';

interface TicketData {
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  type: 'Bug' | 'Feature' | 'Task';
  estimatedTime: string;
}

export default function TicketForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [ticketResponse, setTicketResponse] = useState(null);
  const [formData, setFormData] = useState<TicketData>({
    title: '',
    priority: 'Medium',
    type: 'Task',
    estimatedTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setTicketResponse(null);

    try {
      const result = await sendTicketData(formData);
      
      if (result) {
        setTicketResponse(result.url);
        setFormData({
          title: '',
          priority: 'Medium',
          type: 'Task',
          estimatedTime: '',
        });
      } else {
        setMessage(`Failed to create ticket. Status: ${result.status} - ${result.statusText}`);
      }
    } catch (error) {
      setMessage('Error creating ticket. Please check your connection.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TicketData['type'] })}
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Task">Task</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketData['priority'] })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">
              Estimated Time (hours)
            </label>
            <input
              type="number"
              id="estimatedTime"
              min="0"
              step="0.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.estimatedTime}
              onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
            />
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('Error') || message.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            'Creating ticket...'
          ) : (
            <>
              <Send className="w-4 h-4" />
              Create Ticket
            </>
          )}
        </button>
      </form>

      {ticketResponse && <TicketResponse ticketData={ticketResponse} />}
    </div>
  );
}