import React from 'react'
import UsersTable from '../UsersTable/UsersTable'
import Header from '../Header/Header'

interface MainPorps {
    handleLogOut: () => void;
    isLoading: boolean;
    handleDeleteUsers: (data: string[]) => void;
    handleBlockUsers: (data: string[]) => void;
    handleUnblockUsers: (data: string[]) => void;
}

const Main: React.FC<MainPorps> = (
    { handleLogOut, isLoading, handleDeleteUsers, handleBlockUsers, handleUnblockUsers }) => {
    return (
        <div className='main'>
            <Header handleLogOut={handleLogOut} />
            <UsersTable
                isLoading={isLoading}
                handleDeleteUsers={handleDeleteUsers}
                handleBlockUsers={handleBlockUsers}
                handleUnblockUsers={handleUnblockUsers}
            />
        </div>
    )
}

export default Main