function init_GUI() //Pretty simple function to initialize the GUI
			{
				var el = gui.addFolder('Display');
				el.add(criteria, 'nodes').listen();
				el.add(criteria, 'paths').listen();
				el.add(criteria, 'values').listen();
				el.open();
				var im = gui.addFolder('Impacting Value');
				im.add( impact, 'impactValue', choices ).onChange(function(){
				var bottom = 45.404609;
				var top = 45.459339;
				var right = 4.428473;
				var left = 4.351322;
				var diff_x = right-left;
				var diff_y = top-bottom;
				var size = 500;
					if (shape_type == 0)
						CreateClovers(size,bottom,left,diff_x,diff_y,first,impact.impactValue);
					if (shape_type ==1)
						Create_Meshes(bottom,top,right,left,diff_x,diff_y,size,impact.impactValue,dist);
					Hide_Time_Min_Max();
				})
				if (time_auto == 0)
				{
					var tim = gui.addFolder('Time');
					tim.add(time,'Time').min(0).max(86400).step(60).onChange(function(){
						Hide_Time_Min_Max();
					})
					tim.add(time,'Interval').min(0).max(43200).step(60).onChange(function(){
						Hide_Time_Min_Max();
				})
				}
				var min = gui.addFolder('Minimum');
				min.add(min_crit,'Valence').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				min.add(min_crit,'Intensity').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				min.add(min_crit,'Familiarity').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				var max = gui.addFolder('Maximum');
				max.add(max_crit,'Valence').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				max.add(max_crit,'Intensity').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				max.add(max_crit,'Familiarity').min(1).max(10).step(1).onChange(function(){
					Hide_Time_Min_Max(); 
				})
				var t =  gui.addFolder('Types');
				for (let i = 0; i < names_types.length; i++) 
				{
					t.add(types_parameters,names_types[i]).onChange(function(){
						Hide_Time_Min_Max(); 
					})	
				}
			}