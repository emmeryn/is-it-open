import React, {useEffect, useState} from 'react'
import MerchantListTable from "./MerchantListTable";
import getMerchants from "../../api/getMerchants";

const MerchantList: React.FC = () => {
  const [getMerchantsData, setMerchantsData] = useState({
    pagy: {count: 0, pages: 0},
    merchants: []
  });
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = React.useState(0)

  const getMerchantsApi = (queryParams?: {page?: number, name?: string}) => {
    setLoading(true);

    getMerchants(queryParams).then(response => {
      setMerchantsData(response);
      setLoading(false);
    })
  };

  useEffect(() => {
    getMerchantsApi();
  }, []);

  const fetchData = React.useCallback((queryParams?: { page, name }) => {
    setLoading(true);

    getMerchants(queryParams).then(response => {
      setMerchantsData(response);
      setPageCount(response.pagy.pages);
      setLoading(false);
    })
  }, []);

  return (
    <div>
      <h2>
        Merchants
      </h2>
      <MerchantListTable
        merchantsData={getMerchantsData}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </div>
  );
}

export default MerchantList;