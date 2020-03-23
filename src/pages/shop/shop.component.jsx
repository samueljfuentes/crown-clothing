import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collection-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends React.Component {

   componentDidMount() {
      // as soon as component mounts, grab the fetch collections async method from props and run it...
      const {fetchCollectionsStartAsync} = this.props;
      fetchCollectionsStartAsync();
   }

   render() {
      const { match } = this.props;
      return (
         <div className='shop-page'>
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            {/* :collectionId allows us to create the categoryID param in the match object while inside the collection page} */}
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
         </div>
      );
   }
};

const mapDispatchToProps = (dispatch) => ({
   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);