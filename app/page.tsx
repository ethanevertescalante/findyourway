'use client'
import dynamic from 'next/dynamic';
import HeaderAuth from "@/app/CustomUI/HeaderAuth";

//We have to disable Server Side Rendering, leaflet requires the window object which is
//not available in next.js when SSR is enabled`
// https://www.youtube.com/watch?v=qza0-qAXdzs
const Map = dynamic(() => import('@/app/CustomUI/Map'), {
    ssr: false, // Disable server-side rendering
});

export default function App() {
  return (
    <div>
      <Map/>
    </div>
  );
}
