'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

const AuditForm = dynamic(() => import('./components/Audit'), {
  loading: () => <FormLoadingPlaceholder />,
  ssr: false
});

const DrillForm = dynamic(() => import('./components/Drill'), {
  loading: () => <FormLoadingPlaceholder />,
  ssr: false
});

const HseForm = dynamic(() => import('./components/Hse'), {
  loading: () => <FormLoadingPlaceholder />,
  ssr: false
});

const TrainingForm = dynamic(() => import('./components/Training'), {
  loading: () => <FormLoadingPlaceholder />,
  ssr: false
});

const NotesForm = dynamic(() => import('./components/Note'), {
  loading: () => <FormLoadingPlaceholder />,
  ssr: false
});

const FormLoadingPlaceholder = () => (
  <div className="flex items-center justify-center p-4 animate-pulse">
    <div className="w-full bg-gray-200 bg-hovercolor dark:bg-darkbox rounded-main h-64"></div>
  </div>
);

const Page = () => {
  const [activeForm, setActiveForm] = useState(null);

  const formTypes = [
    {
      name: 'drill',
      label: 'DRILL REPORT',
      icon: 'mingcute:run-fill',
      component: DrillForm,
      permissionKey: 'drillReport'
    },
    {
      name: 'audit',
      label: 'AUDIT REPORT',
      icon: 'game-icons:spyglass',
      component: AuditForm,
      permissionKey: 'auditReport'
    },
    {
      name: 'hse',
      label: 'HSE REPORT',
      icon: "mingcute:safety-certificate-fill",
      component: HseForm,
      permissionKey: 'hseReports'
    },
    {
      name: 'training',
      label: 'TRAINING RECORD',
      icon: "fluent:learning-app-20-filled",
      component: TrainingForm,
      permissionKey: 'trainingRecords'
    },
    {
      name: 'notes',
      label: 'ADD NOTE',
      icon: "material-symbols:note-add",
      component: NotesForm,
      permissionKey: 'notes'
    }
  ];

  const handleButtonClick = (formName) => {
    setActiveForm(prevForm => prevForm === formName ? null : formName);
  };

  const renderActiveForm = () => {
    const ActiveFormComponent = formTypes.find(form => form.name === activeForm)?.component;
    return ActiveFormComponent ? <ActiveFormComponent /> : null;
  };

  return (
    <div className="p-4 mx-auto max-w-5xl space-y-4 dark:text-subtextcolor">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-bluecolor">
        <Icon icon="fluent:add-circle-24-filled" className="w-8 h-8" />
        Add New
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-5 dark:text-subtextcolor gap-4 mb-6">
        {formTypes.map((form) => (
          <button
            key={form.name}
            onClick={() => handleButtonClick(form.name)}
            className={`
              flex items-center justify-center gap-2 
              p-3 rounded-main text-subtextcolor
              transition-all duration-300 
              ${activeForm === form.name
                ? 'bg-darkbluec text-white'
                : 'bg-bluecolor text-white hover:bg-opacity-90'}
            `}
          >
            <Icon icon={form.icon} className="w-6 h-6" />
            <span className="text-xs sm:text-sm md:text-base hidden sm:block">
              {form.label}
            </span>
          </button>
        ))}
      </div>

      {renderActiveForm()}
    </div>
  );
};

export default Page;