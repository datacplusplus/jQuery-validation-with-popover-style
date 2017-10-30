/**
 * this rules file 
 * each form needs different rules
 * change as required
 */
 rules={                   
 	//fname,lname,email are name of element in form
	fname:{
		//required
		nonEmpty:true,
		//only arabic
		Arabic: true,
	},
	lname : {
		//required
		nonEmpty:true,
		//only arabic
		Arabic: true,
	},
	email : {
		//required
		nonEmpty:true,
		//check email syntax
		email: true,
	},
};