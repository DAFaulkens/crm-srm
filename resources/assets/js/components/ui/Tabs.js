import React, {Component} from 'react';

const Tab = (props) => {
    return props.children;
}

class Tabs extends Component {


    constructor(props){
        super(props);
        this.state = {
            active: 0
        }

        this.handleTabSelectedEvent = this.handleTabSelectedEvent.bind(this);
    }

    handleTabSelectedEvent(id){
        this.setState({
            ...this.state,
            active: id
        })
    }
    render(){
        
        const tabs = this.props.tabs.map(tab => {
            return <li  key={tab.id} 
                        className={this.state.active === tab.id? 
                                    'tab__button active' :'tab__button' } 
                        onClick={() => this.handleTabSelectedEvent(tab.id)} >
                        {tab.name}
                    </li>
        })

        return(
            <div className='tab'>
                <ul className='tab__controls'>
                    {tabs}
                </ul>
                <div className='tab__content'>
                    {this.props.children[this.state.active]}
                </div>
            </div>
        )
    }

}

export default Tabs;