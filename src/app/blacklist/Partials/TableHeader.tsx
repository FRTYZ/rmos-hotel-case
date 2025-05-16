import React from 'react'
import XButton from '@/components/FormElements/XButton'
import Drawer from '@/components/Drawer'

function TableHeader() {
  return (
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
                      />
                  }
                  backgroundColor='bg-white dark:bg-primary-dark'
                  side='right'
                  padding='px-8 pt-12'
                  width='!w-[100vw] lg:w-[80vw]'
              >
                <>asdada</>
              </Drawer>
          </div>
        </header>
  )
}

export default TableHeader