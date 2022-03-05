import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({title}) => {
    return (
        <Helmet>
            <title>{`${title} - Science-101.com`}</title>
        </Helmet>
    )
}

export default MetaData