import React, {useState} from 'react'
import MerchantListTable from "./MerchantListTable";
import getMerchants from "../../api/getMerchants";

const MerchantList: React.FC = () => {
  const [getMerchantsData, setMerchantsData] = useState({
    pagy: {count: 0, pages: 0},
    merchants: []
  });
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0)
  const [filterQuery, setFilterQuery] = useState({});

  const fetchData = React.useCallback((queryParams?: { page?, name? }) => {
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
        Search for restaurants:
        <input type="text" onBlur={(e) => {
          setFilterQuery({...filterQuery, name: e.target.value})
        }} />
        open on date:
        <input type="date" onBlur={(e) => {
          setFilterQuery({...filterQuery, date_open: e.target.value})
        }} />
        at time:
        <input type="time" onBlur={(e) => {
          setFilterQuery({...filterQuery, time_open: e.target.value})
        }} />
      </h2>
      <MerchantListTable
        merchantsData={getMerchantsData}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        filterQuery={filterQuery}
      />
    </div>
  );
}

export default MerchantList;