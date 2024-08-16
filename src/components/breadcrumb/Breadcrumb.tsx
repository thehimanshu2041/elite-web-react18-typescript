interface BreadCrumbProps {
    heading: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ heading }) => {
    return (
        <div className="mb-5">
            <div className="flex items-center">
                <div className="flex-grow">
                    <h4 className="text-2xl font-bold">{heading}</h4>
                </div>
            </div>
        </div>
    );
}

export default BreadCrumb;