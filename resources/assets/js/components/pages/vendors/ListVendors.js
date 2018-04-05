import React, {Component} from 'react';
import axios from 'axios';
import { url } from '../../../config';
import Spinner from '../../ui/spinner/Spinner';
import Table from '../../ui/Table';
import Searching from '../../ui/spinner/Searching';

const columns = [
    {id: 2, name: 'name', displayName: 'Vendor Name'},
    {id: 3, name: 'support_number', displayName: 'Support Number'},
    {id: 4, name: 'support_email', displayName: 'Support Email'}
];

class ListVendors extends Component {

    constructor(props){
        super(props);

        this.state = {
            vendors: null,
            next: '',
            prev: '',
            current: 0,
            last: 0,
            search:'',
            sort: {
                field: 'name',
                direction: 'asc'
            },
            searching: false
        }

        this.handleNextPageEvent = this.handleNextPageEvent.bind(this);
        this.handlePrevPageEvent = this.handlePrevPageEvent.bind(this);
        this.handlePageSelectEvent = this.handlePageSelectEvent.bind(this);
        this.handleSearchEvent = this.handleSearchEvent.bind(this);
        this.handleSortEvent = this.handleSortEvent.bind(this);
        this.handleVendorSelectEvent = this.handleVendorSelectEvent.bind(this);
        this.handleNewVendorEvent = this.handleNewVendorEvent.bind(this);

    }


    componentDidMount(){

        const api = `${url}/vendors`;

        axios.get(api).then(res => {
            console.log(res.data.data);
            this.setState({
                ...this.state,
                vendors: res.data.data,
                next: res.data.links.next,
                prev: res.data.links.prev,
                current: res.data.meta.current_page,
                last: res.data.meta.last_page,
                searching: false
            })
        })
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
                    vendors: res.data.data,
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
                    vendors: res.data.data,
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

            let selectLink = `${url}/vendors?page=${page}&order=${order}&direction=${direction}`;

            if (/\S/.test(this.state.search)) {
                selectLink = `${url}/vendors?page=${page}&search=${this.state.search}`;
            } 

            axios.get(selectLink).then(res => {
                this.setState({
                    ...this.state,
                    vendors: res.data.data,
                    next: res.data.links.next,
                    prev: res.data.links.prev,
                    current: res.data.meta.current_page,
                });
            });
        }
    }

    handleSearchEvent(event){
        const searchString = event.target.value;
        let searchLink = `${url}/vendors`;

        if (/\S/.test(searchString)) {
            searchLink = `${url}/vendors?search=${searchString}`;
        } 

        axios.get(searchLink).then(res => {

            this.setState({
                ...this.state,
                vendors: res.data.data,
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


    handleSortEvent(field){
        const order=field;
        const direction = this.state.sort.direction === 'asc'? 'desc' : 'asc';
        let sortLink = `${url}/vendors?order=${order}&direction=${direction}`;

        if (/\S/.test(this.state.search)) {
            sortLink = `${url}/vendors?search=
            ${this.state.search}&order=${order}&direction=${direction}`;
        }
        
        axios.get(sortLink).then(res => {
            this.setState({
                ...this.state,
                vendors: res.data.data,
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


    handleVendorSelectEvent(vendorId){
        this.props.history.push(`/vendors/${vendorId}`);
    }

    handleNewVendorEvent(){
        this.props.history.push('/vendors/new');
    }

    render(){

        const searching = this.state.searching? <Searching /> : '';

        let table = <Spinner />
        
        if(this.state.vendors){
            table = <Table  tableData={this.state.vendors} 
                            columns={columns}
                            currentPage={this.state.current}
                            lastPage={this.state.last} 
                            nextPage={this.handleNextPageEvent} 
                            prevPage={this.handlePrevPageEvent}
                            selectPage={this.handlePageSelectEvent} 
                            selectData={this.handleVendorSelectEvent} 
                            sortPage={this.handleSortEvent} sort={this.state.sort} />
        }



        return(
            <div className='list-content' >
                <button className='button' onClick={this.handleNewVendorEvent}  >New Vendor</button>
                <div className='list-control'>
                     <input className='list-search' value={this.state.search}
                        placeholder='Search By Vendors Name' onChange={this.handleSearchEvent} />
                    { searching }
                </div>
                <div className='list-table'>
                {table}
                </div>
            </div>
        )
    }

}

export default ListVendors;