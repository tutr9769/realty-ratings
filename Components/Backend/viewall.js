
app.get('/player_info', function(req,res){
	var query = 'SELECT * FROM properties';
	db.any(query)
		.then(info => {
			console.log(info);
			res.render('../frontend/views',{
				title: 'Apartment Title',
                rating: info.rating,
                rent: info.rent,
                city: info.city,
                zip: info.zip,
                street_address: info.street_address,
                leasing_company: info.leasing_company,
			})
		})
		.catch(err => {
			console.log('error',err);
			res.render('../frontend/views',{
				title: 'Apartment Title',
                rating: 0.00,
                rent: 0000,
                city: '',
                zip: 00000,
                street_address: '',
                leasing_company: '',
			})
		})
});
