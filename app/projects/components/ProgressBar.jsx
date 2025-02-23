import React from 'react';

const ProgressBar = ({ startDate, endDate }) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const totalDuration = end - start;
  const elapsed = now - start;
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100); // النسبة بين 0 و 100

  return (
    <div className='relative gap-2 flex flex-col'>
      <div
        className="absolute z-10 transform md:-ml-1 -top-0.5 md:-top-1"
        style={{ left: `${progress}%` }}
      >
        <div className="w-[12px] h-[12px] md:w-4 md:h-4 bg-darkblueb rounded-full mb-[0.5px] shadow-xl"></div>
      </div>
      <div className="w-full h-2 bg-lightblue dark:bg-blackgrey rounded-full relative overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0 pr-[10px] h-4 bg-maincolor transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className='dark:text-subtextcolor justify-between flex text-xs'>
        <span>{new Date(startDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}</span>
        <span>{new Date(endDate).toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default ProgressBar;