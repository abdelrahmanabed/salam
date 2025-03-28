import { Sen } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import {  ProjectsProvider } from './projects/context/ProjectsContext';
import { TodayProvider } from "./projects/context/TodayContext";
import ProtectedRoute from "./components/ProtectedRout";
import { UsersProvider } from "./contexts/UsersContext";
import { NotificationsProvider } from "./contexts/NotificationContext";
import Notifications from "./components/notifications";
import Qprovider from "./contexts/Qprovider";
import { NotesProvider } from "./contexts/NoteContext";
import { AdminProvider } from "./contexts/AdminContext";

const sen = Sen({
  subsets: ["latin"],
});


export const metadata = {
  title: "SALAM Admin",
  description: "Admin Dashboard For SALAM",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${sen.className} bg-boxcolor  dark:bg-subcolor antialiased `}
      
      >

      <ProtectedRoute>
        <Qprovider>
        <NotificationsProvider>

        <AdminProvider>


        <UsersProvider>
        <ProjectsProvider>
      <Notifications/>

        <Header/>        

        <TodayProvider >
        <NotesProvider>

              {children}
              </NotesProvider>

          </TodayProvider>   
        </ProjectsProvider>

        </UsersProvider> 

        </AdminProvider>
        </NotificationsProvider>

        </Qprovider>
       </ProtectedRoute> 
       
      </body>
    </html>
  );
}
