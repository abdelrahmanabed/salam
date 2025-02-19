import { Icon } from '@iconify/react'

const Permissions = (props) => {
  return (
    <div className={`${props.divclassName} flex relative items-center`}>
      <input
        checked={props.checked}
        id={props.id}
        type='checkbox'
        className={`${props.className} opacity-0 absolute  peer shadow-lg border-darkgrey border-2 rounded-main p-2`}
        name={props.name}
        onChange={props.onChange}
      />
      <label 
        htmlFor={props.for} 
        className={`
          px-8 py-1 
          ${props.checked 
            ? 'bg-darkbluec text-boxcolor border-darkbluec' 
            : 'bg-boxcolor dark:bg-darkbox   border-border'}
          rounded-full border-2 text-sm duration-300 font-semibold 
          ${props.labelclassName}
        `}
      >
        {props.label}
      </label>

      <div 
        className={`
          absolute pointer-events-none rounded-full  
          duration-500 top-1/2 -translate-y-1/2
          ${props.checked 
            ? 'left-full  -ml-8 bg-maincolor shadow-darkbluec h-10 w-10' 
            : 'left-0 bg-hovercolor ml-1 shadow-darkgrey h-6 w-6'}
        `}
      />
      
      <Icon 
        icon="dashicons:yes" 
        className={`
          pointer-events-none absolute top-1/2 -translate-y-1/2 
          duration-500 
          ${props.checked 
            ? 'opacity-100 text-4xl left-full -ml-8 text-subtextcolor' 
            : 'opacity-0 left-0'}
        `}
      />
    </div>
  )
}

export default Permissions