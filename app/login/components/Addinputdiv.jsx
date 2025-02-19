import React from 'react'

const Addinputdiv = (props) => {
  return (
    <div className= {`${props.divclassName} flex flex-col gap-1 py-2`}>
    <label htmlFor={props.for} className={`text-sm font-semibold ${props.labelclassName}`} >{props.label}</label>
    <input
    onChange={props.onChange}
    value={props.value}
    name={props.name}
    type={props.type}
    className={`${props.className} dark:bg-darkbox  rounded-main  p-3`}
    />
    

</div>
  )
}

export default Addinputdiv