import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

// from props, take title, items
const CollectionPreview = ({ title, items }) => {
   return (
      <div className='collection-preview'>
         <h1 className='title'>{title.toUpperCase()}</h1>
         <div className='preview'>
            {
               // filter out list so only 4 items remain, then map these 4 items onto their own div and display it on page...
               items.filter((item, index) => index < 4)
               .map(({ id, ...allItemProps }) => {
                  return (
                     <CollectionItem key={id} { ...allItemProps }/>
                  )
               })
            }
         </div>
      </div>
   )
}

export default CollectionPreview;