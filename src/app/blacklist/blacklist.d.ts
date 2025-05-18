import { BlackListsTypes } from '@/app/types/black-lists';

// Blacklist operations
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

// Blacklist table
interface BlackListTableProps {
    data: BlackListsTypes[]
}

