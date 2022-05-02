require.config({
    paths: {
        "jquery": "jquery",
        "datatables":"datatable.min",
    },
    
});

require(["jquery", "datatables"], function ($) {


    $.fn.dataTable.ext.search.push(function( settings, searchData, index, rowData, counter ) {
          var countries = $('input:checkbox[name="country"]:checked').map(function() {
              return this.value;
          }).get();
   
          if (countries.length === 0) {
             return true;
          }
      
          if (countries.indexOf(searchData[8]) !== -1) {
             return true;
          }
      
          return false;
      });
      
      
      $.fn.dataTable.ext.search.push(function( settings, searchData, index, rowData, counter ) {
          var cities = $('input:checkbox[name="city"]:checked').map(function() {
              return this.value;
          }).get();
   
          if (cities.length === 0) {
             return true;
          }
      
          if (cities.indexOf(searchData[7]) !== -1) {
             return true;
          }
      
          return false;
      });
      
      
       
       $.fn.dataTable.ext.search.push(function( settings, data, dataIndex ) {
            var age_range = $('#age_filter').val();
            if(age_range!='')
            {
		    var agearr = age_range.split('-');
		   
		    var min = parseInt( agearr[0], 10 );
		    var max = parseInt(agearr[1], 10 );
		    
		    var age = parseFloat( data[1] ) || 0; // use data for the age column
		    if ( ( isNaN( min ) && isNaN( max ) ) || ( isNaN( min ) && age <= max ) || ( min <= age   && isNaN( max ) ) || ( min <= age   && age <= max ) )
		    {
		        return true;
		    }
		    return false;
            }
            else
                return true;
       });
       
        $.fn.dataTable.ext.search.push(function( settings, data, dataIndex ) {
            
            var salary_range = $('#salary_filter').val();
            if(salary_range!='')
            {
		    var salarr = salary_range.split('-');
		    var min_salary = parseInt( salarr[0]);
		    var max_salary = parseInt( salarr[1]);
		    var salary = parseFloat( data[4] ) || 0; // use data for the age column
		    if ( ( isNaN( min_salary ) && isNaN( max_salary ) ) || ( isNaN( min_salary ) && salary <= max_salary ) || ( min_salary <= salary   && isNaN( max_salary ) ) || 
		    ( min_salary <= salary   && salary <= max_salary ) )
		    {
		        return true;
		    }
		    return false;
            }
            else
                return true;
            
       });
       
    $("#document").ready(function () {
    
              
         var table= $('#employee').DataTable( {
                     "searching" : true,
                     
                  } );  
            
            
       $('input:checkbox').on('change', function () {
           table.draw();
       });
            
       $('#age_filter').change( function() {
          table.draw();
       } );
    
       $('#salary_filter').change( function() {
           table.draw();
       });
       
       $('#btn_reset').click (function(){
           $('input:checkbox[name="country"]').prop('checked', '');
           $('input:checkbox[name="city"]').prop('checked', '');
           $('#salary_filter').val('');
           $('#age_filter').val('');
           table.search('').draw();

       });
            
    });
    
});
