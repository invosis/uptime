module.exports = {
    mongodb: {
        server: 	process.env.MONGOLAB_SERVER,
        database: 	process.env.MONGOLAB_DATABASE,
        user: 		process.env.MONGOLAB_USERNAME,
        password: 	process.env.MONGOLAB_PASSWORD
    },
    monitor: {
        apiUrl: 	'http://' + process.env.HOSTNAME + '/api'
    },
    basicAuth: {
  		username:	process.env.AUTH_USERNAME,
  		password: 	process.env.AUTH_PASSWORD
	},
	email: {
  		transport: { 
    		auth: {            
      			user:	process.env.EMAIL_AUTH_USERNAME,
      			pass:   process.env.EMAIL_AUTH_PASSWORD
      		}
		},
  		event: {
    		up:        true,
    		down:      true,
    		paused:    true,
    		restarted: true
    	},
  		message: {           
    		from:			'Uptime <' + process.env.EMAIL_FROM_ADDRESS + '>',
    		to:         	 process.env.EMAIL_TO_ADDRESS,
  			dashboardUrl: 	'http://' + process.env.HOSTNAME
  		}
	},
    verbose: false
 }
