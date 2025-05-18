'use client'
import React from 'react'

// Form Inputları
import XInput from '@/components/FormElements/XInput';
import XButton from '@/components/FormElements/XButton';

// State management
import { useAuthStore } from '@/store/useAuthStore'

// Request helper
import { HandleLoginToken } from '@/helpers/Request';

// Router
import { useRouter } from "next/navigation";

// Npm paketleri
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

function page() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors: { [key: string]: string } = {};

            const {email, password} = values;

            if(email == ''){
                errors.email = 'Mail alanını doldurmalısınız.'
            }
            if(password == ''){
                errors.password = 'Parolanızı girmelisiniz.'
            }

            return errors
        },
        onSubmit: async (values, { setSubmitting }) => {
            const {email, password} = values

            const getToken = await HandleLoginToken(email, password);

            if (getToken.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: `${getToken.error} - ${getToken.error_description}`,
                })
            }else{
                login(email, String(getToken));
                Swal.fire({
                    icon: 'success',
                    title: 'Giriş Yapıldı.',
                    showConfirmButton: false,
                    timer: 1500
                })
                setSubmitting(false);
                router.push('/')
            }
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="RMOS"
                    src={'logo.png'}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Giriş Yap
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    method='POST'
                    onSubmit={formik.handleSubmit}
                    className='space-y-6'
                >
                    <XInput
                        type='email'
                        name='email'
                        placeholder='E-mail'
                        labelType='top'
                        label='E-mail adresi'
                        errorMessage={formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        tabIndex={2}
                    />
                    <XInput
                        type='password'
                        name='password'
                        placeholder='Parola'
                        labelType='top'
                        label='Parola'
                        errorMessage={formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        tabIndex={2}
                    />
                    <XButton 
                        label="Giriş yap"
                        backgroundColor='bg-black'
                        textStyle='text-white text-[16px] font-[600]'
                        padding='px-8 py-3'
                        radius='rounded-lg'
                        addStyle="!w-full"
                        tabIndex={6}
                        disabled={formik.isSubmitting || (!formik.dirty || !formik.isValid)}
                    />
                </form>
            </div>
        </div>
    )
}

export default page