import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useTable, usePagination} from 'react-table'
import {Button, Nav, Table} from "react-bootstrap";
import {GetMerchantsResponse} from "../../api/getMerchants";
import AddToCollectionModal from "./AddToCollectionModal";

export interface MerchantListTableProps {
  merchantsData: GetMerchantsResponse,
  fetchData: (queryParams: Record<string, unknown>) => void,
  loading: boolean,
  pageCount: number,
  filterQuery: {
    name?: string,
    date_open?: string,
    time_open?: string
  }
}

const toTimeString = (opens_at, closes_at) => {
  if (opens_at === null || closes_at === null) {
    return 'Closed';
  }
  return `${opens_at.hour}:${opens_at.minute.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })} - ${closes_at.hour}:${closes_at.minute.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })}`
};

const MerchantListTable: React.FC<MerchantListTableProps> = (
  {
    merchantsData,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    filterQuery
  }) => {
  const {pagy, merchants} = merchantsData;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Sunday',
        accessor: 'sunday',
      },
      {
        Header: 'Monday',
        accessor: 'monday',
      },
      {
        Header: 'Tuesday',
        accessor: 'tuesday',
      },
      {
        Header: 'Wednesday',
        accessor: 'wednesday',
      },
      {
        Header: 'Thursday',
        accessor: 'thursday',
      },
      {
        Header: 'Friday',
        accessor: 'friday',
      },
      {
        Header: 'Saturday',
        accessor: 'saturday',
      },
    ],
    []
  );
  const [addToCollectionModalProps, setAddToCollectionModalProps] = useState({
    isOpen: false,
    merchantId: null
  });

  const data = merchants.map(merchant => {
    return {
      id: merchant.id,
      name: merchant.name,
      sunday: toTimeString(merchant.sunday_opens_at, merchant.sunday_closes_at),
      monday: toTimeString(merchant.monday_opens_at, merchant.monday_closes_at),
      tuesday: toTimeString(merchant.tuesday_opens_at, merchant.tuesday_closes_at),
      wednesday: toTimeString(merchant.wednesday_opens_at, merchant.wednesday_closes_at),
      thursday: toTimeString(merchant.thursday_opens_at, merchant.thursday_closes_at),
      friday: toTimeString(merchant.friday_opens_at, merchant.friday_closes_at),
      saturday: toTimeString(merchant.saturday_opens_at, merchant.saturday_closes_at),
    }
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize},
  } = useTable(
    {
      columns,
      data,
      initialState: {pageSize: 20, pageIndex: 0},
      manualPagination: true,
      pageCount: controlledPageCount
    },
    usePagination,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...columns,
        {
          id: 'addToCollection',
          Header: (header) => (<></>),
          Cell: ({row}) =>
            (
              <Button onClick={() => {
                setAddToCollectionModalProps({isOpen: true, merchantId: row.original.id})
              }} variant="outline-primary" size="sm">
                ⭐
              </Button>
            ),
        },
      ])
    }
  );

  useEffect(() => {
    fetchData({page: pageIndex + 1, ...filterQuery})
  }, [fetchData, pageIndex, pageSize, filterQuery])

  return (
    <>
      <Table striped bordered size="sm" {...getTableProps()}>
        <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th key={column.id}
                  {...column.getHeaderProps()}
              >
                {column.render('Header')}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
              </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td key={`${cell.column.id}_${cell.row.id}`}
                    {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
        <tr>
          {loading ? (
            <td colSpan={10}>Loading...</td>
          ) : (
            <td colSpan={10}>
              Showing {page.length} of {pagy.count}{' '}
              results
            </td>
          )}
        </tr>
        </tbody>
      </Table>
      <Nav>
        <ul className="pagination">
          <li className="page-item">
            <Button variant="link" className="page-link" onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}>{'<<'}</Button>
          </li>
          <li className="page-item">
            <Button variant="link" className="page-link" onClick={() => previousPage()}
                    disabled={!canPreviousPage}>{'<'}</Button>
          </li>
          <li className="page-item">
            <Button variant="link" className="page-link" onClick={() => nextPage()}
                    disabled={!canNextPage}>{'>'}</Button>
          </li>
          <li className="page-item">
            <Button variant="link" className="page-link" onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}>{'>>'}</Button>
          </li>
        </ul>
        <span>
          Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong> | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{width: '100px'}}
          />
        </span>
      </Nav>
      <AddToCollectionModal
        hideModal={() => {
          setAddToCollectionModalProps({isOpen: false, merchantId: null})
        }}
        {...addToCollectionModalProps} />
    </>
  );
};

MerchantListTable.propTypes = {
  merchantsData: PropTypes.shape({
    pagy: PropTypes.shape({
      count: PropTypes.number,
      pages: PropTypes.number
    }),
    merchants: PropTypes.array
  }),
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
  pageCount: PropTypes.number,
  filterQuery: PropTypes.shape({
    name: PropTypes.string,
    date_open: PropTypes.string,
    time_open: PropTypes.string
  })
}

export default MerchantListTable;