/Register
	post('/')
		in->{
			name,
			email,
			password, > 8
			phone1,
			}
		out->"saved"
/login
	post('/')
		in->{
			email:(email),
			password:>8
			}
		out->
			"loged in.."
			header: authToken
/user
	get('/')
		out->[{
			name,
			email,
			password,
			role,(user)
			phone,
			avatar,
			token,
			status,
			requestID,
			reviewID,
			feedbackID,
			created at,
			updated at,
			}]
	get('/:email')
		in->params: email
		out->{
			user:{
				name,
				email,
				password,
				role,(user)
				phone,
				avatar,
				token,
				status,
				requestID,
				reviewID,
				feedbackID,
				created at,
				updated at,
			},
			request:{
				date,
				time,
				price,
				couponID,
				status,
				userID,
				reviewID,
				created at,
				updated at				
			},
			review:{
				userID,
				requestID,
				rate,
				review,
				status,
				created at,
				updated at
			},
		}
	put('/:email')
		in->params: email
		out->{
			name,
			email,
			password,
			role,(user)
			phone,
			avatar,
			token,
			status,
			requestID,
			reviewID,
			feedbackID,
			created at,
			updated at,
		}
	put('/active/:email')
		in->params: email
		out->{
			name,
			email,
			password,
			role,(user)
			phone,
			avatar,
			token,
			status,
			requestID,
			reviewID,
			feedbackID,
			created at,
			updated at,
		}
	put('/inactive/:email')
		in->params: email
		out->{
			name,
			email,
			password,
			role,(user)
			phone,
			avatar,
			token,
			status,
			requestID,
			reviewID,
			feedbackID,
			created at,
			updated at,
		}
	delete('/:email')
		in->params: email
		out->{
			name,
			email,
			password,
			role,(user)
			phone,
			avatar,
			token,
			status,
			requestID,
			reviewID,
			feedbackID,
			created at,
			updated at,
		}
/request
	get('/')
