'use client'
import { Icon } from '@iconify/react';
import { useNotes } from '../contexts/NoteContext';
import NoteCard from '../projects/components/cards/NoteCard';

const LatestNotes = () => {
  const { projectNotes, projectNotesLoading } = useNotes();

 

  const getLatestNotes = () => {
    if (!projectNotes) return [];

    return projectNotes
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  };

  const renderNoteSkeleton = () => (
    <div className="bg-boxcolor rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-lg bg-hovercolor" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-24 bg-hovercolor rounded" />
            <div className="h-6 w-16 bg-hovercolor rounded" />
          </div>
          <div className="h-4 w-full bg-hovercolor rounded" />
          <div className="mt-3 flex items-center gap-4">
            <div className="h-4 w-16 bg-hovercolor rounded" />
            <div className="h-4 w-24 bg-hovercolor rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" w-full p-4">
   

      {projectNotesLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index}>{renderNoteSkeleton()}</div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {getLatestNotes().map((note, index) => (
            <NoteCard key={note._id || index} note={note} />
          ))}
          {getLatestNotes().length === 0 && (
            <div className="text-center py-8 text-darkgrey">
              <Icon 
                icon="material-symbols:note-stack-outline" 
                className="w-12 h-12 mx-auto mb-2"
              />
              <p>No notes found in this project</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LatestNotes;