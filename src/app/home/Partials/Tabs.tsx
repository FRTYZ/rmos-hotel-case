
'use client'
import { useState, useEffect } from 'react'

// Componentler
import XButton from '@/components/FormElements/XButton';

// Next router
import { useRouter, usePathname } from 'next/navigation';

function Tabs() {
    const router = useRouter();
    const pathname = usePathname();

    const [activeTab, setActiveTab] = useState<'table' | 'graph'>('table');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if(activeTab){
            params.set('type', activeTab)
        }else{
            params.delete('type', activeTab)
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    }, [activeTab])
    
    return (
        <div className="flex justify-center border-b border-gray-300 mb-4">
            <XButton 
                onClick={() => setActiveTab('table')}
                label={'Tablo'}
                className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'table'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
            />
            <XButton 
                onClick={() => setActiveTab('graph')}
                label={'Grafik'}
                className={`ml-4 px-4 py-2 text-sm font-medium ${
                    activeTab === 'graph'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
            />
        </div>
    )
}

export default Tabs