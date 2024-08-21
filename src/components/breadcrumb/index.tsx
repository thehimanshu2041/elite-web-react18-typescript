import { useNavigate } from "react-router";

interface BreadCrumbProps {
    heading?: string;
    actions?: JSX.Element[] | null;
    backLink?: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ backLink, heading, actions }) => {

    const navigate = useNavigate();

    const handelClick = async (link: string) => {
        navigate(link);
    }

    return (
        <div className="mb-5">
            <div className="flex items-left">
                <div className="flex-grow flex-row flex">
                    {backLink && (
                        <div className="flex items-center">
                            <button className='cursor-pointer text-l hover:bg-transparent px-2' onClick={() => handelClick(backLink)}>
                                <i className='fa fa-arrow-left'></i>
                            </button>
                        </div>
                    )}
                    <h4 className="text-2xl font-bold">{heading}</h4>
                </div>

                {actions && actions.length && actions.length > 0 &&
                    actions.map((x, i) => x && (
                        <div key={i} className="flex-shrink-0 ml-4">
                            {x}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BreadCrumb;