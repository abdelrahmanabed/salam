import React from 'react'

const Select = (props) => {
  return (
    <div className= {`${props.divclassName} flex flex-col gap-1 p-2`}>
    <label htmlFor={props.for} className={`text-sm font-semibol ${props.labelclassName}`} >{props.label}</label>
    <select
    id=''
    onChange={props.onChange}
    value={props.value}
    name={props.name}
    className={`${props.className}   shadow-sm dark:bg-blackgrey dark:border-none border-border  border-2 rounded-main p-2 py-3`}
    >
        <option value='Admin'>Admin</option>
        <option value='Super Admin'>Super Admin</option>
    </select>
    

</div>
  )
}

export default Select