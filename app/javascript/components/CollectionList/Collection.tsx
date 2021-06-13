import React, {useState} from "react";
import {useParams} from "react-router-dom";
import MerchantListTable from "../MerchantList/MerchantListTable";
import getCollection from "../../api/getCollection";

const Collection: React.FC = () => {
  const {id} = useParams();
  const [getCollectionData, setCollectionData] = useState({
    name: '',
    pagy: {count: 0, pages: 0},
    merchants: []
  });
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0)
  const [filterQuery, setFilterQuery] = useState({});
  const fetchData = React.useCallback((queryParams?: { page?, name? }) => {
    setLoading(true);

    getCollection(id, queryParams).then(response => {
      setCollectionData(response);
      setPageCount(response.pagy.pages);
      setLoading(false);
    })
  }, []);

  return (
    <>
      <h1>{getCollectionData.name}</h1>
      <MerchantListTable
        merchantsData={getCollectionData}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        filterQuery={filterQuery}
      />
    </>
  );
};

export default Collection;