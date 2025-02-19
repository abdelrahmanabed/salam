import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <img src={user.image} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <h3>{user.name}</h3>
            <p>Role: {user.role}</p>
            <p>Project: {user.currentProject?.name}</p>
        </div>
    );
};

export default UserCard;