import React, {useEffect, useState} from "react";
import getCollections from "../../api/getCollections";
import createCollection from "../../api/createCollection";
import {Button, FormControl, InputGroup, ListGroup} from "react-bootstrap";

const CollectionList: React.FC = () => {
  const [getCollectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const fetchData = React.useCallback(() => {
    setLoading(true);

    getCollections().then(response => {
      setCollectionsData(response);
      setLoading(false);
    })
  }, []);

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <h1>Collections</h1>
      <InputGroup>
        <FormControl
          value={newCollectionName}
          onChange={(e) => {
            setNewCollectionName(e.target.value);
          }}
          placeholder="Collection name..."
        />
        <Button disabled={newCollectionName === ''} onClick={() => {
          setLoading(true);
          createCollection({name: newCollectionName})
            .then(response => {
              fetchData();
              setLoading(false);
              setNewCollectionName('');
            });
        }}>Create new collection</Button>
      </InputGroup>
      <ListGroup defaultActiveKey="#link1">
      {loading ?
        "Loading..." :
        getCollectionsData.map(collection => (
          <ListGroup.Item action href={`/collections/${collection.id}`} key={collection.id}>
            {collection.name}
          </ListGroup.Item>
        ))
      }
      </ListGroup>
    </div>
  )
};

export default CollectionList;