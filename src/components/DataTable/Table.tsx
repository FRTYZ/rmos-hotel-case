import { useState } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    FilterFn,
    PaginationState,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

// FormElementleri
import XButton from "../FormElements/XButton";
import XSelectBox from "../FormElements/XSelectBox";

import { TableProps } from "./DataTable";

export function Table<TData, TValue>({
    columns,
    data = []
}: TableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            pagination,
        },
    });

    const showDataText = `${
        table.getPrePaginationRowModel().rows.length
    } veriden ${
        table.getState().pagination.pageIndex + 1
    } - ${table.getPageCount()} arası gösteriliyor`;

    return (
        <>
            <div className="flex my-8">
               <XSelectBox
                name="selectCause"
                label="Sayfa başı"
                labelType="top"
                inputClassName="!h-4"
                placeholder="Gösterim sayısı"
                value={table.getState().pagination.pageSize}
                values={[
                    {
                        value: 10,
                        label: 'Varsayılan',
                    },
                    {
                        value: 20,
                        label: 20,
                    },
                    {
                        value: 30,
                        label: 30,
                    },
                    {
                        value: 40,
                        label: 40,
                    },
                ]}
                onChange={(e) => {
                    table.setPageSize(
                        Number(e.target.value)
                    );
                }}
                tabIndex={1}
            />
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                  return (
                                      <th className="p-2 whitespace-nowrap" key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                    header.column
                                                        .columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                      </th>
                                  );
                              })}
                          </tr>
                      ))}
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                          {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() &&
                                            "selected"
                                        }
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <td className="p-2 whitespace-nowrap" key={cell.id}>
                                                    {flexRender(
                                                        cell.column
                                                            .columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-2 whitespace-nowrap h-24 text-center"
                                        colSpan={columns.length}
                                    >
                                        Veri bulunmuyor. Dilerseniz yeni kayıt ekleyebilirsiniz.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr className=" border-y border-gray-400">
                            <td colSpan={columns.length}>
                                <div className="grid grid-cols-2 gap-4 items-center my-2 mx-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        {showDataText}
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                        <XButton 
                                            label="Geri"
                                            disabled={!table.getCanPreviousPage()}
                                            onClick={() => table.previousPage()}
                                            textStyle='text-black text-[16px] font-[600]'
                                            padding='p-[5px]'
                                            radius='rounded-lg'
                                            addStyle="!w-fit border border-gray-400"
                                        />
                                        <XButton 
                                            label="İleri"
                                            disabled={!table.getCanNextPage()}
                                            onClick={() => table.nextPage()}
                                            textStyle='text-black text-[16px] font-[600]'
                                            padding='p-[5px]'
                                            radius='rounded-lg'
                                            addStyle="!w-fit border border-gray-400"
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default Table;
