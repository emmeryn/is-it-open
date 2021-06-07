import React, {useEffect, useState} from 'react'

const MerchantList: React.FC = () => {
  const [getMerchants, setMerchants] = useState([]);

  useEffect(() => {
    fetch('/api/v1/merchants')
      .then(merchants => merchants.json())
      .then(merchants => {
        setMerchants(merchants)
      })
  }, []);

  return (
    <div>
      <h2>
        Merchants
      </h2>
      {getMerchants.map(merchant => {
        return <div key={merchant.id}>{merchant.name}</div>
      })}
    </div>
  )
}

export default MerchantList;