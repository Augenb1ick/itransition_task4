import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import './Header.css'
import { UsersContext } from '../../context/usersContext';

interface HeadeProps {
    handleLogOut: () => void;
}

const Header: React.FC<HeadeProps> = ({ handleLogOut }) => {


    const currentUserName = useContext(UsersContext).currentUser.name;


    return (
        <header className='header'>
            <div className='header__container'>
                <AdminPanelSettingsIcon />
                <h2 className='header__app-name'>Admin panel</h2>
                <p className='header__greetings'>Hello, {currentUserName}</p>
                <Button onClick={handleLogOut} variant="text" endIcon={<LogoutOutlinedIcon />}>Log out</Button>
            </div>
        </header>
    )
}

export default Header