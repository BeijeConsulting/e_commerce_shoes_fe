import React from 'react';
import PropTypes from 'prop-types';
import { MdMobileFriendly } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoIosHelpBuoy } from "react-icons/io";
import "./preFooter.scss"
import { Link } from 'react-router-dom';

function PreFooter(props) {
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

PreFooter.defaultProps = {

}

PreFooter.propTypes = {

}


export default PreFooter