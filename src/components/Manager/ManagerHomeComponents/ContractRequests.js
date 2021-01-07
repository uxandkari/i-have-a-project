import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class ContractRequests extends Component {   

    state = {
        inquiringManager: [],
        requestedDesigner: '',
        projectTimeline: '',
        dateReceived: 0,
        TeamManager: '',
        ProjectName: '',
        dateSubmitted: 0,
        status: ''
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: "FETCH_INBOX",
            payload: {id: this.props.store.user.id}
        })
        console.log("in component did mount", this.props.store.user.id)

        this.props.dispatch({
            type: "FETCH_OUTBOX",
            payload: {id: this.props.store.user.id}
        })
    }

    render () {
        return (
        
            <>
            {/* {JSON.stringify(this.props.store.outbox)} */}
            {/* {JSON.stringify(this.props.store.inbox)} */}
            <div>Inbox:</div>
                <table> 
                    <thead>
                        <tr>
                            <th>Inquiring Manager</th>
                            <th>Requested Designer</th>
                            <th>Project Timeline</th>
                            <th>Date Received</th>
                        </tr>
                    </thead> 
                        <tbody>
                            <tr>
                             
                            </tr>       
                        </tbody>
                </table>
            <button onClick={() => this.handleInboxAccept}>accept</button>
            <button onClick={() => this.handelInboxAccept}>deny</button>
            <div>Outbox:</div>
            <table>
                <thead>
                    <tr>
                        <th>Requested Designer Name</th>
                        <th>Team Manager</th>
                        <th>Project Name</th>
                        <th>Hourly Rate</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.props.store.outbox.length > 0 ?
                                this.props.store.outbox.map((outbox) => {
                                    return(
                                        <tr>
                                        <td>{outbox.designerData.first_name + " " + outbox.designerData.last_name}</td>
                                        <td>{outbox.managerData.first_name}</td>
                                        </tr>
                                    )
                                })
                                :
                                <>
                                </>
                                }
                          
                </tbody>
            </table>
            <button onClick={() => this.handleOutboxAccept}>accept</button>
            <button onClick={() => this.handleOutboxDeny}>deny</button>
            </>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ContractRequests));
