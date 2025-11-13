import './Ctts.css'

export default function Ctts(props) {
    return(
        <>
            <div className="flex items-center gap-3 p-4 hover:bg-white cursor-pointer transition-colors border-b border-[#FFE2AC] dark:border-white">
                <img src={props.img} alt="foto de perfil do contato" className='w-14 h-14 rounded-full object-cover shrink-0'/>
                <div className='flex-1 min-w-0'>
                    <div className='flex justify-between items-baseline mb-1'>
                        <h3 className='font-semibold truncate text-[#B15B3C] dark:text-white'>{props.img}</h3>
                        <span className='text-xs ml-2 shrink-0 text-[#D2A284] dark:text-gray-400'>{props.tempo}</span>
                    </div>
                    <p className='text-sm truncate text-[#D2A284] dark:text-white'>{props.msg}</p>
                </div>
            </div>
        </>
    )
}