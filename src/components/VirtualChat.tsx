import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot, User } from 'lucide-react';

const VirtualChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help. You can ask me about our services, or choose from these common questions:",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showFAQs, setShowFAQs] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: "What are your business hours?",
      answer: "We're open Monday through Friday from 9 AM to 6 PM EST. Our support team is available during these hours to assist you."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive tracking information via email once your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in original condition with all tags attached. Please visit our Returns page for detailed instructions."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We offer customer support via email, phone, and live chat. You can reach us at support@company.com or call 1-800-SUPPORT during business hours."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner of our website, fill in your details, and verify your email address."
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showFAQs) {
      // Small delay to ensure FAQ elements are rendered
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [showFAQs]);

  const handleShowFAQs = () => {
    setShowFAQs(true);
    // Add a bot message to make the transition clearer
    addMessage("Here are the most common questions I can help you with:", 'bot');
  };

  const addMessage = (text: string, sender = 'user') => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    if (sender === 'user') {
      setShowFAQs(false);
      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(text);
        addMessage(botResponse, 'bot');
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for FAQ command
    if (lowerMessage.includes('faq') || lowerMessage.includes('menu') || lowerMessage.includes('options')) {
      setShowFAQs(true);
      return "Here are the most common questions I can help you with:";
    }
    
    // Check if message matches any FAQ
    for (const faq of faqs) {
      if (faq.question.toLowerCase().includes(lowerMessage) || 
          lowerMessage.includes(faq.question.toLowerCase().split(' ')[0])) {
        return faq.answer;
      }
    }
    
    // Simple keyword responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you today?";
    }
    if (lowerMessage.includes('help')) {
      return "I'm here to help! You can ask me about our business hours, orders, returns, support, or account creation. Type 'FAQ' to see all available questions.";
    }
    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    return "I'm not sure about that specific question, but I can help you with information about our business hours, order tracking, returns, customer support, or account creation. Type 'FAQ' to see all available questions.";
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addMessage(inputText);
      setInputText('');
    }
  };

  const handleFAQClick = (faq: { question: any; answer?: string; }) => {
    addMessage(faq.question);
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // CSS Styles
  const styles = {
    chatButton: {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 1000,
      backgroundColor: '#2563eb',
      color: 'white',
      borderRadius: '50%',
      padding: '16px',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    chatButtonHover: {
      backgroundColor: '#1d4ed8',
      transform: 'scale(1.05)',
    },
    chatContainer: {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 1000,
      width: '320px',
      height: '384px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '16px',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    headerTitle: {
      fontWeight: '500',
      margin: 0,
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    closeButtonHover: {
      backgroundColor: '#1d4ed8',
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    messageWrapper: {
      display: 'flex',
    },
    messageWrapperUser: {
      justifyContent: 'flex-end',
    },
    messageWrapperBot: {
      justifyContent: 'flex-start',
    },
    message: {
      maxWidth: '240px',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    messageUser: {
      backgroundColor: '#2563eb',
      color: 'white',
    },
    messageBot: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
    },
    messageContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    },
    faqContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    faqTitle: {
      fontSize: '12px',
      color: '#6b7280',
      textAlign: 'center',
      margin: 0,
    },
    faqButton: {
      width: '100%',
      textAlign: 'left',
      padding: '8px',
      fontSize: '14px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    faqButtonHover: {
      backgroundColor: '#f3f4f6',
    },
    inputContainer: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb',
    },
    showFaqContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '8px',
    },
    showFaqButton: {
      fontSize: '12px',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '4px 8px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    showFaqButtonHover: {
      backgroundColor: '#e5e7eb',
    },
    inputWrapper: {
      display: 'flex',
      gap: '8px',
    },
    input: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 2px rgba(37, 99, 235, 0.2)',
    },
    sendButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    sendButtonHover: {
      backgroundColor: '#1d4ed8',
    },
  };

  if (!isOpen) {
    return (
      <div>
        <button
          style={styles.chatButton as React.CSSProperties}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = styles.chatButtonHover.backgroundColor;
            (e.target as HTMLButtonElement).style.transform = styles.chatButtonHover.transform;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = styles.chatButton.backgroundColor;
            (e.target as HTMLButtonElement).style.transform = 'scale(1)';
          }}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div style={styles.chatContainer as React.CSSProperties}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <Bot size={20} />
          <h3 style={styles.headerTitle}>Virtual Assistant</h3>
        </div>
        <button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = styles.closeButtonHover.backgroundColor;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer as React.CSSProperties}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              ...styles.messageWrapper,
              ...(message.sender === 'user' ? styles.messageWrapperUser : styles.messageWrapperBot)
            }}
          >
            <div
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.messageUser : styles.messageBot)
              }}
            >
              <div style={styles.messageContent}>
                {message.sender === 'bot' && <Bot size={16} style={{ marginTop: '2px', flexShrink: 0 }} />}
                <span>{message.text}</span>
                {message.sender === 'user' && <User size={16} style={{ marginTop: '2px', flexShrink: 0 }} />}
              </div>
            </div>
          </div>
        ))}

        {/* FAQ Buttons */}
        {showFAQs && (
          <div style={styles.faqContainer as React.CSSProperties}>
            <p style={styles.faqTitle as React.CSSProperties}>Quick questions:</p>
            {faqs.map((faq, index) => (
              <button
                key={index}
                style={styles.faqButton as React.CSSProperties}
                onClick={() => handleFAQClick(faq)}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = styles.faqButtonHover.backgroundColor;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = styles.faqButton.backgroundColor;
                }}
              >
                {faq.question}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputContainer}>
        <div style={styles.showFaqContainer}>
          <button
            style={styles.showFaqButton}
            onClick={handleShowFAQs}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = styles.showFaqButtonHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = styles.showFaqButton.backgroundColor;
            }}
          >
            Show FAQs
          </button>
        </div>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = styles.inputFocus.borderColor;
              e.target.style.boxShadow = styles.inputFocus.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            style={styles.sendButton}
            onClick={handleSendMessage}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = styles.sendButtonHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = styles.sendButton.backgroundColor;
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualChat;