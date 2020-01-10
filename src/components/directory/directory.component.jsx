import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selector';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';


const Directory = ({ sections }) => (
   <div className='directory-menu'>
      {
         // from each section, destructure title, imageUrl, id to prevent typing section.var everytime...
         sections.map(({ id, ...otherSectionProps }) => {
            return (
               // ie: title={title}, imageUrl={imageUrl}, etc..
               <MenuItem key={id} {...otherSectionProps}/>
            )
         })
      }
   </div>
);

const mapStateToProps = createStructuredSelector({
   sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);