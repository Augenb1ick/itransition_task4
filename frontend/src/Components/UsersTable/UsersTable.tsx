import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import './UsersTable.css'
import { useContext, useState } from 'react';
import { UsersContext } from '../../context/usersContext';
import { reformDataFromApi } from '../../utills/dataReformer';
import { gridColumns } from '../../utills/constants';

interface UsersTableProps {
    handleDeleteUsers: (data: string[]) => void;
    handleBlockUsers: (data: string[]) => void;
    handleUnblockUsers: (data: string[]) => void;
    isLoading: boolean;
}


const UsersTable: React.FC<UsersTableProps> = ({
    handleDeleteUsers, handleBlockUsers, handleUnblockUsers, isLoading
}) => {

    const users = reformDataFromApi(useContext(UsersContext).users);


    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleRowClick = (rowId: GridRowId[]) => {
        const selectedUserIds: string[] = rowId.map(id => id.toString());
        setSelectedUsers(selectedUserIds);
    };

    const blockUsers = () => {
        handleBlockUsers(selectedUsers)
    }
    const unblockUsers = () => {
        handleUnblockUsers(selectedUsers)
    }
    const deleteUsers = () => {
        handleDeleteUsers(selectedUsers)
    }

    return (
        <section className='users-table'>
            <h2 className='users-table__title'>App users</h2>
            <Box className='buttons__container'>
                <Stack direction="row" spacing={2}>
                    <Button
                        disabled={!selectedUsers.length || isLoading}
                        onClick={blockUsers}
                        variant="outlined"
                        startIcon={<LockOutlinedIcon />}
                    >
                        Block
                    </Button>
                    <Button
                        disabled={!selectedUsers.length || isLoading}
                        onClick={unblockUsers}
                        variant="outlined"
                    >
                        <LockOpenOutlinedIcon />
                    </Button>
                    <Button
                        disabled={!selectedUsers.length || isLoading}
                        onClick={deleteUsers}
                        variant="contained" color='error'
                    >
                        <DeleteIcon />
                    </Button>
                </Stack>
            </Box>
            <DataGrid
                rows={users}
                columns={gridColumns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
                checkboxSelection
                onRowSelectionModelChange={handleRowClick}
            />
        </section>
    );
}

export default UsersTable;