import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

    dateFunction = (date) => {
        console.log("date", date)
        let day = date.slice(8,10)
        console.log("date", day)
        let month = date.slice(5,7)
        console.log("date", month)
        let year = date.slice(0,4)
        console.log("date", year)
        let americanDateFormat = month + "/" + day + "/" + year
        return americanDateFormat
    }

    handleOutboxDelete = (id, managerId) => {
        console.log(id)
        this.props.dispatch({
            type: 'DELETE_REQUEST',
            payload: {id, managerId}
        })
    }    

    handleInboxAction = (id, designerId, managerId, projectId, action) => {
        this.props.dispatch({
            type: 'UPDATE_REQUEST',
            payload: {id, designerId, managerId, projectId, action}
        })
    }
       

    render () {
        return (
    
            <div className="componentViewWrap">
            <div className="pageTitle titleWrap">
           
                Contract Requests
            </div>
            <div>Inbox:</div>
            <TableContainer component={Paper}>
            <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Inquiring Manager</TableCell>
                            <TableCell>Requested Designer</TableCell>
                            <TableCell>Project Timeline</TableCell>
                            <TableCell>Date Received</TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody>
                        {this.props.store.inbox.length > 0 ?
                                this.props.store.inbox.map((inbox, index) => {
                                    if (inbox.contractData.request_status !== 'completed'){
                                    return(
                                        <TableRow key={index}>                                       
                                            <TableCell>{inbox.managerData.first_name + " " + inbox.managerData.last_name}</TableCell>
                                            <TableCell>{inbox.designerData.first_name + " " + inbox.designerData.last_name}</TableCell>
                                            <TableCell>{this.dateFunction(inbox.contractData.start.slice(0,10)) + " - " + this.dateFunction(inbox.contractData.due_date.slice(0,10))}</TableCell>
                                            <TableCell>{this.dateFunction(inbox.contractData.date_sent.slice(0,10))}</TableCell>
                                            <TableCell><button onClick={() => this.handleInboxAction(inbox.contractData.contract_id, inbox.designerData.designer_id, this.props.store.user.id, inbox.contractData.project_id, 'accepted')}>accept</button></TableCell>
                                            <TableCell><button onClick={() => this.handleInboxAction(inbox.contractData.contract_id, inbox.designerData.designer_id, this.props.store.user.id, inbox.contractData.project_id, 'denied')}>deny</button></TableCell>
                                        </TableRow>
                                    )
                                    }
                                })
                                :
                                <>
                                </>
                                }
                    </TableBody>
                    </Table>
                </TableContainer>
            <div>Outbox:</div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Requested Designer Name</TableCell>
                        <TableCell>Team Manager</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Hourly Rate</TableCell>
                        <TableCell>Date Submitted</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {this.props.store.outbox.length > 0 ?
                                this.props.store.outbox.map((outbox) => {
                                    return(
                                        <TableRow>                                        
                                            <TableCell>{outbox.designerData.first_name + " " + outbox.designerData.last_name}</TableCell>
                                            <TableCell>{outbox.managerData.first_name + " " + outbox.managerData.last_name}</TableCell>
                                            <TableCell>{outbox.contractData.project_name}</TableCell>
                                            <TableCell>{outbox.designerData.rate}</TableCell>
                                            <TableCell>{this.dateFunction(outbox.contractData.date_sent.slice(0,10))}</TableCell>
                                            <TableCell>{outbox.contractData.status}</TableCell>
                                            <TableCell><button onClick={() => this.handleOutboxDelete(outbox.contractData.contract_id, this.props.store.user.id)}>delete</button></TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <>
                                </>
                                }
                          
                </TableBody>
          </Table>
    
            </div>
        );
    }
}

export default withRouter(connect(mapStoreToProps)(ContractRequests));
