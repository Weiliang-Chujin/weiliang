var dataRatingsum = [0,0,0,0,0];
d3.json("data/useritem.json",function(error,da){
	for(var i = 0;i<da.RECORDS.length;i++)
	{
		if(da.RECORDS[i].rating == 10.0){
					dataRatingsum[0]++;
		}else if(da.RECORDS[i].rating == 20.0){
					dataRatingsum[1]++;
		}else if(da.RECORDS[i].rating == 30.0){
					dataRatingsum[2]++;
		}else if(da.RECORDS[i].rating == 40.0){
					dataRatingsum[3]++;
		}else if(da.RECORDS[i].rating == 50.0){
					dataRatingsum[4]++;
		}
	}
	document.getElementById("p1").innerHTML="消费满意度(共"+d3.sum(dataRatingsum)+"条评论)";
	// 总分对比与评论数量
	var width = 230;
	var height = 180;
	var svg = d3.select("#rating").append("svg")
					.attr("width",width)
					.attr("height",height);
	svg.append("text")
	   .attr("x",5)
	   .attr("y",160)
	   .text("店铺总分占比")
	   .attr("fill","white");
	  
	var pie = d3.layout.pie();
	var outerRadius = width / 3.7;
	var innerRadius = 0;
	var arc = d3.svg.arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);
	
	var color = d3.scale.category10();
	
	var arcs = svg.selectAll("g")
				  .data(pie(dataRatingsum))
				  .enter()
				  .append("g")
				  .attr("transform","translate("+outerRadius+","+outerRadius+")");
				  
	arcs.append("path")
		.attr("fill",function(d,i){
			return color(i);
		})
		.attr("d",function(d){
			return arc(d);
		});
	
	arcs.append("text")
		.attr("transform",function(d){
			var x = arc.centroid(d)[0]*1.5;
			var y = arc.centroid(d)[1]*1.5;
			return "translate(" + x + "," + y + ")";
		})
		.attr("fill","black")
		.attr("font-size", 12)
		.attr("text-anchor","middle")
		.text(function(d){
			var percent = Number(d.value)/d3.sum(dataRatingsum)*100;
			return percent.toFixed(0)+'%';
		});
    // 下方提示
	 svg.append("circle")
	   .attr("cx",7)
	   .attr("cy",135)
	   .attr("r",4)
	   .attr("fill",color(0));	
	 svg.append("text")
	   .attr("x",13)
	   .attr("y",138)
	   .text("10分")
	   .attr("font-size", 12)
	   .attr("fill","white");
		   
	  svg.append("circle")
	    .attr("cx",46)
	    .attr("cy",135)
	    .attr("r",4)
	    .attr("fill",color(1));	
	  svg.append("text")
	    .attr("x",52)
	    .attr("y",138)
	    .text("20分")
	    .attr("font-size", 12)
	    .attr("fill","white");
		
		svg.append("circle")
		  .attr("cx",85)
		  .attr("cy",135)
		  .attr("r",4)
		  .attr("fill",color(2));	
		svg.append("text")
		  .attr("x",91)
		  .attr("y",138)
		  .text("30分")
		  .attr("font-size", 12)
		  .attr("fill","white");
		  
		  svg.append("circle")
		    .attr("cx",124)
		    .attr("cy",135)
		    .attr("r",4)
		    .attr("fill",color(3));	
		  svg.append("text")
		    .attr("x",130)
		    .attr("y",138)
		    .text("40分")
		    .attr("font-size", 12)
		    .attr("fill","white");
			
			svg.append("circle")
			  .attr("cx",163)
			  .attr("cy",135)
			  .attr("r",4)
			  .attr("fill",color(4));	
			svg.append("text")
			  .attr("x",169)
			  .attr("y",138)
			  .text("50分")
			  .attr("font-size", 12)
			  .attr("fill","white");
    //添加一个提示框
		var tooltip=d3.select("#rating")
					.append("div")
					.attr("class","tooltip")
					.style("opacity",0.0);
		 
		arcs.on("mouseover",function(d,i){
					/*
					鼠标移入时，
					（1）通过 selection.html() 来更改提示框的文字
					（2）通过更改样式 left 和 top 来设定提示框的位置
					（3）设定提示框的透明度为1.0（完全不透明）
					*/
				   d3.select(this)
				   .attr("opacity",0.5);
				   
				   var percent = Number(d.value)/d3.sum(dataRatingsum)*100;
		tooltip.html("有"+d.value+"条评论给其"+"<br />"+"消费店铺总分为"+(i+1)*10+"，占比"+percent.toFixed(0)+'%')
			.style("left",(d3.event.pageX)+"px")
			.style("top",(d3.event.pageY+20)+"px")
			.style("opacity",1.0);
	    tooltip.style("box-shadow","10px 0px 0px"+color(i));//在提示框后添加阴影
		 
		})
		.on("mousemove",function(d){
			/* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
			tooltip.style("left",(d3.event.pageX)+"px")
					.style("top",(d3.event.pageY+20)+"px");
		})
		.on("mouseout",function(d){
			 d3.select(this)
			.transition()
			   .duration(250)
			   	.attr("opacity",1.0);
			//鼠标移除 透明度设为0
			tooltip.style("opacity",0.0);
		})
})