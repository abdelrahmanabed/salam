import { Icon } from "@iconify/react";

const NotificationItem = ({ notification, onMarkAsRead }) => {
    const {
        message,
        projectId,
        userId,
        isRead,
        createdAt,
        type
    } = notification;

    // Reuse the same notification config from ToastNotification
    const notificationConfig = {
        AbnormalEvent: {
            icon: 'jam:triangle-danger-f',
            bgColor: 'bg-redcolor',
            lightBg: 'bg-verylightred',
            borderColor: 'border-l-darkred',
            iconColor: 'text-redcolor'
        },
        Observation: {
            icon: 'weui:eyes-on-filled',
            bgColor: 'bg-orangecolor',
            lightBg: 'bg-verylightorange',
            borderColor: 'border-l-darkorange',
            iconColor: 'text-orangecolor'
        },
        TBT: {
            icon: 'mdi:talk',
            bgColor: 'bg-greencolor',
            lightBg: 'bg-verylightgreen',
            borderColor: 'border-l-darkgreen',
            iconColor: 'text-greencolor'
        },
        default: {
            icon: 'material-symbols:info-rounded',
            bgColor: 'bg-bluecolor',
            lightBg: 'bg-verylightblue',
            borderColor: 'border-l-darkbluea',
            iconColor: 'text-bluecolor'
        }
    };

    const config = notificationConfig[type] || notificationConfig.default;

    return (
        <div 
            className={`p-3 mb-2 rounded-main shadow-sm hover:shadow-md transition-all 
                ${config.lightBg} ${config.borderColor} border-l-4
                cursor-pointer group relative overflow-hidden`}
            onClick={() => !isRead && onMarkAsRead()}
        >
            <div className="flex items-start gap-3">
                {/* Icon Container */}
                <div className={`${config.bgColor} p-2 rounded-full flex-shrink-0`}>
                    <Icon 
                        icon={config.icon} 
                        className="text-white text-xl"
                    />
                </div>

                {/* Content Container */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <p className="text-sm text-gray-800 font-medium pr-7">
                            {message}
                        </p>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                            {new Date(createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                            })}
                        </span>
                    </div>

                    {/* User & Project Info */}
                    <div className="mt-2 flex items-center gap-2">
                        <img
                            src={userId?.image ? `${process.env.NEXT_PUBLIC_API}${userId.image}` : '/placeholder-avatar.png'}
                            alt={userId?.name || 'User'}
                            className="w-6 h-6 rounded-full border-2 border-white"
                        />
                        <div className="text-xs text-gray-600">
                            <span className="font-medium">{userId?.name || 'Unknown User'}</span>
                            <span className="mx-2">•</span>
                            <span>{projectId?.name || 'Unknown Project'}</span>
                        </div>
                    </div>
                </div>

                {/* Unread Indicator */}
                {!isRead && (
                    <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationItem;