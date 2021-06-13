import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import getCollections from "../../api/getCollections";
import createCollection from "../../api/createCollection";

const CollectionList: React.FC = () => {
  const [getCollectionsData, setCollectionsData] = useState({
    pagy: {count: 0, pages: 0},
    collections: []
  });
  const [loading, setLoading] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
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
      <input type="text" value={newCollectionName} onChange={(e) => {
        setNewCollectionName(e.target.value);
      }} />
      <button onClick={() => {
        setLoading(true);
        createCollection({name: newCollectionName}).then(response => {
          fetchData();
          setLoading(false);
          setNewCollectionName('');
        });
      }}>Create new collection</button>

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