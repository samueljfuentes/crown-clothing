import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import { firestore, convertCollectionSnapshotToMap } from '../../database/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const COllectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
   state = {
      loading: true
   }
   unsubscribeFromSnapshot = null;

   componentDidMount() {
      
      const { updateCollections } = this.props;
      const collectionRef = firestore.collection('collections');      

      collectionRef.get().then((snapshot) => {
         const collectionsMap = convertCollectionSnapshotToMap(snapshot);
         updateCollections(collectionsMap);
         this.setState({ loading: false });
      });
      
   }

   render() {
      const { match } = this.props;
      const { loading } = this.state;
      return (
         <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
            {/* :collectionId allows us to create the categoryID param in the match object while inside the collection page} */}
            <Route path={`${match.path}/:collectionId`} render={(props) => <COllectionPageWithSpinner isLoading={loading} {...props} />} />
         </div>
      );
   }
};

const mapDispatchToProps = (dispatch) => ({
   updateCollections: (collectionsMap) => (dispatch(updateCollections(collectionsMap)))
})

export default connect(null, mapDispatchToProps)(ShopPage);