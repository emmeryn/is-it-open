import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import getCollections from "../../api/getCollections";

const CollectionList: React.FC = () => {
  const [getCollectionsData, setCollectionsData] = useState({
    pagy: {count: 0, pages: 0},
    collections: []
  });
  const [loading, setLoading] = useState(false);
  const fetchData = React.useCallback((queryParams?: { page? }) => {
    setLoading(true);

    getCollections(queryParams).then(response => {
      setCollectionsData(response);
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      {loading ?
        "Loading..." :
        getCollectionsData.collections.map(collection => (
          <div key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
          </div>
        ))
      }
    </div>
  )
};

export default CollectionList;