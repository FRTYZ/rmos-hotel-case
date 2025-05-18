'use client'
import {useEffect, useState} from 'react';

// Helpers
import { Request } from '@/helpers/Request';

// Components
import Drawer from '@/components/Drawer';
import XInput from '@/components/FormElements/XInput';
import XButton from '@/components/FormElements/XButton';

// Npm paketler
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';

// interface veya type
import { BlackListsTypes } from '@/app/types/black-lists';
import { BlackListOperationsProps } from '../blacklist';

function BlackListOperations({ 
  update:{
    isUpdateDrawerOpen,
    setIsUpdateDrawerOpen,
    selectedDataForUpdate, 
    setSelectedDataForUpdate 
  },
  delete: {
    selectedDataForDeletion,
    setSelectedDataForDeletion
  }
}: BlackListOperationsProps) {
  
    const queryClient = useQueryClient();
    const [isDrawerCreateOpen, setIsDrawerCreateOpen] = useState(false); 

    useEffect(() => {
        if(selectedDataForDeletion?.Id){
            handleDeleteList(selectedDataForDeletion)
        }
    }, [selectedDataForDeletion])

    // Form işlemleri
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: (selectedDataForUpdate?.Id ? selectedDataForUpdate.Id : ''),
            name: (selectedDataForUpdate?.Adi ? selectedDataForUpdate.Adi : ''),
            surname: (selectedDataForUpdate?.Soy ? selectedDataForUpdate.Soy : ''),
            description: (selectedDataForUpdate?.Aciklama ? selectedDataForUpdate.Aciklama : ''),
            birth_date: (selectedDataForUpdate?.Dogum_tarihi ? new Date(selectedDataForUpdate.Dogum_tarihi).toISOString().split('T')[0] : ''),
            tcNo: (selectedDataForUpdate?.Tcno && selectedDataForUpdate?.Tcno !== 'null' ? selectedDataForUpdate.Tcno  :  ''),
            country: (selectedDataForUpdate?.Ulke_xml ? selectedDataForUpdate.Ulke_xml : ''),
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
             if (tcNo === '') {
                errors.tcNo = "TC NO alanını doldurmalısınız";
            } else if (tcNo.length !== 11) {
                errors.tcNo = "TC Kimlik numaranız 11 haneli olmalı";
            }
            if (country == '') {
            errors.country = "Ülke XML alanını doldurmalısınız";
            }

            return errors;
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
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

                    setIsUpdateDrawerOpen(false);
                    setIsDrawerCreateOpen(false)
                    resetForm();
                    setSubmitting(false);
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

    /*
        Delete fonksiyonu, seçilen veriyi cache'teki veriden siler
    */
    const handleDeleteList = async(dataToDelete: BlackListsTypes) => {
        const {value} = await Swal.fire({
            title: 'Silme İşlemi',
            text: `"${dataToDelete.Id}" numaralı "${dataToDelete?.Adi} ${dataToDelete.Soy}" adlı kişinin listeden silmek istediğinizden emin misiniz ?`,
            html: `
                İgili veriyi silmek istediğinizden emin misiniz ? <br/>
                ID:  <b>${dataToDelete.Id}</b> <br/>
                Adı Soyadı:  <b>${dataToDelete.Adi} ${dataToDelete.Soy}</b> <br/>
            `,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: 'Silinsin, Kabul ediyorum',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        })

        if(value){
        // Cachte olan veriden ilgili id'ye göre filtreler
        queryClient.setQueryData(['getBlackLists'], (oldData: any) => {
            if (!oldData?.value) return oldData;

            return {
                ...oldData,
                value: oldData.value.filter((item: BlackListsTypes) => item.Id !== dataToDelete.Id)
            };
        });

        Swal.fire({
            icon: 'success',
            title: 'İşlem Başarılı',
            html: 'İlgili veri başarıyla silindi.',
            confirmButtonText: 'Tamam'
        });
        }else{
            setSelectedDataForDeletion(null)
        }
    }

  
  /*
    Update ve Create işlemleri için form
  */
    const blacklistForm = (
        <div className="bg-white text-left px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600 mb-4">
                    <p className="font-medium text-lg">Kayıt {selectedDataForUpdate ? 'Güncelleme' : 'Ekleme'}</p>
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
                            label={selectedDataForUpdate ? 'Güncelle' : 'Ekle'}
                            backgroundColor='bg-black'
                            textStyle='text-white text-[16px] font-[600]'
                            padding='px-8 py-3'
                            disabled={selectedDataForUpdate ? formik.isSubmitting || (!formik.dirty || !formik.isValid) : formik.isSubmitting || !formik.isValid}
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
                isOpen={isUpdateDrawerOpen}
                onOpenChange={(open) => setIsUpdateDrawerOpen(open)}
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
                                onClick={() => setSelectedDataForUpdate(null)}
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
        </>
    )
}

export default BlackListOperations