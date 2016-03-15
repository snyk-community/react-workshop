import React from 'react';
import './styles.css';

import requestData from '~/../server';

import Search from '~/components/search';
import ViewSwitcher from '~/components/view-switcher';
import ProductList from '~/components/product-list';
import Filter from '~/components/filter';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // initial data is null
            data: null,
            title: 'Computers &amp; Laptops',
            productCount: 18560,
            views: [ 'grid', 'list' ],
            selectedView: 'grid'
        };
    }

    // let's pretend it's from the server
    componentDidMount() {
        requestData(1500).then(this.updateData);
    }

    // when data from the server is loaded, update local state
    updateData = data => {
        this.setState({
            data
        });
    };

    handleViewChange = view => {
        this.setState({
            selectedView: view
        });
    }

    render() {
        return (
            <div className="catalog">
                <Search />
                <div className="catalog__main__content">
                    <div className="catalog__status">
                        <div className="catalog__status__title">
                            <div className="component component-catalog_title">
                                <h1 className="catalog__title">{this.state.title}</h1>
                                <span className="catalog__quantity">{this.state.productCount} results</span>
                            </div>
                        </div>
                        <div className="catalog__status__filters">
                            <Filter />
                            <ViewSwitcher
                                selected={this.state.selectedView}
                                items={this.state.views}
                                onChange={this.handleViewChange}
                                />
                        </div>
                    </div>
                    <ProductList view={this.state.selectedView} />
                </div>
            </div>
        );
    }
}
