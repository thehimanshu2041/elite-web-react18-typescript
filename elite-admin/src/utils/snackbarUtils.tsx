import { useSnackbar, VariantType } from 'notistack';

let useSnackbarRef: any;

export const SnackbarUtilsConfigurator: React.FC = () => {
    useSnackbarRef = useSnackbar();
    return null;
};

const snackbarUtils = {
    toast(msg: string, variant: VariantType = 'default') {
        useSnackbarRef.enqueueSnackbar(msg, { variant });
    },
    success(msg: string) {
        this.toast(msg, 'success');
    },
    warn(msg: string) {
        this.toast(msg, 'warning');
    },
    info(msg: string) {
        this.toast(msg, 'info');
    },
    error(msg: string) {
        this.toast(msg, 'error');
    }
};

export default snackbarUtils;
