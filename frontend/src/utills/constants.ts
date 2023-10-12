import { GridColDef } from '@mui/x-data-grid';
type ErrorMessages = {
    [key: string]: string;
};

export const API_URL = 'https://testing-web.site';

export const CONFLICT_ERR = 'Error: 409';
export const CONFLICT_ERR_MESSAGE =
    'A user with this email is already registered!';

export const DENIED_ERROR = 'Error: 401';
export const DENIED_ERROR_MESSAGE = 'Incorrect login or password!';

export const FORBIDEN_ERROR = 'Error: 403';
export const FORBIDEN_ERROR_MESSAGE =
    'Your account is temporarily blocked. If you believe this is a mistake, please contact the administrator.';

export const SERVER_ERROR_MESSAGE = 'Something went wrong! Please try again.';

export const DELETE_ERROR_MESSAGE =
    'An error occurred during deletion, please try again later!';
export const BLOCK_ERROR_MESSAGE =
    'An error occurred during blocking, please try again later!';
export const UNBLOCK_ERROR_MESSAGE =
    'An error occurred during unblocking, please try again later!';
export const UPDATE_USERS_ERROR_MESSAGE =
    'An error occurred while updating the list of users, please try again later!';

export const gridColumns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 250 },
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'regDate', headerName: 'Date of registration', width: 250 },
    { field: 'lastLogin', headerName: 'Last login', width: 250 },
    { field: 'isBlocked', headerName: 'Status', width: 100 },
];

export const errorMessages: ErrorMessages = {
    [DENIED_ERROR]: DENIED_ERROR_MESSAGE,
    [FORBIDEN_ERROR]: FORBIDEN_ERROR_MESSAGE,
    [CONFLICT_ERR]: DENIED_ERROR_MESSAGE,
};
