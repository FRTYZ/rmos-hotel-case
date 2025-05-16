'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'

import TableHeader from './Partials/TableHeader';
import BlackListTable from './Partials/BlackListTable';
import HomePageLazy from '@/components/Lazy/HomePage';

// Helpers
import { Request } from '@/helpers/Request';

function page() {
  /*
      Black liste verilerini alır
  */
  const getBlackLists = async() => {
      const payload = {
        db_Id: 9,
        Adi: "ALL?",
        Tip: 9
      }

      // API İsteğini helper fonksiyon ile yaptık
      const blackLists = await Request({
          method: 'POST',
          url: '/Kara/Getir_Kod',
          data: payload
      });

      return blackLists
  } 

  /*
      React Query ile verilerin yönetilmesi
  */
  const {
        data: blackLists,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['getBlackLists'],
        queryFn: () => getBlackLists(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
  });

  return (
      <div className="w-full mx-auto">
          <div  className="w-full bg-white rounded-sm">
            {!isLoading && blackLists?.value ? (
                <BlackListTable data={blackLists.value} /> 
            ): (
                <HomePageLazy />
            )}
        </div>
      </div>
  )
}

export default page