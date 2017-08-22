$(document).ready(function(){
	$('.user-list').click(function(){
		$(this).toggleClass('active');
	});

    $( "#accordion" ).accordion({
    	heightStyle: "content",
    	collapsible: true
    });

    $('#accordion .user-list').click(function(){

    	var designation = $(this).data('designation');
    	var desArray= new Array();

    	$("#accordion .user-list.active").each(function() {
            desArray.push($(this).data('designation'));

        });

        
    	setTitle();
    	hideUsers();
	});

    var dateObj;
    var serviceSelected='';
    var agentSelected='';
    var dateSelected;
    var timeSelected;
    function setTitle()
    {

    	if($("#accordion .user-list.active").length==1)
        {
        	serviceSelected = $('#accordion .user-list.active').data('val');
        }
        else if($("#accordion .user-list.active").length>1)
        {
        	serviceSelected = $("#accordion .user-list.active").length+" Services Selected";
        }
        else
        {
        	serviceSelected = "Select Service";
        }


        if($(".user-list-container .user-list.active").length==1)
        {
        	agentSelected = ' with '+$('.user-list-container .user-list.active h5').text();
        }
        else if($(".user-list-container .user-list.active").length>1)
        {
        	agentSelected = " with "+$(".user-list-container .user-list.active").length+" Agents Selected";
        }
        else
        {
        	agentSelected = ' with any Agent';
        }
        $('section .title').text(serviceSelected+agentSelected);

    }

    function hideUsers()
    {
    	if($("#accordion .user-list.active").length==0)
        {
        	$('.user-list-container .user-list').each(function()
    		{
    			$(this).show();
    		});
        }
        else
        {
        	var selectedDes=[];
        	$("#accordion .user-list.active").each(function(){
        		var designation = $(this).data('designation');
        		if(jQuery.inArray( designation, selectedDes)==-1)
        		{
        			$('.user-list-container .user-list').each(function()
		    		{
		    			$(this).hide();
		    			desArray = $(this).data('designation').split(' ');
		    			for(var i=0;i<desArray.length;i++)
		    			{
		    				if(designation==desArray[i])
		    					$(this).show();
		    			}
		    		});
        		}

        	});       	


        }

    }

    $('.user-list-container .user-list').click(function(){
    	setTitle();
    });

    var sections=["first", "second", "third", "fourth", "fifth", "sixth"];
	$('.accordion-content button.next').click(function(){
		var current = $(this).attr('id').replace('-next','').trim();
		if(current=='first')
		{
			if($("#accordion .user-list.active").length==0)
	        {
	        	alert('Please select a service');
	        	return false;
	        }
			
		}
		if(current=='third')
		{
			if($('#third #fName').val()=='')
			{
				alert('Enter First Name');
				return false;
			}
			if($('#third #lName').val()=='')
			{
				alert('Enter Last Name');
				return false;
			}
			if($('#third #country').val()=='Select Country')
			{
				alert('Select Country');
				return false;
			}
			if($('#third #mobile').val()=='')
			{
				alert('Enter Mobile Number');
				return false;
			}
			if($('#third #email').val()=='')
			{
				alert('Enter Email id');
				return false;
			}

		}
		if(current=='fourth')
		{
			if($('#fourth #cName').val()=='')
			{
				alert('Enter Company Name');
				return false;
			}
			if($('#fourth #shipments').val()=='No. of Shipments')
			{
				alert('Choose No. of Shipments');
				return false;
			}
			$('#td-date').text(dateObj.format('LL'));
			$('#td-time').text(timeSelected);
			$('#td-service span').text(serviceSelected);
			$('#td-agent span').text(agentSelected);

			
		}
		if(current=='fifth')
		{
			$('#td-final-date').text(dateSelected+" @ "+timeSelected);
			$('#td-final-service').text(serviceSelected+agentSelected);
			$('#td-final-month').text(dateObj.format('MMMM'));
			$('#td-final-dateNo').text(dateObj.format('Do'));

			
		}
		var i= jQuery.inArray(current,sections);
		$('#'+sections[i]).hide();
		$('#'+sections[i+1]).show();

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		var today = yyyy+'-'+mm+'-'+dd;

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek'
			},
			defaultDate: today,
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			select: function(start, end) {

				var check = start.format("YYYY-MM-DD");
				var today = moment().format("YYYY-MM-DD");

			    if(check < today)
			    {
			        alert("Unavailable");
			    }
			    else
			    {
			        dateObj = start;
					dateSelected = start.format("DD-MM-YYYY");
					timeSelected = start.format("HH:mm");
					$('#second').hide();
					$('#third').show();
			    }

				


			},
			editable: true,
			eventLimit: true // allow "more" link when too many events
		

		});
		

	});

	$('.accordion-content button.prev').click(function(){
		var current = $(this).attr('id').replace('-back','').trim();
		var i= jQuery.inArray(current,sections);
		$('#'+sections[i]).hide();
		$('#'+sections[i-1]).show();
		

	});


	//calendar
	


});