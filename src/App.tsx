import React from 'react';
import { Ticket } from 'lucide-react';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Ticket className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">JIRA Ticket Generator</h1>
          <p className="text-lg text-gray-600">
            Generate detailed JIRA tickets with ease
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8 mx-auto">
          <TicketForm />
        </div>
      </div>
    </div>
  );
}

export default App;