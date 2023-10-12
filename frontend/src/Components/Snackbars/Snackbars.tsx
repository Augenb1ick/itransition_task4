import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
    isBlocked: boolean;
    isUnblocked: boolean;
    handleSnackClose: () => void;
    isDeleted: boolean;
    isError: boolean;
    isSelfError: boolean;
}

const Snackbars: React.FC<SnackbarProps> = ({
    isBlocked, isUnblocked, isDeleted, isError, isSelfError, handleSnackClose
}) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        handleSnackClose()
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isDeleted} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully deleted!
                </Alert>
            </Snackbar>
            <Snackbar open={isBlocked} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully blocked!
                </Alert>
            </Snackbar>
            <Snackbar open={isUnblocked} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully unblocked!
                </Alert>
            </Snackbar>
            <Snackbar open={isError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Something went wrong!
                </Alert>
            </Snackbar>
            <Snackbar open={isSelfError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Oops, you blocked or deleted your account!
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default Snackbars;