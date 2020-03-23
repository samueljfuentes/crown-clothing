import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';

const mapStateToProps = createStructuredSelector({
   isLoading: selectIsCollectionFetching
});

// this function so we can abstract away the isloading logic from the shop page and into the actual component being loaded...
// compose curries all the functions together, evaluates from right -> left...
const CollectionsOverviewContainer = compose(
   connect(mapStateToProps),
   WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;