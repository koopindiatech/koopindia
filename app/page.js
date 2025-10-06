"use client"
import HeroSection from "@/components/ui/hero";
import Image from "next/image";
import EnquiryModal from "@/components/forms/EnquiryForm";
import { useState } from "react";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
      <div>
      {/* Hero Section */}
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}













// "use client";
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export default function VlogsPage() {
//   const [vlogs, setVlogs] = useState([]);

//   useEffect(() => {
//     const fetchVlogs = async () => {
//       const querySnapshot = await getDocs(collection(db, "vlogs"));
//       const vlogsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setVlogs(vlogsData);
//     };
//     fetchVlogs();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto py-10">
//       <h1 className="text-3xl font-bold text-center mb-10">🎬 Latest Vlogs</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {vlogs.map((vlog) => (
//           <div
//             key={vlog.id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
//           >
//             <img
//               src={vlog.thumbnail}
//               alt={vlog.title}
//               className="w-full h-56 object-cover"
//             />

//             <div className="p-5">
//               <h2 className="text-xl font-semibold mb-2">{vlog.title}</h2>
//               <p className="text-gray-600 text-sm mb-3">{vlog.description}</p>

//               {/* Video Embed */}
//               {vlog.videoUrl.includes("youtube") ? (
//                 <iframe
//                   width="100%"
//                   height="250"
//                   src={vlog.videoUrl.replace("watch?v=", "embed/")}
//                   title={vlog.title}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   className="rounded-xl"
//                 ></iframe>
//               ) : (
//                 <video
//                   src={vlog.videoUrl}
//                   controls
//                   className="w-full rounded-xl mt-2"
//                 ></video>
//               )}

//               <p className="text-gray-400 text-xs mt-3">
//                 {new Date(vlog.date).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




 {/* Hero Section */}

      //  const [searchQuery, setSearchQuery] = useState('');
       
     
      // <section className="bg-gradient-to-r from-[#141d32] via-[#1c2545] to-[#141d32] text-white py-20">
      //   <div className="max-w-6xl mx-auto px-4">
      //     <div className="text-center space-y-6">
      //       <h1 className="text-5xl font-extrabold">
      //         Koop India <span className="text-[#F97316]">Insights</span>
      //       </h1>
      //       <p className="text-xl text-gray-300 max-w-3xl mx-auto">
      //         Expert advice, industry trends, and actionable strategies to help your business thrive
      //       </p>
            
      //       {/* Search Bar */}
      //       <div className="max-w-2xl mx-auto mt-8">
      //         <div className="relative">
      //           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      //           <input
      //             type="text"
      //             placeholder="Search articles..."
      //             value={searchQuery}
      //             onChange={(e) => setSearchQuery(e.target.value)}
      //             className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </section>