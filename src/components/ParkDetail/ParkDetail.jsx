import React from 'react';
import { useParams } from 'react-router-dom';

export default function ParkDetail() {
  const { parkCode } = useParams();

  return (
    <>
      <div>{parkCode}</div>
    </>
  );
}
