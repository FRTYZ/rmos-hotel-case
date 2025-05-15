'use client'
import { useMemo, useState } from 'react'

// Components
import XButton from '@/components/FormElements/XButton';

// Partials
import TarihTablo from './Partials/TarihTablo';


function index() {
    const [activeTab, setActiveTab] = useState<'date' | 'graph'>('date');

    return ( 
        <div className="w-full mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-300 mb-4">
                <XButton 
                    onClick={() => setActiveTab('date')}
                    label={'Tarih Forecast'}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'date'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                />
                
                <XButton 
                    onClick={() => setActiveTab('graph')}
                    label={'Forecast Grafiği'}
                    className={`ml-4 px-4 py-2 text-sm font-medium ${
                        activeTab === 'graph'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                />
            </div>

            {/* Content */}
            <div>
                {activeTab === 'date' && (
                    <TarihTablo />
                )}

                {activeTab === 'graph' && (
                    <p>Grafik</p>
                )}
            </div>
        </div>
    )
}

export default index