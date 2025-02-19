import React from 'react'

const Nationality = (props) => {
    
    const saudiArabiaNationalities = [
    "India", "Pakistan", "Egypt", "Bangladesh", "Philippines", "Indonesia",
    "Yemen", "Syria", "Jordan", "Sudan", "Sri Lanka", "Nepal", "Mauritius",
    "Thailand", "Kenya", "UAE", "Iraq", "Lebanon", "Palestine", "Morocco", 
    "Somalia", "Turkey", "Malaysia", "Russia", "China", "South Korea", 
    "Ethiopia", "Oman"
  ];
  return (
    <div className= {`${props.divclassName} flex flex-col gap-1 p-2`}>
    <label htmlFor={props.for} className={`text-sm font-semibol ${props.labelclassName}`} >{props.label}</label>
    <select
    id=''
    onChange={props.onChange}
    value={props.value}
    name={props.name}
    className={`${props.className} shadow-sm border-border dark:bg-darkbox dark:border-none  border-2 rounded-main p-2`}
    >
       <option value="">Select Country</option>
      {saudiArabiaNationalities.map((country, index) => (
        <option key={index} value={country}>{country}</option>
      ))}
        
    </select>
    

</div>
  );
  
}

export default Nationality


  
 
  
  