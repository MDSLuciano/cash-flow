import './SummaryCardStyle.css'

interface SummaryCardProps {
    value: number
    title: string;
    className?: string
    icon: React.ReactNode
}


const SummaryCard = ({ title, value, className, icon }:SummaryCardProps) => {



    return (
        <div className={'summary-card'}>
            <div className={`summary-card-icon ${className}`} >
                {icon}
            </div>
            <p className='summary-title'>{title}</p>
            <p className={`summary-value ${className}`}>R${value.toFixed(2)}</p>
        </div>
    );
}

export default SummaryCard;
