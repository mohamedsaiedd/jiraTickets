import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TicketResponseProps {
  ticketData?: {
    issueId: string;
    issueKey: string;
    self: string;
  };
}

export function TicketResponse({ ticketData }: TicketResponseProps) {
  console.log(ticketData);
  if (!ticketData) return null;

  return (
    <div className="mt-6 bg-white border border-green-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ticket Created Successfully</h3>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {ticketData.issueKey}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Issue ID:</span>
          <span className="font-medium">{ticketData.issueId}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">View in JIRA:</span>
          <a
            href={ticketData}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            Open ticket <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}