import React from "react";
import { Routes, Route } from 'react-router-dom';
import Cms from "../screens/cms/Cms";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Cms />} />
        </Routes>
    )
}

export default Routing;