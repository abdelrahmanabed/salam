'use client';
import React, { useEffect, useState } from 'react';

const ToastNotification = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`
            fixed top-4 right-4 z-50
         text-subtextcolor
            bg-maincolor text-white
            p-4 rounded-lg shadow-lg
            transform transition-all duration-300
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}>
            {message}
        </div>
    );
};

export default ToastNotification;