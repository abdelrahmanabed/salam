'use client'
import Image from "next/image";
import ProjectsContainer from "./components/PrContainer/ProjectsContainer";
import AdminCon from "./components/AdContainer/AdminCon";
import ProtectedRoute from "./components/ProtectedRout";

export default function Home() {
  
  return (

<ProtectedRoute>
    <ProjectsContainer/>
<AdminCon/>
</ProtectedRoute>
  );
}
