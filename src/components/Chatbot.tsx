import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageCircle, X, Minimize2 } from 'lucide-react';

function ChatBot({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you learn more about this portfolio. Ask me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Portfolio-specific responses
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return "Great question! You can check out the experience section above to see detailed work history, including roles, technologies used, and key achievements. Would you like me to tell you about any specific experience?";
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work samples')) {
      return "The projects section showcases various applications and websites built with different technologies. Each project includes live demos and source code links. Is there a particular type of project you're interested in?";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      return "The skills section covers frontend, backend, and other technical competencies. The portfolio demonstrates proficiency in React, JavaScript, and modern web development. What specific technology would you like to know more about?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('reach out')) {
      return "You can find contact information in the contact section below! There are multiple ways to get in touch including email, LinkedIn, and other social platforms. Ready to start a conversation?";
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who')) {
      return "The about section provides background information, passion for development, and career journey. It's a great place to get to know the person behind the portfolio!";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to this portfolio. I can help you navigate through different sections or answer questions about the experience, projects, and skills showcased here. What would you like to explore?";
    }
    
    if (lowerMessage.includes('help')) {
      return "I can help you with information about:\n• Work Experience & Background\n• Projects & Applications\n• Technical Skills & Technologies\n• Contact Information\n• Portfolio Navigation\n\nWhat interests you most?";
    }

    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "You can find comprehensive information about background and experience throughout this portfolio. For a formal resume, check the contact section where there might be a download link, or feel free to reach out directly!";
    }

    // Generic responses
    const responses = [
      "That's an interesting question! Let me help you find the relevant information in this portfolio.",
      "I'd be happy to guide you to the right section. This portfolio has detailed information about that topic.",
      "Great question! The portfolio covers that area extensively. Would you like me to point you in the right direction?",
      "Thanks for asking! You can find more details about that in the corresponding section above."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className={`${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25' 
              : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/25'
          } text-white p-4 rounded-full transition-all duration-300 hover:scale-110 animate-pulse`}
          title="Chat with Portfolio Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-2xl shadow-2xl border transition-all duration-300 w-80 sm:w-96 ${
          isMinimized ? 'h-16' : 'h-[32rem]'
        }`}>
          
          {/* Header */}
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } text-white p-4 rounded-t-2xl flex items-center justify-between`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Portfolio Assistant</h3>
                <p className="text-xs text-blue-100">Online • Here to help</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={minimizeChat}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-1.5 rounded-full transition-all duration-200"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={toggleChat}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-1.5 rounded-full transition-all duration-200"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className={`${
                isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              } h-80 overflow-y-auto p-4 space-y-3`}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : isDarkMode 
                            ? 'bg-gray-700 text-gray-100 rounded-bl-sm border border-gray-600' 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}>
                        <p className="whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-blue-100' 
                            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2 max-w-xs">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-600'
                      }`}>
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className={`px-3 py-2 rounded-2xl rounded-bl-sm ${
                        isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200 shadow-sm'
                      }`}>
                        <div className="flex space-x-1">
                          <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`}></div>
                          <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                          <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={`${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              } border-t p-3 rounded-b-2xl`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="Ask me about this portfolio..."
                    className={`flex-1 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                    } border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 text-center`}>
                  Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBot;