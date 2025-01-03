import { truncateSummary } from './textUtils';

interface TicketData {
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  type: 'Bug' | 'Feature' | 'Task';
  estimatedTime: string;
}


function formatPayload(data: TicketData) {
  return {
    summary: truncateSummary(data.title),
    type: data.type,
    priority: data.priority,
    estimatedTime: data.estimatedTime
  };
}

export async function sendTicketData(data: TicketData) {
  try {
    const response = await fetch('https://hook.eu2.make.com/ipbub2p3vxqbd4rfuw6tjmrae8o6g7d7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatPayload(data)),
    });

    
    return response
      
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}