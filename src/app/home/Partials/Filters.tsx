'use client'

import { useState } from "react"

// Componentler
import Drawer from "../../../components/Drawer";

// Form Elementleri
import XInput from "../../../components/FormElements/XInput";
import XButton from "../../../components/FormElements/XButton";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

const Filters = () => {
 
    // Router ve param
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const params = new URLSearchParams(window.location.search);

    const startDateParam = searchParams.get('start_date');
    const endDateParam = searchParams.get('end_date');

    // useStateler
    const [startDate, setStartDate] = useState<string>(startDateParam ? startDateParam : '');
    const [endDate, setEndDate] = useState<string>(endDateParam ? endDateParam : '');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Form Elemanlarımız
    const startDateInput = (
        <XInput
            type='date'
            value={startDate}
            onChange={(e) => {
                setStartDate(e.target.value)
            }}
            label="Başlangıç Tarih"
            placeholder="Başlangıç Tarih"
            labelType="top"
            tabIndex={4}
            addStyle="!h-5 placeholder-gray-500"
        />
    )

    const endDateInput = (
        <XInput
            type='date'
            value={endDate}
            onChange={(e) => {
                setEndDate(e.target.value)
            }}
            label="Bitiş tarih"
            placeholder="Bitiş tarih"
            labelType="top"
            tabIndex={5}
            addStyle="!h-5 placeholder-gray-500"
        />
    )

    const rightButtonFilter = (
        <XButton 
            label="Filtrele"
            backgroundColor='bg-green-400'
            textStyle='text-white text-[16px] font-[600]'
            padding='px-8 py-2'
            radius='rounded-lg'
            addStyle="lg:!w-fit"
            onClick={() => handleRightFilters()}
            tabIndex={6}
        />
    )

    const rightButtonClear = (
        <XButton 
            label="Temizle"
            backgroundColor='bg-gray-500'
            textStyle='text-white text-[16px] font-[600]'
            padding='px-8 py-2'
            radius='rounded-lg'
            addStyle="lg:!w-fit"
            onClick={() => handleResetFilters()}
            tabIndex={7}
        />
    )

    // Filtreleme fonksiyonu
    const handleRightFilters = () => {

        if (!startDate || !endDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Geçersiz Filtreleme',
                text: 'Bitiş tarihi veya başlangıç tarihini seçmelisiniz.',
                confirmButtonText: 'Tamam',
            });
            return;
        }

        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            Swal.fire({
                icon: 'warning',
                title: 'Geçersiz Tarih',
                text: 'Bitiş tarihi, başlangıç tarihinden önce olamaz.',
                confirmButtonText: 'Tamam',
            });
            return;
        }

        if (startDate) {
            params.set('start_date', startDate);
        } else {
            params.delete('start_date');
        }

        if (endDate) {
            params.set('end_date', endDate);
        } else {
            params.delete('end_date');
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        setIsDrawerOpen(false)
    }

    // Filtreleme temizleme fonksiyonu
    const handleResetFilters = () => {
        setIsDrawerOpen(false);

        setStartDate('');
        setEndDate('');

        // URLSearchParams'tan tarih filtrelerini sil
        params.delete('start_date');
        params.delete('end_date');

        // URL'yi güncelle
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
            <div className="grid lg:flex py-4 gap-4 justify-end border-y border-gray-400">
                {/* Desktop görünümü için */}
                <div className="hidden lg:flex gap-4 lg:grid-cols-5">
                    {startDateInput}
                    {endDateInput}
                    {rightButtonFilter}
                    {rightButtonClear}
                </div>
                {/* Mobil, Tablet görünüm için drawer kullanıldı */}
                <div className="flex lg:hidden">
                    <Drawer
                        buttonContent={
                            <XButton 
                                label={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill w-6 h-6" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                                    </svg>
                                }
                                backgroundColor='bg-white'
                                textStyle='text-black text-[16px] font-[600]'
                                padding='px-4 py-2'
                                radius='rounded-lg'
                                addStyle="!w-fit border border-gray-500"
                            />
                        }
                        isOpen={isDrawerOpen}
                        onOpenChange={(open) => setIsDrawerOpen(open)}
                        backgroundColor='bg-white dark:bg-primary-dark'
                        side='right'
                        padding='px-8 pt-12'
                        width='!w-[100vw] lg:w-[80vw]'
                    >
                        <div className="grid grid-cols-1 gap-4 mt-5 lg:grid-cols-5">
                            {startDateInput}
                            {endDateInput}
                            {rightButtonFilter}
                            {rightButtonClear}
                        </div>
                    </Drawer>
                </div>
            </div>
    )

}

export default Filters