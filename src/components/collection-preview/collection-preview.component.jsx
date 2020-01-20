import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import { CollectionPreviewContainer, PreviewContainer, TitleContainer } from './collection-preview.styles';

// from props, take title, items
const CollectionPreview = ({ title, items, history, match, routeName }) => (
   <CollectionPreviewContainer>
      <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
         {title.toUpperCase()}
      </TitleContainer>
      <PreviewContainer>
         {
            // filter out list so only 4 items remain, then map these 4 items onto their own div and display it on page...
            items.filter((item, index) => index < 4)
            .map(item => (
               <CollectionItem key={item.id} item={item}/>
               )
            )
         }
      </PreviewContainer>
   </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);