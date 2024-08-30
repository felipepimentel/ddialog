import { useState } from 'react';
import { ChatInput } from './ChatInput';
// Importe outros componentes necessários

export function Chat() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = async (message: string) => {
    try {
      // Adicione a mensagem localmente imediatamente para feedback instantâneo
      setMessages(prev => [...prev, message]);

      // Envie a mensagem para o backend
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      // Se necessário, atualize com a resposta do servidor
      const data = await response.json();
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Remova a mensagem local se falhar
      setMessages(prev => prev.slice(0, -1));
      // Mostre uma notificação de erro ao usuário
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Renderize as mensagens aqui */}
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}