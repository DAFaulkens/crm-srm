import React, {Component} from 'react';
import axios from 'axios';
import Table from '../../ui/Table';
import {url} from '../../../config';
import Spinner from '../../ui/spinner/Spinner';
import LoadingPage from '../../ui/loading-page';
import Searching from '../../ui/spinner/Searching';

const columns = [
    {id: 1, name: 'name', displayName:'Site Name' },
    {id: 2, name: 'address', displayName: 'Site Address'},
    {id: 3, name: 'phone_number', displayName: 'Phone Number'}
];

class ListSites extends Component {

    constructor(props){
        super(props);
        this.state = {
            sites: null,
            next: '',
            prev: '',
            current: 0,
            last: 0,
            search:'',
            sort: {
                field: 'name',
                direction: 'asc'
            },
            api: `${url}/sites`,
            searching: false
        }
    }


    componentDidMount(){
        const api = `${url}/sites`;
        axios.get(api).then(res => {
            this.setState({
                ...this.state,
                sites: res.data.data,
                next: res.data.links.next,
                prev: res.data.links.prev,
                current: res.data.meta.current_page,
                last: res.data.meta.last_page,
                searching: false
            })
        })

        this.handleNextPageEvent = this.handleNextPageEvent.bind(this);
        this.handlePrevPageEvent = this.handlePrevPageEvent.bind(this);
        this.handlePageSelectEvent = this.handlePageSelectEvent.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
        this.handleSiteSelectEvent = this.handleSiteSelectEvent.bind(this);
        this.handleSortEvent = this.handleSortEvent.bind(this);
        this.handleNewSiteEvent = this.handleNewSiteEvent.bind(this);
    }

    handleNextPageEvent(){
        if(this.state.next){

            const order=this.state.sort.field;
            const direction = this.state.sort.direction;

            let nextLink = `${this.state.next}&order=${order}&direction=${direction}`

            if (/\S/.test(this.state.search)) {
               nextLink = `${this.state.next}&search=
                ${this.state.search}&order=${order}&direction=${direction}`;
            }    

            axios.get(nextLink).then(res => {
                this.setState({
                    ...this.state,
                    sites: res.data.data,
                    next: res.data.links.next,
                    prev: res.data.links.prev,
                    current: res.data.meta.current_page,
                });
            });
        }
    }

    handlePrevPageEvent(){
        if(this.state.prev){

            const order=this.state.sort.field;
            const direction = this.state.sort.direction;

            let prevLink = `${this.state.prev}&order=${order}&direction=${direction}`

            if (/\S/.test(this.state.search)) {
                prevLink = `${this.state.prev}&search=
                ${this.state.search}&order=${order}&direction=${direction}`;
            } 

            axios.get(prevLink).then(res => {
                this.setState({
                    ...this.state,
                    sites: res.data.data,
                    next: res.data.links.next,
                    prev: res.data.links.prev,
                    current: res.data.meta.current_page,
                });
            });
        }
    }

    handlePageSelectEvent(event){

        const page = event.target.value;
        const order = this.state.sort.field;
        const direction = this.state.sort.direction;

        if(page >= 1 || page <= this.state.last){

            let selectLink = `${url}/sites?page=${page}&order=${order}&direction=${direction}`;

            if (/\S/.test(this.state.search)) {
                selectLink = `${url}/sites?page=${page}&search=${this.state.search}`;
            } 

            axios.get(selectLink).then(res => {
                this.setState({
                    ...this.state,
                    sites: res.data.data,
                    next: res.data.links.next,
                    prev: res.data.links.prev,
                    current: res.data.meta.current_page,
                });
            });
        }
    }

    handleSearchEvent(event){
        const searchString = event.target.value;
        let searchLink = this.state.api;

        if (/\S/.test(searchString)) {
            searchLink = `${this.state.api}?search=${searchString}`;
        } 


        axios.get(searchLink).then(res => {
            this.setState({
                ...this.state,
                sites: res.data.data,
                next: res.data.links.next,
                prev: res.data.links.prev,
                current: res.data.meta.current_page,
                last: res.data.meta.last_page,
                searching: false
            });
        });

        this.setState({
            ...this.state,
            search: searchString,
            searching: true,
            sort: {
                ...this.state.sort,
                field: 'name',
                direction: 'asc'
            }
        });
        
    }

    handleSiteSelectEvent(siteId){
        this.props.history.push(`/sites/${siteId}`);
    }

    handleSortEvent(field){
        const order=field;
        const direction = this.state.sort.direction === 'asc'? 'desc' : 'asc';
        let sortLink = `${this.state.api}?order=${order}&direction=${direction}`;

        if (/\S/.test(this.state.search)) {
            sortLink = `${this.state.api}?search=
            ${this.state.search}&order=${order}&direction=${direction}`;
        }
        
        axios.get(sortLink).then(res => {
            this.setState({
                ...this.state,
                sites: res.data.data,
                next: res.data.links.next,
                prev: res.data.links.prev,
                current: res.data.meta.current_page,
                sort: {
                    ...this.state.sort,
                    field: order,
                    direction: direction
                }
            });
        });


    }

    handleNewSiteEvent(){
        this.props.history.push('/sites/new');
    }


    render(){

        const searching = this.state.searching? <Searching /> : '';

        let table = <Spinner />
        
        if(this.state.sites){
            table = <Table  tableData={this.state.sites} 
                            columns={columns}
                            currentPage={this.state.current}
                            lastPage={this.state.last} 
                            nextPage={this.handleNextPageEvent} 
                            prevPage={this.handlePrevPageEvent}
                            selectPage={this.handlePageSelectEvent} 
                            selectData={this.handleSiteSelectEvent} 
                            sortPage={this.handleSortEvent} sort={this.state.sort} />
        }
        return (
            <div className='list-content' >
                <button className='button' 
                        onClick={this.handleNewSiteEvent} >New Site</button>
                <div className='list-control'>
                    <input className='list-search' value={this.state.search}
                    placeholder='Search Sites' onChange={this.handleSearchEvent} />
                    { searching }
                </div>
                <div className='list-table'>
                    {table}
                </div>
            </div>
        );

    }


}

export default ListSites;