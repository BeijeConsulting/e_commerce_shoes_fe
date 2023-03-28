import React from 'react';
import PropTypes from 'prop-types';
import { MdMobileFriendly } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { IoIosHelpBuoy } from "react-icons/io";
import "./preFooter.scss"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PreFooter(props) {
    const { t } = useTranslation()
    return (
        <div className='preFooter'>
            <div className='preFooter__info'>
                <Link to={ "/" }>
                    <MdMobileFriendly />
                    <p>#DownloadApp</p>
                </Link>
            </div>
            <div className='preFooter__info'>
                <Link to={ "/customer-care/contacts" }>
                    <GoLocation />
                    <p>#{ t("preFooter.contacts") }</p>
                </Link>
            </div>
            <div className='preFooter__info'>
                <Link to={ "/customer-care/" }>
                    <IoIosHelpBuoy />
                    <p>#{ t("preFooter.help") }</p>
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