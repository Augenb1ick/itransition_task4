export type UserDataType = {
    email: string;
    isBlocked: boolean;
    lastLogin: string;
    name: string;
    regDate: string;
    _id: string;
};

export type UsersContextType = {
    currentUser: UserDataType;
    users: UserDataType[];
};
