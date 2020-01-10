import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CategoryPage from '../category/category.component';


const shopPage = ({ match }) => (
   <div className='shop-page'>
      <Route exact path={`${match.path}/category`} component={CollectionOverview} />
   </div>
);

export default shopPage;