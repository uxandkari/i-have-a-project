import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import mapStoreToProps from '../../redux/mapStoreToProps';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './Projects.css'
import { theme } from '../App/Material-UI/MUITheme';
import { ThemeProvider } from '@material-ui/core';

import AddDesignerToProject from '../Modals/AddDesignerToProject'

class CreateProject extends Component {
	state = {
		newProject: {
			project_name: '',
			status: 'New',
			due_date: '',
			notes: '',
			start: '',
			TeamDesigners: [

			]
		},
		status: [
			'Active',
			'New',
			'Complete',
		]
	};
	addSelectedDesigners = (designers) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				TeamDesigners: designers
			}
		})
	}

	handlechange = (event, keyname) => {
		this.setState({
			newProject: {
				...this.state.newProject,
				[keyname]: event.target.value
			}
		});
	}
	handleSubmit = () => {
		this.props.dispatch({
			type: "CREATE_PROJECT",
			payload: this.state.newProject
		})
	}
	componentDidMount = () => {
		this.props.dispatch({
			type: "FETCH_DESIGNERS"
		})
	}
	handleSetEstHours = (designerID, event) => {
		let newDesignerArray = JSON.parse(JSON.stringify(this.state.newProject.TeamDesigners))
		console.log(this.state.newProject.TeamDesigners);
		
		this.state.newProject.TeamDesigners.forEach( (designer, index) => {
			if (designer.designer_id === designerID) {
				let updatedDesigner = designer
					updatedDesigner['hours_est'] = event.target.value
				newDesignerArray.splice(index, 1)
				this.setState({
					newProject: {
						...this.state.newProject,
						teamDesigners: [
							...newDesignerArray,
							updatedDesigner
						]
					}
				})
			}
		})
	}

	render() {
		return (
			<div className='createProjectForm'>
				<ThemeProvider theme={theme}>
				<form onSubmit={this.handleSubmit}>
					<h1>Enter New Project Information</h1>
					<TextField 
						id="outlined-basic" 
						label="Project Name" 
						variant="outlined" 
						onChange={(event) => this.handlechange(event, 'project_name')}
					/>
					<br></br>
					<br></br>
					<TextField
						id="date"
						label="Start Date"
						type="date"
						variant="outlined" 
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => this.handlechange(event, 'start')}
					/>
					<br></br>
					<br></br>
					<TextField
						id="date"
						label="Due Date"
						type="date"
						variant="outlined" 
						InputLabelProps={{
						shrink: true,
						}}
						onChange={(event) => this.handlechange(event, 'due_date')}
					/>
					<br></br>
					<TextField
						id="notes"
						label="Short Description"
						multiline
						rows={4}
						onChange={(event) => this.handlechange(event, 'notes')}
						helperText="Enter Quick Description of Project"
					/>
					<br></br>
					<TextField
						id="project-status"
						select
						label="Status"
						onChange={(event) => this.handlechange(event, 'status')}
						helperText="Select Project Status"
						value={this.state.newProject.status}
						>
						{this.state.status.map((option) => (
							<MenuItem  value={option}>
							{option}
							</MenuItem>
						))}
					</TextField>
					<br></br>
					<AddDesignerToProject 
						addSelectedDesigners={this.addSelectedDesigners} 
						SelectedDesigners={this.state.newProject.TeamDesigners}
					/>
					<br></br>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
							<TableRow>
								{/* <TableCell>Designer Name</TableCell>
								<TableCell align="right">Committed Hours</TableCell> */}
							</TableRow>
							</TableHead>
							<TableBody>
						{
							this.state.newProject.TeamDesigners.length > 0 ?
								this.state.newProject.TeamDesigners.map(designer => {
									return(
										<>
											<TableRow key={designer.designer_id}>
											<TableCell component="th" scope="row">
												{designer.first_name + ' ' + designer.last_name}
											</TableCell>
											<TableCell align="right">
												<TextField
													id="project-status"
													type='number'
													label="Est. Hours"
													helperText="Estimated Hours Committed to Project"
													defaultValue={designer.hours_est}
													onChange={(event) => this.handleSetEstHours(designer.designer_id, event)}
													>
												</TextField>
											</TableCell>
											</TableRow>
										</>
									)
								})
							:
								<></>
							}
					        </TableBody>
      					</Table>
   					</TableContainer>

					<Button 
						type="submit"
						variant="contained" 
						color="secondary"
					>
						Create Project
					</Button>
				</form>
				</ThemeProvider>
			</div>
		);
	}
}

export default withRouter(connect(mapStoreToProps)(CreateProject));
