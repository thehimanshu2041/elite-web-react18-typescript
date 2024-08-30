import BreadCrumb from '../../../components/breadcrumb';
import { useAuth } from '../../../contexts/auth-context';
import userStore from '../../../stores/user';
import Tiles from './tiles';

const Dashboard: React.FC = () => {
    return (
        <>
            <BreadCrumb heading="Dashboard" actions={[<DownloadInfo />]} />
            <Tiles />
        </>
    );
}

export default Dashboard;

const DownloadInfo: React.FC<any> = () => {

    const { getUserDetailsPdf } = userStore;
    const { user } = useAuth();

    const handelDownload = async () => {
        getUserDetailsPdf().then(data => {
            const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            const currentTimeStamp = Math.floor(Date.now() / 1000);
            link.setAttribute('download', `${user?.username}-${currentTimeStamp}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        });
    };

    return (
        <>
            <button className='cursor-pointer text-xl hover:bg-transparent px-2'>
                <i className='fas fa-download' onClick={handelDownload}></i>
            </button>
        </>
    );
};
