'use client'
import { useMemo, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table";

// Componentler
import Table from '@/components/DataTable/Table';
import XButton from '@/components/FormElements/XButton';
import XInput from '@/components/FormElements/XInput';
import TableHeader from './TableHeader';
import Drawer from '@/components/Drawer';

import { Request } from '@/helpers/Request';
import Swal from 'sweetalert2';

// Npm paketler
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

// interface ve type
import { BlackListsTypes } from '@/app/types/black-lists';

interface BlackListTableProps {
    data: BlackListsTypes[]
}

function BlackListTable({ data }: BlackListTableProps) {
    const queryClient = useQueryClient();

    // useStates
    const [selectedData, setSelectedData] = useState<BlackListsTypes | null>();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);    
    const [isDrawerCreateOpen, setIsDrawerCreateOpen] = useState(false);    

    const columns: ColumnDef<BlackListsTypes>[] = useMemo(
        () => [
            {
                accessorKey: "Adi",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Adı
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Soy",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Soyadı
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Tcno",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            TCKN
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Dogum_tarihi",
                header: () => {
                    return (
                        <div className="flex items-center gap-2 whitespace-nowrap hover:text-zinc-700">Doğum Tarihi</div>
                    );
                },
            },
            {
                accessorKey: "Sistem_tarihi",
                header: () => {
                    return (
                        <div className="flex items-center gap-2 whitespace-nowrap hover:text-zinc-700">Sistem Tarihi</div>
                    );
                },
            },
            {
                accessorKey: "Aciklama",
                header: () => {
                    return (
                        <div className="flex items-center gap-2 whitespace-nowrap hover:text-zinc-700">Açıklama</div>
                    );
                },
            },
            {
                accessorKey: "ULke Adı",
                header: () => {
                    return (
                        <div className="flex items-center gap-2 whitespace-nowrap hover:text-zinc-700">Milliyet</div>
                    );
                },
            },
            {
                id: "actions",
                header: () => <span className="whitespace-nowrap hover:text-zinc-700">İşlemler</span>,
                cell: ({ row }) => {
                    const data = row.original

                    return (
                        <div className="flex items-center justify-end gap-4">
                            <XButton 
                                label={
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square w-4 h-4" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        Düzenle
                                    </>
                                }
                                backgroundColor='bg-black'
                                textStyle='text-white text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit flex items-center gap-2"
                                onClick={() => 
                                    {
                                        setSelectedData(data);
                                        setIsDrawerOpen(!isDrawerOpen)
                                    }
                                }
                            />
                            <XButton 
                                label={
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-trash3 w-4 h-4" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                        Sil
                                    </>
                                }
                                backgroundColor='bg-red-500'
                                textStyle='text-white text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit flex items-center gap-2"
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    // Formikler
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: (selectedData?.Id ? selectedData.Id : ''),
            name: (selectedData?.Adi ? selectedData.Adi : ''),
            surname: (selectedData?.Soy ? selectedData.Soy : ''),
            description: (selectedData?.Aciklama ? selectedData.Aciklama : ''),
            birth_date: (selectedData?.Dogum_tarihi ? new Date(selectedData.Dogum_tarihi).toISOString().split('T')[0] : ''),
            tcNo: (selectedData?.Tcno ? selectedData.Tcno :  ''),
            country: (selectedData?.Ulke_xml ? selectedData.Ulke_xml : ''),
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            const {name, surname, description, birth_date, tcNo, country } = values;

            if (name == '') {
              errors.name = "Ad alanını doldurmalısınız";
            }
            if (surname == '') {
              errors.surname = "Soyad alanını doldurmalısınız";
            }
            if (description == '') {
              errors.description = "Açıklama alanını doldurmalısınız";
            }
            if (!birth_date) {
              errors.birth_date = "Doğum Tarihi belirlemelisiniz";
            }
            if (tcNo == '') {
              errors.tcNo = "TC NO alanını doldurmalısınız";
            }
            if (country == '') {
              errors.country = "Ülke XML alanını doldurmalısınız";
            }

            return errors;
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const {id, name, surname, description, birth_date, tcNo, country} = values;

                const response = await Request({
                    method: 'POST',
                    url: '/Kara/Ekle',
                    data:  {
                        db_Id: 9,
                        Id: id === '' ? 0 : id,
                        Adi: name,
                        Soy: surname,
                        Aciklama: description,
                        Dogum_tarihi: birth_date,
                        Tcno: tcNo,
                        Ulke_xml: country
                    }
                });

                if (response.isSucceded) {
                    Swal.fire({
                        icon: 'success',
                        title: 'İşlem Başarılı',
                        html: `İlgili veri ${id ? 'güncellendi' : 'oluşturuldu.'}`,
                        confirmButtonText: 'Tamam'
                    });

                    queryClient.invalidateQueries({ queryKey: ['getBlackLists'] });

                    setIsDrawerOpen(false);
                    setIsDrawerCreateOpen(false)
                    resetForm();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata',
                        text: response.errors.message || 'İşlem başarısız oldu.',
                    });
                }

            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: error.response?.data?.errors.title || error.message || 'Bir hata oluştu!',
                });
            }
        }
    })
    
    const blacklistForm = (
        <div className="bg-white text-left px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 mb-4">
                    <p className="font-medium text-lg">Kayıt {selectedData ? 'Güncelleme' : 'Ekleme'}</p>
                    <p>Lütfen gerekli alanları doldurun</p>
                </div>
                <form
                    method='PUT'
                    onSubmit={formik.handleSubmit}
                    className="lg:col-span-2 block space-y-6"
                >
                    <XInput
                        type='text'
                        name='name'
                        placeholder='Ad'
                        labelType='top'
                        label='Adı'
                        errorMessage={formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        tabIndex={2}
                    />
                    <XInput
                        type='text'
                        name='surname'
                        placeholder='Soyadı'
                        labelType='top'
                        label='Soyadı'
                        errorMessage={formik.errors.surname}
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        tabIndex={3}
                    />
                    <XInput
                        type='text'
                        name='description'
                        placeholder='Açıklama'
                        labelType='top'
                        label='Açıklama'
                        errorMessage={formik.errors.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        tabIndex={4}
                        rows="10" 
                        cols="30"
                    />
                    <XInput
                        type='date'
                        name='birth_date'
                        label="Doğum Tarihi"
                        placeholder="Doğum Tarihi"
                        labelType="top"
                        addStyle="placeholder-gray-500"
                        errorMessage={formik.errors.birth_date}
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                        tabIndex={5}
                    />
                    <XInput
                        type='text'
                        name='tcNo'
                        placeholder='TC NO'
                        labelType='top'
                        label='TC NO'
                        maxLength={11}
                        errorMessage={formik.errors.tcNo}
                        value={String(formik.values.tcNo)}
                        onChange={(e) => {
                            if (/^\d*$/.test(e.target.value)) {
                            formik.setFieldValue('tcNo', e.target.value);
                            }
                        }}
                        tabIndex={6}
                    />
                     <XInput
                        type='text'
                        name='country'
                        placeholder='Ülke Xml'
                        labelType='top'
                        label='Ülke Xml'
                        errorMessage={formik.errors.country}
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        tabIndex={7}
                    />
                    <div className="md:col-span-5 text-right">
                        <XButton 
                            type='submit'
                            label={selectedData ? 'Güncelle' : 'Ekle'}
                            backgroundColor='bg-black'
                            textStyle='text-white text-[16px] font-[600]'
                            padding='px-8 py-3'
                            disabled={!formik.dirty || !formik.isValid}
                            radius='rounded-lg'
                            addStyle="!w-fit"
                            tabIndex={6}
                        />
                    </div>
                </form>
            </div>
        </div>
    )

    return (
        <>
            <Drawer
                buttonContent={null}
                isOpen={isDrawerOpen}
                onOpenChange={(open) => setIsDrawerOpen(open)}
                backgroundColor='bg-white'
                side='right'
                padding='px-8 pt-12'
                width='w-[100vw] lg:w-[80vw]'
            >
                {blacklistForm}
            </Drawer>
            <header className="grid grid-cols-2 py-4 px-5 items-center border-b border-gray-300">
                <p className="font-[600] text-[20px] py-4">Black List</p>
                <div  className="text-end">
                    <Drawer
                        buttonContent={
                            <XButton 
                                label="Yeni Kayıt Ekle"
                                backgroundColor='bg-white'
                                textStyle='text-black text-[16px] font-[600]'
                                padding='px-4 py-2 lg:px-8 lg:py-3'
                                radius='rounded-lg'
                                addStyle="!w-fit border border-gray-500"
                                onClick={() => setSelectedData(null)}
                            />
                        }
                        isOpen={isDrawerCreateOpen}
                        onOpenChange={(open) => setIsDrawerCreateOpen(open)}
                        backgroundColor='bg-white dark:bg-primary-dark'
                        side='right'
                        padding='px-8 pt-12'
                        width='w-[100vw] lg:w-[80vw]'
                    >
                    {blacklistForm}
                    </Drawer>
                </div>
            </header>
            <div  className="w-full px-4 bg-white rounded-sm ">
                <Table
                    data={data!}
                    columns={columns}
                />
            </div>
        </>
        
    )
}

export default BlackListTable