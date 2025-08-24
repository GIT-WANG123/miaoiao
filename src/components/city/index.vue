
<template>
<div class="city_body">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li>上海</li>
							<li>北京</li>
							<li>上海</li>
							<li>北京</li>
							<li>上海</li>
							<li>北京</li>
							<li>上海</li>
							<li>北京</li>
						</ul>
					</div>
					<div class="city_sort">
						
						<div>
						<div>
							<h2>A</h2>
							<ul>
								<li>阿拉善盟</li>
								<li>鞍山</li>
								<li>安庆</li>
								<li>安阳</li>
							</ul>
						</div>
						<h2>B</h2>
							<ul>
								<li>北京</li>
								<li>保定</li>
								<li>蚌埠</li>
								<li>包头</li>
							</ul>
						</div>
						<div>
							<h2>A</h2>
							<ul>
								<li>阿拉善盟</li>
								<li>鞍山</li>
								<li>安庆</li>
								<li>安阳</li>
							</ul>
						</div>
						<div>
							<h2>B</h2>
							<ul>
								<li>北京</li>
								<li>保定</li>
								<li>蚌埠</li>
								<li>包头</li>
							</ul>
						</div>
						<div>
							<h2>A</h2>
							<ul>
								<li>阿拉善盟</li>
								<li>鞍山</li>
								<li>安庆</li>
								<li>安阳</li>
							</ul>
						</div>
						<div>
							<h2>B</h2>
							<ul>
								<li>北京</li>
								<li>保定</li>
								<li>蚌埠</li>
								<li>包头</li>
							</ul>
						</div>	
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
					</ul>
				</div>
			</div>
		
</template>
<script>
export default {
name: "City"
}
</script>
<style scoped>
 .city_hot {
            margin-top: 20px;
            background: white;
        }
        
        .city_hot h2 {
            padding: 10px 15px;
            line-height: 30px;
            font-size: 16px;
            background: #f9f9f9;
            color: #666;
            border-bottom: 1px solid #eee;
        }
        
        .city_hot ul {
            padding: 0 10px;
            overflow: hidden;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
        }
        
        .city_hot ul li {
            background: #fff;
            width: 29%;
            height: 33px;
            line-height: 33px;
            text-align: center;
            margin: 10px 2%;
            border-radius: 16px;
            border: 1px solid #eee;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
          .city_sort div {
            margin-top: 20px;
        }
        
        .city_sort h2 {
            padding-left: 15px;
            line-height: 30px;
            font-size: 14px;
           
        }
        
        .city_sort ul {
            padding-left: 10px;
            margin-top: 10px;
            list-style: none;
        }
        
        .city_sort ul li {
            line-height: 30px;
            padding: 5px 0;
        }
        .city_index {
            position: fixed;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
           
            border-radius: 15px;
          
           
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .city_index ul {
            list-style: none;
            text-align: center;
        }
        
        .city_index ul li {
            font-size: 16px;
            padding: 4px 6px;
            color: #666;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
           
        }
        
        .city_index ul li:hover {
            color: #ff4d8d;
            font-weight: bold;
        }
       
      
</style>