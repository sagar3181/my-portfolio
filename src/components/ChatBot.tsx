// 'use client';

// import { useState } from 'react';
// import { useChat } from '@ai-sdk/react';

// export default function ChatBot() {
//   const [input, setInput] = useState('');
  
//   // sendMessage is the standard for SDK 5.0+
//   const { messages, sendMessage, status } = useChat();

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || status !== 'ready') return;

//     // Simplified send
//     await sendMessage({ text: input });
//     setInput('');
//   };

//   return (
//     <div className="flex flex-col h-full bg-black p-4">
//       <div className="flex-1 overflow-y-auto space-y-4">
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
//           >
//             <div className={`p-3 rounded-lg max-w-[85%] ${
//               m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
//             }`}>
//               {/* Map through parts as you correctly did */}
//               {m.parts?.map((part, i) => (
//                 part.type === 'text' && <p key={i} className="text-sm">{part.text}</p>
//               ))}
//             </div>
//           </div>
//         ))}

//         {(status === 'submitted' || status === 'streaming') && (
//           <div className="text-gray-500 text-xs italic animate-pulse">
//             Assistant is thinking...
//           </div>
//         )}
//       </div>

//       <form onSubmit={handleSend} className="flex gap-2 mt-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           disabled={status !== 'ready'}
//           placeholder="Type your message..."
//           className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-white focus:ring-1 focus:ring-blue-500 outline-none disabled:opacity-50"
//         />
//         <button 
//           type="submit" 
//           disabled={status !== 'ready' || !input.trim()}
//           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors disabled:bg-gray-700"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }