import React from 'react';
import { withRouter } from 'react-router-dom';

import {
   MenuItemContainer,
   BackgroundImgContainer,
   ContentContainer,
   ContentTitle,
   ContentSubtitle
} from './menu-item.styles';

// destructure out title from props... (ie: props.title)
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
   return (
      <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
         <BackgroundImgContainer className='background-image' imageUrl={imageUrl}/>
         <ContentContainer className='content'>
            <ContentTitle>{ title.toUpperCase() }</ContentTitle>
            <ContentSubtitle>SHOP NOW</ContentSubtitle>
         </ContentContainer>
      </MenuItemContainer>
   )
}

export default withRouter(MenuItem);