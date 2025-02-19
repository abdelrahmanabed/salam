'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useNotes } from '../../../../contexts/NoteContext';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

// File download hook
const useFileDownload = () => {
  return useMutation({
    mutationFn: async ({ fileName }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/files/${fileName}`);
      if (!response.ok) throw new Error('Download failed');
      return response.blob();
    },
    onSuccess: (blob, { fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  });
};

const getNoteTypeConfig = (type) => {
  const config = {
    Warning: {
      icon: 'material-symbols:warning-outline',
      bgColor: 'orangecolor'
    },
    Notice: {
      icon: 'material-symbols:info-outline',
      bgColor: 'bluecolor'
    },
    Alert: {
      icon: 'material-symbols:notification-important-outline',
      bgColor: 'redcolor'
    },
    Reminder: {
      icon: 'material-symbols:timer-outline',
      bgColor: 'pinkcolor'
    },
    News: {
      icon: 'material-symbols:newspaper',
      bgColor: 'cyancolor'
    },
    Thank: {
      icon: 'material-symbols:favorite-outline',
      bgColor: 'rosecolor'
    },
    Promote: {
      icon: 'material-symbols:campaign-outline',
      bgColor: 'greencolor'
    }
  };
  return config[type];
};

const FileDownloadButton = ({ filePath }) => {
  const downloadMutation = useFileDownload();
  
  if (!filePath) return null;
  
  const fileName = filePath.split('/').pop();
  
  return (
    <button
      onClick={() => downloadMutation.mutate({ fileName })}
      className={`flex items-center gap-2 p-2 rounded-main bg-boxcolor  dark:bg-blackgrey dark:text-hovercolor hover:bg-lightblue  dark:hover:bg-darkbluec transition-all duration-200 shadow-sm`}
    >
      {downloadMutation.isPending ? (
        <Icon icon="eos-icons:loading" className="w-5 h-5 animate-spin" />
      ) : (
        <Icon icon="material-symbols:download" className="w-5 h-5" />
      )}
      <span className="text-sm">{fileName}</span>
    </button>
  );
};

const NoteDetailsPage = () => {
  const { note } = useParams();
  const { getNoteById } = useNotes();
  
  const { data: noteDetails, isLoading } = useQuery({
    queryKey: ['note', note],
    queryFn: () => getNoteById(note)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Icon icon="eos-icons:loading" className="w-8 h-8 animate-spin text-maincolor" />
      </div>
    );
  }

  if (!noteDetails) return null;

  const typeConfig = getNoteTypeConfig(noteDetails.type);

  return (
    <div className="  px-4 mb-4 ">
      <div className="bg-hovercolor dark:bg-darkbox rounded-main overflow-hidden">
        {/* Header */}
        <div className={`bg-${typeConfig.bgColor} bg-opacity-50 p-6`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-${typeConfig.bgColor}`}>
              <Icon icon={typeConfig.icon} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-textcolor dark:text-white">
                {noteDetails.type} Note
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {new Date(noteDetails.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-textcolor dark:text-subtextcolor">
              {noteDetails.content}
            </p>
          </div>

          {/* Target Date */}
          {noteDetails.targetDate && (
            <div className="mt-6 flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Icon icon="material-symbols:calendar-today-outline" className="w-5 h-5" />
              <span>Target Date: {new Date(noteDetails.targetDate).toLocaleDateString()}</span>
            </div>
          )}

          {/* Images */}
          {noteDetails.images?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg dark:text-subtextcolor font-semibold mb-4 text-textcolor dark:text-white">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {noteDetails.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API}${image}`}
                      alt={`Note image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 rounded-main transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files */}
          {noteDetails.files?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg dark:text-subtextcolor font-semibold mb-4 text-textcolor dark:text-white">
                Attachments
              </h3>
              <div className="grid gap-3">
                {noteDetails.files.map((file, index) => (
                  <FileDownloadButton key={index} filePath={file} />
                ))}
              </div>
            </div>
          )}

          {/* Users */}
       {/* Users */}
{noteDetails.usersId?.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-4 text-textcolor dark:text-subtextcolor dark:text-white">
      Shared with
    </h3>
    <div className="flex flex-wrap gap-2">
      {noteDetails.usersId.map((user, index) => (
        <Link href={`/users/${user._id}`} key={index} className="flex items-center gap-3 bg-boxcolor dark:bg-blackgrey p-2 rounded-full shadow">
          <Image
            src={`${process.env.NEXT_PUBLIC_API}${user.image}`}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
          />
          <span className="text-textcolor dark:text-subtextcolor">{user.name}</span>
        </Link>
      ))}
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;