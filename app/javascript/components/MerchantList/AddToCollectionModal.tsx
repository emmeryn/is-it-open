import React, {useEffect, useState} from "react";
import {Button, ListGroup, Modal, ModalBody, ModalFooter, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import PropTypes from "prop-types";
import getCollections from "../../api/getCollections";
import updateCollection from "../../api/updateCollection";


interface AddToCollectionModalProps {
  hideModal: () => void;
  isOpen: boolean,
  merchantId?: number
}

const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({hideModal, isOpen, merchantId}) => {
  const [getCollectionsData, setCollectionsData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const addMerchantToCollection = (collectionId: number) => {
    setLoading(true);
    updateCollection(collectionId, {merchant_ids: [merchantId]})
      .then((response) => {
        setLoading(false);
        hideModal();
      })
  };

  return(
    <Modal show={isOpen}>
      <ModalHeader>
        <ModalTitle>Add to Collection</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {loading ?
          "Loading..." :
          getCollectionsData.map(collection => (
            <ListGroup.Item
              action
              onClick={() => addMerchantToCollection(collection.id)}
              key={collection.id}>
              {collection.name}
            </ListGroup.Item>
          ))
        }
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={hideModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
};

AddToCollectionModal.propTypes = {
  hideModal: PropTypes.func,
  isOpen: PropTypes.bool,
  merchantId: PropTypes.number
}
export default AddToCollectionModal;