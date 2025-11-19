import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

export default function ChatBox({
  loggedUserId,
  targetUserId,
  targetName,
  onClose,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Carregar conversa (e fazer um polling simples)
  useEffect(() => {
    if (!loggedUserId || !targetUserId) return;

    async function loadConversation() {
      try {
        const res = await fetch(
          `${API_URL}/messages/${loggedUserId}/${targetUserId}`
        );
        if (!res.ok) throw new Error("Erro ao buscar mensagens");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Erro ao carregar conversa:", err);
      }
    }

    loadConversation();
    const interval = setInterval(loadConversation, 1500); // atualiza a cada 1.5s

    return () => clearInterval(interval);
  }, [loggedUserId, targetUserId]);

  async function handleSend() {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: loggedUserId,        // nomes alinhados com o backend
          to: targetUserId,
          content: newMessage.trim(),
        }),
      });

      if (!res.ok) throw new Error("Erro ao enviar mensagem");

      setNewMessage("");

      // Opcional: recarregar logo após enviar (o polling já faria isso)
      const updated = await fetch(
        `${API_URL}/messages/${loggedUserId}/${targetUserId}`
      ).then((r) => r.json());
      setMessages(updated);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  }

  const containerClasses = isExpanded
    ? "absolute inset-4 md:inset-auto md:right-6 md:bottom-6 md:w-[420px] md:h-[480px]"
    : "absolute right-4 bottom-4 w-full max-w-sm h-80 sm:h-96 sm:max-w-md";

  return (
    <div
      className={`${containerClasses} bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-t-xl">
        <div className="flex flex-col">
          <span className="text-xs text-gray-300">Conversando com</span>
          <span className="font-semibold text-sm truncate">{targetName}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
          >
            {isExpanded ? "Reduzir" : "Expandir"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-700"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto px-3 py-2 bg-gray-50 dark:bg-gray-950">
        {messages.length === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
            Nenhuma mensagem ainda. Comece a conversa!
          </p>
        )}

        {messages.map((msg) => {
          const isMine = msg.from === loggedUserId; // <-- backend salva como "from"
          return (
            <div
              key={msg.id}
              className={`flex mb-2 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="break-words">{msg.content}</p>
                <span className="block mt-1 text-[10px] opacity-70 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-2 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          type="button"
          onClick={handleSend}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
