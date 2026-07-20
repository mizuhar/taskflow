import { createContext, useState, useContext } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // ПЪРВО: Дефинираме функцията за премахване, за да съществува в паметта
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // ВТОРО: Дефинираме addToast, която вече може спокойно да ползва removeToast
  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    
    setToasts((prevToasts) => {
      return [...prevToasts, { id, message, type }];
    });

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

 // Обекти със стилове за inline подаване
  const containerStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const toastBaseStyle = {
    padding: '12px 24px',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '250px',
    transition: 'all 0.3s ease-out'
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Контейнерът със стил */}
      <div style={containerStyle}>
        {toasts.map((toast) => {
          // Динамично сменяме цвета според типа на съобщението
          const backgroundColor = toast.type === 'success' ? '#4caf50' : '#f44336';
          
          return (
            <div 
              key={toast.id} 
              style={{ ...toastBaseStyle, backgroundColor }}
            >
              {toast.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

// Професионален хук с вградена защита срещу забравени провайдъри
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};