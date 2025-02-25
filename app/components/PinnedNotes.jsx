'use client'
import { useNotes } from '../contexts/NoteContext';
import NanoNote from '../projects/components/cards/NanoNote';

const PinnedNotes = () => {
  const { projectNotes } = useNotes();

 

  const getPinnedNotes = () => {
    if (!projectNotes) return [];
    
    return projectNotes.filter(note => 
        note.pinned === true && 
        (!note.targetDate || note.targetDate === null) && 
        (!note.usersId || note.usersId.length === 0)
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // ترتيب حسب الأحدث
        .slice(0, 3); // أخذ أحدث 3 فقط
  };

  return (
    <div className="w-full my-4 ">
      <div className=" flex flex-col gap-1">
        {getPinnedNotes().map((note, index) => (
          <NanoNote key={note._id || index} note={note} projectId={note.projectId._id} />
        ))}
      </div>
    </div>
  );
};


export default PinnedNotes;