// TODO JS MADE BY HUSENTELWALA

$(document).ready(function(){
	var input_val='';
	var checked=0;	
	var unchecked=0;
	var remaining=0;
	$('.content').append('<ul></ul>');
	j_list();
	function j_list()
	{
		$.post( "list.php")
		.done(function(data) {
			$('.content ul').append(data);
			eval(count_checked());
		})
		.fail(function() {
		})
		.always(function() {
		});
	}
	
	function count_checked()
	{
		total_record=$('li').length;
		((total_record>1) ? $('#select_all').show() : $('#select_all').hide());
		((total_record>0) ? $('.bottom-bar').show() : $('.bottom-bar').hide());
		checked=$('li input[type="checkbox"]:checked').length;
		unchecked=$('li input[type="checkbox"]').not(':checked').length;
		$('.total-left').text(unchecked + ' ' + ((unchecked === 1) ? "item" : "items") + ' left');
		$('.total-done').html(checked + ' ' + ((checked === 1) ? "item" : "items") + ' done.' + '<span>Clear completed</span>' );
	}
	
	$('#main_input').bind("enterKey",function(e){
		input_val = $.trim($(this).val());
		if (input_val.length == 0){ console.log(1); }
		else {
		$(this).val('');		
		count_checked();
		ajax_cl(input_val);
		$('#select_all').find('input[type="checkbox"]').prop('checked', false);
		}
	});
	
	$('#main_input').keyup(function(e){
		if(e.keyCode == 13)
		{
			$(this).trigger("enterKey");
	    }
	});
	$('ul').delegate("li input[type=checkbox]", "click", function () {
		j_checked=$('li input[type="checkbox"]:checked').length;
		j_total_record=$('li').not(':checked').length;		
		((j_checked===j_total_record) ? $('#select_all').find('input[type="checkbox"]').prop('checked', true) : $('#select_all').find('input[type="checkbox"]').prop('checked', false));	
		
		j_function_check(this);
		$(this).parents('li').toggleClass('completed');	
		count_checked();
    });
	
	function j_function_check(object_handler)
	{
		check_id_var=$(object_handler).attr('id');
		$.post( "check.php", { check_id: check_id_var})
		.done(function(data) {			
			console.log('checked successfull');
		})
		.fail(function() {
			console.log('checked fail');
		})
		.always(function() {
		});
	}
	$('.content').delegate("#select_all input", "click", function () {
		if(this.checked) { 
			$('li input[type="checkbox"]').each(function() { 
				if(!this.checked){
					j_function_check(this);
					console.log(3);
				}
				this.checked = true;	
				$(this).parents('li').addClass('completed');
				
         	});
		}
		else
		{
			$('li input[type="checkbox"]').each(function() { 
                this.checked = false;				  
				$(this).parents('li').removeClass('completed');	
         	});
		}
		count_checked();
	});
	
	$('.content').delegate("li input[type=text]", "focusout", function () {
		todo_item_text=$(this).val();
		update_id=$(this).parents('li').find('input[type=checkbox]').attr('id');
		$(this).parents('li').find('label').show();
		$(this).parents('li').find('label').html(todo_item_text);
		$(this).remove();
		console.log(update_id);
		
		$.post( "update.php", { update_id: update_id, todo_item_text: todo_item_text})
		.done(function(data) {
			console.log(data);
		})
		.fail(function() {
		})
		.always(function() {
		});
		
	});
	$('.content').delegate(".total-done span", "click", function () {
		
		var delete_id_arr = [];
		$('li input[type="checkbox"]').each(function() { 
			if(this.checked) 
			{ 
				delete_id_arr.push($(this).attr('id'));				
				$(this).parents('li').remove();	
			}
		});
		$.post( "delete.php", { delete_id: delete_id_arr})
		.done(function(data) {
		})
		.fail(function() {
		})
		.always(function() {
		});
		count_checked();
		$('#select_all').find('input[type="checkbox"]').prop('checked', false);		
	});
	
	$('.content').delegate("li label", "dblclick", function () {
		j_lbl_text=$(this).text();
		$(this).hide();		
		$('<input type="text" value="' + j_lbl_text + '">').insertBefore(this);
	});
	
	function j_append(inserted_id,todo_item)
	{
		$('.content ul').append('<li><input type="checkbox" id=' + inserted_id + '><label>' + todo_item + '</label></li>');
	}
	function ajax_cl(todo_item)
	{
		$.post( "backend.php", { name: todo_item})
		.done(function(data) {
			eval(j_append(data,todo_item));
			eval(count_checked());
		})
		.fail(function() {
		})
		.always(function() {
		});
	}
});	
