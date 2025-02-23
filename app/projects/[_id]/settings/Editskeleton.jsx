import React from 'react';

const EditProjectSkeleton = () => {
  return (
    <div className="flex gap-3 justify-center lg:bg-maincolor bg-darkbluec m-2 rounded-main">
      {/* Left side title - hidden on mobile */}
      <div className="hidden justify-center items-center lg:flex w-full">
        <div className="w-3/4 h-16 bg-darkbluec/50 rounded-lg animate-pulse" />
      </div>

      {/* Form container */}
      <div className="w-full md:min-w-[700px] shadow-sm shadow-darkbluec flex flex-col gap-4 rounded-main p-4 items-center dark:bg-darkbox bg-boxcolor">
        {/* Mobile title */}
        <div className="w-full lg:hidden">
          <div className="h-6 w-32 bg-darkbluea rounded animate-pulse" />
        </div>

        {/* Form grid */}
        <div className="grid w-full sm:grid-cols-2 gap-4">
          {/* Generate 8 input field skeletons */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              {/* Label skeleton */}
              <div className="h-4 w-24 bg-darkbluea rounded animate-pulse" />
              
              {/* Input field skeleton */}
              <div className="h-10 w-full bg-darkbluea rounded-lg animate-pulse" />
              
              {/* Error message space */}
              <div className="h-4" />
            </div>
          ))}
        </div>

        {/* Submit button skeleton */}
        <div className="w-full md:w-96 h-12 bg-darkbluea rounded-full animate-pulse mt-4" />
      </div>
    </div>
  );
};

export default EditProjectSkeleton;