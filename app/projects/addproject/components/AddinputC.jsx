import React from 'react'

const Addinput = (props) => {
  return (
    <input
    placeholder={props.label}
    onChange={props.onChange}
    value={props.value}
    name={props.name}
    type={props.type}
    className={`${props.className}  w-full  shadow-sm dark:bg-darkbox dark:border-none border-border  border-2 rounded-main p-2 py-3`}
    />
    

  )
}

export default Addinput