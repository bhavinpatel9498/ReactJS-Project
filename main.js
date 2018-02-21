(function () {

class PageComponent extends React.Component
{
	constructor(props) 
	{
	    super(props);
	    this.state = {empList: []};
	    this.refreshData = this.refreshData.bind(this);
	}

	render()
	{
	return(

			<div align="center" className="container">	
		      	<PageHeader />	
		      	<RefreshButton btnHandler = {this.refreshData}/>	
		      	<EmployeesTable  empList={this.state.empList}/>      	      	
		  	</div>
		);
	}

	componentDidMount() 
	{
	    this.refreshData();
	}

	refreshData()
	{
		var myAjaxRequest = new XMLHttpRequest();
		
		myAjaxRequest.onreadystatechange = () => 
		{
			if (myAjaxRequest.readyState === 4 && myAjaxRequest.status === 200)
			{
				var responseData = JSON.parse(myAjaxRequest.responseText);
				this.setState({empList : responseData});
			}
		}

		myAjaxRequest.open('GET', 'http://libertyville.rice.iit.edu/scripts/4565_lab3.php', true);
		myAjaxRequest.send();
	}
}

class PageHeader extends React.Component 
{
  render()
  {
    return(
		<div className="panel-group">
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h1>ITMD 565 - Project2</h1>
      				<h2>Bhavinkumar Patel - bpatel68@hawk.iit.edu</h2>
      				<br />
				</div>
			</div>
		</div>		
    );
  }
}


class EmployeesTable extends React.Component
{	

	render()
	{		
		const records = this.props.empList.map((empRec, i) => {
                return <EmployeesTableRow empRecVal={empRec} />
        });

		return(
		<div className="panel panel-primary">
			<div className="panel-footer">
				<h2> ** Employee List ** </h2>
				<table className="table table-bordered">
					<thead>
      					<tr>
					        <th>ID</th>
					        <th>First Name</th>
					        <th>Last Name</th>
					        <th>Title</th>
					        <th>Email</th>
					        <th>Gender</th>
					        <th>Status</th>
      					</tr>      					
    				</thead>
    				<tbody>
    					{records}
    				</tbody>
				</table>
			</div>
		</div>
		);
	}
}


class EmployeesTableRow extends React.Component
{
	render()
	{
		const empStatus = this.props.empRecVal.active;

		let specialTDCell = null;

		if(empStatus)
		{
			specialTDCell = <td bgcolor="SeaGreen">Active</td>
		}
		else
		{
			specialTDCell = <td bgcolor="IndianRed">Inactive</td>
		}

		return(
		
	        <tr>
		        <td>{this.props.empRecVal.id}</td>
		        <td>{this.props.empRecVal.first_name}</td>
		        <td>{this.props.empRecVal.last_name}</td>
		        <td>{this.props.empRecVal.title}</td>
		        <td>{this.props.empRecVal.email}</td>
		        <td>{this.props.empRecVal.gender}</td>
	        	{specialTDCell}	       
	    	</tr>
		);
	}
}


class RefreshButton extends React.Component 
{
  render()
  {
    return(
    <div className="panel panel-primary">
    	<div className="panel-body">
			<button className="btn-primary btn-lg" onClick={this.props.btnHandler}>Refresh List</button>
		</div>
	</div>
    );
  }
}

ReactDOM.render(<PageComponent />, document.getElementById('root'));

})();