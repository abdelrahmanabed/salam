const NotificationItem = ({ notification, onMarkAsRead }) => {
    const {
        message,
        projectId, // تأكد من أن المشروع يتم تعبئته بشكل صحيح
        userId, // تأكد من أن المستخدم يتم تعبئته بشكل صحيح
        isRead,
        createdAt,
        type
    } = notification;

    return (
        <div 
            className={`p-2 mb-2 gap-3 flex flex-col justify-between rounded-main shadow ${
                type === 'AbnormalEvent' ?' bg-lightred' :
                type === 'Observation'?' bg-lightorange': 
                 type === 'TBT'?' bg-lightgreen ' : 'bg-lightblue'

            } transition-all hover:scale-[1.02] duration-300`}
            onClick={() => !isRead && onMarkAsRead()}
        >
             <div className="flex justify-between items-center">
                <p className={` text-sm `}>
                    {message}
                </p>
                <span className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="flex items-center ">
                <img
                    src={userId.image&& `${process.env.NEXT_PUBLIC_API}${userId.image}` || '/placeholder-avatar.png'}
                    alt={userId?.name || 'User Image'}
                    className="w-6 h-6 rounded-full mr-1"
                />
                <div className=" flex justify-between w-full">
                    <p className="font-medium text-xs">{userId?.name || 'Unknown User'}</p>
                    <p className="text-xs text-gray-500">{projectId?.name || 'Unknown Project'}</p>
                </div>
            </div>
           
        </div>
    );
};

export default NotificationItem;
