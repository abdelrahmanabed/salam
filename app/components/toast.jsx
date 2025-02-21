'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const ToastNotification = ({ message, onClose, type }) => {
    const [isVisible, setIsVisible] = useState(true);
    
    // Configuration for different notification types
    const notificationConfig = {
        AbnormalEvent: {
            icon: 'jam:triangle-danger-f',
            bgColor: 'bg-redcolor',
            lightBg: 'bg-verylightred',
            borderColor: 'border-darkred',
            iconColor: 'text-redcolor'
        },
        ProjectUpdate: {
            icon: 'material-symbols:info-rounded',
            bgColor: 'bg-bluecolor',
            lightBg: 'bg-verylightblue',
            borderColor: 'border-darkbluea',
            iconColor: 'text-bluecolor'
        },
        AuditReport: {
            icon: 'game-icons:spyglass',
            bgColor: 'bg-pinkcolor',
            lightBg: 'bg-lightpink',
            borderColor: 'border-darkpink',
            iconColor: 'text-pinkcolor'
        },
        DrillReport: {
            icon: 'mingcute:run-fill',
            bgColor: 'bg-yellowcolor',
            lightBg: 'bg-darkyellow/20',
            borderColor: 'border-darkyellow',
            iconColor: 'text-yellowcolor'
        },
        HseReport: {
            icon: 'mingcute:safety-certificate-fill',
            bgColor: 'bg-cyancolor',
            lightBg: 'bg-darkcyan/20',
            borderColor: 'border-darkcyan',
            iconColor: 'text-cyancolor'
        },
        Observation: {
            icon: 'weui:eyes-on-filled',
            bgColor: 'bg-orangecolor',
            lightBg: 'bg-verylightorange',
            borderColor: 'border-darkorange',
            iconColor: 'text-orangecolor'
        },
        TBT: {
            icon: 'mdi:talk',
            bgColor: 'bg-greencolor',
            lightBg: 'bg-verylightgreen',
            borderColor: 'border-darkgreen',
            iconColor: 'text-greencolor'
        },
        NewUser: {
            icon: 'mdi:account-plus',
            bgColor: 'bg-bluecolor',
            lightBg: 'bg-verylightblue',
            borderColor: 'border-darkbluea',
            iconColor: 'text-bluecolor'
        },
        TrainingRecord: {
            icon: 'fluent:learning-app-20-filled',
            bgColor: 'bg-rosecolor',
            lightBg: 'bg-darkrose/20',
            borderColor: 'border-darkrose',
            iconColor: 'text-rosecolor'
        },
        Note: {
            icon: 'mdi:note-text',
            bgColor: 'bg-bluecolor',
            lightBg: 'bg-verylightblue',
            borderColor: 'border-darkbluea',
            iconColor: 'text-bluecolor'
        },
        // Default fallback
        default: {
            icon: 'material-symbols:info-rounded',
            bgColor: 'bg-bluecolor',
            lightBg: 'bg-verylightblue',
            borderColor: 'border-darkbluea',
            iconColor: 'text-bluecolor'
        }
    };

    // Get configuration for current notification type with fallback to default
    const config = notificationConfig[type]

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
            transform transition-all duration-300
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            my-2 max-w-sm
        `}>
            <div className={`
                flex items-center rounded-main shadow-lg p-2  overflow-hidden
                ${config.lightBg} border-l-4 ${config.borderColor}
            `}>
                <div className={`${config.bgColor} p-2 flex rounded-circle items-center justify-center`}>
                    <Icon icon={config.icon} className="text-white text-2xl" />
                </div>
                <div className="p-3 ">
                    <div className="flex justify-between items-center">
                        <p className="text-textcolor font-medium">
                            {message}
                        </p>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="ml-4 text-blackgrey hover:text-textcolor transition-colors"
                        >
                            <Icon icon="mdi:close" className="text-lg" />
                        </button>
                    </div>
                
                </div>
            </div>
            <style jsx>{`
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .animate-shrink {
                    animation: shrink 5s linear forwards;
                }
            `}</style>
        </div>
    );
};

export default ToastNotification;