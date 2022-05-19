import React from 'react';
import WarehouseButtons from '../Components/WarehouseButton';
import WarehouseNavBar from '../Components/WarehouseNavBar';
import WarehouseTable from '../Components/WarehouseTable';

function WarehousePage(){
    return(
        <>
            <WarehouseNavBar />
            <WarehouseButtons />
            <WarehouseTable />
        </>
    )
}

export default WarehousePage;