
'use client'
import { useState, useEffect } from 'react'
import XButton from '@/components/FormElements/XButton';
import { useRouter, usePathname } from 'next/navigation';

function Tabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<'date' | 'graph'>('date');

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
                    onClick={() => setActiveTab('date')}
                    label={'Tarih'}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'date'
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