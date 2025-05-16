import { Suspense } from 'react'

import OtelStatsContainer from './Partials/OtelStatsContainer';

export default function HomePage() {
  return (
    <div className="w-full mx-auto">
         <Suspense>
            <OtelStatsContainer />
         </Suspense>
    </div>
  );
}
