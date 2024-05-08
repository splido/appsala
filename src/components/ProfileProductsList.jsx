import React, { useState, useEffect } from 'react';
import ProfileProductItem from './ProfileProductItem';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

function ProfileProductsList({ userApps, id, savedApp }) {
  const loading = useSelector((state) => state.user.loading);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading || showSpinner) {
    return <Spinner />;
  }

  if (!userApps || userApps.length === 0) {
    return <h3>No items</h3>;
  }

  return (
    <>
      {userApps.map((info) => (
        <ProfileProductItem info={info} id={info._id} key={info._id} savedApp={savedApp} />
      ))}
    </>
  );
}

export default ProfileProductsList;
