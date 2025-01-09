import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface QuantityCounterProps {
    count: number;
    handleCount: (type: string) => void;
}

const QuantityCounter = ({ count, handleCount }: QuantityCounterProps) => {
    return (
        <div className="h-12 w-32 rounded-3xl ring-1 ring-black flex justify-between items-center px-1">
            <button className={`rounded-full ${count !== 0 && 'cursor-pointer hover:opacity-70 transition-all hover:active:opacity-80'}`}
                onClick={() => handleCount('subtract')} disabled={count === 0}>
                <RemoveCircleIcon fontSize="large" color={count === 0 ? 'disabled' : 'inherit'} />
            </button>
            <p className="text-md">{count}</p>
            <button className='rounded-full cursor-pointer hover:opacity-70 transition-all hover:active:opacity-80' onClick={() => handleCount('add')}>
                <AddCircleIcon fontSize="large" />
            </button>
        </div>
    )
}

export default QuantityCounter