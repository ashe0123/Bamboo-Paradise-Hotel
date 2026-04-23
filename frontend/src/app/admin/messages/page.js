'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FaEnvelope, FaEnvelopeOpen, FaTrash, FaReply } from 'react-icons/fa';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/contact/messages').then(({ data }) => {
      setMessages(data.messages);
      setLoading(false);
    });
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/contact/messages/${id}/read`);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch { toast.error('Failed'); }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/messages/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.is_read) markRead(msg.id);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Messages</h1>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unreadCount} new</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
        {/* Message list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-500">{messages.length} messages</p>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
            {loading ? (
              <div className="text-center py-10 text-gray-400">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-gray-400">No messages</div>
            ) : messages.map((m) => (
              <div key={m.id} onClick={() => openMessage(m)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === m.id ? 'bg-bamboo-50 border-l-2 border-bamboo-500' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {!m.is_read ? (
                      <FaEnvelope className="text-bamboo-500 text-xs shrink-0" />
                    ) : (
                      <FaEnvelopeOpen className="text-gray-300 text-xs shrink-0" />
                    )}
                    <span className={`text-sm ${!m.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{m.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-500 ml-4 mb-0.5">{m.subject || 'No subject'}</p>
                <p className="text-xs text-gray-400 ml-4 truncate">{m.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message detail */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
          {selected ? (
            <>
              <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg">{selected.subject || 'No subject'}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{new Date(selected.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => deleteMessage(selected.id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                  <FaTrash className="text-sm" />
                </button>
              </div>
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div><span className="text-gray-400">From: </span><span className="font-semibold text-gray-800">{selected.name}</span></div>
                  <div><span className="text-gray-400">Email: </span><span className="text-gray-700">{selected.email}</span></div>
                  {selected.phone && <div><span className="text-gray-400">Phone: </span><span className="text-gray-700">{selected.phone}</span></div>}
                </div>
              </div>
              <div className="p-5 flex-1 overflow-y-auto">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="p-5 border-t border-gray-100">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your inquiry'}`}
                  className="btn-primary text-sm flex items-center gap-2 w-fit">
                  <FaReply className="text-xs" /> Reply via Email
                </a>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
              <FaEnvelope className="text-5xl mb-3 text-gray-200" />
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
