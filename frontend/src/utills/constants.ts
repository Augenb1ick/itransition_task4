import { GridColDef } from '@mui/x-data-grid';
type ErrorMessages = {
    [key: string]: string;
};

export const API_URL = '';

export const CONFLICT_ERR = 'Ошибка: 409';
export const CONFLICT_ERR_MESSAGE =
    'Пользователь с таким email уже зарегистрирован!';

export const DENIED_ERROR = 'Ошибка: 401';
export const DENIED_ERROR_MESSAGE = 'Логин или пароль указаны неверно!';

export const FORBIDEN_ERROR = 'Ошибка: 403';
export const FORBIDEN_ERROR_MESSAGE =
    'Ваша учётная запись временно заблокирована. Если вы считает, что это произошло по ошибке, обратитесь к администратору';

export const SERVER_ERROR_MESSAGE = 'Что-то пошло не так! Попробуйте ещё раз.';

export const DELETE_ERROR_MESSAGE =
    'При удалении произошла ошибка, пожалуйста, попробуйте позже!';
export const BLOCK_ERROR_MESSAGE =
    'При блокировке произошла ошибка, пожалуйста, попробуйте позже!';
export const UNBLOCK_ERROR_MESSAGE =
    'При разблокировке произошла ошибка, пожалуйста, попробуйте позже!';
export const UPDATE_USERS_ERROR_MESSAGE =
    'При обновлении списка пользователей произошла ошибка, пожалуйста, попробуйте позже!';

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
