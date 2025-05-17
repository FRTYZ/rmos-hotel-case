import { BlackListsTypes } from '@/app/types/black-lists';

// Black list operations
export interface BlackListOperationsProps {
  update: {  
    isUpdateDrawerOpen: boolean;
    setIsUpdateDrawerOpen: (isUpdateDrawerOpen: boolean) => void;
    selectedDataForUpdate: BlackListsTypes;
    setSelectedDataForUpdate: (selectedData: BlackListsTypes | null) => void
  };
  delete: {
    selectedDataForDeletion: BlackListsTypes
    setSelectedDataForDeletion: (selectedDataForDeletion:BlackListsTypes | null) => void
  }
}

// Black list table
interface BlackListTableProps {
    data: BlackListsTypes[]
}

