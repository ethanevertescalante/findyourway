'use client'
import dynamic from 'next/dynamic';
import {useEffect} from "react";
import * as L from "leaflet";

//We have to disable Server Side Rendering, leaflet requires the window object which is
//not available in next.js when SSR is enabled`
// https://www.youtube.com/watch?v=qza0-qAXdzs
const Map = dynamic(() => import('./components/Map'), {
    ssr: false, // Disable server-side rendering
});



export default function App() {
  return (
    <div>
      <Map/>
    </div>

  );
}
