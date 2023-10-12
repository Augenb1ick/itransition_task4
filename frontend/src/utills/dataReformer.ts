import { UserDataType } from '../models/userData';

export const reformDataFromApi = (users: UserDataType[]) => {
    return users.map((item: UserDataType) => {
        const { _id, ...rest } = item;
        return {
            ...rest,
            id: _id,
            isBlocked: item.isBlocked ? 'Blocked' : 'Active',
        };
    });
};
