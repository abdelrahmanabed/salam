import { useState } from 'react';
import { Icon } from '@iconify/react';
import DayDataForm from './reportsforms/ReportForm';
import DrillForm from './reportsforms/DrillForm';
import TBTForm from './reportsforms/TBTForm';
import AbnormalForm from './reportsforms/AbnormalForm';
import ObservationForm from './reportsforms/ObservationForm';

const ReportsMenu = ({ children, className,projectId }) => {
    const [activeForm, setActiveForm] = useState(null); // To track the currently opened form

    const handleToggleForm = (formName) => {
        setActiveForm((prev) => (prev === formName ? null : formName)); // Toggle the active form
    };

    const isAnyFormActive = activeForm !== null;

    return (
        <div className={`overflow-hidden ${className} ${ isAnyFormActive ? "items-start md:items-center flex-col md:flex-row":"justify-center flex-col items-center "}  flex p-4    right-0 fixed bg-hovercolor dark:bg-darkbox duration-300 z-30`}>
            <span className={` ${ isAnyFormActive?"hidden" :""} my-3 font-bold text-backgroundcolor`}>Choose To Add</span>

            <div className={`  ${isAnyFormActive ?'flex items-center   md:flex-col px-6  rounded-full':' rounded-main md:grid-cols-4 sm:grid-cols-2 grid grid-cols-2 '}  p-3  gap-2 w-fit   `}>
                {/* Day Data Button */}
                <button
                    onClick={() => handleToggleForm('DayData')}
                    className={` hover:bg-darkbluec hover:rounded-circle group duration-300 items-center p-2  justify-center flex flex-col gap-2 ${
                        activeForm === 'DayData'
                            ? 'bg-darkbluec w-16 h-16   rounded-circle'
                            : isAnyFormActive
                            ? 'bg-bluecolor  w-10 h-10 md:w-12 md:h-12  rounded-circle'
                            : 'bg-bluecolor w-32 h-32 md:w-36 md:h-36 rounded-main'
                    }`}
                >
                    <Icon
                        className={` duration-300 group-hover:text-bluecolor ${
                            activeForm === 'DayData' ? 'text-bluecolor text-4xl' :isAnyFormActive? 'text-2xl md:text-4xl text-darkbluec ': 'text-darkbluec text-4xl'
                        }`}
                        icon="mdi:time-of-day"
                    />
                   <span className={isAnyFormActive?'hidden duration-300 text-darkbluec  ':'group-hover:h-0 overflow-hidden duration-300'}>Day Data</span>
                </button>

                {/* Observation Button */}
                <button
                    onClick={() => handleToggleForm('Observation')}
                    className={`hover:bg-darkorange hover:rounded-circle  group duration-300 items-center p-2 justify-center flex flex-col gap-2 ${
                        activeForm === 'Observation'
                            ? 'bg-darkorange w-16 h-16 rounded-circle'
                            : isAnyFormActive
                            ? 'bg-orangecolor  w-10 h-10 md:w-12 md:h-12 rounded-circle '
                            : 'bg-orangecolor w-32 h-32 md:w-36 md:h-36 rounded-main'
                    }`}
                >
                    <Icon
                        className={`group-hover:text-orangecolor text-4xl duration-300 ${
                            activeForm === 'Observation' ? 'text-orangecolor text-4xl' :isAnyFormActive? 'text-2xl md:text-4xl text-darkorange ': 'text-darkorange text-4xl'
                        }`}
                        icon="weui:eyes-on-filled"
                    />
             <span className={isAnyFormActive?'hidden duration-300':'group-hover:h-0 overflow-hidden duration-300'}>Observation</span>

                </button>

                {/* TBT Button */}
                <button
                    onClick={() => handleToggleForm('TBT')}
                    className={` hover:bg-darkgreen group hover:rounded-circle duration-300 items-center p-2  justify-center flex flex-col gap-2 ${
                        activeForm === 'TBT'
                            ? 'bg-darkgreen w-16 h-16 rounded-circle'
                            : isAnyFormActive
                            ? 'bg-greencolor  w-10 h-10 md:w-12 md:h-12 rounded-circle '
                            : 'bg-greencolor w-32 h-32 md:w-36 md:h-36 rounded-main'
                    }`}
                >
                    <Icon
                        className={`group-hover:text-greencolor text-4xl duration-300 ${
                            activeForm === 'TBT' ? 'text-greencolor' : 'text-darkgreen'
                        }`}
                        icon="mdi:talk"
                    />
                <span className={isAnyFormActive?'hidden duration-300':'group-hover:h-0 overflow-hidden duration-300'}>TBT</span>

                </button>



                {/* Abnormal Button */}
                <button
                    onClick={() => handleToggleForm('Abnormal')}
                    className={`hover:bg-darkred hover:rounded-circle  group duration-300 items-center p-2  justify-center flex flex-col gap-2 ${
                        activeForm === 'Abnormal'
                            ? 'bg-darkred w-16 h-16  rounded-circle'
                            : isAnyFormActive
                            ? 'bg-redcolor  w-10 h-10 md:w-12 md:h-12  rounded-circle'
                            : 'bg-redcolor w-32 h-32 md:w-36 md:h-36 rounded-main'
                    }`}
                >
                    <Icon
                        className={`text-4xl  group-hover:text-redcolor  duration-300 ${
                            activeForm === 'Abnormal' ? 'text-redcolor' : 'text-darkred'
                        }`}
                        icon="icon-park-solid:abnormal"
                    />
                   <span className={isAnyFormActive?'hidden duration-300':'group-hover:h-0 overflow-hidden duration-300'}>Abnormal</span>

                </button>
            </div>

            {/* Forms */}
            <div
                className={`duration-300 flex items-center  dark:bg-blackgrey bg-boxcolor overflow-y-auto rounded-main  pb-2  ${
                    activeForm === 'DayData' ? 'w-full h-full' : 'w-0 h-0'
                }`}
            >
                <DayDataForm  />
            </div>
            <div
                className={`duration-300 flex items-center overflow-hidden rounded-main dark:bg-blackgrey bg-boxcolor overflow-y-auto  pb-2 ${
                    activeForm === 'Observation' ? 'w-full h-full' : 'w-0 h-0'
                }`}
            >
                <ObservationForm />
            </div>
            <div
                className={`duration-300 flex items-center dark:bg-blackgrey bg-boxcolor overflow-y-auto rounded-main  pb-2 ${
                    activeForm === 'TBT' ? 'w-full h-full' : 'w-0 h-0'
                }`}
            >
                <TBTForm />
            </div>
           
            <div
                className={`duration-300flex items-center dark:bg-blackgrey bg-boxcolor overflow-y-auto  pb-2  rounded-main ${
                    activeForm === 'Abnormal' ? 'w-full h-full' : 'w-0 h-0'
                }`}
            >
                <AbnormalForm  />
            </div>

            {children}
        </div>
    );
};

export default ReportsMenu;