import React from 'react';
// import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { MdMobileFriendly } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoIosHelpBuoy } from "react-icons/io";
import "./preFooter.scss"
import { Link } from 'react-router-dom';

function PreFooter() {
    return (
        <div className='preFooter'>
            <div className='preFooter__info'>
                <Link to={ "/" }>
                    <MdMobileFriendly />
                    <p>#DownloadApp</p>
                </Link>
            </div>
            <div className='preFooter__info'>
                <Link to={ "/" }>
                    <GoLocation />
                    <p>#Contatti</p>
                </Link>
            </div>
            <div className='preFooter__info'>
                <Link to={ "/" }>
                    <IoIosHelpBuoy />
                    <p>#Help</p>
                </Link>
            </div>
        </div>
    )
}

export default PreFooter